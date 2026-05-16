import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { EngagementContextBar } from '../components/EngagementContextBar';
import { Layout } from '../components/Layout';
import { useEngagement } from '../state/engagement';

export function AccountantQA() {
  const navigate = useNavigate();
  const { state, answerQuestion } = useEngagement();
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({});

  const reviewItemById = useMemo(
    () => new Map(state.reviewItems.map((item) => [item.id, item])),
    [state.reviewItems],
  );

  useEffect(() => {
    setAnswerDrafts((current) => {
      const next = { ...current };
      state.questions.forEach((question) => {
        if (next[question.id] === undefined) {
          next[question.id] = question.answer ?? '';
        }
      });
      return next;
    });
  }, [state.questions]);

  const getStatusIcon = (answered: boolean) => {
    if (answered) return <CheckCircle size={16} className="text-[#10B981]" />;
    return <Clock size={16} className="text-[#F59E0B]" />;
  };

  const getStatusColor = (answered: boolean) =>
    answered ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' : 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20';

  if (!state.engagementLabel) {
    return (
      <Layout>
        <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
          <WorkflowRoadmap currentStage="qa" />
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

  if (state.questions.length === 0) {
    return (
      <Layout>
        <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
          <WorkflowRoadmap currentStage="qa" />
          <EngagementContextBar />

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-lg rounded-2xl border border-[#252C37] bg-[#1A1F28] p-8 text-center">
              <MessageSquare size={32} className="mx-auto mb-3 text-[#9CA3AF]" />
              <h1 className="text-xl font-semibold mb-3">Nothing here yet</h1>
              <p className="text-sm text-[#9CA3AF] mb-6">Ask a question from Review and it will appear here.</p>
              <button
                onClick={() => navigate('/review')}
                className="inline-flex items-center justify-center rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB]"
              >
                Go to Review
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
        <WorkflowRoadmap currentStage="qa" />

        <EngagementContextBar />

        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-4 overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/review')}
              className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
            >
              Back to Review
            </button>
            <div>
              <h1 className="text-xl font-semibold mb-1">Accountant Q&A</h1>
              <p className="text-xs text-[#6B7280]">Questions sent to your accountant for evidence and guidance.</p>
            </div>
            <div className="w-[132px]" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {state.questions.map((question) => {
              const reviewItem = reviewItemById.get(question.reviewItemId);
              const isAnswered = Boolean(question.answer);
              const draft = answerDrafts[question.id] ?? question.answer ?? '';

              return (
                <div key={question.id} className="bg-[#1A1F28] border border-[#252C37] rounded p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(isAnswered)}
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${getStatusColor(isAnswered)}`}>
                          {isAnswered ? 'Answered' : 'Awaiting Answer'}
                        </span>
                        <span className="text-[10px] text-[#6B7280]">{reviewItem?.status === 'asked' ? 'Linked to review item' : 'Review item open'}</span>
                      </div>
                      <h3 className="text-sm font-medium mb-2">{question.text}</h3>
                      {reviewItem && (
                        <p className="text-xs text-[#9CA3AF]">
                          Linked item: <span className="text-[#D1D5DB]">{reviewItem.title}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {reviewItem?.evidence?.length ? (
                    <div className="bg-[#252C37] rounded p-3 mb-3">
                      <p className="text-[10px] text-[#6B7280] mb-1.5">Linked Evidence:</p>
                      <ul className="space-y-1">
                        {reviewItem.evidence.map((entry) => (
                          <li key={entry} className="text-xs text-[#D1D5DB] flex items-center gap-2">
                            <span className="text-[#3B82F6]">•</span>
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="bg-[#252C37] rounded p-3 mb-3">
                    <p className="text-[10px] text-[#6B7280] mb-1.5">Answer:</p>
                    <textarea
                      value={draft}
                      onChange={(e) =>
                        setAnswerDrafts((current) => ({
                          ...current,
                          [question.id]: e.target.value,
                        }))
                      }
                      rows={4}
                      placeholder="Type the accountant's answer here..."
                      className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-xs text-[#D1D5DB] focus:outline-none focus:border-[#3B82F6] resize-none"
                    />
                  </div>

                  {question.answer && (
                    <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded p-3 mb-3">
                      <p className="text-[10px] text-[#10B981] font-medium mb-1.5">Saved answer:</p>
                      <p className="text-xs text-[#D1D5DB]">{question.answer}</p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => answerQuestion(question.id, draft.trim())}
                      disabled={!draft.trim()}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#374151] disabled:text-[#9CA3AF] text-white py-1.5 px-3 rounded text-xs font-medium"
                    >
                      Save Answer
                    </button>
                    {isAnswered && (
                      <button
                        onClick={() => navigate('/review')}
                        className="border border-[#374151] text-[#D1D5DB] hover:bg-[#374151] py-1.5 px-3 rounded text-xs font-medium"
                      >
                        Return to Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
