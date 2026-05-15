import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

export function AccountantQAScreen() {
  const { state, answerQuestion } = useApp();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('');

  if (!state.selectedCaseId) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-400">Select a case from the workspace first</p>
      </div>
    );
  }

  const questions = state.accountantQuestions.filter(q => q.caseId === state.selectedCaseId);
  const unanswered = questions.filter(q => !q.answeredAt);
  const answered = questions.filter(q => q.answeredAt);

  const selectedQuestion = selectedQuestionId
    ? questions.find(q => q.id === selectedQuestionId)
    : unanswered[0];

  const handleAnswer = () => {
    if (!selectedQuestion || !answer.trim()) return;
    answerQuestion(selectedQuestion.id, answer, notes || undefined);
    setAnswer('');
    setNotes('');
    setSelectedQuestionId(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-2xl text-white">{unanswered.length}</div>
                <div className="text-sm text-slate-400">Awaiting Answer</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-2xl text-white">{answered.length}</div>
                <div className="text-sm text-slate-400">Answered</div>
              </div>
            </div>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">
              No questions for the accountant yet. Review items can be sent here for professional judgment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Unanswered Questions */}
            {unanswered.length > 0 && (
              <div>
                <h3 className="text-lg text-white mb-3">Awaiting Your Answer</h3>
                <div className="space-y-3">
                  {unanswered.map(question => (
                    <div
                      key={question.id}
                      className="bg-slate-900 border border-yellow-800 rounded-lg p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-white">{question.groupTitle}</h4>
                        <span className="px-2 py-1 bg-yellow-900 text-yellow-200 rounded text-xs">
                          Awaiting Answer
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-slate-400 mb-2">Context:</div>
                        <div className="text-slate-300">{question.context}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-slate-400 mb-2">Question:</div>
                        <div className="text-white">{question.question}</div>
                      </div>

                      {question.suggestedAnswers.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm text-slate-400 mb-2">Suggested Answers:</div>
                          <div className="flex flex-wrap gap-2">
                            {question.suggestedAnswers.map((suggested, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedQuestionId(question.id);
                                  setAnswer(suggested);
                                }}
                                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-sm transition-colors"
                              >
                                {suggested}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedQuestion?.id === question.id && (
                        <div className="border-t border-slate-800 pt-4">
                          <div className="mb-3">
                            <label className="block text-sm text-slate-400 mb-2">Your Answer</label>
                            <textarea
                              value={answer}
                              onChange={e => setAnswer(e.target.value)}
                              placeholder="Enter your professional judgment..."
                              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 h-24"
                              autoFocus
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm text-slate-400 mb-2">Notes (optional)</label>
                            <textarea
                              value={notes}
                              onChange={e => setNotes(e.target.value)}
                              placeholder="Additional notes or reasoning..."
                              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 h-20"
                            />
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={handleAnswer}
                              disabled={!answer.trim()}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 rounded-lg transition-colors"
                            >
                              Submit Answer
                            </button>
                            <button
                              onClick={() => {
                                setSelectedQuestionId(null);
                                setAnswer('');
                                setNotes('');
                              }}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedQuestion?.id !== question.id && (
                        <button
                          onClick={() => setSelectedQuestionId(question.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Answer This Question
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answered Questions */}
            {answered.length > 0 && (
              <div>
                <h3 className="text-lg text-white mb-3">Previously Answered</h3>
                <div className="space-y-3">
                  {answered.map(question => (
                    <div
                      key={question.id}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-white">{question.groupTitle}</h4>
                        <span className="px-2 py-1 bg-green-900 text-green-200 rounded text-xs">
                          Answered
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-slate-400 mb-1">Question:</div>
                        <div className="text-slate-300">{question.question}</div>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-slate-400 mb-1">Answer:</div>
                        <div className="text-white">{question.answer}</div>
                      </div>

                      {question.notes && (
                        <div className="mb-3">
                          <div className="text-sm text-slate-400 mb-1">Notes:</div>
                          <div className="text-slate-300">{question.notes}</div>
                        </div>
                      )}

                      <div className="text-xs text-slate-500">
                        Answered on {new Date(question.answeredAt!).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
