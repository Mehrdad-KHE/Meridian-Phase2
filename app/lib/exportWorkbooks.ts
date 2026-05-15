import * as XLSX from 'xlsx';
import type {
  AccountingFirm,
  AuditEvent,
  Case,
  Client,
  Document,
  ReviewItem,
  ReviewPeriod,
  Transaction
} from '../types';

export interface ExportSnapshot {
  firm?: AccountingFirm;
  client?: Client;
  period?: ReviewPeriod;
  caseItem?: Case;
  documents: Document[];
  transactions: Transaction[];
  reviewItems: ReviewItem[];
  auditEvents: AuditEvent[];
}

export interface ExportWorkbookResult {
  workbook: XLSX.WorkBook;
  fileName: string;
}

function sanitizeFilenamePart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function buildFileName(snapshot: ExportSnapshot, suffix: string) {
  const parts = [snapshot.client?.name ?? 'phase2', snapshot.caseItem?.name ?? 'case', suffix]
    .filter(Boolean)
    .map(sanitizeFilenamePart)
    .filter(Boolean);

  return `${parts.join('-')}.xlsx`;
}

function money(value?: number) {
  return value == null ? '' : value.toFixed(2);
}

function yesNo(value: boolean) {
  return value ? 'Yes' : 'No';
}

function reviewStatusForRow(reviewItems: ReviewItem[], documentId?: string, transactionId?: string) {
  const match = reviewItems.find(item => item.documentId === documentId || item.transactionId === transactionId);
  if (!match) return '';
  return match.status;
}

function transactionRows(snapshot: ExportSnapshot) {
  return snapshot.transactions.map(txn => {
    const doc = snapshot.documents.find(item => item.id === txn.documentId);
    return {
      Case: snapshot.caseItem?.name ?? '',
      Client: snapshot.client?.name ?? '',
      Firm: snapshot.firm?.name ?? '',
      Period: snapshot.period?.name ?? '',
      Date: txn.date,
      Vendor: txn.vendor,
      Category: txn.category,
      'Account Code': txn.accountCode,
      'Tax Code': txn.taxCode,
      Amount: money(txn.amount),
      'Tax Amount': money(txn.taxAmount),
      Type: txn.type,
      'Decision Source': txn.decisionSource,
      'Document ID': txn.documentId ?? '',
      'Document File': doc?.fileName ?? '',
      'Related Documents': doc?.relatedDocumentIds?.join(', ') ?? '',
      Description: txn.description,
      Personal: yesNo(txn.isPersonal),
      'Support Only': yesNo(txn.isSupportOnly),
      Excluded: yesNo(txn.isExcluded),
      'Exclude Reason': txn.excludeReason ?? '',
      'Review Status': reviewStatusForRow(snapshot.reviewItems, txn.documentId, txn.id)
    };
  });
}

function documentRows(snapshot: ExportSnapshot) {
  return snapshot.documents.map(doc => ({
    'Document ID': doc.id,
    'File Name': doc.fileName,
    Status: doc.status,
    'Uploaded At': doc.uploadedAt,
    'Processed At': doc.processedAt ?? '',
    Rotation: doc.rotation,
    'Page Count': doc.pageCount,
    'Related Documents': doc.relatedDocumentIds?.join(', ') ?? '',
    Vendor: doc.extractedData?.vendor ?? '',
    Date: doc.extractedData?.date ?? '',
    Amount: money(doc.extractedData?.amount),
    'Tax Amount': money(doc.extractedData?.taxAmount),
    Category: doc.extractedData?.category ?? ''
  }));
}

function reviewRows(snapshot: ExportSnapshot) {
  return snapshot.reviewItems.map(item => {
    const doc = snapshot.documents.find(entry => entry.id === item.documentId);
    const txn = snapshot.transactions.find(entry => entry.id === item.transactionId);
    return {
      'Review Item ID': item.id,
      Status: item.status,
      Type: item.type,
      Title: item.title,
      Description: item.description,
      'Suggested Action': item.suggestedAction ?? '',
      Confidence: item.confidence,
      'Source Document': doc?.fileName ?? '',
      'Transaction ID': item.transactionId ?? '',
      Vendor: txn?.vendor ?? '',
      Amount: txn ? money(txn.amount) : '',
      'Resolved By': item.resolvedBy ?? '',
      'Resolved At': item.resolvedAt ?? ''
    };
  });
}

