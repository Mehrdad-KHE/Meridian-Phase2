import { useEngagement } from '../state/engagement';

export function EngagementContextBar() {
  const { state } = useEngagement();
  const engagementName = state.engagementLabel ?? 'No engagement selected';

  return (
    <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6 flex justify-center">
      <p className="text-xs text-[#9CA3AF] text-center w-full">{engagementName}</p>
    </div>
  );
}
