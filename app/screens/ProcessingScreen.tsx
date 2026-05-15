import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';

export function ProcessingScreen() {
  const { state, getCaseDocuments, getCaseTransactions, getCaseReviewItems, setCurrentScreen } = useApp();

  if (!state.selectedCaseId) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-400">Select a case from the workspace first</p>
      </div>
    );
  }

  const documents = getCaseDocuments(state.selectedCaseId);
  const transactions = getCaseTransactions(state.selectedCaseId);
  const reviewItems = getCaseReviewItems(state.selectedCaseId);

  const totalDocs = documents.length;
  const processedDocs = documents.filter(d => d.processedAt).length;
  const matchedTransactions = transactions.length;
  const needsReview = reviewItems.filter(r => r.status === 'pending').length;

  const progress = totalDocs > 0 ? Math.round((processedDocs / totalDocs) * 100) : 0;

  const steps = [
    {
      id: 'read',
      label: 'Documents Read',
      complete: processedDocs,
      total: totalDocs,
      status: processedDocs === totalDocs ? 'complete' : processedDocs > 0 ? 'in-progress' : 'pending'
    },
    {
      id: 'extract',
      label: 'Data Extracted',
      complete: documents.filter(d => d.extractedData).length,
      total: totalDocs,
      status: documents.filter(d => d.extractedData).length === totalDocs ? 'complete' : 'in-progress'
    },
    {
      id: 'match',
      label: 'Transactions Matched',
      complete: matchedTransactions,
      total: totalDocs,
      status: matchedTransactions > 0 ? 'in-progress' : 'pending'
    },
    {
      id: 'review',
      label: 'Review Items Created',
      complete: reviewItems.length,
      total: reviewItems.length,
      status: reviewItems.length > 0 ? 'complete' : 'pending'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Overall Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-white">Processing Progress</h3>
            <span className="text-3xl text-white">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4 mb-6">
          {steps.map(step => (
            <div key={step.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step.status === 'complete' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : step.status === 'in-progress' ? (
                    <Clock className="w-5 h-5 text-blue-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-600" />
                  )}
                  <div>
                    <div className="text-white">{step.label}</div>
                    <div className="text-sm text-slate-400">
                      {step.complete} of {step.total}
                    </div>
                  </div>
                </div>

                <span className={`
                  px-3 py-1 rounded-full text-xs
                  ${step.status === 'complete' ? 'bg-green-900 text-green-200' :
                    step.status === 'in-progress' ? 'bg-blue-900 text-blue-200' :
                    'bg-slate-800 text-slate-400'}
                `}>
                  {step.status === 'complete' ? 'Complete' :
                   step.status === 'in-progress' ? 'In Progress' :
                   'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* What Needs Attention */}
        {needsReview > 0 && (
          <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h3 className="text-lg text-yellow-200 mb-2">Human Review Required</h3>
                <p className="text-yellow-300 mb-3">
                  {needsReview} item(s) require operator review. These are items the system could not
                  confidently resolve automatically.
                </p>
                <button
                  onClick={() => setCurrentScreen('review')}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                  Go to Review
                </button>
              </div>
            </div>
          </div>
        )}

        {totalDocs === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">
              No documents to process yet. Go to Documents to add source files.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
