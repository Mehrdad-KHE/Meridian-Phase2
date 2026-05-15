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
  ChartOfAccountsItem,
  AuditEvent
} from '../types';

// Empty state for new workspaces
export const emptyState: AppState = {
  firms: [],
  clients: [],
  periods: [],
  cases: [],
  documents: [],
  transactions: [],
  reviewItems: [],
  accountantQuestions: [],
  vendorRules: [],
  chartOfAccounts: getStandardChartOfAccounts(),
  auditEvents: [],
  selectedFirmId: null,
  selectedClientId: null,
  selectedPeriodId: null,
  selectedCaseId: null,
  currentScreen: 'workspace'
};

// Seeded demo data with realistic Canadian examples
export function getSeededDemoState(): AppState {
  const firms: AccountingFirm[] = [
    {
      id: 'firm-1',
      name: 'Maple Accounting Partners',
      createdAt: '2026-01-15T09:00:00Z'
    }
  ];

  const clients: Client[] = [
    {
      id: 'client-1',
      firmId: 'firm-1',
      name: 'North Star Construction Ltd.',
      businessNumber: '123456789RC0001',
      createdAt: '2026-02-01T10:00:00Z'
    },
    {
      id: 'client-2',
      firmId: 'firm-1',
      name: 'Timber Creek Consulting Inc.',
      businessNumber: '987654321RC0001',
      createdAt: '2026-02-10T14:00:00Z'
    }
  ];

  const periods: ReviewPeriod[] = [
    {
      id: 'period-1',
      clientId: 'client-1',
      name: 'Q1 2026',
      startDate: '2026-01-01',
      endDate: '2026-03-31',
      createdAt: '2026-02-01T10:30:00Z'
    },
    {
      id: 'period-2',
      clientId: 'client-2',
      name: 'FY 2025',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      createdAt: '2026-02-10T14:30:00Z'
    }
  ];

  const cases: Case[] = [
    {
      id: 'case-1',
      periodId: 'period-1',
      name: 'January 2026 Expenses',
      status: 'review',
      createdAt: '2026-02-15T09:00:00Z'
    },
    {
      id: 'case-2',
      periodId: 'period-2',
      name: 'Year-End Review',
      status: 'processing',
      createdAt: '2026-03-01T11:00:00Z'
    }
  ];

  const documents: Document[] = [
    {
      id: 'doc-1',
      caseId: 'case-1',
      fileName: 'receipt-tims-jan15.pdf',
      status: 'readable',
      uploadedAt: '2026-02-15T09:30:00Z',
      processedAt: '2026-02-15T09:31:00Z',
      rotation: 0,
      pageCount: 1,
      extractedData: {
        vendor: 'Tim Hortons',
        date: '2026-01-15',
        amount: 23.75,
        taxAmount: 3.08,
        category: 'Meals and Entertainment'
      }
    },
    {
      id: 'doc-2',
      caseId: 'case-1',
      fileName: 'invoice-homedepot-jan20.pdf',
      status: 'readable',
      uploadedAt: '2026-02-15T10:00:00Z',
      processedAt: '2026-02-15T10:01:00Z',
      rotation: 0,
      pageCount: 2,
      extractedData: {
        vendor: 'Home Depot',
        date: '2026-01-20',
        amount: 487.32,
        taxAmount: 63.35,
        category: 'Materials'
      }
    },
    {
      id: 'doc-3',
      caseId: 'case-1',
      fileName: 'receipt-gas-jan22.pdf',
      status: 'needs-fix',
      uploadedAt: '2026-02-15T10:30:00Z',
      rotation: 90,
      pageCount: 1
    },
    {
      id: 'doc-4',
      caseId: 'case-1',
      fileName: 'personal-amazon-jan25.pdf',
      status: 'readable',
      uploadedAt: '2026-02-15T11:00:00Z',
      processedAt: '2026-02-15T11:01:00Z',
      rotation: 0,
      pageCount: 1,
      extractedData: {
        vendor: 'Amazon.ca',
        date: '2026-01-25',
        amount: 89.99,
        taxAmount: 11.70,
        category: 'Unknown'
      }
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'txn-1',
      caseId: 'case-1',
      documentId: 'doc-2',
      vendor: 'Home Depot',
      date: '2026-01-20',
      amount: 487.32,
      taxCode: 'HST',
      taxAmount: 63.35,
      category: 'Construction Materials',
      accountCode: '5100',
      type: 'expense',
      description: 'Building supplies for project',
      decisionSource: 'System',
      isPersonal: false,
      isSupportOnly: false,
      isExcluded: false,
      createdAt: '2026-02-15T10:01:00Z'
    }
  ];

  const reviewItems: ReviewItem[] = [
    {
      id: 'review-1',
      caseId: 'case-1',
      documentId: 'doc-1',
      status: 'pending',
      type: 'categorization',
      title: 'Meals expense exceeds 50% threshold',
      description: 'Tim Hortons receipt for $23.75. System suggests "Meals and Entertainment" but amount may trigger 50% deduction rule for business meals.',
      suggestedAction: 'Confirm if this was a business meal with client or employee meal during work hours',
      confidence: 0.65,
      createdAt: '2026-02-15T09:31:00Z'
    },
    {
      id: 'review-2',
      caseId: 'case-1',
      documentId: 'doc-3',
      status: 'pending',
      type: 'matching',
      title: 'Document needs rotation',
      description: 'Gas receipt is rotated 90 degrees and needs to be corrected before processing',
      confidence: 0,
      createdAt: '2026-02-15T10:30:00Z'
    },
    {
      id: 'review-3',
      caseId: 'case-1',
      documentId: 'doc-4',
      status: 'pending',
      type: 'personal-expense',
      title: 'Potential personal expense detected',
      description: 'Amazon.ca purchase for $89.99. Vendor history suggests mix of business and personal purchases.',
      suggestedAction: 'Review if this is business-related or shareholder personal expense',
      confidence: 0.45,
      createdAt: '2026-02-15T11:01:00Z'
    }
  ];

  const accountantQuestions: AccountantQuestion[] = [];

  const vendorRules: VendorRule[] = [
    {
      id: 'vendor-1',
      vendorName: 'Home Depot',
      defaultCategory: 'Construction Materials',
      defaultAccountCode: '5100',
      defaultTaxCode: 'HST',
      isPersonalVendor: false,
      learnedFromCases: ['case-1'],
      createdAt: '2026-02-15T10:01:00Z',
      lastUsedAt: '2026-02-15T10:01:00Z'
    },
    {
      id: 'vendor-2',
      vendorName: 'Tim Hortons',
      defaultCategory: 'Meals and Entertainment',
      defaultAccountCode: '5400',
      defaultTaxCode: 'HST',
      isPersonalVendor: false,
      learnedFromCases: [],
      createdAt: '2026-01-10T08:00:00Z',
      lastUsedAt: '2026-02-15T09:31:00Z'
    }
  ];

  const auditEvents: AuditEvent[] = [
    {
      id: 'audit-1',
      caseId: 'case-1',
      timestamp: '2026-02-15T09:30:00Z',
      eventType: 'document-added',
      userId: 'operator-1',
      entityType: 'document',
      entityId: 'doc-1',
      action: 'uploaded document',
      after: { fileName: 'receipt-tims-jan15.pdf' }
    },
    {
      id: 'audit-2',
      caseId: 'case-1',
      timestamp: '2026-02-15T09:31:00Z',
      eventType: 'document-processed',
      userId: 'system',
      entityType: 'document',
      entityId: 'doc-1',
      action: 'processed document',
      after: { status: 'readable', vendor: 'Tim Hortons', amount: 23.75 }
    }
  ];

  return {
    firms,
    clients,
    periods,
    cases,
    documents,
    transactions,
    reviewItems,
    accountantQuestions,
    vendorRules,
    chartOfAccounts: getStandardChartOfAccounts(),
    auditEvents,
    selectedFirmId: 'firm-1',
    selectedClientId: 'client-1',
    selectedPeriodId: 'period-1',
    selectedCaseId: 'case-1',
    currentScreen: 'workspace'
  };
}

