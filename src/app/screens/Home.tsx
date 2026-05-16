import { useNavigate } from 'react-router';
import { ArrowRight, ChevronRight, FolderOpen } from 'lucide-react';
import { useEngagement } from '../state/engagement';

type EngagementStatus = 'Review' | 'Ready to export' | 'Exported';

interface EngagementCard {
  client: string;
  period: string;
  status: EngagementStatus;
  lastActivity: string;
  actionLabel: string;
  actionTarget?: string;
}

const engagements: EngagementCard[] = [
  {
    client: 'Daniel Roberts',
    period: '2025 Annual',
    status: 'Review',
    lastActivity: 'Last activity: 12 minutes ago',
    actionLabel: 'Continue Review',
    actionTarget: '/review',
  },
  {
    client: 'Acme Trucking Ltd.',
    period: '2024 Q4',
    status: 'Ready to export',
    lastActivity: 'Last activity: Yesterday',
    actionLabel: 'Continue Export',
    actionTarget: '/export',
  },
  {
    client: 'Jones Contracting',
    period: '2025 Q1',
    status: 'Exported',
    lastActivity: 'Last activity: Archived on May 8',
    actionLabel: 'View',
    actionTarget: '/export',
  },
];

const statusStyles: Record<EngagementStatus, string> = {
  Review: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/25',
  'Ready to export': 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
  Exported: 'bg-[#6B7280]/15 text-[#D1D5DB] border-[#6B7280]/30',
};

export function Home() {
  const navigate = useNavigate();
  const { state, loadDemo, clearEngagement } = useEngagement();

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
              {engagements.map((engagement) => (
                <div
                  key={`${engagement.client}-${engagement.period}`}
                  className="relative overflow-hidden rounded-2xl border border-[#252C37] bg-[#1A1F28]/95 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.24)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FolderOpen size={18} className="text-[#3B82F6]" />
                        <h2 className="text-xl font-semibold">{engagement.client}</h2>
                      </div>
                      <p className="text-sm text-[#D1D5DB]">{engagement.period}</p>
                      <p className="text-xs text-[#9CA3AF]">{engagement.lastActivity}</p>
                    </div>

                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[engagement.status]}`}>
                      {engagement.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="h-2 flex-1 rounded-full bg-[#252C37] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          engagement.status === 'Review'
                            ? 'bg-[#F59E0B]'
                            : engagement.status === 'Ready to export'
                              ? 'bg-[#10B981]'
                              : 'bg-[#6B7280]'
                        }`}
                        style={{ width: engagement.status === 'Review' ? '56%' : engagement.status === 'Ready to export' ? '88%' : '100%' }}
                      />
                    </div>

                    <button
                      onClick={() => navigate(engagement.actionTarget ?? '/')}
                      className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#F9FAFB] py-2.5 px-4 rounded-xl text-sm font-medium"
                    >
                      {engagement.actionLabel}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
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
