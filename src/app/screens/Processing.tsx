import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { EngagementContextBar } from '../components/EngagementContextBar';
import { Layout } from '../components/Layout';

export function Processing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Reading documents');
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    'Reading documents',
    'Extracting text',
    'Checking duplicates',
    'Classifying documents',
    'Matching to accounting categories',
    'Preparing review items',
  ];

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
            <h1 className="text-xl font-semibold pt-1">Processing</h1>
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
            <div className="flex-1 flex flex-col">
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
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#D1D5DB]">Documents auto-classified</span>
                    <span className="font-medium">26</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#F59E0B]">Documents need review</span>
                    <span className="font-medium text-[#F59E0B]">6</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#252C37]">
                    <span className="text-[#EF4444]">Documents unreadable</span>
                    <span className="font-medium text-[#EF4444]">0</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#6B7280]">Duplicates found</span>
                    <span className="font-medium text-[#6B7280]">0</span>
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
