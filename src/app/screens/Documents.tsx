import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { EngagementContextBar } from '../components/EngagementContextBar';
import { Layout } from '../components/Layout';
import { useEngagement } from '../state/engagement';

export function Documents() {
  const navigate = useNavigate();
  const { state } = useEngagement();
  const [activeTab, setActiveTab] = useState<'all' | 'read' | 'needsFix' | 'duplicates'>('all');
  const [documents] = useState([
    { id: 1, name: 'receipt-2025-01-15.pdf', status: 'Read' },
    { id: 2, name: 'invoice-acme-jan.pdf', status: 'Read' },
    { id: 3, name: 'fuel-receipt-scan.jpg', status: 'Needs Fix' },
    { id: 4, name: 'monthly-expense.pdf', status: 'Read' },
    { id: 5, name: 'receipt-duplicate.pdf', status: 'Duplicate' }
  ]);

  const filteredDocs = documents.filter((doc) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'read') return doc.status === 'Read';
    if (activeTab === 'needsFix') return doc.status === 'Needs Fix';
    if (activeTab === 'duplicates') return doc.status === 'Duplicate';
    return true;
  });

  const getStatusIcon = (status: string) => {
    if (status === 'Read') return <CheckCircle size={16} className="text-[#10B981]" />;
    if (status === 'Needs Fix') return <AlertCircle size={16} className="text-[#F59E0B]" />;
    if (status === 'Duplicate') return <Copy size={16} className="text-[#6B7280]" />;
    return <FileText size={16} className="text-[#9CA3AF]" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Read') return 'text-[#10B981]';
    if (status === 'Needs Fix') return 'text-[#F59E0B]';
    if (status === 'Duplicate') return 'text-[#6B7280]';
    return 'text-[#9CA3AF]';
  };

  if (!state.engagementLabel) {
    return (
      <Layout>
        <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
          <WorkflowRoadmap currentStage="documents" />
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

  return (
    <Layout>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
        <WorkflowRoadmap currentStage="documents" />

        <EngagementContextBar />

        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-4 overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/setup/period')}
              className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="text-xl font-semibold pt-1">Documents</h1>
            <button
              onClick={() => navigate('/processing')}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-4 rounded-lg text-sm font-medium"
            >
              Continue to Processing
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-[#1A1F28] border-2 border-dashed border-[#374151] rounded p-6 mb-4 text-center hover:border-[#3B82F6] cursor-pointer transition-colors">
            <Upload size={32} className="mx-auto mb-2 text-[#9CA3AF]" />
            <h3 className="text-sm font-medium mb-1">Upload Documents</h3>
            <p className="text-xs text-[#6B7280] mb-3">Drag and drop files or click to select</p>
            <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-1.5 px-4 rounded text-xs font-medium">
              Select Files
            </button>
          </div>

          <div className="flex gap-1 mb-3 border-b border-[#252C37]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 ${
                activeTab === 'all'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              All ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('read')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 ${
                activeTab === 'read'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              Read ({documents.filter((d) => d.status === 'Read').length})
            </button>
            <button
              onClick={() => setActiveTab('needsFix')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 ${
                activeTab === 'needsFix'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              Needs Fix ({documents.filter((d) => d.status === 'Needs Fix').length})
            </button>
            <button
              onClick={() => setActiveTab('duplicates')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 ${
                activeTab === 'duplicates'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              Duplicates ({documents.filter((d) => d.status === 'Duplicate').length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 mb-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#1A1F28] border border-[#252C37] rounded p-3 flex items-center justify-between hover:border-[#374151] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {getStatusIcon(doc.status)}
                  <span className="text-xs">{doc.name}</span>
                </div>
                <span className={`text-xs ${getStatusColor(doc.status)}`}>{doc.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
