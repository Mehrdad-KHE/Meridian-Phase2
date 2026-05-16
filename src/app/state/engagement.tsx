import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from 'react';

export type DocumentStatus = 'new' | 'read' | 'needs_fix' | 'duplicate' | 'excluded';
export type ReviewStatus = 'open' | 'resolved' | 'asked';

export interface WorkflowDocument {
  id: string;
  name: string;
  status: DocumentStatus;
  relatedReviewItemIds: string[];
}

export interface WorkflowReviewItem {
  id: string;
  title: string;
  reason: string;
  suggestion: string;
  confidence: number;
  evidence: string[];
  status: ReviewStatus;
  decision: string | null;
  category: string | null;
  relatedDocumentIds: string[];
  questionId: string | null;
}

export interface WorkflowQuestion {
  id: string;
  reviewItemId: string;
  text: string;
  answer: string | null;
}

export interface EngagementState {
  firmName: string | null;
  clientName: string | null;
  periodLabel: string | null;
  engagementLabel: string | null;
  isDemo: boolean;
  documents: WorkflowDocument[];
  reviewItems: WorkflowReviewItem[];
  questions: WorkflowQuestion[];
  reviewResolved: boolean;
}

type StoredEngagementState = Omit<EngagementState, 'engagementLabel' | 'reviewResolved'>;

type EngagementPatch = {
  firmName?: string | null;
  clientName?: string | null;
  periodLabel?: string | null;
  isDemo?: boolean;
};

type EngagementContextValue = {
  state: EngagementState;
  setEngagement: (patch: EngagementPatch) => void;
  clearEngagement: () => void;
  loadDemo: () => void;
  addDocument: (name?: string) => void;
  updateDocumentStatus: (documentId: string, status: DocumentStatus) => void;
  acceptRecommendation: (reviewItemId: string) => void;
  changeReviewCategory: (reviewItemId: string, category: string) => void;
  excludeFromAccounting: (reviewItemId: string) => void;
  replaceWithBetterScan: (reviewItemId: string) => void;
  askAccountant: (reviewItemId: string, text: string) => void;
  answerQuestion: (questionId: string, answer: string) => void;
};

type ReviewItemPatch = Partial<Pick<WorkflowReviewItem, 'status' | 'decision' | 'category' | 'questionId'>>;

const STORAGE_KEY = 'meridian.engagement.v1';

const emptyStoredState: StoredEngagementState = {
  firmName: null,
  clientName: null,
  periodLabel: null,
  isDemo: false,
  documents: [],
  reviewItems: [],
  questions: [],
};

const REVIEW_CATEGORY_OPTIONS = ['Vehicle Fuel', 'Office Supplies', 'Meals', 'Equipment', 'Other'];

const EngagementContext = createContext<EngagementContextValue | null>(null);

function normalizeText(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
}

function makeId(prefix: string) {
  const suffix = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now().toString(36);
  return `${prefix}-${stamp}-${suffix}`;
}

function deriveEngagementLabel(firmName: string | null, clientName: string | null, periodLabel: string | null) {
  if (!firmName || !clientName || !periodLabel) {
    return null;
  }

  return `${firmName} → ${clientName} → ${periodLabel}`;
}

function deriveReviewResolved(reviewItems: WorkflowReviewItem[]) {
  return reviewItems.length > 0 && reviewItems.every((item) => item.status === 'resolved');
}

function buildState(stored: StoredEngagementState): EngagementState {
  const firmName = normalizeText(stored.firmName);
  const clientName = normalizeText(stored.clientName);
  const periodLabel = normalizeText(stored.periodLabel);

  return {
    firmName,
    clientName,
    periodLabel,
    engagementLabel: deriveEngagementLabel(firmName, clientName, periodLabel),
    isDemo: Boolean(stored.isDemo),
    documents: stored.documents,
    reviewItems: stored.reviewItems,
    questions: stored.questions,
    reviewResolved: deriveReviewResolved(stored.reviewItems),
  };
}

function toStoredState(state: EngagementState): StoredEngagementState {
  return {
    firmName: state.firmName,
    clientName: state.clientName,
    periodLabel: state.periodLabel,
    isDemo: state.isDemo,
    documents: state.documents,
    reviewItems: state.reviewItems,
    questions: state.questions,
  };
}

