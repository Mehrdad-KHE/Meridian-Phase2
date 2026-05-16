import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRightLeft, Check, FileText, Plus, Search, Trash2 } from 'lucide-react';
import { Layout } from '../components/Layout';

type MappingRow = {
  id: string;
  category: string;
  accountCode: string;
  gifiCode: string;
  taxTreatment: 'HST Included' | 'GST Included' | 'GST/HST Excluded';
  deductible: boolean;
  status: 'Active' | 'Needs review';
};

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const mappingSeed: MappingRow[] = [
  { id: 'vehicle-fuel', category: 'Vehicle Fuel Expense', accountCode: '5450', gifiCode: '8811', taxTreatment: 'HST Included', deductible: true, status: 'Active' },
  { id: 'office-supplies', category: 'Office Supplies', accountCode: '5000', gifiCode: '9060', taxTreatment: 'HST Included', deductible: true, status: 'Active' },
  { id: 'meals', category: 'Meals & Entertainment', accountCode: '5500', gifiCode: '8523', taxTreatment: 'HST Included', deductible: true, status: 'Needs review' },
  { id: 'professional-fees', category: 'Professional Fees', accountCode: '6100', gifiCode: '9220', taxTreatment: 'HST Included', deductible: true, status: 'Active' },
  { id: 'software', category: 'Software Subscriptions', accountCode: '6200', gifiCode: '9060', taxTreatment: 'GST Included', deductible: true, status: 'Active' },
];

const categoryOptions = ['Vehicle Fuel Expense', 'Office Supplies', 'Meals & Entertainment', 'Professional Fees', 'Software Subscriptions'];
const accountOptions = ['5000', '5450', '5500', '6100', '6200'];
const gifiOptions = ['8000', '8523', '8811', '9060', '9220'];
const taxOptions = ['HST Included', 'GST Included', 'GST/HST Excluded'];

export function CategoryMapping() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('vehicle-fuel');
  const [rows, setRows] = useState(mappingSeed);

  const filteredRows = rows.filter((row) => {
    const query = search.trim().toLowerCase();
    return (
      query.length === 0 ||
      [row.category, row.accountCode, row.gifiCode, row.taxTreatment, row.status]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  });

  const selectedRow = rows.find((row) => row.id === selectedId) ?? rows[0];

  const updateSelected = (patch: Partial<MappingRow>) => {
    setRows((current) =>
      current.map((row) => (row.id === selectedId ? { ...row, ...patch } : row)),
    );
  };

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
              <h1 className="text-2xl font-semibold">Category Mapping</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                Map document categories to account codes and GIFI codes using Canadian accounting treatments and deductible flags.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories, accounts, GIFI codes, or tax treatment"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Plus size={16} />
                  Add New Mapping
                </button>
                <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                  <FileText size={16} />
                  Import CSV
                </button>
                <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                  <ArrowRightLeft size={16} />
                  Export Template
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-4 items-start">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-[#252C37] flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">Category to Code Mappings</h2>
                    <p className="text-xs text-[#6B7280]">Click a row to review or edit the mapping details.</p>
                  </div>
                  <div className="text-xs text-[#6B7280]">{filteredRows.length} mappings</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-[#252C37] text-xs uppercase tracking-wide text-[#9CA3AF]">
                      <tr>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Account Code</th>
                        <th className="px-4 py-3">GIFI Code</th>
                        <th className="px-4 py-3">Tax Treatment</th>
                        <th className="px-4 py-3">Deductible</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedId(row.id)}
                          className={`border-t border-[#252C37] cursor-pointer transition-colors ${
                            selectedId === row.id ? 'bg-[#252C37]/70' : 'hover:bg-[#252C37]/40'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <ArrowRightLeft size={14} className="mt-1 text-[#3B82F6]" />
                              <div>
                                <p className="text-sm font-medium">{row.category}</p>
                                <p className="text-xs text-[#6B7280]">Canadian sample mapping</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.accountCode}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.gifiCode}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.taxTreatment}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-medium ${row.deductible ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                              {row.deductible ? 'Yes' : 'Partial'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-medium ${row.status === 'Active' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
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
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Edit mapping</p>
                      <h3 className="text-lg font-semibold">{selectedRow.category}</h3>
                    </div>
                    <button className="inline-flex items-center gap-2 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <label className="space-y-1">
                      <span className="text-[#9CA3AF]">Category</span>
                      <select
                        value={selectedRow.category}
                        onChange={(e) => updateSelected({ category: e.target.value })}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 focus:outline-none focus:border-[#3B82F6]"
                      >
                        {categoryOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1">
                      <span className="text-[#9CA3AF]">Account Code</span>
                      <select
                        value={selectedRow.accountCode}
                        onChange={(e) => updateSelected({ accountCode: e.target.value })}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 focus:outline-none focus:border-[#3B82F6]"
                      >
                        {accountOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1">
                      <span className="text-[#9CA3AF]">GIFI Code</span>
                      <select
                        value={selectedRow.gifiCode}
                        onChange={(e) => updateSelected({ gifiCode: e.target.value })}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 focus:outline-none focus:border-[#3B82F6]"
                      >
                        {gifiOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1">
                      <span className="text-[#9CA3AF]">Tax Treatment</span>
                      <select
                        value={selectedRow.taxTreatment}
                        onChange={(e) => updateSelected({ taxTreatment: e.target.value as MappingRow['taxTreatment'] })}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 focus:outline-none focus:border-[#3B82F6]"
                      >
                        {taxOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                      <input
                        type="checkbox"
                        checked={selectedRow.deductible}
                        onChange={(e) => updateSelected({ deductible: e.target.checked })}
                        className="accent-[#3B82F6]"
                      />
                      Deductible expense
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                      <Check size={16} />
                      Save Changes
                    </button>
                    <button className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                      Reset
                    </button>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Why this mapping matters</h3>
                  <p className="text-sm text-[#9CA3AF] leading-6">
                    This prototype keeps category-to-code mapping local and editable so the team can review Canadian account and GIFI assignments before export.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
