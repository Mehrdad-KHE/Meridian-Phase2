import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';

type PeriodType = 'annual' | 'q1' | 'q2' | 'q3' | 'q4' | 'h1' | 'h2' | 'monthly' | 'custom';

const periodTypeOptions: Array<{ value: PeriodType; label: string }> = [
  { value: 'annual', label: 'Annual / Full Year' },
  { value: 'q1', label: 'Quarterly (Q1)' },
  { value: 'q2', label: 'Quarterly (Q2)' },
  { value: 'q3', label: 'Quarterly (Q3)' },
  { value: 'q4', label: 'Quarterly (Q4)' },
  { value: 'h1', label: 'Semi-Annual (H1)' },
  { value: 'h2', label: 'Semi-Annual (H2)' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom Period' },
];

const monthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function monthRange(month: string, fiscalYear: string) {
  const index = monthOptions.indexOf(month);
  if (index < 0) {
    return '';
  }
  const date = new Date(Number(fiscalYear), index, 1);
  const start = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const end = new Date(Number(fiscalYear), index + 1, 0).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return `${start} - ${end}`;
}

export function SelectPeriod() {
  const navigate = useNavigate();
  const [fiscalYear, setFiscalYear] = useState('2025');
  const [periodType, setPeriodType] = useState<PeriodType>('annual');
  const [month, setMonth] = useState('January');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const periodDates = useMemo(() => {
    switch (periodType) {
      case 'annual':
        return `January 1, ${fiscalYear} - December 31, ${fiscalYear}`;
      case 'q1':
        return `January 1, ${fiscalYear} - March 31, ${fiscalYear}`;
      case 'q2':
        return `April 1, ${fiscalYear} - June 30, ${fiscalYear}`;
      case 'q3':
        return `July 1, ${fiscalYear} - September 30, ${fiscalYear}`;
      case 'q4':
        return `October 1, ${fiscalYear} - December 31, ${fiscalYear}`;
      case 'h1':
        return `January 1, ${fiscalYear} - June 30, ${fiscalYear}`;
      case 'h2':
        return `July 1, ${fiscalYear} - December 31, ${fiscalYear}`;
      case 'monthly':
        return monthRange(month, fiscalYear) || `Choose a month for ${fiscalYear}`;
      case 'custom':
        if (customStart && customEnd) {
          return `${customStart} - ${customEnd}`;
        }
        return 'Custom period selected - enter start and end dates.';
    }
  }, [customEnd, customStart, fiscalYear, month, periodType]);

  const canContinue = periodType !== 'custom' || Boolean(customStart && customEnd);

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F9FAFB]">
      <WorkflowRoadmap currentStage="setup" />

      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <button
            onClick={() => navigate('/setup/client')}
            className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded-lg text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-semibold mb-2 text-center">Select Accounting Period</h1>
            <p className="text-sm text-[#9CA3AF] text-center">Select the fiscal year and period</p>
          </div>
          <button
            onClick={() => navigate('/documents')}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#374151] disabled:text-[#9CA3AF] text-white py-2.5 px-5 rounded-lg text-sm font-medium"
          >
            Continue to Documents
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mb-4">
          <span className="text-sm bg-[#3B82F6] text-white px-3 py-1 rounded">ENGAGEMENT SETUP</span>
        </div>

        <div className="bg-[#1A1F28] border-l-4 border-[#3B82F6] rounded p-4 mb-6">
          <p className="text-sm">Botax Accounting → Babak Mohammadhosseini</p>
        </div>

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
                onChange={(e) => setPeriodType(e.target.value as PeriodType)}
                className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] appearance-none"
              >
                {periodTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" size={16} />
            </div>
          </div>

          {periodType === 'monthly' && (
            <div>
              <label className="block text-sm mb-2">
                Month <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] appearance-none"
                >
                  {monthOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" size={16} />
              </div>
            </div>
          )}

          {periodType === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">
                  Start Date <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  End Date <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          )}

          <div className="bg-[#1A1F28] border border-[#374151] rounded p-4">
            <p className="text-sm text-[#D1D5DB]">
              Period: <span className="font-medium">{periodDates}</span>
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

      </div>

      <p className="pb-4 text-center text-[10px] text-[#6B7280]">
        © Meridian — All rights reserved.
      </p>
    </div>
  );
}