function clampConfidence(value: unknown) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeDocuments(input: unknown): WorkflowDocument[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const raw = item as Partial<WorkflowDocument>;
      const id = normalizeText(raw.id);
      const name = normalizeText(raw.name);
      const status = raw.status;

      if (!id || !name) {
        return null;
      }

      if (status !== 'new' && status !== 'read' && status !== 'needs_fix' && status !== 'duplicate' && status !== 'excluded') {
        return null;
      }

      return {
        id,
        name,
        status,
        relatedReviewItemIds: Array.isArray(raw.relatedReviewItemIds)
          ? raw.relatedReviewItemIds.map((value) => normalizeText(value)).filter((value): value is string => Boolean(value))
          : [],
      };
    })
    .filter((item): item is WorkflowDocument => Boolean(item));
}

function normalizeReviewItems(input: unknown): WorkflowReviewItem[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const raw = item as Partial<WorkflowReviewItem>;
      const id = normalizeText(raw.id);
      const title = normalizeText(raw.title);
      const reason = normalizeText(raw.reason);
      const suggestion = normalizeText(raw.suggestion);
      const confidence = clampConfidence(raw.confidence);
      const status = raw.status;

      if (!id || !title || !reason || !suggestion) {
        return null;
      }

      if (status !== 'open' && status !== 'resolved' && status !== 'asked') {
        return null;
      }

      return {
        id,
        title,
        reason,
        suggestion,
        confidence,
        evidence: Array.isArray(raw.evidence)
          ? raw.evidence.map((value) => normalizeText(value)).filter((value): value is string => Boolean(value))
          : [],
        status,
        decision: normalizeText(raw.decision),
        category: normalizeText(raw.category),
        relatedDocumentIds: Array.isArray(raw.relatedDocumentIds)
          ? raw.relatedDocumentIds.map((value) => normalizeText(value)).filter((value): value is string => Boolean(value))
          : [],
        questionId: normalizeText(raw.questionId),
      };
    })
    .filter((item): item is WorkflowReviewItem => Boolean(item));
}

function normalizeQuestions(input: unknown): WorkflowQuestion[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const raw = item as Partial<WorkflowQuestion>;
      const id = normalizeText(raw.id);
      const reviewItemId = normalizeText(raw.reviewItemId);
      const text = normalizeText(raw.text);

      if (!id || !reviewItemId || !text) {
        return null;
      }

      return {
        id,
        reviewItemId,
        text,
        answer: normalizeText(raw.answer),
      };
    })
    .filter((item): item is WorkflowQuestion => Boolean(item));
}

function buildEmptyStoredState(): StoredEngagementState {
  return {
    ...emptyStoredState,
    documents: [],
    reviewItems: [],
    questions: [],
  };
}

