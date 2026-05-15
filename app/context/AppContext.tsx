import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  AppState,
  AccountingFirm,
  Client,
  ReviewPeriod,
  Case,
  Document,
  Transaction,
  ReviewItem,
  AccountantQuestion,
  VendorRule,
  AuditEvent,
  DecisionSource
} from '../types';
import { emptyState, getSeededDemoState } from '../data/sampleData';

type PrototypeVendorSpec = {
  vendor: string;
  category: string;
  accountCode: string;
  taxCode: 'HST' | 'GST';
  taxRate: number;
  baseSubtotal: number;
  amountStep: number;
  confidence: number;
  reviewType?: 'categorization' | 'matching';
  reviewTitle?: string;
  reviewAction?: string;
};

type PrototypeExtraction = {
  vendor: string;
  date: string;
  amount: number;
  taxAmount: number;
  category: string;
  accountCode: string;
  taxCode: 'HST' | 'GST';
  confidence: number;
  reviewType?: 'categorization' | 'matching';
  reviewTitle?: string;
  reviewAction?: string;
};

const PROTOTYPE_VENDOR_POOL: PrototypeVendorSpec[] = [
  {
    vendor: 'Tim Hortons',
    category: 'Meals and Entertainment',
    accountCode: '5400',
    taxCode: 'HST' as const,
    taxRate: 0.13,
    baseSubtotal: 18.45,
    amountStep: 3.25,
    confidence: 0.64,
    reviewType: 'categorization' as const,
    reviewTitle: 'Prototype review needed: confirm meal classification',
    reviewAction: 'Confirm whether this meal should stay in Meals and Entertainment.'
  },
  {
    vendor: 'Canadian Tire',
    category: 'Materials and Supplies',
    accountCode: '5100',
    taxCode: 'HST' as const,
    taxRate: 0.13,
    baseSubtotal: 74.18,
    amountStep: 8.4,
    confidence: 0.88
  },
  {
    vendor: 'Petro-Canada',
    category: 'Vehicle Expenses',
    accountCode: '5300',
    taxCode: 'GST' as const,
    taxRate: 0.05,
    baseSubtotal: 54.2,
    amountStep: 6.85,
    confidence: 0.72,
    reviewType: 'matching' as const,
    reviewTitle: 'Prototype review needed: confirm fuel support',
    reviewAction: 'Confirm that this fuel purchase matches the intended business vehicle.'
  },
  {
    vendor: 'Staples Canada',
    category: 'Office Supplies',
    accountCode: '5500',
    taxCode: 'HST' as const,
    taxRate: 0.13,
    baseSubtotal: 32.18,
    amountStep: 4.15,
    confidence: 0.81
  },
  {
    vendor: 'Bell Canada',
    category: 'Utilities',
    accountCode: '5800',
    taxCode: 'GST' as const,
    taxRate: 0.05,
    baseSubtotal: 89.95,
    amountStep: 7.5,
    confidence: 0.85
  }
] as const;

const PROTOTYPE_REVIEW_THRESHOLD = 0.78;

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function safeDateInRange(startDate: string, endDate: string, seed: number) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end.getTime() < start.getTime()) {
    return toDateOnly(new Date());
  }

  const rangeDays = Math.max(1, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1);
  const offset = seed % rangeDays;
  return toDateOnly(new Date(start.getTime() + offset * 86400000));
}

function getCasePeriodDates(state: AppState, caseId: string) {
  const caseItem = state.cases.find(c => c.id === caseId);
  const period = caseItem ? state.periods.find(p => p.id === caseItem.periodId) : undefined;

  return {
    startDate: period?.startDate ?? toDateOnly(new Date()),
    endDate: period?.endDate ?? toDateOnly(new Date())
  };
}

function buildPrototypeExtraction(document: Document, state: AppState): PrototypeExtraction {
  const seed = hashString(`${document.id}:${document.fileName}`);
  const vendorSpec = PROTOTYPE_VENDOR_POOL[seed % PROTOTYPE_VENDOR_POOL.length];
  const amount = roundCurrency(vendorSpec.baseSubtotal + (seed % 5) * vendorSpec.amountStep);
  const taxAmount = roundCurrency(amount * vendorSpec.taxRate);
  const confidence = roundCurrency(
    Math.max(0.42, Math.min(0.96, vendorSpec.confidence + (((seed % 7) - 3) * 0.02)))
  );
  const { startDate, endDate } = getCasePeriodDates(state, document.caseId);
  const date = safeDateInRange(startDate, endDate, seed);

  return {
    vendor: vendorSpec.vendor,
    date,
    amount,
    taxAmount,
    category: vendorSpec.category,
    accountCode: vendorSpec.accountCode,
    taxCode: vendorSpec.taxCode,
    confidence,
    reviewType: vendorSpec.reviewType,
    reviewTitle: vendorSpec.reviewTitle,
    reviewAction: vendorSpec.reviewAction
  };
}

