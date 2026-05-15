import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, CheckCircle, XCircle, AlertTriangle, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

export function ExportScreen() {
  const {
    state,
    canExport,
    getCaseTransactions,
    getCaseDocuments,
    getCaseReviewItems
  } = useApp();

  const [selectedOptions, setSelectedOptions] = useState({
    fullPackage: true,
    dailyBatch: false,
    monthlyBatch: false,
    sourceIndex: true,
    accountantLog: true,
    auditTrail: true
  });

  if (!state.selectedCaseId) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-400">Select a case from the workspace first</p>
      </div>
    );
  }

  const exportStatus = canExport(state.selectedCaseId);
  const transactions = getCaseTransactions(state.selectedCaseId);
  const documents = getCaseDocuments(state.selectedCaseId);
  const reviewItems = getCaseReviewItems(state.selectedCaseId);

  const includedTransactions = transactions.filter(t => !t.isExcluded);
  const excludedTransactions = transactions.filter(t => t.isExcluded);
  const supportOnlyDocs = documents.filter(d => transactions.some(t => t.documentId === d.id && t.isSupportOnly));

  const getCaseAuditEventsFunc = (caseId: string) => {
    return state.auditEvents.filter(e => e.caseId === caseId);
  };

  const auditEvents = getCaseAuditEventsFunc(state.selectedCaseId);

  const toggleOption = (key: keyof typeof selectedOptions) => {
    setSelectedOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = () => {
    if (!exportStatus.canExport) return;

    const exportData = {
      transactions: includedTransactions,
      excluded: excludedTransactions,
      auditTrail: auditEvents,
      options: selectedOptions
    };

    console.log('Export package:', exportData);
    toast.success('Export package would be generated here. Check console for data preview.');
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Export Status */}
        <div className={`
          rounded-lg p-6 mb-6 border
          ${exportStatus.canExport
            ? 'bg-green-900/20 border-green-800'
            : 'bg-red-900/20 border-red-800'}
        `}>
          <div className="flex items-start gap-3">
            {exportStatus.canExport ? (
              <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className={`text-lg mb-2 ${exportStatus.canExport ? 'text-green-200' : 'text-red-200'}`}>
                {exportStatus.canExport ? 'Ready to Export' : 'Export Blocked'}
              </h3>
              {exportStatus.canExport ? (
                <p className="text-green-300">
                  All requirements met. The case is ready for final export.
                </p>
              ) : (
                <div>
                  <p className="text-red-300 mb-2">
                    The following items must be resolved before exporting:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {exportStatus.blockers.map((blocker, idx) => (
                      <li key={idx} className="text-red-200">{blocker}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl text-white mb-1">{includedTransactions.length}</div>
            <div className="text-sm text-slate-400">Included Transactions</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl text-white mb-1">{excludedTransactions.length}</div>
            <div className="text-sm text-slate-400">Excluded Items</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl text-white mb-1">{supportOnlyDocs.length}</div>
            <div className="text-sm text-slate-400">Support Documents</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl text-white mb-1">{auditEvents.length}</div>
            <div className="text-sm text-slate-400">Audit Events</div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg mb-6">
          <div className="px-4 py-3 border-b border-slate-800">
            <h3 className="text-white">Transaction Summary</h3>
          </div>

          {includedTransactions.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No transactions to include in export
            </div>
          ) : (
            <div className="overflow-auto max-h-80">
              <table className="w-full">
                <thead className="bg-slate-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Date</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Vendor</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Category</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Amount</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Decision</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {includedTransactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 text-slate-300">{txn.date}</td>
                      <td className="px-4 py-3 text-white">{txn.vendor}</td>
                      <td className="px-4 py-3 text-slate-300">{txn.category}</td>
                      <td className="px-4 py-3 text-white">${txn.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`
                          px-2 py-1 rounded text-xs
                          ${txn.decisionSource === 'System' ? 'bg-blue-900 text-blue-200' :
                            txn.decisionSource === 'Operator' ? 'bg-green-900 text-green-200' :
                            'bg-purple-900 text-purple-200'}
                        `}>
                          {txn.decisionSource}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {txn.isPersonal && (
                          <span className="px-2 py-1 bg-orange-900 text-orange-200 rounded text-xs mr-1">
                            Personal
                          </span>
                        )}
                        {txn.isSupportOnly && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                            Support
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Excluded Items */}
        {excludedTransactions.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg mb-6">
            <div className="px-4 py-3 border-b border-slate-800">
              <h3 className="text-white">Excluded Items</h3>
            </div>
            <div className="divide-y divide-slate-800">
              {excludedTransactions.map(txn => (
                <div key={txn.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white mb-1">{txn.vendor} - ${txn.amount.toFixed(2)}</div>
                      <div className="text-sm text-slate-400">{txn.date}</div>
                      {txn.excludeReason && (
                        <div className="text-sm text-red-300 mt-2">
                          Reason: {txn.excludeReason}
                        </div>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-red-900 text-red-200 rounded text-xs">
                      Excluded
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
          <h3 className="text-white mb-4">Export Package Options</h3>
          <div className="space-y-3">
            {Object.entries(selectedOptions).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleOption(key as keyof typeof selectedOptions)}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-700"
                />
                <span className="text-slate-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleExport}
            disabled={!exportStatus.canExport}
            className={`
              flex-1 px-6 py-4 rounded-lg flex items-center justify-center gap-3 transition-colors
              ${exportStatus.canExport
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-slate-700 cursor-not-allowed opacity-50'}
            `}
          >
            <Download className="w-5 h-5" />
            <span className="text-lg">Generate Excel Package</span>
          </button>

          <button
            onClick={() => {
              const preview = {
                case: state.cases.find(c => c.id === state.selectedCaseId),
                transactions: includedTransactions,
                excluded: excludedTransactions,
                auditEvents
              };
              console.log('Export preview:', preview);
              toast.info('Preview data logged to console');
            }}
            className="px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FileSpreadsheet className="w-5 h-5" />
            Preview
          </button>
        </div>

        {!exportStatus.canExport && (
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-300">
                In production, this would generate an Excel-ready accounting package. The prototype
                shows the workflow logic and export gating requirements.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
