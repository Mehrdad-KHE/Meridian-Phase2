import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Check,
  Eye,
  FileText,
  Hash,
  PencilLine,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { Layout } from '../components/Layout';

type GIFIType = 'income-statement' | 'balance-sheet';

interface GIFICode {
  code: string;
  description: string;
  type: GIFIType;
  standard: boolean;
  customAllowed: boolean;
  mappedCategories: string[];
  accountCode: string;
  category: string;
}

interface GIFIFormState extends GIFICode {}

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const typeTabs: Array<{ label: string; value: 'all' | GIFIType }> = [
  { label: 'All', value: 'all' },
  { label: 'Income Statement', value: 'income-statement' },
  { label: 'Balance Sheet', value: 'balance-sheet' },
];

const seedCodes: GIFICode[] = [
  {
    code: '8000',
    description: 'Gross revenue from goods and services',
    type: 'income-statement',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Sales Revenue'],
    accountCode: '4000',
    category: 'Revenue',
  },
  {
    code: '8811',
    description: 'Motor vehicle expenses',
    type: 'income-statement',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Vehicle Fuel Expense'],
    accountCode: '5450',
    category: 'Expense',
  },
  {
    code: '9060',
    description: 'Office expenses',
    type: 'income-statement',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Office Supplies', 'Software Subscriptions'],
    accountCode: '5000',
    category: 'Expense',
  },
  {
    code: '9220',
    description: 'Professional fees',
    type: 'income-statement',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Professional Fees'],
    accountCode: '6100',
    category: 'Expense',
  },
  {
    code: '8523',
    description: 'Meals and entertainment',
    type: 'income-statement',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Meals & Entertainment'],
    accountCode: '5500',
    category: 'Expense',
  },
  {
    code: '1001',
    description: 'Cash and bank deposits',
    type: 'balance-sheet',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Operating Bank'],
    accountCode: '1000',
    category: 'Assets',
  },
  {
    code: '1002',
    description: 'Accounts receivable',
    type: 'balance-sheet',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Customer Invoices'],
    accountCode: '1200',
    category: 'Assets',
  },
  {
    code: '2001',
    description: 'Accounts payable',
    type: 'balance-sheet',
    standard: true,
    customAllowed: false,
    mappedCategories: ['Supplier Bills'],
    accountCode: '2000',
    category: 'Liabilities',
  },
];

const emptyForm: GIFIFormState = {
  code: '',
  description: '',
  type: 'income-statement',
  standard: false,
  customAllowed: true,
  mappedCategories: [],
  accountCode: '',
  category: 'Expense',
};

