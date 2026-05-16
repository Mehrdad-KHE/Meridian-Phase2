import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, FileText, Hash, Plus, Search, Layers3, Building2 } from 'lucide-react';
import { Layout } from '../components/Layout';

type GIFIGroup = 'Income Statement' | 'Balance Sheet';

type GIFICodeRow = {
  code: string;
  description: string;
  group: GIFIGroup;
  mappedCategories: string[];
  accountCode: string;
  status: 'Standard' | 'Mapped' | 'Custom';
};

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const gifiCodes: GIFICodeRow[] = [
  { code: '8000', description: 'Gross revenue from services and goods', group: 'Income Statement', mappedCategories: ['Sales'], accountCode: '4000', status: 'Standard' },
  { code: '8811', description: 'Motor vehicle expenses', group: 'Income Statement', mappedCategories: ['Vehicle Fuel'], accountCode: '5450', status: 'Mapped' },
  { code: '9060', description: 'Office expenses', group: 'Income Statement', mappedCategories: ['Office Supplies'], accountCode: '5000', status: 'Mapped' },
  { code: '9220', description: 'Professional fees', group: 'Income Statement', mappedCategories: ['Legal', 'Accounting'], accountCode: '6100', status: 'Mapped' },
  { code: '8523', description: 'Meals and entertainment', group: 'Income Statement', mappedCategories: ['Meals & Entertainment'], accountCode: '5500', status: 'Mapped' },
  { code: '1001', description: 'Cash and bank deposits', group: 'Balance Sheet', mappedCategories: ['Operating Bank'], accountCode: '1000', status: 'Standard' },
  { code: '1002', description: 'Accounts receivable', group: 'Balance Sheet', mappedCategories: ['Customer Invoices'], accountCode: '1200', status: 'Standard' },
  { code: '2001', description: 'Accounts payable', group: 'Balance Sheet', mappedCategories: ['Supplier Bills'], accountCode: '2000', status: 'Standard' },
];

export function GIFICodes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState<'All' | GIFIGroup>('All');
  const [selectedCode, setSelectedCode] = useState('8811');

  const filteredCodes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return gifiCodes.filter((row) => {
      const matchesSearch =
        query.length === 0 ||
        [row.code, row.description, row.group, row.accountCode, row.mappedCategories.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const matchesGroup = activeGroup === 'All' || row.group === activeGroup;
      return matchesSearch && matchesGroup;
    });
  }, [search, activeGroup]);

  const selectedRow = gifiCodes.find((row) => row.code === selectedCode) ?? gifiCodes[0];

  return (
    <Layout engagementName={engagementName}>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6">
          <p className="text-xs text-[#9CA3AF]">{engagementName}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
            <button
              onClick={() => navigate('/accounting-setup')}
              className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] w-fit"
            >
              <ArrowLeft size={16} />
              Back to Accounting Setup
            </button>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">GIFI / Standard Codes</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                View and manage Canadian GIFI codes used for tax reporting and code-to-category mapping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Standard codes</p>
                <p className="text-2xl font-semibold">{gifiCodes.filter((row) => row.status === 'Standard').length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Mapped codes</p>
                <p className="text-2xl font-semibold text-[#10B981]">{gifiCodes.filter((row) => row.status === 'Mapped').length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Custom codes</p>
                <p className="text-2xl font-semibold text-[#F59E0B]">{gifiCodes.filter((row) => row.status === 'Custom').length}</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-xl">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search GIFI codes, descriptions, or mappings"
                    className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <select
                  value={activeGroup}
                  onChange={(e) => setActiveGroup(e.target.value as 'All' | GIFIGroup)}
                  className="bg-[#1A1F28] border border-[#252C37] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                >
                  <option>All</option>
                  <option>Income Statement</option>
                  <option>Balance Sheet</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Plus size={16} />
                  Add Custom Code
                </button>
                <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                  <FileText size={16} />
                  Import CSV
                </button>
                <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Layers3 size={16} />
                  View Mappings
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-4 items-start">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#252C37]">
                  <div>
                    <h2 className="text-sm font-semibold">GIFI Codes</h2>
                    <p className="text-xs text-[#6B7280]">Standard Canadian codes with account and category links.</p>
                  </div>
                  <div className="flex gap-2">
                    {(['All', 'Income Statement', 'Balance Sheet'] as const).map((group) => (
                      <button
                        key={group}
                        onClick={() => setActiveGroup(group)}
                        className={`px-3 py-1.5 rounded text-xs font-medium border ${
                          activeGroup === group
                            ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                            : 'bg-[#252C37] border-[#252C37] text-[#9CA3AF] hover:text-[#F9FAFB]'
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-[#252C37] text-xs uppercase tracking-wide text-[#9CA3AF]">
                      <tr>
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Group</th>
                        <th className="px-4 py-3">Account</th>
                        <th className="px-4 py-3">Mapped Categories</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCodes.map((row) => (
                        <tr
                          key={row.code}
                          onClick={() => setSelectedCode(row.code)}
                          className={`border-t border-[#252C37] cursor-pointer transition-colors ${
                            selectedCode === row.code ? 'bg-[#252C37]/70' : 'hover:bg-[#252C37]/40'
                          }`}
                        >
                          <td className="px-4 py-3 text-sm font-semibold">{row.code}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <Hash size={14} className="mt-1 text-[#3B82F6]" />
                              <p className="text-sm text-[#D1D5DB]">{row.description}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.group}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.accountCode}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.mappedCategories.join(', ')}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-medium ${
                                row.status === 'Mapped'
                                  ? 'bg-[#10B981]/10 text-[#10B981]'
                                  : row.status === 'Custom'
                                  ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                                  : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Selected code</p>
                      <h3 className="text-lg font-semibold">{selectedRow.code}</h3>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded bg-[#252C37] text-xs text-[#D1D5DB]">
                      {selectedRow.group}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Description</span>
                      <span className="text-right max-w-[60%]">{selectedRow.description}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Account code</span>
                      <span>{selectedRow.accountCode}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Mapped categories</span>
                      <span>{selectedRow.mappedCategories.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Validation</span>
                      <span>4 digits required</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Common examples</h3>
                  <ul className="space-y-2 text-sm text-[#9CA3AF]">
                    <li>• 8000 - Gross revenue</li>
                    <li>• 8811 - Subcontracts / vehicle expenses</li>
                    <li>• 9060 - Office expenses</li>
                    <li>• 9220 - Professional fees</li>
                    <li>• 8523 - Advertising and promotion / meals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
