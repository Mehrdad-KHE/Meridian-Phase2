import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';

export function SelectPeriod() {
  const navigate = useNavigate();
  const [fiscalYear, setFiscalYear] = useState('2025');
  const [periodType, setPeriodType] = useState('Annual / Full Year');

  const getPeriodDates = () => {
    if (periodType === 'Annual / Full Year') {
      return `January 1, ${fiscalYear} - December 31, ${fiscalYear}`;
    }
    return 'Select period type to see dates';
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F9FAFB]">
      <WorkflowRoadmap currentStage="setup" />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Select Accounting Period</h1>

        <div className="mb-4">
          <span className="text-sm bg-[#3B82F6] text-white px-3 py-1 rounded">ENGAGEMENT SETUP</span>
        </div>

        <div className="bg-[#1A1F28] border-l-4 border-[#3B82F6] rounded p-4 mb-6">
          <p className="text-sm">Botax Accounting → Babak Mohammadhosseini</p>
        </div>

        <p className="text-sm text-[#9CA3AF] mb-8">Select the fiscal year and period</p>

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm mb-2">
              Fiscal Year <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <select
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] appearance-none"
              >
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Period Type <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <select
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
                className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] appearance-none"
              >
                <option>Annual / Full Year</option>
                <option>Quarterly (Q1)</option>
                <option>Quarterly (Q2)</option>
                <option>Quarterly (Q3)</option>
                <option>Quarterly (Q4)</option>
                <option>Semi-Annual (H1)</option>
                <option>Semi-Annual (H2)</option>
                <option>Monthly</option>
                <option>Custom Period</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" size={16} />
            </div>
          </div>

          <div className="bg-[#1A1F28] border border-[#374151] rounded p-4">
            <p className="text-sm text-[#D1D5DB]">
              Period: <span className="font-medium">{getPeriodDates()}</span>
            </p>
          </div>

          <div className="text-sm text-[#9CA3AF]">
            <p className="mb-2">Period options:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Annual / Full Year</li>
              <li>Quarterly (Q1, Q2, Q3, Q4)</li>
              <li>Semi-Annual (H1, H2)</li>
              <li>Monthly</li>
              <li>Custom Period</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/setup/client')}
            className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/documents')}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
          >
            Continue to Documents
          </button>
        </div>
      </div>
    </div>
  );
}
