import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { EngagementContextBar } from '../components/EngagementContextBar';
import { Layout } from '../components/Layout';
import { useEngagement } from '../state/engagement';

export function Processing() {
  const navigate = useNavigate();
  const { state } = useEngagement();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Reading documents');
  const [isComplete, setIsComplete] = useState(false);

  const documents = state.documents;
  const reviewItems = state.reviewItems;

  const steps = [
    'Reading documents',
    'Extracting text',
    'Checking duplicates',
    'Classifying documents',
    'Matching to accounting categories',
    'Preparing review items',
  ];

  const metrics = useMemo(
    () => ({
      read: documents.filter((document) => document.status === 'read').length,
      autoClassified: documents.filter((document) => document.status === 'read' || document.status === 'duplicate' || document.status === 'excluded')
        .length,
      needReview: reviewItems.filter((item) => item.status !== 'resolved').length,
      unreadable: documents.filter((document) => document.status === 'needs_fix').length,
      duplicates: documents.filter((document) => document.status === 'duplicate').length,
    }),
    [documents, reviewItems],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        const newProgress = prev + 2;
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(steps[Math.min(stepIndex, steps.length - 1)]);
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!state.engagementLabel) {
    return (
      <Layout>
        <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
          <WorkflowRoadmap currentStage="processing" />
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
          <WorkflowRoadmap currentStage="processing" />
          <EngagementContextBar />

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-lg rounded-2xl border border-[#252C37] bg-[#1A1F28] p-8 text-center">
              <h1 className="text-xl font-semibold mb-3">Nothing here yet</h1>
              <p className="text-sm text-[#9CA3AF] mb-6">Add documents before processing can begin.</p>
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
        <WorkflowRoadmap currentStage="processing" />

        <EngagementContextBar />

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/documents')}
              className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div>
              <h1 className="text-xl font-semibold pt-1">Processing</h1>
              <p className="text-xs text-[#6B7280] mt-1">Document readout and classification are driven by the local workflow store.</p>
            </div>
            <button
              onClick={() => navigate('/review')}
              disabled={!isComplete}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#374151] disabled:text-[#9CA3AF] text-white py-2 px-4 rounded-lg text-sm font-medium"
            >
              Go to Review
              <ArrowRight size={16} />
            </button>
          </div>

          {!isComplete ? (
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#D1D5DB]">{currentStep}</span>
                    <span className="text-sm text-[#9CA3AF]">{progress}%</span>
                  </div>
                  <div className="w-full bg-[#252C37] rounded-full h-2">
                    <div
                      className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const stepProgress = (progress / 100) * steps.length;
                    const isActive = index === Math.floor(stepProgress);
                    const isCompleted = index < Math.floor(stepProgress);

                    return (
                      <div
                        key={step}
                        className={`flex items-center gap-3 text-sm ${
                          isActive ? 'text-[#3B82F6]' : isCompleted ? 'text-[#10B981]' : 'text-[#6B7280]'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-[#3B82F6]' : 'border-[#6B7280]'}`} />
                        )}
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-3">Document Summary</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-[#252C37]">
                      <span className="text-[#D1D5DB]">Documents read successfully</span>
                      <span className="font-medium">{metrics.read}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#252C37]">
                      <span className="text-[#D1D5DB]">Documents auto-classified</span>
                      <span className="font-medium">{metrics.autoClassified}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#252C37]">
                      <span className="text-[#F59E0B]">Documents need review</span>
                      <span className="font-medium text-[#F59E0B]">{metrics.needReview}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#252C37]">
                      <span className="text-[#EF4444]">Documents unreadable</span>
                      <span className="font-medium text-[#EF4444]">{metrics.unreadable}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[#6B7280]">Duplicates found</span>
                      <span className="font-medium text-[#6B7280]">{metrics.duplicates}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-3">Local Workflow Notes</p>
                  <p className="text-sm text-[#D1D5DB] leading-6">
                    This prototype uses the local store only. Reclassifying a document, adding a new scan, or changing a review decision
                    will re-open affected items automatically.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-8">
                <div className="flex items-center gap-3 text-[#10B981] mb-6">
                  <CheckCircle size={24} />
                  <h2 className="text-xl font-semibold">Processing Complete</h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#D1D5DB]">Documents read successfully</span>
                    <span className="font-medium">{metrics.read}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#D1D5DB]">Documents auto-classified</span>
                    <span className="font-medium">{metrics.autoClassified}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#F59E0B]">Documents need review</span>
                    <span className="font-medium text-[#F59E0B]">{metrics.needReview}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#EF4444]">Documents unreadable</span>
                    <span className="font-medium text-[#EF4444]">{metrics.unreadable}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#6B7280]">Duplicates found</span>
                    <span className="font-medium text-[#6B7280]">{metrics.duplicates}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
