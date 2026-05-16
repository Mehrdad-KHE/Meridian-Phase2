import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Copy, FileText, Upload } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { EngagementContextBar } from '../components/EngagementContextBar';
import { Layout } from '../components/Layout';
import { DocumentStatus, useEngagement } from '../state/engagement';

type DocumentTab = 'all' | DocumentStatus;

const statusLabels: Record<DocumentStatus, string> = {
  new: 'New',
  read: 'Read',
  needs_fix: 'Needs Fix',
  duplicate: 'Duplicate',
  excluded: 'Excluded',
};

export function Documents() {
  const navigate = useNavigate();
  const { state, addDocument, updateDocumentStatus } = useEngagement();
  const [activeTab, setActiveTab] = useState<DocumentTab>('all');

  const documents = state.documents;

  const filteredDocs = useMemo(() => {
    if (activeTab === 'all') {
      return documents;
    }

    return documents.filter((document) => document.status === activeTab);
  }, [activeTab, documents]);

  const counts = useMemo(
    () => ({
      all: documents.length,
      new: documents.filter((document) => document.status === 'new').length,
      read: documents.filter((document) => document.status === 'read').length,
      needs_fix: documents.filter((document) => document.status === 'needs_fix').length,
      duplicate: documents.filter((document) => document.status === 'duplicate').length,
      excluded: documents.filter((document) => document.status === 'excluded').length,
    }),
    [documents],
  );

  const getStatusIcon = (status: DocumentStatus) => {
    if (status === 'read') return <CheckCircle size={16} className="text-[#10B981]" />;
    if (status === 'needs_fix') return <AlertCircle size={16} className="text-[#F59E0B]" />;
    if (status === 'duplicate') return <Copy size={16} className="text-[#6B7280]" />;
    if (status === 'excluded') return <FileText size={16} className="text-[#9CA3AF]" />;
    return <Upload size={16} className="text-[#3B82F6]" />;
  };

  const getStatusColor = (status: DocumentStatus) => {
    if (status === 'read') return 'text-[#10B981]';
    if (status === 'needs_fix') return 'text-[#F59E0B]';
    if (status === 'duplicate') return 'text-[#6B7280]';
    if (status === 'excluded') return 'text-[#9CA3AF]';
    return 'text-[#3B82F6]';
  };

  const handleAddDocument = () => {
    addDocument();
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

  if (documents.length === 0) {
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

            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-lg rounded-2xl border border-[#252C37] bg-[#1A1F28] p-8 text-center">
                <Upload size={32} className="mx-auto mb-3 text-[#9CA3AF]" />
                <h2 className="text-xl font-semibold mb-3">Nothing here yet</h2>
                <p className="text-sm text-[#9CA3AF] mb-6">Add a document to start the correction loop.</p>
                <button
                  onClick={handleAddDocument}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB]"
                >
                  Add document
                </button>
              </div>
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
            <div>
              <h1 className="text-xl font-semibold pt-1">Documents</h1>
              <p className="text-xs text-[#6B7280] mt-1">Add, review, and reclassify documents to drive the review loop.</p>
            </div>
            <button
              onClick={() => navigate('/processing')}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-4 rounded-lg text-sm font-medium"
            >
              Continue to Processing
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-[#1A1F28] border-2 border-dashed border-[#374151] rounded p-6 mb-4 text-center hover:border-[#3B82F6] transition-colors">
            <Upload size={32} className="mx-auto mb-2 text-[#9CA3AF]" />
            <h3 className="text-sm font-medium mb-1">Add document</h3>
            <p className="text-xs text-[#6B7280] mb-3">This prototype adds a local document to the workflow store.</p>
            <button
              onClick={handleAddDocument}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-1.5 px-4 rounded text-xs font-medium"
            >
              Add Document
            </button>
          </div>

          <div className="flex gap-1 mb-3 border-b border-[#252C37] flex-wrap">
            {([
              ['all', `All (${counts.all})`],
              ['new', `New (${counts.new})`],
              ['read', `Read (${counts.read})`],
              ['needs_fix', `Needs Fix (${counts.needs_fix})`],
              ['duplicate', `Duplicates (${counts.duplicate})`],
              ['excluded', `Excluded (${counts.excluded})`],
            ] as Array<[DocumentTab, string]>).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 ${
                  activeTab === value
                    ? 'border-[#3B82F6] text-[#3B82F6]'
                    : 'border-transparent text-[#9CA3AF] hover:text-[#F9FAFB]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 mb-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#1A1F28] border border-[#252C37] rounded p-3 flex flex-col gap-3 hover:border-[#374151] transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {getStatusIcon(doc.status)}
                    <span className="text-xs truncate">{doc.name}</span>
                  </div>
                  <span className={`text-xs ${getStatusColor(doc.status)}`}>{statusLabels[doc.status]}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doc.status !== 'read' && (
                    <button
                      onClick={() => updateDocumentStatus(doc.id, 'read')}
                      className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-1.5 px-3 rounded text-[11px] font-medium"
                    >
                      Mark reviewed
                    </button>
                  )}
                  {doc.status !== 'needs_fix' && (
                    <button
                      onClick={() => updateDocumentStatus(doc.id, 'needs_fix')}
                      className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-1.5 px-3 rounded text-[11px] font-medium"
                    >
                      Mark needs fix
                    </button>
                  )}
                  {doc.status !== 'duplicate' && (
                    <button
                      onClick={() => updateDocumentStatus(doc.id, 'duplicate')}
                      className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-1.5 px-3 rounded text-[11px] font-medium"
                    >
                      Mark duplicate
                    </button>
                  )}
                  {doc.status !== 'excluded' ? (
                    <button
                      onClick={() => updateDocumentStatus(doc.id, 'excluded')}
                      className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-1.5 px-3 rounded text-[11px] font-medium"
                    >
                      Exclude
                    </button>
                  ) : (
                    <button
                      onClick={() => updateDocumentStatus(doc.id, 'read')}
                      className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-1.5 px-3 rounded text-[11px] font-medium"
                    >
                      Restore
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