function buildDemoStoredState(): StoredEngagementState {
  const documents: WorkflowDocument[] = [
    { id: 'doc-fuel-1', name: 'receipt-2025-01-15.pdf', status: 'read', relatedReviewItemIds: ['review-fuel'] },
    { id: 'doc-fuel-2', name: 'fuel-receipt-scan.jpg', status: 'needs_fix', relatedReviewItemIds: ['review-fuel'] },
    { id: 'doc-invoice-1', name: 'invoice-acme-jan.pdf', status: 'read', relatedReviewItemIds: ['review-duplicate'] },
    { id: 'doc-invoice-dup', name: 'receipt-duplicate.pdf', status: 'duplicate', relatedReviewItemIds: ['review-duplicate'] },
    { id: 'doc-meals-1', name: 'monthly-expense.pdf', status: 'read', relatedReviewItemIds: ['review-meals'] },
    { id: 'doc-meals-2', name: 'restaurant-receipt.pdf', status: 'read', relatedReviewItemIds: ['review-meals'] },
  ];

  const reviewItems: WorkflowReviewItem[] = [
    {
      id: 'review-fuel',
      title: 'Fuel receipts from the same vendor',
      reason: 'Repeated Petro-Canada receipts point to a consistent vehicle expense pattern.',
      suggestion: 'Vehicle Fuel',
      confidence: 92,
      evidence: ['All receipts come from Petro-Canada', 'Amounts cluster around fuel purchases', 'Dates cover the same billing cycle'],
      status: 'open',
      decision: null,
      category: null,
      relatedDocumentIds: ['doc-fuel-1', 'doc-fuel-2'],
      questionId: null,
    },
    {
      id: 'review-duplicate',
      title: 'Possible duplicate invoices',
      reason: 'Matching invoice numbers and amounts suggest duplicate scans.',
      suggestion: 'Office Supplies',
      confidence: 78,
      evidence: ['Invoice #1024 appears twice', 'The amounts match exactly', 'One scan is clearer than the other'],
      status: 'open',
      decision: null,
      category: null,
      relatedDocumentIds: ['doc-invoice-1', 'doc-invoice-dup'],
      questionId: null,
    },
    {
      id: 'review-meals',
      title: 'Meals with mixed business purpose',
      reason: 'Several meal receipts lack attendee notes or clear business context.',
      suggestion: 'Meals',
      confidence: 54,
      evidence: ['Client meeting notes are inconsistent', 'Attendee names are missing on some receipts', 'A better scan may clarify the receipt details'],
      status: 'open',
      decision: null,
      category: null,
      relatedDocumentIds: ['doc-meals-1', 'doc-meals-2'],
      questionId: null,
    },
  ];

  return {
    firmName: 'Northpeak Accounting',
    clientName: 'Daniel Roberts',
    periodLabel: '2025 Annual',
    isDemo: true,
    documents,
    reviewItems,
    questions: [],
  };
}

function readStoredState(): EngagementState {
  if (typeof window === 'undefined') {
    return buildState(buildEmptyStoredState());
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      if (import.meta.env.VITE_DEMO_SEED === 'true') {
        return buildState(buildDemoStoredState());
      }

      return buildState(buildEmptyStoredState());
    }

    const parsed = JSON.parse(raw) as Partial<StoredEngagementState>;
    const stored: StoredEngagementState = {
      firmName: normalizeText(parsed.firmName ?? null),
      clientName: normalizeText(parsed.clientName ?? null),
      periodLabel: normalizeText(parsed.periodLabel ?? null),
      isDemo: Boolean(parsed.isDemo),
      documents: normalizeDocuments(parsed.documents),
      reviewItems: normalizeReviewItems(parsed.reviewItems),
      questions: normalizeQuestions(parsed.questions),
    };

    return buildState(stored);
  } catch {
    return buildState(buildEmptyStoredState());
  }
}

function rebuildState(current: EngagementState, updates: Partial<StoredEngagementState>): EngagementState {
  const nextStored: StoredEngagementState = {
    firmName: updates.firmName !== undefined ? normalizeText(updates.firmName) : current.firmName,
    clientName: updates.clientName !== undefined ? normalizeText(updates.clientName) : current.clientName,
    periodLabel: updates.periodLabel !== undefined ? normalizeText(updates.periodLabel) : current.periodLabel,
    isDemo: updates.isDemo !== undefined ? updates.isDemo : current.isDemo,
    documents: updates.documents !== undefined ? updates.documents : current.documents,
    reviewItems: updates.reviewItems !== undefined ? updates.reviewItems : current.reviewItems,
    questions: updates.questions !== undefined ? updates.questions : current.questions,
  };

  return buildState(nextStored);
}

function openRelatedReviewItems(reviewItems: WorkflowReviewItem[], relatedDocumentIds: string[]) {
  if (!relatedDocumentIds.length) {
    return reviewItems;
  }

  return reviewItems.map((item) => {
    const shouldOpen = item.relatedDocumentIds.some((documentId) => relatedDocumentIds.includes(documentId));
    if (!shouldOpen) {
      return item;
    }

    return {
      ...item,
      status: 'open',
    };
  });
}

function updateReviewItem(reviewItems: WorkflowReviewItem[], reviewItemId: string, patch: ReviewItemPatch) {
  return reviewItems.map((item) => (item.id === reviewItemId ? { ...item, ...patch } : item));
}

