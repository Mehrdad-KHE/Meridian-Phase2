// Data Models for Meridian Accounting Workflow System

export type DecisionSource = 'System' | 'Operator' | 'Accountant';
export type DocumentStatus = 'readable' | 'needs-fix' | 'unreadable' | 'excluded';
export type ReviewItemStatus = 'pending' | 'in-review' | 'resolved' | 'asked-accountant' | 'completed';
export type TransactionType = 'expense' | 'income' | 'transfer' | 'shareholder';
export type TaxCode = 'HST' | 'GST' | 'PST' | 'No Tax';

export interface AccountingFirm {
  id: string;
  name: string;
  createdAt: string;
}

export interface Client {
  id: string;
  firmId: string;
  name: string;
  businessNumber?: string;
  createdAt: string;
}

export interface ReviewPeriod {
  id: string;
  clientId: string;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Case {
  id: string;
  periodId: string;
  name: string;
  status: 'draft' | 'processing' | 'review' | 'complete';
  createdAt: string;
}

export interface Document {
  id: string;
  caseId: string;
  fileName: string;
  status: DocumentStatus;
  uploadedAt: string;
  processedAt?: string;
  rotation: 0 | 90 | 180 | 270;
  pageCount: number;
  relatedDocumentIds?: string[];
  extractedData?: {
    vendor?: string;
    date?: string;
    amount?: number;
    taxAmount?: number;
    category?: string;
  };
}

export interface Transaction {
  id: string;
  caseId: string;
  documentId?: string;
  vendor: string;
  date: string;
  amount: number;
  taxCode: TaxCode;
  taxAmount: number;
  category: string;
  accountCode: string;
  type: TransactionType;
  description: string;
  decisionSource: DecisionSource;
  isPersonal: boolean;
  isSupportOnly: boolean;
  isExcluded: boolean;
  excludeReason?: string;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  caseId: string;
  documentId?: string;
  transactionId?: string;
  status: ReviewItemStatus;
  type: 'categorization' | 'matching' | 'vendor-identification' | 'personal-expense' | 'split-required' | 'tax-calculation';
  title: string;
  description: string;
  suggestedAction?: string;
  confidence: number;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: DecisionSource;
  accountantQuestionId?: string;
}

export interface AccountantQuestion {
  id: string;
  caseId: string;
  reviewItemIds: string[];
  groupTitle: string;
  context: string;
  question: string;
  suggestedAnswers: string[];
  askedAt: string;
  answeredAt?: string;
  answer?: string;
  notes?: string;
}

export interface VendorRule {
  id: string;
  vendorName: string;
  defaultCategory: string;
  defaultAccountCode: string;
  defaultTaxCode: TaxCode;
  isPersonalVendor: boolean;
  learnedFromCases: string[];
  createdAt: string;
  lastUsedAt: string;
}

export interface ChartOfAccountsItem {
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  isActive: boolean;
}

export interface AuditEvent {
  id: string;
  caseId: string;
  timestamp: string;
  eventType: 'document-added' | 'document-processed' | 'review-resolved' | 'review-reopened' | 'accountant-answered' | 'transaction-modified' | 'export-generated';
  userId: string;
  entityType: 'document' | 'transaction' | 'review-item' | 'accountant-question';
  entityId: string;
  action: string;
  before?: any;
  after?: any;
  reason?: string;
}

export interface AppState {
  firms: AccountingFirm[];
  clients: Client[];
  periods: ReviewPeriod[];
  cases: Case[];
  documents: Document[];
  transactions: Transaction[];
  reviewItems: ReviewItem[];
  accountantQuestions: AccountantQuestion[];
  vendorRules: VendorRule[];
  chartOfAccounts: ChartOfAccountsItem[];
  auditEvents: AuditEvent[];

  // Current context
  selectedFirmId: string | null;
  selectedClientId: string | null;
  selectedPeriodId: string | null;
  selectedCaseId: string | null;

  // UI state
  currentScreen: 'workspace' | 'documents' | 'processing' | 'review' | 'accountant-qa' | 'vendors' | 'export';
}