interface AppContextType {
  state: AppState;

  // Workspace actions
  createFirm: (name: string) => AccountingFirm;
  createClient: (firmId: string, name: string, businessNumber?: string) => Client;
  createPeriod: (clientId: string, name: string, startDate: string, endDate: string) => ReviewPeriod;
  createCase: (periodId: string, name: string) => Case;

  // Selection actions
  selectFirm: (firmId: string | null) => void;
  selectClient: (clientId: string | null) => void;
  selectPeriod: (periodId: string | null) => void;
  selectCase: (caseId: string | null) => void;
  setCurrentScreen: (screen: AppState['currentScreen']) => void;

  // Document actions
  addDocument: (caseId: string, fileName: string) => Document;
  rotateDocument: (documentId: string) => void;
  processDocument: (documentId: string) => void;
  excludeDocument: (documentId: string, reason: string) => void;
  setDocumentRelatedDocuments: (documentId: string, relatedDocumentIds: string[]) => void;

  // Review actions
  resolveReviewItem: (reviewItemId: string, decision: DecisionSource, notes?: string) => void;
  sendToAccountant: (reviewItemIds: string[], groupTitle: string, question: string) => AccountantQuestion;
  splitDocument: (documentId: string) => void;
  attachDocumentToTransaction: (documentId: string, transactionId: string) => void;
  reopenReviewItem: (reviewItemId: string, reason: string) => void;

  // Transaction actions
  createTransaction: (data: Partial<Transaction>) => Transaction;
  updateTransaction: (transactionId: string, updates: Partial<Transaction>) => void;
  markAsPersonal: (transactionId: string) => void;
  markAsSupportOnly: (transactionId: string) => void;
  excludeTransaction: (transactionId: string, reason: string) => void;

  // Accountant Q&A actions
  answerQuestion: (questionId: string, answer: string, notes?: string) => void;

  // Vendor actions
  createVendorRule: (vendorName: string, category: string, accountCode: string) => VendorRule;

  // Demo data actions
  loadDemoData: () => void;
  resetWorkspace: () => void;
  resetToEmpty: () => void;

