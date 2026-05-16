import { useNavigate } from 'react-router';
import {
  Check,
  ClipboardList,
  Download,
  FileText,
  Home,
  MessageSquare,
  RotateCcw,
  Settings2,
} from 'lucide-react';

type RoadmapStageState = 'completed' | 'current' | 'accessible';

interface RoadmapStage {
  id: string;
  label: string;
  route: string;
  state: RoadmapStageState;
  badge?: string | number;
}

interface WorkflowRoadmapProps {
  currentStage: string;
}

const stageShape = 'polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)';

export function WorkflowRoadmap({ currentStage }: WorkflowRoadmapProps) {
  const navigate = useNavigate();

  const stages: RoadmapStage[] = [
    {
      id: 'home',
      label: 'Home',
      route: '/',
      state: currentStage === 'home' ? 'current' : 'completed',
    },
    {
      id: 'setup',
      label: 'Setup',
      route: '/setup/firm',
      state:
        currentStage === 'setup'
          ? 'current'
          : ['documents', 'processing', 'review', 'qa', 'export'].includes(currentStage)
            ? 'completed'
            : 'accessible',
    },
    {
      id: 'documents',
      label: 'Documents',
      route: '/documents',
      state:
        currentStage === 'documents'
          ? 'current'
          : ['processing', 'review', 'qa', 'export'].includes(currentStage)
            ? 'completed'
            : 'accessible',
    },
    {
      id: 'processing',
      label: 'Processing',
      route: '/processing',
      state:
        currentStage === 'processing'
          ? 'current'
          : ['review', 'qa', 'export'].includes(currentStage)
            ? 'completed'
            : 'accessible',
    },
    {
      id: 'review',
      label: 'Review',
      route: '/review',
      state:
        currentStage === 'review'
          ? 'current'
          : ['qa', 'export'].includes(currentStage)
            ? 'completed'
            : 'accessible',
      badge: currentStage === 'review' ? 6 : undefined,
    },
    {
      id: 'qa',
      label: 'Q&A',
      route: '/accountant-qa',
      state: currentStage === 'qa' ? 'current' : currentStage === 'export' ? 'completed' : 'accessible',
    },
    {
      id: 'export',
      label: 'Export',
      route: '/export',
      state: currentStage === 'export' ? 'current' : 'accessible',
    },
  ];

  const handleStageClick = (stage: RoadmapStage) => {
    navigate(stage.route);
  };

  const getStageStyles = (state: RoadmapStageState) => {
    switch (state) {
      case 'completed':
        return {
          wrapper:
            'bg-gradient-to-b from-[#1D5A37] to-[#123B27] border-[#2EA44F] text-white shadow-[0_0_0_1px_rgba(46,164,79,0.35)]',
          hover: 'hover:from-[#216442] hover:to-[#154330]',
          icon: <Check size={15} strokeWidth={2.5} className="text-[#A7F3D0]" />,
          subtitle: 'Complete',
          glow: false,
        };
      case 'current':
        return {
          wrapper:
            'bg-gradient-to-b from-[#2F5FD6] to-[#1E3FA4] border-[#2563EB] text-white shadow-[0_10px_28px_rgba(59,130,246,0.38)] scale-[1.03]',
          hover: '',
          icon: (
            <div className="h-5 w-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[11px] font-bold">
              •
            </div>
          ),
          subtitle: 'In Progress',
          glow: true,
        };
      case 'accessible':
        return {
          wrapper: 'bg-[#293241] border-[#4B5563] text-[#E5E7EB]',
          hover: 'hover:border-[#3B82F6] hover:text-white hover:bg-[#2F3A4B]',
          icon: (
            <div className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-[11px] font-bold">
              ○
            </div>
          ),
          subtitle: 'Can proceed',
          glow: false,
        };
    }
  };

  const stageIcon = (stageId: string) => {
    switch (stageId) {
      case 'home':
        return <Home size={18} />;
      case 'setup':
        return <Settings2 size={18} />;
      case 'documents':
        return <FileText size={18} />;
      case 'processing':
        return <RotateCcw size={18} />;
      case 'review':
        return <ClipboardList size={18} />;
      case 'qa':
        return <MessageSquare size={18} />;
      case 'export':
        return <Download size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
    <div className="bg-[#0F1419] border-b border-[#1F2937] overflow-x-auto">
      <div className="flex items-center gap-0 max-w-6xl mx-auto py-4 px-6 min-w-max">
        {stages.map((stage, index) => {
          const styles = getStageStyles(stage.state);
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className={`relative ${index === 0 ? '' : '-ml-[14px]'}`}>
              <button
                type="button"
                onClick={() => handleStageClick(stage)}
                className={`
                  relative w-[188px] text-left border px-6 py-3.5 transition-all duration-200
                  ${styles.wrapper}
                  ${styles.hover}
                  cursor-pointer
                  ${stage.state === 'current' ? 'z-20' : 'z-10'}
                  ${styles.glow ? 'ring-2 ring-blue-400/25' : ''}
                `}
                style={{
                  clipPath: stageShape,
                  WebkitClipPath: stageShape,
                }}
              >
                {stage.badge && (
                  <div className="absolute right-3 top-3 bg-[#F59E0B] text-white rounded-full w-6 h-6 flex items-center justify-center text-[11px] font-bold shadow-sm">
                    {stage.badge}
                  </div>
                )}

                <div className="flex items-start gap-3 pr-8">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/10">
                    {stageIcon(stage.id)}
                  </div>

                  <div className="min-w-0">
                    <div className={`text-sm ${stage.state === 'current' ? 'font-semibold' : 'font-medium'}`}>{stage.label}</div>
                    <div className={`text-xs ${stage.state === 'current' ? 'text-white/70' : 'text-white/70'}`}>{styles.subtitle}</div>
                  </div>
                </div>

                {stage.state === 'completed' && (
                  <div className="absolute right-3 bottom-3 text-[#34D399]">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>

              {!isLast && (
                <div
                  className="pointer-events-none absolute top-0 right-[-1px] h-full w-[20px]"
                  aria-hidden="true"
                  style={{
                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                    background:
                      stage.state === 'completed'
                        ? 'rgba(16, 185, 129, 0.38)'
                        : stage.state === 'current'
                          ? 'rgba(59, 130, 246, 0.6)'
                          : 'rgba(75, 85, 99, 0.9)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