function updateDocumentList(
  documents: WorkflowDocument[],
  documentId: string,
  status: DocumentStatus,
  relatedReviewItemIds: string[],
) {
  return documents.map((document) =>
    document.id === documentId
      ? {
          ...document,
          status,
          relatedReviewItemIds,
        }
      : document,
  );
}

function appendQuestionAnswerEvidence(reviewItems: WorkflowReviewItem[], reviewItemId: string, answer: string) {
  return reviewItems.map((item) => {
    if (item.id !== reviewItemId) {
      return item;
    }

    const evidence = item.evidence.includes(`Accountant answer: ${answer}`)
      ? item.evidence
      : [...item.evidence, `Accountant answer: ${answer}`];

    return {
      ...item,
      evidence,
      status: 'open',
    };
  });
}

function reduceState(state: EngagementState, action: { type: string; [key: string]: unknown }): EngagementState {
  switch (action.type) {
    case 'set-engagement': {
      const patch = action.patch as EngagementPatch;
      const nextFirm = patch.firmName !== undefined ? normalizeText(patch.firmName) : state.firmName;
      const nextClient = patch.clientName !== undefined ? normalizeText(patch.clientName) : state.clientName;
      const nextPeriod = patch.periodLabel !== undefined ? normalizeText(patch.periodLabel) : state.periodLabel;
      const coreChanged =
        nextFirm !== state.firmName || nextClient !== state.clientName || nextPeriod !== state.periodLabel;

      if (coreChanged) {
        return buildState({
          firmName: nextFirm,
          clientName: nextClient,
          periodLabel: nextPeriod,
          isDemo: patch.isDemo ?? false,
          documents: [],
          reviewItems: [],
          questions: [],
        });
      }

      return rebuildState(state, {
        firmName: nextFirm,
        clientName: nextClient,
        periodLabel: nextPeriod,
        isDemo: patch.isDemo !== undefined ? patch.isDemo : state.isDemo,
      });
    }

    case 'clear-engagement':
      return buildState(buildEmptyStoredState());

    case 'load-demo':
      return buildState(buildDemoStoredState());

    case 'add-document': {
      const name = normalizeText(action.name) ?? `new-document-${state.documents.length + 1}.pdf`;
      const relatedReviewItemIds = state.reviewItems.length > 0 ? [state.reviewItems[0].id] : [];
      const nextDocuments = [
        ...state.documents,
        {
          id: makeId('doc'),
          name,
          status: 'new',
          relatedReviewItemIds,
        } satisfies WorkflowDocument,
      ];
      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: nextDocuments,
        reviewItems: openRelatedReviewItems(state.reviewItems, relatedReviewItemIds),
        questions: state.questions,
      });
    }

    case 'update-document-status': {
      const documentId = normalizeText(action.documentId);
      const status = action.status as DocumentStatus | undefined;
      if (!documentId || !status) {
        return state;
      }

      const currentDocument = state.documents.find((document) => document.id === documentId);
      if (!currentDocument || currentDocument.status === status) {
        return state;
      }

      const nextDocuments = updateDocumentList(state.documents, documentId, status, currentDocument.relatedReviewItemIds);
      const nextReviewItems = openRelatedReviewItems(state.reviewItems, currentDocument.relatedReviewItemIds);

      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: nextDocuments,
        reviewItems: nextReviewItems,
        questions: state.questions,
      });
    }

    case 'accept-recommendation': {
      const reviewItemId = normalizeText(action.reviewItemId);
      if (!reviewItemId) {
        return state;
      }

      const item = state.reviewItems.find((review) => review.id === reviewItemId);
      if (!item) {
        return state;
      }

      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: state.documents,
        reviewItems: updateReviewItem(state.reviewItems, reviewItemId, {
          status: 'resolved',
          decision: 'Accepted recommendation',
          category: item.suggestion,
        }),
        questions: state.questions,
      });
    }

    case 'change-review-category': {
      const reviewItemId = normalizeText(action.reviewItemId);
      const category = normalizeText(action.category);
      if (!reviewItemId || !category) {
        return state;
      }

      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: state.documents,
        reviewItems: updateReviewItem(state.reviewItems, reviewItemId, {
          status: 'resolved',
          decision: `Changed category to ${category}`,
          category,
        }),
        questions: state.questions,
      });
    }

    case 'exclude-from-accounting': {
      const reviewItemId = normalizeText(action.reviewItemId);
      if (!reviewItemId) {
        return state;
      }

      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: state.documents,
        reviewItems: updateReviewItem(state.reviewItems, reviewItemId, {
          status: 'resolved',
          decision: 'Excluded from accounting',
          category: 'Excluded',
        }),
        questions: state.questions,
      });
    }

    case 'replace-with-better-scan': {
      const reviewItemId = normalizeText(action.reviewItemId);
      if (!reviewItemId) {
        return state;
      }

      const item = state.reviewItems.find((review) => review.id === reviewItemId);
      if (!item) {
        return state;
      }

      const nextDocuments = state.documents.map((document) =>
        item.relatedDocumentIds.includes(document.id) ? { ...document, status: 'needs_fix' as const } : document,
      );

      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: nextDocuments,
        reviewItems: updateReviewItem(state.reviewItems, reviewItemId, {
          status: 'open',
          decision: 'Replace with better scan',
        }),
        questions: state.questions,
      });
    }

    case 'ask-accountant': {
      const reviewItemId = normalizeText(action.reviewItemId);
      const text = normalizeText(action.text);
      if (!reviewItemId || !text) {
        return state;
      }

      const questionId = makeId('question');
      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: state.documents,
        reviewItems: updateReviewItem(state.reviewItems, reviewItemId, {
          status: 'asked',
          decision: 'Asked accountant',
          questionId,
        }),
        questions: [
          ...state.questions,
          {
            id: questionId,
            reviewItemId,
            text,
            answer: null,
          },
        ],
      });
    }

    case 'answer-question': {
      const questionId = normalizeText(action.questionId);
      const answer = normalizeText(action.answer);
      if (!questionId || !answer) {
        return state;
      }

      const question = state.questions.find((item) => item.id === questionId);
      if (!question) {
        return state;
      }

      const nextQuestions = state.questions.map((item) => (item.id === questionId ? { ...item, answer } : item));

      return buildState({
        firmName: state.firmName,
        clientName: state.clientName,
        periodLabel: state.periodLabel,
        isDemo: state.isDemo,
        documents: state.documents,
        reviewItems: appendQuestionAnswerEvidence(state.reviewItems, question.reviewItemId, answer),
        questions: nextQuestions,
      });
    }

    default:
      return state;
  }
}