function auditRows(snapshot: ExportSnapshot) {
  return snapshot.auditEvents.map(event => ({
    Timestamp: event.timestamp,
    'Event Type': event.eventType,
    'Entity Type': event.entityType,
    'Entity ID': event.entityId,
    Action: event.action,
    Reason: event.reason ?? ''
  }));
}

function summarySheet(snapshot: ExportSnapshot) {
  const rows = [
    ['Case Summary'],
    ['Firm', snapshot.firm?.name ?? ''],
    ['Client', snapshot.client?.name ?? ''],
    ['Period', snapshot.period?.name ?? ''],
    ['Case', snapshot.caseItem?.name ?? ''],
    ['Documents', snapshot.documents.length],
    ['Transactions', snapshot.transactions.length],
    ['Review Items', snapshot.reviewItems.length],
    ['Audit Events', snapshot.auditEvents.length],
    [],
    ['Notes'],
    ['This workbook is prototype-generated sample output.'],
    ['It is not real OCR, bank, or QuickBooks output.']
  ];

  return XLSX.utils.aoa_to_sheet(rows);
}

export function buildType2ImportWorkbook(snapshot: ExportSnapshot): ExportWorkbookResult {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(transactionRows(snapshot)), 'Transactions');
  return {
    workbook,
    fileName: buildFileName(snapshot, 'type-2-import-style')
  };
}

export function buildType3AccountantReviewWorkbook(snapshot: ExportSnapshot): ExportWorkbookResult {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet(snapshot), 'Summary');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(documentRows(snapshot)), 'Documents');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(reviewRows(snapshot)), 'Review Items');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(auditRows(snapshot)), 'Audit Trail');
  return {
    workbook,
    fileName: buildFileName(snapshot, 'type-3-accountant-review')
  };
}

export function buildType4ConsolidatedSummaryWorkbook(snapshot: ExportSnapshot): ExportWorkbookResult {
  const workbook = XLSX.utils.book_new();
  const rows = [
    ['Consolidated Summary'],
    [],
    ['Case Summary'],
    ['Firm', snapshot.firm?.name ?? ''],
    ['Client', snapshot.client?.name ?? ''],
    ['Period', snapshot.period?.name ?? ''],
    ['Case', snapshot.caseItem?.name ?? ''],
    ['Documents', snapshot.documents.length],
    ['Transactions', snapshot.transactions.length],
    ['Review Items', snapshot.reviewItems.length],
    ['Audit Events', snapshot.auditEvents.length],
    [],
    ['Transactions'],
    ['Date', 'Vendor', 'Category', 'Amount', 'Tax Code', 'Tax Amount', 'Decision Source', 'Document File', 'Review Status'],
    ...snapshot.transactions.map(txn => {
      const doc = snapshot.documents.find(item => item.id === txn.documentId);
      return [
        txn.date,
        txn.vendor,
        txn.category,
        money(txn.amount),
        txn.taxCode,
        money(txn.taxAmount),
        txn.decisionSource,
        doc?.fileName ?? '',
        reviewStatusForRow(snapshot.reviewItems, txn.documentId, txn.id)
      ];
    }),
    [],
    ['Review Items'],
    ['Status', 'Type', 'Title', 'Source Document', 'Transaction ID', 'Confidence', 'Resolved By'],
    ...snapshot.reviewItems.map(item => {
      const doc = snapshot.documents.find(entry => entry.id === item.documentId);
      return [
        item.status,
        item.type,
        item.title,
        doc?.fileName ?? '',
        item.transactionId ?? '',
        item.confidence,
        item.resolvedBy ?? ''
      ];
    }),
    [],
    ['Notes'],
    ['Prototype-generated sample output.'],
    ['It is not real OCR, bank, or QuickBooks output.']
  ];

  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(rows), 'Summary');
  return {
    workbook,
    fileName: buildFileName(snapshot, 'type-4-consolidated-summary')
  };
}

export function downloadWorkbook(workbook: XLSX.WorkBook, fileName: string) {
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
