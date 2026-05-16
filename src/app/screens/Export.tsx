import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Download, AlertTriangle, CheckCircle, FileSpreadsheet, FileText } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { Layout } from '../components/Layout';

export function Export() {
  const navigate = useNavigate();
  const [isReady] = useState(true);
  const [blockers] = useState<string[]>([]);

  return (
    <Layout engagementName="Botax Accounting → Babak Mohammadhosseini → 2025 Annual">
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
        <WorkflowRoadmap currentStage="export" />

        <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6 flex justify-center">
          <p className="text-xs text-[#9CA3AF] text-center w-full">Botax Accounting → Babak Mohammadhosseini → 2025 Annual</p>
        </div>

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/review')}
              className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="text-xl font-semibold pt-1">Export</h1>
            <button className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white py-2 px-4 rounded-lg text-sm font-medium">
              <Download size={16} />
              Download Accountant Package
            </button>
          </div>

          {isReady ? (
            <>
              <div className="bg-[#10B981]/10 border-2 border-[#10B981] rounded p-4 mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-[#10B981]" />
                  <div>
                    <h2 className="text-base font-semibold text-[#10B981]">Ready to Export</h2>
                    <p className="text-xs text-[#D1D5DB]">All review items resolved. Your package is ready.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1F28] border border-[#252C37] rounded p-4 mb-4 flex-1 overflow-y-auto">
                <h3 className="text-sm font-medium mb-3">Export Options</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#252C37] rounded hover:bg-[#374151] cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet size={16} className="text-[#10B981]" />
                      <div>
                        <p className="text-xs font-medium">Accountant Review Package</p>
                        <p className="text-[10px] text-[#6B7280]">Excel summary, document index, decisions</p>
                      </div>
                    </div>
                    <Download size={14} className="text-[#6B7280]" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#252C37] rounded hover:bg-[#374151] cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <FileText size={16} className="text-[#3B82F6]" />
                      <div>
                        <p className="text-xs font-medium">QuickBooks-Compatible CSV</p>
                        <p className="text-[10px] text-[#6B7280]">Import ready for QuickBooks</p>
                      </div>
                    </div>
                    <Download size={14} className="text-[#6B7280]" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#252C37] rounded hover:bg-[#374151] cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <FileText size={16} className="text-[#9CA3AF]" />
                      <div>
                        <p className="text-xs font-medium">Generic CSV Export</p>
                        <p className="text-[10px] text-[#6B7280]">Standard accounting format</p>
                      </div>
                    </div>
                    <Download size={14} className="text-[#6B7280]" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#F59E0B]/10 border-2 border-[#F59E0B] rounded p-4 mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={24} className="text-[#F59E0B]" />
                  <div>
                    <h2 className="text-base font-semibold text-[#F59E0B]">Needs Attention</h2>
                    <p className="text-xs text-[#D1D5DB]">Some items need to be resolved before final export.</p>
                  </div>
                </div>

                <div className="bg-[#252C37] rounded p-3 mt-3">
                  <p className="text-xs font-medium mb-2">Blockers:</p>
                  <ul className="space-y-1">
                    {blockers.map((blocker, idx) => (
                      <li key={idx} className="text-xs text-[#D1D5DB] flex items-start gap-2">
                        <span className="text-[#F59E0B]">•</span>
                        <span>{blocker}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 mb-4">
                <button
                  onClick={() => navigate('/review')}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 px-4 rounded text-xs font-medium text-left flex items-center justify-between"
                >
                  <span>Go to Review to resolve items</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">{blockers.length}</span>
                </button>

                <div className="border-t border-[#252C37] pt-3">
                  <p className="text-xs text-[#6B7280] mb-2">Or download a draft version:</p>
                  <button className="w-full border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 py-2 px-4 rounded text-xs font-medium flex items-center justify-center gap-2">
                    <Download size={14} />
                    Download Draft Package
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
