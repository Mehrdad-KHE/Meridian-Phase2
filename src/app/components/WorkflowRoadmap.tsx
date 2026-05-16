import { useNavigate } from 'react-router';
import { Check, Circle, Lock, ChevronRight } from 'lucide-react';

type RoadmapStageState = 'completed' | 'current' | 'accessible' | 'locked';

interface RoadmapStage {
  id: string;
  label: string;
  route: string;
  state: RoadmapStageState;
  badge?: string | number;
  tooltip?: string;
}

interface WorkflowRoadmapProps {
  currentStage: string;
}

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
      state: currentStage === 'setup' ? 'current' :
             ['documents', 'processing', 'review', 'qa', 'export'].includes(currentStage) ? 'completed' : 'accessible',
    },
    {
      id: 'documents',
      label: 'Documents',
      route: '/documents',
      state: currentStage === 'documents' ? 'current' :
             ['processing', 'review', 'qa', 'export'].includes(currentStage) ? 'completed' :
             currentStage === 'setup' ? 'locked' : 'accessible',
      tooltip: currentStage === 'setup' ? 'Complete setup first' : undefined,
    },
    {
      id: 'processing',
      label: 'Processing',
      route: '/processing',
      state: currentStage === 'processing' ? 'current' :
             ['review', 'qa', 'export'].includes(currentStage) ? 'completed' :
             ['home', 'setup', 'documents'].includes(currentStage) ? 'locked' : 'accessible',
      tooltip: ['home', 'setup', 'documents'].includes(currentStage) ? 'Upload documents first' : undefined,
    },
    {
      id: 'review',
      label: 'Review',
      route: '/review',
      state: currentStage === 'review' ? 'current' :
             ['qa', 'export'].includes(currentStage) ? 'completed' :
             ['home', 'setup', 'documents', 'processing'].includes(currentStage) ? 'locked' : 'accessible',
      badge: currentStage === 'review' ? 6 : undefined,
      tooltip: ['home', 'setup', 'documents', 'processing'].includes(currentStage) ? 'Process documents first' : undefined,
    },
    {
      id: 'qa',
      label: 'Q&A',
      route: '/accountant-qa',
      state: currentStage === 'qa' ? 'current' :
             currentStage === 'export' ? 'completed' : 'locked',
      tooltip: currentStage !== 'qa' && currentStage !== 'export' ? 'Complete review first' : undefined,
    },
    {
      id: 'export',
      label: 'Export',
      route: '/export',
      state: currentStage === 'export' ? 'current' : 'locked',
      tooltip: currentStage !== 'export' ? 'Resolve review items first' : undefined,
    },
  ];

  const handleStageClick = (stage: RoadmapStage) => {
    if (stage.state !== 'locked') {
      navigate(stage.route);
    }
  };

  const getStageStyles = (state: RoadmapStageState) => {
    switch (state) {
      case 'completed':
        return {
          container: 'bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]',
          hover: 'hover:bg-[#10B981]/20 hover:border-[#10B981]/60',
          icon: <Check size={14} strokeWidth={2.5} className="text-[#10B981]" />,
          connector: 'text-[#10B981]/40',
          clickable: true,
        };
      case 'current':
        return {
          container: 'bg-[#3B82F6] border-[#3B82F6] text-white shadow-[0_0_0_3px_rgba(59,130,246,0.12)]',
          hover: '',
          icon: <Circle size={8} fill="white" strokeWidth={0} className="text-white" />,
          connector: 'text-[#3B82F6]/60',
          clickable: false,
        };
      case 'accessible':
        return {
          container: 'bg-[#252C37] border-[#374151] text-[#9CA3AF]',
          hover: 'hover:border-[#4B5563] hover:bg-[#252C37]',
          icon: <Circle size={8} className="text-[#6B7280]" />,
          connector: 'text-[#374151]',
          clickable: true,
        };
      case 'locked':
        return {
          container: 'bg-[#1A1F28] border-[#2D3748] text-[#4B5563]',
          hover: '',
          icon: <Lock size={12} className="text-[#4B5563]" />,
          connector: 'text-[#374151]',
          clickable: false,
        };
    }
  };

  return (
    <div className="bg-[#0F1419] border-b border-[#1F2937] overflow-x-auto">
      <div className="flex items-center justify-start gap-2 max-w-6xl mx-auto py-4 px-6 min-w-max">
        {stages.map((stage, index) => {
          const styles = getStageStyles(stage.state);
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => styles.clickable && handleStageClick(stage)}
                title={stage.tooltip}
                className={`
                  relative inline-flex items-center gap-2 rounded-full border px-4 py-2
                  ${styles.container}
                  ${styles.hover}
                  ${styles.clickable ? 'cursor-pointer' : 'cursor-default'}
                  ${stage.state === 'current' ? 'px-5 py-2.5' : ''}
                  transition-all duration-200
                  min-w-[92px]
                `}
              >
                {stage.badge && (
                  <div className="absolute -top-1 -right-1 bg-[#F59E0B] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold ring-2 ring-[#1A1F28] shadow-sm">
                    {stage.badge}
                  </div>
                )}

                <span className="flex items-center justify-center shrink-0">
                  {styles.icon}
                </span>

                <span className={`text-sm whitespace-nowrap ${stage.state === 'current' ? 'font-semibold' : 'font-medium'}`}>
                  {stage.label}
                </span>
              </button>

              {!isLast && (
                <ChevronRight size={16} className={`shrink-0 ${styles.connector}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
