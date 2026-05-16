import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface EngagementState {
  firmName: string | null;
  clientName: string | null;
  periodLabel: string | null;
  engagementLabel: string | null;
  isDemo: boolean;
  reviewResolved: boolean;
}

type EngagementPatch = {
  firmName?: string | null;
  clientName?: string | null;
  periodLabel?: string | null;
  isDemo?: boolean;
  reviewResolved?: boolean;
};

type EngagementContextValue = {
  state: EngagementState;
  setEngagement: (patch: EngagementPatch) => void;
  clearEngagement: () => void;
  loadDemo: () => void;
};

const STORAGE_KEY = 'meridian.engagement.v1';

const emptyState: EngagementState = {
  firmName: null,
  clientName: null,
  periodLabel: null,
  engagementLabel: null,
  isDemo: false,
  reviewResolved: false,
};

const EngagementContext = createContext<EngagementContextValue | null>(null);

function deriveEngagementLabel(firmName: string | null, clientName: string | null, periodLabel: string | null) {
  if (!firmName || !clientName || !periodLabel) {
    return null;
  }

  return `${firmName} → ${clientName} → ${periodLabel}`;
}

function normalizeString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function buildState(input: EngagementPatch): EngagementState {
  const firmName = normalizeString(input.firmName ?? null);
  const clientName = normalizeString(input.clientName ?? null);
  const periodLabel = normalizeString(input.periodLabel ?? null);

  return {
    firmName,
    clientName,
    periodLabel,
    engagementLabel: deriveEngagementLabel(firmName, clientName, periodLabel),
    isDemo: Boolean(input.isDemo),
    reviewResolved: Boolean(input.reviewResolved),
  };
}

function readStoredState() {
  if (typeof window === 'undefined') {
    return emptyState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyState;
    }

    const parsed = JSON.parse(raw) as Partial<EngagementPatch>;
    return buildState({
      firmName: normalizeString(parsed.firmName ?? null),
      clientName: normalizeString(parsed.clientName ?? null),
      periodLabel: normalizeString(parsed.periodLabel ?? null),
      isDemo: Boolean(parsed.isDemo),
      reviewResolved: Boolean(parsed.reviewResolved),
    });
  } catch {
    return emptyState;
  }
}

export function EngagementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EngagementState>(() => readStoredState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage write failures in the prototype.
    }
  }, [state]);

  const setEngagement = (patch: EngagementPatch) => {
    setState((current) => {
      const nextFirm = patch.firmName !== undefined ? normalizeString(patch.firmName) : current.firmName;
      const nextClient = patch.clientName !== undefined ? normalizeString(patch.clientName) : current.clientName;
      const nextPeriod = patch.periodLabel !== undefined ? normalizeString(patch.periodLabel) : current.periodLabel;
      const nextIsDemo = patch.isDemo ?? false;
      const nextLabel = deriveEngagementLabel(nextFirm, nextClient, nextPeriod);
      const coreFieldsUpdated =
        patch.firmName !== undefined || patch.clientName !== undefined || patch.periodLabel !== undefined;
      const nextReviewResolved =
        patch.reviewResolved !== undefined
          ? patch.reviewResolved
          : coreFieldsUpdated && (
              nextFirm !== current.firmName ||
              nextClient !== current.clientName ||
              nextPeriod !== current.periodLabel
            )
            ? false
            : current.reviewResolved;

      return {
        firmName: nextFirm,
        clientName: nextClient,
        periodLabel: nextPeriod,
        engagementLabel: nextLabel,
        isDemo: nextIsDemo,
        reviewResolved: nextReviewResolved,
      };
    });
  };

  const clearEngagement = () => {
    setState(emptyState);
  };

  const loadDemo = () => {
    setState(
      buildState({
        firmName: 'Botax Accounting',
        clientName: 'Babak Mohammadhosseini',
        periodLabel: '2025 Annual',
        isDemo: true,
        reviewResolved: false,
      }),
    );
  };

  return (
    <EngagementContext.Provider value={{ state, setEngagement, clearEngagement, loadDemo }}>
      {children}
    </EngagementContext.Provider>
  );
}

export function useEngagement() {
  const context = useContext(EngagementContext);
  if (!context) {
    throw new Error('useEngagement must be used within EngagementProvider');
  }

  return context;
}
