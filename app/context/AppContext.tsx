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

  // Review actions
  resolveReviewItem: (reviewItemId: string, decision: DecisionSource, notes?: string) => void;
  sendToAccountant: (reviewItemIds: string[], groupTitle: string, question: string) => AccountantQuestion;
  splitDocument: (documentId: string) => void;
  attachDocumentToTransaction: (documentId: string, transactionId: string) => void;

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
    setState(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              status: 'readable',
              processedAt: new Date().toISOString(),
              extractedData: {
                vendor: 'Sample Vendor',
                date: new Date().toISOString().split('T')[0],
                amount: 100,
                taxAmount: 13,
                category: 'General Expense'
              }
            }
          : doc
      )
    }));
  }, []);

  const excludeDocument = useCallback((documentId: string, reason: string) => {
    setState(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === documentId ? { ...doc, status: 'excluded' } : doc
      )
    }));
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
    resolveReviewItem,
    sendToAccountant,
    splitDocument,
    attachDocumentToTransaction,
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