export function GIFICodes() {
  const navigate = useNavigate();
  const [codes, setCodes] = useState<GIFICode[]>(seedCodes);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | GIFIType>('all');
  const [selectedCode, setSelectedCode] = useState(seedCodes[0].code);
  const [message, setMessage] = useState('Standard GIFI codes are viewable locally in this prototype.');
  const [viewCode, setViewCode] = useState<GIFICode | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [form, setForm] = useState<GIFIFormState>(emptyForm);
  const [error, setError] = useState('');

  const filteredCodes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return codes.filter((code) => {
      const matchesTab = activeTab === 'all' || code.type === activeTab;
      const matchesSearch =
        query.length === 0 ||
        [code.code, code.description, code.category, code.accountCode, code.mappedCategories.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(query);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, codes, search]);

  const selectedRow = codes.find((code) => code.code === selectedCode) ?? codes[0];

  const openEditor = (mode: 'add' | 'edit', code?: GIFICode) => {
    setError('');
    setEditorMode(mode);
    if (code) {
      setEditingCode(code.code);
      setForm({ ...code });
    } else {
      setEditingCode(null);
      setForm(emptyForm);
    }
    setEditorOpen(true);
  };

  const openView = (code: GIFICode) => {
    setViewCode(code);
    setSelectedCode(code.code);
  };

  const saveCode = () => {
    const trimmedCode = form.code.trim();
    if (!/^\d{4}$/.test(trimmedCode)) {
      setError('GIFI code must be exactly 4 digits.');
      return;
    }
    if (!form.description.trim()) {
      setError('Description is required.');
      return;
    }

    const nextRow: GIFICode = {
      ...form,
      code: trimmedCode,
      description: form.description.trim(),
      accountCode: form.accountCode.trim(),
      mappedCategories: form.mappedCategories.filter((category) => category.trim().length > 0),
      customAllowed: true,
      standard: editorMode === 'add' ? false : form.standard,
    };

    setCodes((current) => {
      if (editorMode === 'edit' && editingCode) {
        return current.map((code) => (code.code === editingCode ? nextRow : code));
      }
      if (current.some((code) => code.code === nextRow.code)) {
        return current.map((code) => (code.code === nextRow.code ? nextRow : code));
      }
      return [...current, nextRow];
    });

    setSelectedCode(nextRow.code);
    setMessage(`${nextRow.code} saved locally.`);
    setEditorOpen(false);
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
              ← Back to Accounting Setup
            </button>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">GIFI / Standard Codes</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                View Canadian tax reporting codes, inspect mapped categories, and add local custom codes for the prototype.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Income statement</p>
                <p className="text-2xl font-semibold">{codes.filter((code) => code.type === 'income-statement').length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Balance sheet</p>
                <p className="text-2xl font-semibold text-[#3B82F6]">{codes.filter((code) => code.type === 'balance-sheet').length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Mapped rows</p>
                <p className="text-2xl font-semibold text-[#10B981]">{codes.filter((code) => code.mappedCategories.length > 0).length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Custom codes</p>
                <p className="text-2xl font-semibold text-[#F59E0B]">{codes.filter((code) => !code.standard).length}</p>
              </div>
            </div>

            {message && (
              <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#DBEAFE] rounded-lg px-4 py-3 text-sm">
                {message}
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search code, description, category, or account"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditor('add')}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Custom Code
                </button>
                <button
                  onClick={() => setMessage('Standard codes can be reviewed locally; custom codes remain prototype-only.')}
                  className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <FileText size={16} />
                  Review Guide
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_0.85fr] gap-4 items-start">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-[#252C37]">
                  <div>
                    <h2 className="text-sm font-semibold">GIFI Codes</h2>
                    <p className="text-xs text-[#6B7280]">Standard Canadian GIFI rows with mapped categories and accounts.</p>
                  </div>

                  <div className="flex gap-2">
                    {typeTabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-3 py-1.5 rounded text-xs font-medium border ${
                          activeTab === tab.value
                            ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                            : 'bg-[#252C37] border-[#252C37] text-[#9CA3AF] hover:text-[#F9FAFB]'
                        }`}
                      >
                        {tab.label}
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
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Mapped Categories / Account</th>
                        <th className="px-4 py-3">Action</th>
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
                              <div>
                                <p className="text-sm text-[#D1D5DB]">{row.description}</p>
                                <p className="text-xs text-[#6B7280]">{row.standard ? 'Standard code' : 'Custom code'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{row.category}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">
                            <div className="space-y-1">
                              <p>{row.mappedCategories.join(', ') || 'Unmapped'}</p>
                              <p className="text-xs text-[#6B7280]">Account {row.accountCode || '—'}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openView(row);
                                }}
                                className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded"
                              >
                                <Eye size={14} />
                                View Mappings
                              </button>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openEditor('edit', row);
                                }}
                                className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded"
                              >
                                <PencilLine size={14} />
                                Edit
                              </button>
                            </div>
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
                      {selectedRow.type === 'income-statement' ? 'Income Statement' : 'Balance Sheet'}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Description</span>
                      <span className="text-right max-w-[60%]">{selectedRow.description}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Mapped categories</span>
                      <span>{selectedRow.mappedCategories.length}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Account code</span>
                      <span>{selectedRow.accountCode || '—'}</span>
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
                    <li>- 8000 - Gross revenue from goods and services</li>
                    <li>- 8811 - Motor vehicle expenses</li>
                    <li>- 9060 - Office expenses</li>
                    <li>- 9220 - Professional fees</li>
                    <li>- 8523 - Meals and entertainment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {editorOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-[#1A1F28] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#252C37]">
                <div>
                  <p className="text-xs text-[#9CA3AF]">{editorMode === 'add' ? 'Add custom code' : 'Edit code'}</p>
                  <h3 className="text-lg font-semibold">
                    {editorMode === 'add' ? 'New GIFI Code' : `Edit ${form.code || 'GIFI code'}`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="p-2 rounded-full hover:bg-[#252C37] text-[#D1D5DB]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Code</span>
                  <input
                    value={form.code}
                    onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="9000"
                  />
                  <p className="text-xs text-[#6B7280]">Must be exactly 4 digits.</p>
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Type</span>
                  <select
                    value={form.type}
                    onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as GIFIType }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="income-statement">Income Statement</option>
                    <option value="balance-sheet">Balance Sheet</option>
                  </select>
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Description</span>
                  <input
                    value={form.description}
                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Custom Canadian sample code"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Category</span>
                  <input
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Expense"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Account code</span>
                  <input
                    value={form.accountCode}
                    onChange={(event) => setForm((current) => ({ ...current, accountCode: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="5000"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Mapped categories</span>
                  <input
                    value={form.mappedCategories.join(', ')}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        mappedCategories: event.target.value
                          .split(',')
                          .map((item) => item.trim())
                          .filter((item) => item.length > 0),
                      }))
                    }
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Office Supplies, Meals & Entertainment"
                  />
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.standard}
                    onChange={(event) => setForm((current) => ({ ...current, standard: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Standard code
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.customAllowed}
                    onChange={(event) => setForm((current) => ({ ...current, customAllowed: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Custom allowed
                </label>
              </div>

              {error && (
                <div className="mx-5 mb-5 rounded-lg border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 py-3 text-sm text-[#FDE68A]">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#252C37]">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveCode}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Check size={16} />
                  Save Code
                </button>
              </div>
            </div>
          </div>
        )}

        {viewCode && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-[#1A1F28] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#252C37]">
                <div>
                  <p className="text-xs text-[#9CA3AF]">View mappings</p>
                  <h3 className="text-lg font-semibold">{viewCode.code}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setViewCode(null)}
                  className="p-2 rounded-full hover:bg-[#252C37] text-[#D1D5DB]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm text-[#D1D5DB]">{viewCode.description}</p>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                    <span className="text-[#9CA3AF]">Mapped categories</span>
                    <span>{viewCode.mappedCategories.join(', ') || 'Unmapped'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                    <span className="text-[#9CA3AF]">Account code</span>
                    <span>{viewCode.accountCode || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                    <span className="text-[#9CA3AF]">Validation</span>
                    <span>4 digits required</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9CA3AF]">Source</span>
                    <span>{viewCode.standard ? 'Standard code' : 'Custom code'}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-[#252C37] flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewCode(null)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
