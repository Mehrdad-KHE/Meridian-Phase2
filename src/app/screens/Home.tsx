import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, ChevronRight, FolderOpen } from 'lucide-react';
import { useEngagement } from '../state/engagement';

type EngagementStatus = 'Review' | 'Ready to export' | 'Nothing here yet';

interface EngagementCard {
  title: string;
  period: string;
  status: EngagementStatus;
  lastActivity: string;
  actionLabel: string;
  actionTarget?: string;
}

const statusStyles: Record<EngagementStatus, string> = {
  Review: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/25',
  'Ready to export': 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
  'Nothing here yet': 'bg-[#6B7280]/15 text-[#D1D5DB] border-[#6B7280]/30',
};

function countByStatus<T extends { status: string }>(items: T[], status: string) {
  return items.filter((item) => item.status === status).length;
}

export function Home() {
  const navigate = useNavigate();
  const { state, loadDemo, clearEngagement } = useEngagement();

  const cards = useMemo<EngagementCard[]>(() => {
    if (!state.engagementLabel) {
      return [
        {
          title: 'Nothing here yet',
          period: 'Load demo data or start a fresh engagement',
          status: 'Nothing here yet',
          lastActivity: 'No engagement is selected right now.',
          actionLabel: 'Load demo engagement',
        },
      ];
    }

    const docs = state.documents;
    const reviewItems = state.reviewItems;
    const openReviewCount = reviewItems.filter((item) => item.status === 'open').length;
    const askedReviewCount = reviewItems.filter((item) => item.status === 'asked').length;
    const resolvedReviewCount = reviewItems.filter((item) => item.status === 'resolved').length;
    const newDocCount = countByStatus(docs, 'new');
    const needsFixDocCount = countByStatus(docs, 'needs_fix');
    const duplicateDocCount = countByStatus(docs, 'duplicate');
    const excludedDocCount = countByStatus(docs, 'excluded');
    const readDocCount = countByStatus(docs, 'read');
    const status: EngagementStatus = state.reviewResolved ? 'Ready to export' : 'Review';

    return [
      {
        title: state.clientName ?? state.engagementLabel,
        period: state.periodLabel ?? 'No period selected',
        status,
        lastActivity: state.isDemo ? 'Last activity: Demo data loaded locally' : 'Last activity: Saved locally',
        actionLabel: state.reviewResolved ? 'Continue Export' : 'Continue Review',
        actionTarget: state.reviewResolved ? '/export' : '/review',
      },
      {
        title: 'Documents',
        period: `${docs.length} file${docs.length === 1 ? '' : 's'} · ${readDocCount} read`,
        status: docs.length > 0 ? 'Review' : 'Nothing here yet',
        lastActivity:
          docs.length > 0
            ? `Last activity: ${newDocCount} new, ${needsFixDocCount} need fix, ${duplicateDocCount} duplicates, ${excludedDocCount} excluded`
            : 'No documents have been added yet.',
        actionLabel: docs.length > 0 ? 'Open Documents' : 'Go to Documents',
        actionTarget: '/documents',
      },
      {
        title: 'Review',
        period: `${openReviewCount} open · ${askedReviewCount} asked · ${resolvedReviewCount} resolved`,
        status: state.reviewResolved ? 'Ready to export' : 'Review',
        lastActivity:
          reviewItems.length > 0
            ? `Last activity: ${resolvedReviewCount} resolved, ${openReviewCount} still open`
            : 'Nothing has reached review yet.',
        actionLabel: state.reviewResolved ? 'Continue Export' : 'Continue Review',
        actionTarget: state.reviewResolved ? '/export' : '/review',
      },
    ];
  }, [state]);

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F9FAFB]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#3B82F6]/10 blur-3xl" />
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-[#10B981]/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl border border-[#374151] bg-[#1A1F28] flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold tracking-[0.24em] text-[#3B82F6]">M</span>
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">MERIDIAN</h1>
                <p className="text-sm text-[#9CA3AF] mt-1">Local-first accounting workflow assistant</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/setup/firm')}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 px-5 rounded-xl font-medium shadow-lg shadow-blue-500/20"
            >
              <ArrowRight size={16} />
              Start New Engagement
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-4">
            <div className="space-y-4">
              {state.engagementLabel ? (
                cards.map((card) => (
                  <button
                    key={`${card.title}-${card.period}`}
                    onClick={() => card.actionTarget && navigate(card.actionTarget)}
                    className="relative overflow-hidden rounded-2xl border border-[#252C37] bg-[#1A1F28]/95 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.24)] text-left w-full"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <FolderOpen size={18} className="text-[#3B82F6]" />
                          <h2 className="text-xl font-semibold">{card.title}</h2>
                        </div>
                        <p className="text-sm text-[#D1D5DB]">{card.period}</p>
                        <p className="text-xs text-[#9CA3AF]">{card.lastActivity}</p>
                      </div>

                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[card.status]}`}
                      >
                        {card.status}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="h-2 flex-1 rounded-full bg-[#252C37] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            card.status === 'Review'
                              ? 'bg-[#F59E0B]'
                              : card.status === 'Ready to export'
                                ? 'bg-[#10B981]'
                                : 'bg-[#6B7280]'
                          }`}
                          style={{
                            width:
                              card.status === 'Review'
                                ? '56%'
                                : card.status === 'Ready to export'
                                  ? '88%'
                                  : '100%',
                          }}
                        />
                      </div>

                      <span className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#F9FAFB] py-2.5 px-4 rounded-xl text-sm font-medium">
                        {card.actionLabel}
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-[#252C37] bg-[#1A1F28]/95 p-8 shadow-[0_12px_32px_rgba(0,0,0,0.24)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FolderOpen size={18} className="text-[#3B82F6]" />
                        <h2 className="text-xl font-semibold">Nothing here yet</h2>
                      </div>
                      <p className="text-sm text-[#D1D5DB]">Load demo data or start a new engagement to see the workflow.</p>
                      <p className="text-xs text-[#9CA3AF]">The prototype stays local and honest about what is selected.</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles['Nothing here yet']}`}
                    >
                      Nothing here yet
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[#252C37] bg-[#1A1F28] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">Engagement</p>
                {state.engagementLabel ? (
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-[#D1D5DB] truncate">{state.engagementLabel}</p>
                        {state.isDemo && (
                          <span className="inline-flex items-center rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] font-medium text-[#F59E0B]">
                            demo data
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={clearEngagement} className="text-xs text-[#9CA3AF] hover:text-[#F9FAFB]">
                      Clear
                    </button>
                  </div>
                ) : (
                  <button onClick={loadDemo} className="mt-2 text-left text-sm text-[#9CA3AF] hover:text-[#F9FAFB]">
                    Load demo engagement
                  </button>
                )}
              </div>

              <div className="rounded-2xl border border-[#252C37] bg-[#1A1F28] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-2">Overview</p>
                <p className="text-sm text-[#D1D5DB] leading-6">
                  Track the workflow from setup through export with local-only prototype navigation. The app stays honest about what is
                  ready and what is still coming later.
                </p>
              </div>

              <button
                disabled
                className="w-full rounded-2xl border border-[#374151] bg-[#151A22] px-5 py-4 text-left text-[#9CA3AF] opacity-70 cursor-not-allowed"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#D1D5DB]">View All</p>
                    <p className="text-xs mt-1">Coming soon in the prototype.</p>
                  </div>
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 pb-2 text-center text-[10px] text-[#6B7280]">© 2026 Mehrdad Kheirollahi. All rights reserved.</p>
      </div>
    </div>
  );
}
