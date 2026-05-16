import { useNavigate, useLocation } from 'react-router';

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

  // Define stages with their states based on current location
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

  const getIcon = (state: RoadmapStageState) => {
    switch (state) {
      case 'completed':
        return '✓';
      case 'current':
        return '●';
      case 'accessible':
        return '○';
      default:
        return '';
    }
  };

  const getStateClasses = (state: RoadmapStageState) => {
    switch (state) {
      case 'completed':
        return 'bg-[#10B981] border-[#10B981] text-white cursor-pointer hover:bg-[#059669]';
      case 'current':
        return 'bg-[#3B82F6] border-[#2563EB] border-[3px] text-white scale-110 shadow-[0_4px_12px_rgba(59,130,246,0.4)] z-10';
      case 'accessible':
        return 'bg-[#4B5563] border-[#4B5563] text-[#D1D5DB] cursor-pointer hover:border-[#3B82F6] hover:text-white';
      case 'locked':
        return 'bg-transparent border-[#6B7280] border-dashed text-[#6B7280] cursor-not-allowed';
    }
  };

  return (
    <div className="bg-[#1A1F28] border-b border-[#374151] py-3 px-6">
      <div className="flex items-center justify-start gap-0 overflow-x-auto">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="relative inline-flex items-center"
            style={{ marginRight: index < stages.length - 1 ? '-12px' : '0' }}
          >
            {/* Main block */}
            <div
              onClick={() => handleStageClick(stage)}
              title={stage.tooltip}
              className={`
                relative flex items-center gap-2 h-12 px-4 border-2
                ${index === 0 ? 'rounded-l-md' : 'pl-6'}
                ${getStateClasses(stage.state)}
                transition-all duration-200
              `}
              style={{ zIndex: stage.state === 'current' ? 10 : 1 }}
            >
              {/* Left notch cutout (for visual effect) */}
              {index > 0 && (
                <div
                  className="absolute left-0 w-3 h-12 -ml-[1px]"
                  style={{
                    clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                  }}
                />
              )}

              {/* Badge */}
              {stage.badge && (
                <div className="absolute -top-2 -right-2 bg-[#F59E0B] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-semibold shadow-md z-20">
                  {stage.badge}
                </div>
              )}

              {/* Icon */}
              <span className="text-sm font-medium">{getIcon(stage.state)}</span>

              {/* Label */}
              <span className={`text-sm whitespace-nowrap ${stage.state === 'current' ? 'font-semibold' : 'font-medium'}`}>
                {stage.label}
              </span>

              {/* Right arrow */}
              {index < stages.length - 1 && (
                <div
                  className="absolute -right-3 w-0 h-0"
                  style={{
                    borderTop: '24px solid transparent',
                    borderBottom: '24px solid transparent',
                    borderLeft: stage.state === 'locked'
                      ? '12px solid transparent'
                      : `12px solid ${
                          stage.state === 'completed' ? '#10B981' :
                          stage.state === 'current' ? '#3B82F6' :
                          stage.state === 'accessible' ? '#4B5563' : '#6B7280'
                        }`,
                    ...(stage.state === 'locked' && {
                      borderLeft: '12px solid #6B7280',
                      borderLeftStyle: 'dashed',
                    })
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
