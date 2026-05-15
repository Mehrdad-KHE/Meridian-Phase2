import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, RotateCw, FileText, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export function DocumentsScreen() {
  const { state, getCaseDocuments, addDocument, rotateDocument, processDocument, excludeDocument } = useApp();
  const [fileName, setFileName] = useState('');
  const [excludeReason, setExcludeReason] = useState('');
  const [excludingDocId, setExcludingDocId] = useState<string | null>(null);

  if (!state.selectedCaseId) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-400">Select a case from the workspace first</p>
      </div>
    );
  }

  const documents = getCaseDocuments(state.selectedCaseId);
  const readableCount = documents.filter(d => d.status === 'readable').length;
  const needsFixCount = documents.filter(d => d.status === 'needs-fix').length;
  const excludedCount = documents.filter(d => d.status === 'excluded').length;

  const handleAddDocument = () => {
    if (!fileName.trim() || !state.selectedCaseId) return;
    addDocument(state.selectedCaseId, fileName);
    setFileName('');
  };

  const handleExclude = (docId: string) => {
    if (!excludeReason.trim()) return;
    excludeDocument(docId, excludeReason);
    setExcludingDocId(null);
    setExcludeReason('');
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-2xl text-white">{documents.length}</div>
                <div className="text-sm text-slate-400">Total Documents</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-2xl text-white">{readableCount}</div>
                <div className="text-sm text-slate-400">Readable</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-2xl text-white">{needsFixCount}</div>
                <div className="text-sm text-slate-400">Needs Fix</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-2xl text-white">{excludedCount}</div>
                <div className="text-sm text-slate-400">Excluded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Document */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              placeholder="Enter document filename (e.g., receipt-jan15.pdf)"
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
              onKeyDown={e => e.key === 'Enter' && handleAddDocument()}
            />
            <button
              onClick={handleAddDocument}
              disabled={!fileName.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Add Document
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            In production, this would open a file picker. For this prototype, enter a filename.
          </p>
        </div>

        {/* Documents List */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800">
            <h3 className="text-white">Documents</h3>
          </div>

          {documents.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No documents uploaded yet. Add your first document above.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {documents.map(doc => (
                <div key={doc.id} className="p-4 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <span className="text-white">{doc.fileName}</span>
                        <span className={`
                          px-2 py-0.5 rounded text-xs
                          ${doc.status === 'readable' ? 'bg-green-900 text-green-200' :
                            doc.status === 'needs-fix' ? 'bg-yellow-900 text-yellow-200' :
                            doc.status === 'excluded' ? 'bg-red-900 text-red-200' :
                            'bg-slate-800 text-slate-300'}
                        `}>
                          {doc.status}
                        </span>
                        {doc.rotation !== 0 && (
                          <span className="text-xs text-slate-500">
                            Rotated {doc.rotation}°
                          </span>
                        )}
                      </div>

                      {doc.extractedData && (
                        <div className="ml-8 text-sm text-slate-400 space-y-1">
                          <div>Vendor: {doc.extractedData.vendor}</div>
                          <div>Date: {doc.extractedData.date}</div>
                          <div>Amount: ${doc.extractedData.amount?.toFixed(2)} (Tax: ${doc.extractedData.taxAmount?.toFixed(2)})</div>
                          <div>Category: {doc.extractedData.category}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {doc.status === 'needs-fix' && (
                        <>
                          <button
                            onClick={() => rotateDocument(doc.id)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2 text-sm transition-colors"
                            title="Rotate document"
                          >
                            <RotateCw className="w-4 h-4" />
                            Rotate
                          </button>
                          <button
                            onClick={() => processDocument(doc.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 text-sm transition-colors"
                            title="Reprocess document"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Process
                          </button>
                        </>
                      )}

                      {doc.status === 'readable' && excludingDocId !== doc.id && (
                        <button
                          onClick={() => setExcludingDocId(doc.id)}
                          className="px-3 py-1.5 bg-red-900 hover:bg-red-800 rounded text-sm transition-colors"
                        >
                          Exclude
                        </button>
                      )}

                      {excludingDocId === doc.id && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={excludeReason}
                            onChange={e => setExcludeReason(e.target.value)}
                            placeholder="Reason for exclusion"
                            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm w-48"
                            autoFocus
                          />
                          <button
                            onClick={() => handleExclude(doc.id)}
                            disabled={!excludeReason.trim()}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 rounded text-sm transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setExcludingDocId(null);
                              setExcludeReason('');
                            }}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