  // Helper functions
  getCurrentFirm: () => AccountingFirm | undefined;
  getCurrentClient: () => Client | undefined;
  getCurrentPeriod: () => ReviewPeriod | undefined;
  getCurrentCase: () => Case | undefined;
  getCaseDocuments: (caseId: string) => Document[];
  getCaseTransactions: (caseId: string) => Transaction[];
  getCaseReviewItems: (caseId: string) => ReviewItem[];
  canExport: (caseId: string) => { canExport: boolean; blockers: string[] };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialMode = 'demo' }: { children: ReactNode; initialMode?: 'empty' | 'demo' }) {
  const [state, setState] = useState<AppState>(initialMode === 'demo' ? getSeededDemoState() : emptyState);

  const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

  const addAuditEvent = useCallback((event: Omit<AuditEvent, 'id' | 'timestamp'>) => {
    const auditEvent: AuditEvent = {
      ...event,
      id: generateId('audit'),
      timestamp: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      auditEvents: [...prev.auditEvents, auditEvent]
    }));
  }, []);

  const createFirm = useCallback((name: string) => {
    const firm: AccountingFirm = {
      id: generateId('firm'),
      name,
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      firms: [...prev.firms, firm]
    }));
    return firm;
  }, []);

  const createClient = useCallback((firmId: string, name: string, businessNumber?: string) => {
    const client: Client = {
      id: generateId('client'),
      firmId,
      name,
      businessNumber,
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      clients: [...prev.clients, client]
    }));
    return client;
  }, []);

  const createPeriod = useCallback((clientId: string, name: string, startDate: string, endDate: string) => {
    const period: ReviewPeriod = {
      id: generateId('period'),
      clientId,
      name,
      startDate,
      endDate,
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      periods: [...prev.periods, period]
    }));
    return period;
  }, []);

  const createCase = useCallback((periodId: string, name: string) => {
    const newCase: Case = {
      id: generateId('case'),
      periodId,
      name,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      cases: [...prev.cases, newCase]
    }));
    return newCase;
  }, []);

  const selectFirm = useCallback((firmId: string | null) => {
    setState(prev => ({ ...prev, selectedFirmId: firmId }));
  }, []);

  const selectClient = useCallback((clientId: string | null) => {
    setState(prev => ({ ...prev, selectedClientId: clientId }));
  }, []);

  const selectPeriod = useCallback((periodId: string | null) => {
    setState(prev => ({ ...prev, selectedPeriodId: periodId }));
  }, []);

  const selectCase = useCallback((caseId: string | null) => {
    setState(prev => ({ ...prev, selectedCaseId: caseId }));
  }, []);

  const setCurrentScreen = useCallback((screen: AppState['currentScreen']) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  }, []);

  const addDocument = useCallback((caseId: string, fileName: string) => {
    const document: Document = {
      id: generateId('doc'),
      caseId,
      fileName,
      status: 'readable',
      uploadedAt: new Date().toISOString(),
      rotation: 0,
      pageCount: 1
    };
    setState(prev => ({
      ...prev,
      documents: [...prev.documents, document]
    }));
    addAuditEvent({
      caseId,
      eventType: 'document-added',
      userId: 'operator-1',
      entityType: 'document',
      entityId: document.id,
      action: 'uploaded document',
      after: { fileName }
    });
    return document;
  }, [addAuditEvent]);

  const rotateDocument = useCallback((documentId: string) => {
    setState(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === documentId
          ? { ...doc, rotation: ((doc.rotation + 90) % 360) as 0 | 90 | 180 | 270 }
          : doc
      )
    }));
  }, []);

  const processDocument = useCallback((documentId: string) => {
    setState(prev => {
      const existingDocument = prev.documents.find(doc => doc.id === documentId);
      if (!existingDocument || existingDocument.processedAt) {
        return prev;
      }

      const extraction = buildPrototypeExtraction(existingDocument, prev);
      const processedAt = new Date().toISOString();
      const transactionId = generateId('txn');
      const reviewItemId = generateId('review');
      const existingTransaction = prev.transactions.find(txn => txn.documentId === documentId);
      const transactionExists = Boolean(existingTransaction);
      const resolvedTransactionId = existingTransaction?.id ?? transactionId;
      const reviewExists = prev.reviewItems.some(item =>
        item.documentId === documentId || item.transactionId === resolvedTransactionId
      );
      const shouldCreateReview = extraction.confidence < PROTOTYPE_REVIEW_THRESHOLD && !reviewExists;

      const updatedDocuments = prev.documents.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              status: 'readable' as const,
              processedAt,
              extractedData: {
                vendor: extraction.vendor,
                date: extraction.date,
                amount: extraction.amount,
                taxAmount: extraction.taxAmount,
                category: extraction.category
              }
            }
          : doc
      );

      const updatedTransactions = transactionExists
        ? prev.transactions
        : [
            ...prev.transactions,
            {
              id: transactionId,
              caseId: existingDocument.caseId,
              documentId,
              vendor: extraction.vendor,
              date: extraction.date,
              amount: extraction.amount,
              taxCode: extraction.taxCode,
              taxAmount: extraction.taxAmount,
              category: extraction.category,
              accountCode: extraction.accountCode,
              type: 'expense' as const,
              description: `Prototype-generated sample entry for ${extraction.vendor}`,
              decisionSource: 'System' as const,
              isPersonal: false,
              isSupportOnly: false,
              isExcluded: false,
              createdAt: processedAt
            }
          ];

      const updatedReviewItems = shouldCreateReview
        ? [
            ...prev.reviewItems,
            {
              id: reviewItemId,
              caseId: existingDocument.caseId,
              documentId,
              transactionId: resolvedTransactionId,
              status: 'pending' as const,
              type: extraction.reviewType ?? 'categorization',
              title: extraction.reviewTitle ?? 'Prototype review needed: verify this entry',
              description:
                `${extraction.vendor} was generated from prototype sample data and landed below the confidence threshold. ` +
                `Review the suggested details before accepting it.`,
              suggestedAction: extraction.reviewAction,
              confidence: extraction.confidence,
              createdAt: processedAt
            }
          ]
        : prev.reviewItems;

      const auditEvent: AuditEvent = {
        id: generateId('audit'),
        caseId: existingDocument.caseId,
        timestamp: processedAt,
        eventType: 'document-processed',
        userId: 'system',
        entityType: 'document',
        entityId: existingDocument.id,
        action: 'processed document with prototype-generated sample data',
        after: {
          vendor: extraction.vendor,
          date: extraction.date,
          amount: extraction.amount,
          taxCode: extraction.taxCode,
          taxAmount: extraction.taxAmount,
          transactionCreated: !transactionExists,
          reviewItemCreated: shouldCreateReview
        }
      };

      return {
        ...prev,
        documents: updatedDocuments,
        transactions: updatedTransactions,
        reviewItems: updatedReviewItems,
        auditEvents: [...prev.auditEvents, auditEvent]
      };
    });
  }, []);

  const excludeDocument = useCallback((documentId: string, reason: string) => {
    setState(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === documentId ? { ...doc, status: 'excluded' } : doc
      )
    }));
  }, []);

  const setDocumentRelatedDocuments = useCallback((documentId: string, relatedDocumentIds: string[]) => {
    setState(prev => {
      const document = prev.documents.find(doc => doc.id === documentId);
      if (!document) return prev;

      const validRelatedIds = Array.from(
        new Set(
          relatedDocumentIds
            .map(id => id.trim())
            .filter(Boolean)
            .filter(id => id !== documentId)
            .filter(id => prev.documents.some(doc => doc.id === id && doc.caseId === document.caseId))
        )
      );

      const nextDocuments = prev.documents.map(doc =>
        doc.id === documentId ? { ...doc, relatedDocumentIds: validRelatedIds } : doc
      );

      const linkedResolvedItems = prev.reviewItems.filter(item => {
        if (item.status !== 'resolved') return false;

        const relatedByDocument = item.documentId ? validRelatedIds.includes(item.documentId) : false;
        const relatedByTransaction = item.transactionId
          ? prev.transactions.some(
              txn => txn.id === item.transactionId && txn.documentId && validRelatedIds.includes(txn.documentId)
            )
          : false;

        return relatedByDocument || relatedByTransaction;
      });

      if (linkedResolvedItems.length === 0) {
        return {
          ...prev,
          documents: nextDocuments
        };
      }

      const timestamp = new Date().toISOString();
      const reopenedIds = new Set(linkedResolvedItems.map(item => item.id));
      const nextReviewItems = prev.reviewItems.map(item =>
        reopenedIds.has(item.id)
          ? {
              ...item,
              status: 'pending' as const,
              resolvedAt: undefined,
              resolvedBy: undefined,
              accountantQuestionId: undefined
            }
          : item
      );

      const reopenedAuditEvents: AuditEvent[] = linkedResolvedItems.map(item => ({
        id: generateId('audit'),
        caseId: item.caseId,
        timestamp,
        eventType: 'review-reopened',
        userId: 'operator-1',
        entityType: 'review-item',
        entityId: item.id,
        action: 'reopened review item due to newer evidence',
        before: {
          status: item.status,
          resolvedAt: item.resolvedAt,
          resolvedBy: item.resolvedBy
        },
        after: {
          status: 'pending',
          supersedingDocumentIds: validRelatedIds
        },
        reason: 'Newer supporting document was linked'
      }));

      return {
        ...prev,
        documents: nextDocuments,
        reviewItems: nextReviewItems,
        auditEvents: [...prev.auditEvents, ...reopenedAuditEvents]
      };
    });
  }, []);

  const resolveReviewItem = useCallback((reviewItemId: string, decision: DecisionSource, notes?: string) => {
    setState(prev => ({
      ...prev,
      reviewItems: prev.reviewItems.map(item =>
        item.id === reviewItemId
          ? {
              ...item,
              status: 'resolved',
              resolvedAt: new Date().toISOString(),
              resolvedBy: decision
            }
          : item
      )
    }));
  }, []);

  const reopenReviewItem = useCallback((reviewItemId: string, reason: string) => {
    setState(prev => {
      const reviewItem = prev.reviewItems.find(item => item.id === reviewItemId);
      if (!reviewItem || reviewItem.status !== 'resolved') return prev;

      const timestamp = new Date().toISOString();
      const nextReviewItems = prev.reviewItems.map(item =>
        item.id === reviewItemId
          ? {
              ...item,
              status: 'pending' as const,
              resolvedAt: undefined,
              resolvedBy: undefined,
              accountantQuestionId: undefined
            }
          : item
      );

      const auditEvent: AuditEvent = {
        id: generateId('audit'),
        caseId: reviewItem.caseId,
        timestamp,
        eventType: 'review-reopened',
        userId: 'operator-1',
        entityType: 'review-item',
        entityId: reviewItem.id,
        action: 'reopened review item',
        before: {
          status: reviewItem.status,
          resolvedAt: reviewItem.resolvedAt,
          resolvedBy: reviewItem.resolvedBy
        },
        after: {
          status: 'pending'
        },
        reason
      };

      return {
        ...prev,
        reviewItems: nextReviewItems,
        auditEvents: [...prev.auditEvents, auditEvent]
      };
    });
  }, []);

  const sendToAccountant = useCallback((reviewItemIds: string[], groupTitle: string, question: string) => {
    if (!state.selectedCaseId) throw new Error('هیچ پرونده‌ای انتخاب نشده است');
    const accountantQuestion: AccountantQuestion = {
      id: generateId('aq'),
      caseId: state.selectedCaseId,
      reviewItemIds,
      groupTitle,
      context: 'Context from review items',
      question,
      suggestedAnswers: ['Approve', 'Reject', 'Request more information'],
      askedAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      accountantQuestions: [...prev.accountantQuestions, accountantQuestion],
      reviewItems: prev.reviewItems.map(item =>
        reviewItemIds.includes(item.id)
          ? { ...item, status: 'asked-accountant', accountantQuestionId: accountantQuestion.id }
          : item
      )
    }));
    return accountantQuestion;
  }, [state.selectedCaseId]);

  const splitDocument = useCallback((documentId: string) => {
    // Placeholder for split functionality
    console.log('Split document:', documentId);
  }, []);

  const attachDocumentToTransaction = useCallback((documentId: string, transactionId: string) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(txn =>
        txn.id === transactionId ? { ...txn, documentId } : txn
      )
    }));
  }, []);

  const createTransaction = useCallback((data: Partial<Transaction>) => {
    if (!state.selectedCaseId) throw new Error('هیچ پرونده‌ای انتخاب نشده است');
    const transaction: Transaction = {
      id: generateId('txn'),
      caseId: state.selectedCaseId,
      vendor: data.vendor || 'Unknown',
      date: data.date || new Date().toISOString().split('T')[0],
      amount: data.amount || 0,
      taxCode: data.taxCode || 'HST',
      taxAmount: data.taxAmount || 0,
      category: data.category || 'General',
      accountCode: data.accountCode || '5000',
      type: data.type || 'expense',
      description: data.description || '',
      decisionSource: data.decisionSource || 'System',
      isPersonal: data.isPersonal || false,
      isSupportOnly: data.isSupportOnly || false,
      isExcluded: data.isExcluded || false,
      createdAt: new Date().toISOString(),
      ...data
    };
    setState(prev => ({
      ...prev,
      transactions: [...prev.transactions, transaction]
    }));
    return transaction;
  }, [state.selectedCaseId]);

  const updateTransaction = useCallback((transactionId: string, updates: Partial<Transaction>) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(txn =>
        txn.id === transactionId ? { ...txn, ...updates } : txn
      )
    }));
  }, []);

  const markAsPersonal = useCallback((transactionId: string) => {
    updateTransaction(transactionId, { isPersonal: true, decisionSource: 'Operator' });
  }, [updateTransaction]);

  const markAsSupportOnly = useCallback((transactionId: string) => {
    updateTransaction(transactionId, { isSupportOnly: true, decisionSource: 'Operator' });
  }, [updateTransaction]);

  const excludeTransaction = useCallback((transactionId: string, reason: string) => {
    updateTransaction(transactionId, { isExcluded: true, excludeReason: reason, decisionSource: 'Operator' });
  }, [updateTransaction]);

  const answerQuestion = useCallback((questionId: string, answer: string, notes?: string) => {
    setState(prev => {
      const question = prev.accountantQuestions.find(q => q.id === questionId);
      if (!question) return prev;

      return {
        ...prev,
        accountantQuestions: prev.accountantQuestions.map(q =>
          q.id === questionId
            ? { ...q, answer, notes, answeredAt: new Date().toISOString() }
            : q
        ),
        reviewItems: prev.reviewItems.map(item =>
          question.reviewItemIds.includes(item.id)
            ? { ...item, status: 'resolved', resolvedBy: 'Accountant', resolvedAt: new Date().toISOString() }
            : item
        )
      };
    });
  }, []);

  const createVendorRule = useCallback((vendorName: string, category: string, accountCode: string) => {
    const rule: VendorRule = {
      id: generateId('vendor'),
      vendorName,
      defaultCategory: category,
      defaultAccountCode: accountCode,
      defaultTaxCode: 'HST',
      isPersonalVendor: false,
      learnedFromCases: state.selectedCaseId ? [state.selectedCaseId] : [],
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      vendorRules: [...prev.vendorRules, rule]
    }));
    return rule;
  }, [state.selectedCaseId]);

  const loadDemoData = useCallback(() => {
    setState(getSeededDemoState());
  }, []);

  const resetWorkspace = useCallback(() => {
    setState(getSeededDemoState());
  }, []);

  const resetToEmpty = useCallback(() => {
    setState(emptyState);
  }, []);

  const getCurrentFirm = useCallback(() => {
    return state.firms.find(f => f.id === state.selectedFirmId);
  }, [state.firms, state.selectedFirmId]);

  const getCurrentClient = useCallback(() => {
    return state.clients.find(c => c.id === state.selectedClientId);
  }, [state.clients, state.selectedClientId]);

  const getCurrentPeriod = useCallback(() => {
    return state.periods.find(p => p.id === state.selectedPeriodId);
  }, [state.periods, state.selectedPeriodId]);

  const getCurrentCase = useCallback(() => {
    return state.cases.find(c => c.id === state.selectedCaseId);
  }, [state.cases, state.selectedCaseId]);

  const getCaseDocuments = useCallback((caseId: string) => {
    return state.documents.filter(d => d.caseId === caseId);
  }, [state.documents]);

  const getCaseTransactions = useCallback((caseId: string) => {
    return state.transactions.filter(t => t.caseId === caseId);
  }, [state.transactions]);

  const getCaseReviewItems = useCallback((caseId: string) => {
    return state.reviewItems.filter(r => r.caseId === caseId);
  }, [state.reviewItems]);

  const canExport = useCallback((caseId: string) => {
    const blockers: string[] = [];
    const docs = state.documents.filter(d => d.caseId === caseId);
    const reviews = state.reviewItems.filter(r => r.caseId === caseId);
    const questions = state.accountantQuestions.filter(q => q.caseId === caseId);

    const needsFixDocs = docs.filter(d => d.status === 'needs-fix');
    if (needsFixDocs.length > 0) {
      blockers.push(`${needsFixDocs.length} document(s) need fixing`);
    }

    const pendingReviews = reviews.filter(r => r.status === 'pending' || r.status === 'in-review');
    if (pendingReviews.length > 0) {
      blockers.push(`${pendingReviews.length} review item(s) unresolved`);
    }

    const unansweredQuestions = questions.filter(q => !q.answeredAt);
    if (unansweredQuestions.length > 0) {
      blockers.push(`${unansweredQuestions.length} accountant question(s) unanswered`);
    }

    return {
      canExport: blockers.length === 0,
      blockers
    };
  }, [state.documents, state.reviewItems, state.accountantQuestions]);

  const value: AppContextType = {
    state,
    createFirm,
    createClient,
    createPeriod,
    createCase,
    selectFirm,
    selectClient,
    selectPeriod,
    selectCase,
    setCurrentScreen,
    addDocument,
    rotateDocument,
    processDocument,
    excludeDocument,
    setDocumentRelatedDocuments,
    resolveReviewItem,
    sendToAccountant,
    splitDocument,
    attachDocumentToTransaction,
    reopenReviewItem,
    createTransaction,
    updateTransaction,
    markAsPersonal,
    markAsSupportOnly,
    excludeTransaction,
    answerQuestion,
    createVendorRule,
    loadDemoData,
    resetWorkspace,
    resetToEmpty,
    getCurrentFirm,
    getCurrentClient,
    getCurrentPeriod,
    getCurrentCase,
    getCaseDocuments,
    getCaseTransactions,
    getCaseReviewItems,
    canExport
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
