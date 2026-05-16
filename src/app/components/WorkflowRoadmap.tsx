import { useNavigate, useLocation } from 'react-router';
import { Check, Circle, Lock } from 'lucide-react';

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
  const location = useLocation();

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
          container: 'bg-[#059669] border-[#10B981] text-white',
          hover: 'hover:bg-[#047857]',
          icon: <Check size={14} strokeWidth={2.5} className="text-white" />,
          connector: 'bg-[#10B981]',
          clickable: true,
        };
      case 'current':
        return {
          container: 'bg-[#3B82F6] border-[#3B82F6] text-white shadow-[0_0_16px_rgba(59,130,246,0.25)]',
          hover: '',
          icon: <Circle size={10} fill="white" strokeWidth={0} className="text-white" />,
          connector: 'bg-gradient-to-r from-[#3B82F6] to-[#374151]',
          clickable: false,
        };
      case 'accessible':
        return {
          container: 'bg-[#1F2937] border-[#374151] text-[#9CA3AF]',
          hover: 'hover:border-[#4B5563] hover:bg-[#252C37]',
          icon: <Circle size={8} className="text-[#6B7280]" />,
          connector: 'bg-[#2D3748]',
          clickable: true,
        };
      case 'locked':
        return {
          container: 'bg-[#0F1419] border-[#252C37] text-[#4B5563]',
          hover: '',
          icon: <Lock size={12} className="text-[#4B5563]" />,
          connector: 'bg-[#1F2937]',
          clickable: false,
        };
    }
  };

  return (
    <div className="bg-[#0F1419] border-b border-[#1F2937]">
      <div className="flex items-center justify-center gap-0 max-w-6xl mx-auto py-4 px-6">
        {stages.map((stage, index) => {
          const styles = getStageStyles(stage.state);
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="flex items-center">
              {/* Stage block */}
              <div
                onClick={() => styles.clickable && handleStageClick(stage)}
                title={stage.tooltip}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 border-2 rounded-md
                  ${styles.container}
                  ${styles.hover}
                  ${styles.clickable ? 'cursor-pointer' : 'cursor-default'}
                  ${stage.state === 'current' ? 'scale-105 z-10 px-5 py-3' : 'z-0'}
                  transition-all duration-200
                  min-w-[90px]
                `}
              >
                {/* Badge */}
                {stage.badge && (
                  <div className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold ring-2 ring-[#0F1419] shadow-sm">
                    {stage.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center">
                  {styles.icon}
                </div>

                {/* Label */}
                <span className={`text-xs whitespace-nowrap ${stage.state === 'current' ? 'font-semibold' : 'font-medium'}`}>
                  {stage.label}
                </span>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className={`h-[3px] w-3 ${styles.connector} transition-colors duration-200 -mx-[1px]`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
