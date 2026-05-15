import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, FileText, RotateCw, MessageSquare, XCircle } from 'lucide-react';

export function ReviewScreen() {
  const {
    state,
    getCaseReviewItems,
    resolveReviewItem,
    sendToAccountant,
    getCaseDocuments,
    markAsPersonal,
    markAsSupportOnly,
    excludeTransaction
  } = useApp();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [askingAccountant, setAskingAccountant] = useState(false);
  const [accountantQuestion, setAccountantQuestion] = useState('');
  const [excludeReason, setExcludeReason] = useState('');
  const [showExclude, setShowExclude] = useState(false);

  if (!state.selectedCaseId) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-400">Select a case from the workspace first</p>
      </div>
    );
  }

  const reviewItems = getCaseReviewItems(state.selectedCaseId);
  const documents = getCaseDocuments(state.selectedCaseId);

  const pendingItems = reviewItems.filter(r => r.status === 'pending' || r.status === 'in-review');
  const selectedItem = selectedItemId ? reviewItems.find(r => r.id === selectedItemId) : pendingItems[0];

  const getNextSelectedPendingItemId = (currentItemId: string) => {
    const currentIndex = pendingItems.findIndex(item => item.id === currentItemId);
    if (currentIndex === -1) {
      return pendingItems[0]?.id ?? null;
    }

    const remainingItems = pendingItems.filter(item => item.id !== currentItemId);
    if (remainingItems.length === 0) {
      return null;
    }

    const itemImmediatelyAfter = pendingItems[currentIndex + 1];
    if (itemImmediatelyAfter) {
      return itemImmediatelyAfter.id;
    }

    return remainingItems[remainingItems.length - 1].id;
  };

  useEffect(() => {
    if (!selectedItemId && pendingItems.length > 0) {
      setSelectedItemId(pendingItems[0].id);
    }
  }, [selectedItemId, pendingItems.length]);

  const getDocument = (docId?: string) => {
    return docId ? documents.find(d => d.id === docId) : undefined;
  };

  const handleResolve = (decision: 'approve' | 'modify' | 'exclude') => {
    if (!selectedItem) return;

    if (decision === 'approve') {
      resolveReviewItem(selectedItem.id, 'Operator', 'Approved by operator');
    } else if (decision === 'modify') {
      resolveReviewItem(selectedItem.id, 'Operator', 'Modified by operator');
    } else if (decision === 'exclude') {
      setShowExclude(true);
      return;
    }

    setSelectedItemId(getNextSelectedPendingItemId(selectedItem.id));
  };

  const handleExclude = () => {
    if (!selectedItem || !excludeReason.trim()) return;

    if (selectedItem.transactionId) {
      excludeTransaction(selectedItem.transactionId, excludeReason);
    }
    resolveReviewItem(selectedItem.id, 'Operator', `Excluded: ${excludeReason}`);

    setShowExclude(false);
    setExcludeReason('');
    setSelectedItemId(getNextSelectedPendingItemId(selectedItem.id));
  };

  const handleAskAccountant = () => {
    if (!selectedItem || !accountantQuestion.trim()) return;

    sendToAccountant([selectedItem.id], selectedItem.title, accountantQuestion);
    setAskingAccountant(false);
    setAccountantQuestion('');
    setSelectedItemId(getNextSelectedPendingItemId(selectedItem.id));
  };

  const handleMarkPersonal = () => {
    if (!selectedItem || !selectedItem.transactionId) return;
    markAsPersonal(selectedItem.transactionId);
    resolveReviewItem(selectedItem.id, 'Operator', 'Marked as personal/shareholder expense');
    setSelectedItemId(getNextSelectedPendingItemId(selectedItem.id));
  };

  const handleMarkSupport = () => {
    if (!selectedItem || !selectedItem.transactionId) return;
    markAsSupportOnly(selectedItem.transactionId);
    resolveReviewItem(selectedItem.id, 'Operator', 'Marked as support-only document');
    setSelectedItemId(getNextSelectedPendingItemId(selectedItem.id));
  };

  return (
    <div className="h-full flex">
      {/* Queue */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-white">Review Queue</h3>
          <p className="text-sm text-slate-400 mt-1">
            {pendingItems.length} item{pendingItems.length !== 1 ? 's' : ''} pending
          </p>
        </div>

        <div className="flex-1 overflow-auto">
          {pendingItems.length === 0 ? (
            <div className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-slate-400">All review items resolved!</p>
            </div>
          ) : (
            <div className="p-2">
              {pendingItems.map(item => {
                const doc = getDocument(item.documentId);
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`
                      w-full text-left p-3 rounded-lg mb-2 transition-colors
                      ${item.id === selectedItem?.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
                    `}
                  >
                    <div className="text-sm mb-1">{item.title}</div>
                    <div className={`text-xs ${item.id === selectedItem?.id ? 'text-blue-200' : 'text-slate-500'}`}>
                      {doc?.fileName || 'No document'}
                    </div>
                    <div className={`text-xs mt-1 ${item.id === selectedItem?.id ? 'text-blue-200' : 'text-slate-500'}`}>
                      Confidence: {Math.round(item.confidence * 100)}%
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 flex flex-col">
        {selectedItem ? (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl text-white mb-2">{selectedItem.title}</h2>
                      <div className="flex items-center gap-3">
                        <span className={`
                          px-2 py-1 rounded text-xs
                          ${selectedItem.type === 'categorization' ? 'bg-purple-900 text-purple-200' :
                            selectedItem.type === 'matching' ? 'bg-blue-900 text-blue-200' :
                            selectedItem.type === 'personal-expense' ? 'bg-yellow-900 text-yellow-200' :
                            'bg-slate-800 text-slate-300'}
                        `}>
                          {selectedItem.type.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-slate-400">
                          Confidence: {Math.round(selectedItem.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{selectedItem.description}</p>

                  {selectedItem.suggestedAction && (
                    <div className="bg-blue-900/30 border border-blue-800 rounded p-3">
                      <div className="text-sm text-blue-200">
                        <strong>Suggested Action:</strong> {selectedItem.suggestedAction}
                      </div>
                    </div>
                  )}
                </div>

                {selectedItem.documentId && (
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-4">
                    <h3 className="text-white mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Source Document
                    </h3>
                    {(() => {
                      const doc = getDocument(selectedItem.documentId);
                      return doc ? (
                        <div>
                          <div className="text-slate-300 mb-2">{doc.fileName}</div>
                          {doc.extractedData && (
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-slate-500">Vendor:</span>
                                <span className="text-slate-300 ml-2">{doc.extractedData.vendor}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Date:</span>
                                <span className="text-slate-300 ml-2">{doc.extractedData.date}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Amount:</span>
                                <span className="text-slate-300 ml-2">${doc.extractedData.amount?.toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Tax:</span>
                                <span className="text-slate-300 ml-2">${doc.extractedData.taxAmount?.toFixed(2)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-slate-500">Document not found</p>
                      );
                    })()}
                  </div>
                )}

                {askingAccountant && (
                  <div className="bg-slate-900 border border-blue-600 rounded-lg p-6 mb-4">
                    <h3 className="text-white mb-3">Ask Accountant</h3>
                    <textarea
                      value={accountantQuestion}
                      onChange={e => setAccountantQuestion(e.target.value)}
                      placeholder="Describe what you need the accountant to decide..."
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-3 h-32"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAskAccountant}
                        disabled={!accountantQuestion.trim()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-lg transition-colors"
                      >
                        Send to Accountant
                      </button>
                      <button
                        onClick={() => {
                          setAskingAccountant(false);
                          setAccountantQuestion('');
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {showExclude && (
                  <div className="bg-slate-900 border border-red-600 rounded-lg p-6 mb-4">
                    <h3 className="text-white mb-3">Exclude Item</h3>
                    <input
                      type="text"
                      value={excludeReason}
                      onChange={e => setExcludeReason(e.target.value)}
                      placeholder="Reason for exclusion (e.g., Personal expense, Duplicate, etc.)"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-3"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleExclude}
                        disabled={!excludeReason.trim()}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 rounded-lg transition-colors"
                      >
                        Confirm Exclusion
                      </button>
                      <button
                        onClick={() => {
                          setShowExclude(false);
                          setExcludeReason('');
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="border-t border-slate-800 bg-slate-900 p-4">
              <div className="max-w-4xl mx-auto flex gap-3">
                <button
                  onClick={() => handleResolve('approve')}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </button>

                {selectedItem.type === 'personal-expense' && (
                  <button
                    onClick={handleMarkPersonal}
                    className="px-4 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                  >
                    Mark Personal
                  </button>
                )}

                <button
                  onClick={handleMarkSupport}
                  className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Support Only
                </button>

                <button
                  onClick={() => setAskingAccountant(true)}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Ask Accountant
                </button>

                <button
                  onClick={() => handleResolve('exclude')}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Exclude
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-xl text-white mb-2">All Done!</p>
              <p className="text-slate-400">No review items remaining</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