// Standard Canadian chart of accounts
function getStandardChartOfAccounts(): ChartOfAccountsItem[] {
  return [
    // Assets
    { code: '1000', name: 'Cash', type: 'asset', isActive: true },
    { code: '1100', name: 'Accounts Receivable', type: 'asset', isActive: true },
    { code: '1200', name: 'Inventory', type: 'asset', isActive: true },
    { code: '1500', name: 'Equipment', type: 'asset', isActive: true },

    // Liabilities
    { code: '2000', name: 'Accounts Payable', type: 'liability', isActive: true },
    { code: '2100', name: 'HST/GST Payable', type: 'liability', isActive: true },
    { code: '2200', name: 'Due to Shareholder', type: 'liability', isActive: true },

    // Equity
    { code: '3000', name: 'Share Capital', type: 'equity', isActive: true },
    { code: '3100', name: 'Retained Earnings', type: 'equity', isActive: true },
    { code: '3200', name: 'Due from Shareholder', type: 'equity', isActive: true },

    // Income
    { code: '4000', name: 'Service Revenue', type: 'income', isActive: true },
    { code: '4100', name: 'Sales Revenue', type: 'income', isActive: true },

    // Expenses
    { code: '5000', name: 'Cost of Goods Sold', type: 'expense', isActive: true },
    { code: '5100', name: 'Materials and Supplies', type: 'expense', isActive: true },
    { code: '5200', name: 'Subcontractors', type: 'expense', isActive: true },
    { code: '5300', name: 'Vehicle Expenses', type: 'expense', isActive: true },
    { code: '5400', name: 'Meals and Entertainment (50%)', type: 'expense', isActive: true },
    { code: '5500', name: 'Office Supplies', type: 'expense', isActive: true },
    { code: '5600', name: 'Professional Fees', type: 'expense', isActive: true },
    { code: '5700', name: 'Insurance', type: 'expense', isActive: true },
    { code: '5800', name: 'Utilities', type: 'expense', isActive: true },
    { code: '5900', name: 'Bank Charges', type: 'expense', isActive: true },
    { code: '6000', name: 'Shareholder - Personal Expenses', type: 'expense', isActive: true }
  ];
}
