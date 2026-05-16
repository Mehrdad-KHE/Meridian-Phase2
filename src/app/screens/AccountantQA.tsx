import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';
import { Layout } from '../components/Layout';

type Question = {
  id: number;
  question: string;
  relatedDocuments: string[];
  status: 'Awaiting Answer' | 'Answered' | 'Cancelled';
  answer?: string;
  date: string;
};

export function AccountantQA() {
  const navigate = useNavigate();
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: 'Are these home office equipment purchases fully deductible or should they be depreciated?',
      relatedDocuments: ['Laptop receipt - $2,500', 'Office chair - $450', 'Monitor - $600'],
      status: 'Answered',
      answer:
        'For equipment over $500, these should be depreciated as capital assets. The chair under $500 can be expensed immediately. Please categorize the laptop and monitor as capital purchases.',
      date: '2025-05-10',
    },
    {
      id: 2,
      question: 'Vehicle registration shows personal use. What percentage should be allocated to business?',
      relatedDocuments: ['Vehicle registration 2025', 'Fuel receipts (monthly)'],
      status: 'Awaiting Answer',
      date: '2025-05-11',
    },
  ]);

  const getStatusIcon = (status: string) => {
    if (status === 'Answered') return <CheckCircle size={16} className="text-[#10B981]" />;
    if (status === 'Awaiting Answer') return <Clock size={16} className="text-[#F59E0B]" />;
    return <MessageSquare size={16} className="text-[#6B7280]" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Answered') return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20';
    if (status === 'Awaiting Answer') return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20';
    return 'text-[#6B7280] bg-[#6B7280]/10 border-[#6B7280]/20';
  };

  return (
    <Layout engagementName="Botax Accounting → Babak Mohammadhosseini → 2025 Annual">
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col">
        <WorkflowRoadmap currentStage="qa" />

        <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6 flex justify-center">
          <p className="text-xs text-[#9CA3AF] text-center w-full">Botax Accounting → Babak Mohammadhosseini → 2025 Annual</p>
        </div>

        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-4 overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/review')}
              className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to Review
            </button>
            <div>
              <h1 className="text-xl font-semibold mb-1">Accountant Q&A</h1>
              <p className="text-xs text-[#6B7280]">Questions sent to your accountant for evidence and guidance.</p>
            </div>
            <div className="w-[132px]" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {questions.map((question) => (
              <div key={question.id} className="bg-[#1A1F28] border border-[#252C37] rounded p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(question.status)}
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getStatusColor(question.status)}`}>{question.status}</span>
                      <span className="text-[10px] text-[#6B7280]">{question.date}</span>
                    </div>
                    <h3 className="text-sm font-medium mb-2">{question.question}</h3>
                  </div>
                </div>

                <div className="bg-[#252C37] rounded p-3 mb-3">
                  <p className="text-[10px] text-[#6B7280] mb-1.5">Related Documents:</p>
                  <ul className="space-y-1">
                    {question.relatedDocuments.map((doc, idx) => (
                      <li key={idx} className="text-xs text-[#D1D5DB] flex items-center gap-2">
                        <span className="text-[#3B82F6]">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {question.answer && (
                  <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded p-3 mb-3">
                    <p className="text-[10px] text-[#10B981] font-medium mb-1.5">Accountant&apos;s Answer:</p>
                    <p className="text-xs text-[#D1D5DB]">{question.answer}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {question.status === 'Answered' && (
                    <button
                      onClick={() => navigate('/review')}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-1.5 px-3 rounded text-xs font-medium"
                    >
                      Return to Review
                    </button>
                  )}
                  {question.status === 'Awaiting Answer' && (
                    <button className="border border-[#374151] text-[#6B7280] py-1.5 px-3 rounded text-xs font-medium cursor-not-allowed opacity-50">
                      Waiting for response...
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
