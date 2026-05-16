import { useNavigate } from 'react-router';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F9FAFB]">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-8">MERIDIAN</h1>

        <button
          onClick={() => navigate('/setup/firm')}
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 px-6 rounded-lg font-medium mb-8"
        >
          Start New Engagement
        </button>

        <div className="border-t border-[#252C37] my-8"></div>

        <h2 className="text-lg font-medium mb-4">Recent Engagements</h2>

        <div className="space-y-4">
          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Babak Mohammadhosseini</h3>
            <p className="text-sm text-[#D1D5DB] mb-2">2025 Annual</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[#F59E0B]">Status: Review 6 items</span>
            </div>
            <button
              onClick={() => navigate('/review')}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
            >
              Continue
            </button>
          </div>

          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Acme Trucking Ltd.</h3>
            <p className="text-sm text-[#D1D5DB] mb-2">2024 Q4</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[#10B981]">Status: Ready to export</span>
            </div>
            <button
              onClick={() => navigate('/export')}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
            >
              Continue
            </button>
          </div>

          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Jones Contracting</h3>
            <p className="text-sm text-[#D1D5DB] mb-2">2025 Q1</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[#6B7280]">Status: Exported</span>
            </div>
            <button
              className="bg-transparent border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
            >
              View
            </button>
          </div>
        </div>

        <button className="mt-6 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium">
          View All
        </button>
      </div>
    </div>
  );
}
