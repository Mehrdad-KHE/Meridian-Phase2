import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, AlertCircle, FileText, TrendingUp, X } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { EngagementContextBar } from '../components/EngagementContextBar';
import { Layout } from '../components/Layout';
import { REVIEW_CATEGORY_OPTIONS, WorkflowReviewItem, useEngagement } from '../state/engagement';

type ModalState =
  | { type: 'category'; reviewItemId: string }
  | { type: 'question'; reviewItemId: string }
  | null;

export function Review() {
  const navigate = useNavigate();
  const { state, acceptRecommendation, askAccountant, changeReviewCategory, excludeFromAccounting, replaceWithBetterScan } =
    useEngagement();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [categoryChoice, setCategoryChoice] = useState(REVIEW_CATEGORY_OPTIONS[0]);
  const [questionText, setQuestionText] = useState('');
  const [questionError, setQuestionError] = useState('');

  const reviewItems = state.reviewItems;

  const selectedReviewItem = useMemo<WorkflowReviewItem | null>(
    () => reviewItems.find((item) => item.id === selectedItem) ?? reviewItems[0] ?? null,
    [reviewItems, selectedItem],
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-[#10B981]';
    if (confidence >= 60) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  const openCategoryModal = (reviewItemId: string) => {
    const item = reviewItems.find((review) => review.id === reviewItemId);
    setCategoryChoice(item?.category && REVIEW_CATEGORY_OPTIONS.includes(item.category) ? item.category : REVIEW_CATEGORY_OPTIONS[0]);
    setModal({ type: 'category', reviewItemId });
  };

  const openQuestionModal = (reviewItemId: string) => {
    setQuestionText('');
    setQuestionError('');
    setModal({ type: 'question', reviewItemId });
  };

  const confirmCategoryChange = () => {
    if (!modal || modal.type !== 'category') {
      return;
    }

    changeReviewCategory(modal.reviewItemId, categoryChoice);
    setModal(null);
  };

  const confirmQuestion = () => {
    if (!modal || modal.type !== 'question') {
      return;
    }

    if (!questionText.trim()) {
      setQuestionError('Please type a question before sending it.');
      return;
    }

    askAccountant(modal.reviewItemId, questionText.trim());
    setModal(null);
    navigate('/accountant-qa');
  };

  if (!state.engagementLabel) {
    return (
      <Layout>
        <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
          <WorkflowRoadmap currentStage="review" />
          <EngagementContextBar />

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-lg rounded-2xl border border-[#252C37] bg-[#1A1F28] p-8 text-center">
              <h1 className="text-xl font-semibold mb-3">No engagement selected</h1>
              <p className="text-sm text-[#9CA3AF] mb-6">No engagement selected — start or load one</p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB]"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (reviewItems.length === 0) {
    return (
      <Layout>
        <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
          <WorkflowRoadmap currentStage="review" />
          <EngagementContextBar />

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-lg rounded-2xl border border-[#252C37] bg-[#1A1F28] p-8 text-center">
              <h1 className="text-xl font-semibold mb-3">Nothing here yet</h1>
              <p className="text-sm text-[#9CA3AF] mb-6">Add documents or ask for a recheck to surface review items.</p>
              <button
                onClick={() => navigate('/documents')}
                className="inline-flex items-center justify-center rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB]"
              >
                Go to Documents
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
        <WorkflowRoadmap currentStage="review" />

        <EngagementContextBar />

        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-4 overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/processing')}
              className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div>
              <h1 className="text-xl font-semibold mb-1">Review</h1>
              <p className="text-xs text-[#6B7280]">
                These items need your attention. All other documents have been automatically categorized.
              </p>
            </div>
            <button
              onClick={() => navigate('/export')}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-4 rounded-lg text-sm font-medium"
            >
              Continue to Export
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {reviewItems.map((item) => {
              const isSelected = selectedReviewItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-[#1A1F28] border rounded-lg overflow-hidden ${
                    isSelected ? 'border-[#3B82F6]' : 'border-[#252C37]'
                  }`}
                >
                  <div className="p-6 cursor-pointer hover:bg-[#252C37]/50" onClick={() => setSelectedItem(isSelected ? null : item.id)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={20} className={item.status === 'resolved' ? 'text-[#10B981] mt-1' : item.status === 'asked' ? 'text-[#F59E0B] mt-1' : 'text-[#F59E0B] mt-1'} />
                        <div>
                          <h3 className="text-base font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-[#9CA3AF]">{item.reason}</p>
                          <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                            <span className="rounded-full border border-[#374151] px-2 py-0.5 text-[#9CA3AF]">Status: {item.status}</span>
                            {item.category && <span className="rounded-full border border-[#374151] px-2 py-0.5 text-[#9CA3AF]">Category: {item.category}</span>}
                            {item.decision && <span className="rounded-full border border-[#374151] px-2 py-0.5 text-[#9CA3AF]">Decision: {item.decision}</span>}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs bg-[#252C37] px-2 py-1 rounded">{item.status}</span>
                    </div>

                    {isSelected && (
                      <div className="mt-6 space-y-4">
                        <div className="bg-[#252C37] rounded p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={16} className="text-[#3B82F6]" />
                            <span className="text-sm font-medium">Recommendation</span>
                          </div>
                          <p className="text-sm text-[#D1D5DB] mb-2">{item.suggestion}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#9CA3AF]">Confidence:</span>
                            <span className={`text-xs font-medium ${getConfidenceColor(item.confidence)}`}>{item.confidence}%</span>
                          </div>
                        </div>

                        <div className="bg-[#252C37] rounded p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText size={16} className="text-[#3B82F6]" />
                            <span className="text-sm font-medium">Evidence</span>
                          </div>
                          <ul className="space-y-1">
                            {item.evidence.map((ev) => (
                              <li key={ev} className="text-sm text-[#D1D5DB] flex items-start gap-2">
                                <span className="text-[#3B82F6]">•</span>
                                <span>{ev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#374151]">
                          <button
                            onClick={() => acceptRecommendation(item.id)}
                            className="bg-[#10B981] hover:bg-[#059669] text-white py-2 px-4 rounded text-sm font-medium"
                          >
                            Accept Recommendation
                          </button>
                          <button
                            onClick={() => openCategoryModal(item.id)}
                            className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium"
                          >
                            Change Category
                          </button>
                          <button
                            onClick={() => openQuestionModal(item.id)}
                            className="border border-[#3B82F6] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white py-2 px-4 rounded text-sm font-medium"
                          >
                            Ask Accountant
                          </button>
                          <button
                            onClick={() => excludeFromAccounting(item.id)}
                            className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium"
                          >
                            Exclude from Accounting
                          </button>
                          <button
                            onClick={() => replaceWithBetterScan(item.id)}
                            className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium"
                          >
                            Replace with Better Scan
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {modal && modal.type === 'category' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-md rounded-2xl border border-[#252C37] bg-[#1A1F28] p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Change Category</h2>
                  <p className="text-sm text-[#9CA3AF] mt-1">Choose a different category and mark the item resolved.</p>
                </div>
                <button onClick={() => setModal(null)} className="text-[#9CA3AF] hover:text-[#F9FAFB]">
                  <X size={20} />
                </button>
              </div>

              <label className="block text-sm mb-2">Category</label>
              <select
                value={categoryChoice}
                onChange={(e) => setCategoryChoice(e.target.value)}
                className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
              >
                {REVIEW_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setModal(null)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCategoryChange}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {modal && modal.type === 'question' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-md rounded-2xl border border-[#252C37] bg-[#1A1F28] p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Ask Accountant</h2>
                  <p className="text-sm text-[#9CA3AF] mt-1">Send a question and track the answer on the Q&A screen.</p>
                </div>
                <button onClick={() => setModal(null)} className="text-[#9CA3AF] hover:text-[#F9FAFB]">
                  <X size={20} />
                </button>
              </div>

              <label className="block text-sm mb-2">Question</label>
              <textarea
                value={questionText}
                onChange={(e) => {
                  setQuestionText(e.target.value);
                  setQuestionError('');
                }}
                rows={5}
                className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6] resize-none"
                placeholder="Write a concise question for the accountant..."
              />
              {questionError && <p className="mt-2 text-xs text-[#FCA5A5]">{questionError}</p>}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setModal(null)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmQuestion}
                  disabled={!questionText.trim()}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#374151] disabled:text-[#9CA3AF] text-white py-2 px-6 rounded-lg text-sm font-medium"
                >
                  Send Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