export function EngagementProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduceState, undefined, readStoredState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStoredState(state)));
    } catch {
      // Ignore storage write failures in the prototype.
    }
  }, [state]);

  const value = useMemo<EngagementContextValue>(
    () => ({
      state,
      setEngagement: (patch) => dispatch({ type: 'set-engagement', patch }),
      clearEngagement: () => dispatch({ type: 'clear-engagement' }),
      loadDemo: () => dispatch({ type: 'load-demo' }),
      addDocument: (name) => dispatch({ type: 'add-document', name }),
      updateDocumentStatus: (documentId, status) => dispatch({ type: 'update-document-status', documentId, status }),
      acceptRecommendation: (reviewItemId) => dispatch({ type: 'accept-recommendation', reviewItemId }),
      changeReviewCategory: (reviewItemId, category) =>
        dispatch({ type: 'change-review-category', reviewItemId, category }),
      excludeFromAccounting: (reviewItemId) => dispatch({ type: 'exclude-from-accounting', reviewItemId }),
      replaceWithBetterScan: (reviewItemId) => dispatch({ type: 'replace-with-better-scan', reviewItemId }),
      askAccountant: (reviewItemId, text) => dispatch({ type: 'ask-accountant', reviewItemId, text }),
      answerQuestion: (questionId, answer) => dispatch({ type: 'answer-question', questionId, answer }),
    }),
    [state],
  );

  return <EngagementContext.Provider value={value}>{children}</EngagementContext.Provider>;
}

export function useEngagement() {
  const context = useContext(EngagementContext);
  if (!context) {
    throw new Error('useEngagement must be used within EngagementProvider');
  }

  return context;
}

export { REVIEW_CATEGORY_OPTIONS };
