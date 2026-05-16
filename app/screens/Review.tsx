import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertCircle, FileText, TrendingUp } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { Layout } from '../components/Layout';

type ReviewItem = {
  id: number;
  type: string;
  count: number;
  reason: string;
  suggestion: string;
  confidence: number;
  evidence: string[];
};

export function Review() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [reviewItems] = useState<ReviewItem[]>([
    {
      id: 1,
      type: '8 fuel receipts from same vendor',
      count: 8,
      reason: 'Multiple similar receipts from Petro-Canada',
      suggestion: 'Categorize all as Vehicle Fuel Expense',
      confidence: 92,
      evidence: [
        'All receipts from Petro-Canada',
        'Transaction amounts: $45-$85',
        'Dates: Jan 2-28, 2025',
        'All include fuel product codes'
      ]
    },
    {
      id: 2,
      type: '5 possible duplicate invoices',
      count: 5,
      reason: 'Similar invoice numbers and amounts detected',
      suggestion: 'Keep only the most recent scan',
      confidence: 78,
      evidence: [
        'Invoice #1024 appears 3 times',
        'Same amount: $1,250.00',
        'Different scan quality',
        'Latest scan is clearest'
      ]
    },
    {
      id: 3,
      type: '3 documents needing accountant input',
      count: 3,
      reason: 'Unclear categorization - mixed business/personal use',
      suggestion: 'Ask accountant for guidance',
      confidence: 45,
      evidence: [
        'Home office equipment purchases',
        'Personal vehicle registration',
        'Mixed meal receipts (business + personal)'
      ]
    }
  ]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-[#10B981]';
    if (confidence >= 60) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  return (
    <Layout engagementName="Botax Accounting → Babak Mohammadhosseini → 2025 Annual">
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
        <WorkflowRoadmap currentStage="review" />

      <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6">
        <p className="text-xs text-[#9CA3AF]">Botax Accounting → Babak Mohammadhosseini → 2025 Annual</p>
      </div>

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-4 overflow-hidden">
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-1">Review</h1>
          <p className="text-xs text-[#6B7280]">
            These items need your attention. All other documents have been automatically categorized.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {reviewItems.map(item => (
            <div
              key={item.id}
              className={`bg-[#1A1F28] border rounded-lg overflow-hidden ${
                selectedItem === item.id ? 'border-[#3B82F6]' : 'border-[#252C37]'
              }`}
            >
              <div
                className="p-6 cursor-pointer hover:bg-[#252C37]/50"
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-[#F59E0B] mt-1" />
                    <div>
                      <h3 className="text-base font-medium mb-1">{item.type}</h3>
                      <p className="text-sm text-[#9CA3AF]">{item.reason}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-[#252C37] px-2 py-1 rounded">{item.count} items</span>
                </div>

                {selectedItem === item.id && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-[#252C37] rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-[#3B82F6]" />
                        <span className="text-sm font-medium">Recommendation</span>
                      </div>
                      <p className="text-sm text-[#D1D5DB] mb-2">{item.suggestion}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#9CA3AF]">Confidence:</span>
                        <span className={`text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                          {item.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#252C37] rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={16} className="text-[#3B82F6]" />
                        <span className="text-sm font-medium">Evidence</span>
                      </div>
                      <ul className="space-y-1">
                        {item.evidence.map((ev, idx) => (
                          <li key={idx} className="text-sm text-[#D1D5DB] flex items-start gap-2">
                            <span className="text-[#3B82F6]">•</span>
                            <span>{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#374151]">
                      <button className="bg-[#10B981] hover:bg-[#059669] text-white py-2 px-4 rounded text-sm font-medium">
                        Accept Recommendation
                      </button>
                      <button className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium">
                        Change Category
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/accountant-qa');
                        }}
                        className="border border-[#3B82F6] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white py-2 px-4 rounded text-sm font-medium"
                      >
                        Ask Accountant
                      </button>
                      <button className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium">
                        Exclude from Accounting
                      </button>
                      <button className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium">
                        Replace with Better Scan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-3 border-t border-[#1F2937]">
          <button
            onClick={() => navigate('/processing')}
            className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-1.5 px-4 rounded text-xs font-medium"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/export')}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-1.5 px-4 rounded text-xs font-medium"
          >
            Continue to Export
          </button>
        </div>
      </div>
      </div>
    </Layout>
  );
}
