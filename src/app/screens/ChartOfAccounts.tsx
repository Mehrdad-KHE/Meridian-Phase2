import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  ArrowRightLeft,
  Check,
  Download,
  PencilLine,
  Plus,
  Search,
  Upload,
  X,
} from 'lucide-react';
import { Layout } from '../components/Layout';

type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';

interface AccountCode {
  code: string;
  name: string;
  type: AccountType;
  category: string;
  subcategory?: string;
  gifiCode?: string;
  active: boolean;
  standard: boolean;
  customAdded: boolean;
}

interface AccountFormState extends AccountCode {}

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const accountTypes: AccountType[] = ['Asset', 'Liability', 'Equity', 'Income', 'Expense'];

const seedAccounts: AccountCode[] = [
  {
    code: '1000',
    name: 'Cash',
    type: 'Asset',
    category: 'Banking',
    subcategory: 'Operating cash',
    gifiCode: '1001',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '1200',
    name: 'Accounts Receivable',
    type: 'Asset',
    category: 'Working capital',
    gifiCode: '1002',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '1500',
    name: 'Prepaid Expenses',
    type: 'Asset',
    category: 'Current assets',
    gifiCode: '1004',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '2000',
    name: 'Accounts Payable',
    type: 'Liability',
    category: 'Current liabilities',
    gifiCode: '2001',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '2100',
    name: 'GST/HST Payable',
    type: 'Liability',
    category: 'Tax liabilities',
    gifiCode: '2002',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '3000',
    name: "Owner's Equity",
    type: 'Equity',
    category: 'Equity',
    gifiCode: '3001',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '4000',
    name: 'Sales Revenue',
    type: 'Income',
    category: 'Revenue',
    gifiCode: '8000',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '5000',
    name: 'Office Supplies',
    type: 'Expense',
    category: 'Office overhead',
    subcategory: 'Supplies and small equipment',
    gifiCode: '9060',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '5450',
    name: 'Vehicle Fuel Expense',
    type: 'Expense',
    category: 'Vehicle costs',
    subcategory: 'Fuel and mileage',
    gifiCode: '8811',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '5500',
    name: 'Meals & Entertainment',
    type: 'Expense',
    category: 'Meals and entertainment',
    subcategory: 'Client meals',
    gifiCode: '8523',
    active: true,
    standard: true,
    customAdded: false,
  },
  {
    code: '6100',
    name: 'Professional Fees',
    type: 'Expense',
    category: 'Professional services',
    subcategory: 'Accounting and legal',
    gifiCode: '9220',
    active: true,
    standard: true,
    customAdded: false,
  },
];

const emptyAccountForm: AccountFormState = {
  code: '',
  name: '',
  type: 'Expense',
  category: '',
  subcategory: '',
  gifiCode: '',
  active: true,
  standard: false,
  customAdded: true,
};

function downloadCsv(accounts: AccountCode[]) {
  const header = ['Code', 'Name', 'Type', 'Category', 'Subcategory', 'GIFI Code', 'Active', 'Standard', 'Custom Added'];
  const rows = accounts.map((account) => [
    account.code,
    account.name,
    account.type,
    account.category,
    account.subcategory ?? '',
    account.gifiCode ?? '',
    account.active ? 'Yes' : 'No',
    account.standard ? 'Yes' : 'No',
    account.customAdded ? 'Yes' : 'No',
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chart-of-accounts.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export function ChartOfAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<AccountCode[]>(seedAccounts);
  const [search, setSearch] = useState('');
  const [selectedCode, setSelectedCode] = useState(seedAccounts[0].code);
  const [message, setMessage] = useState('Local prototype data only. Changes stay in memory.');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [form, setForm] = useState<AccountFormState>(emptyAccountForm);
  const [importOpen, setImportOpen] = useState(false);

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return accounts.filter((account) =>
      query.length === 0 ||
      [account.code, account.name, account.type, account.category, account.subcategory ?? '', account.gifiCode ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [accounts, search]);

  const selectedAccount = accounts.find((account) => account.code === selectedCode) ?? accounts[0];

  const groupedAccounts = accountTypes.map((type) => ({
    type,
    rows: filteredAccounts.filter((account) => account.type === type),
  }));

  const openEditor = (mode: 'add' | 'edit', account?: AccountCode) => {
    setEditorMode(mode);
    if (account) {
      setEditingCode(account.code);
      setForm({ ...account });
    } else {
      setEditingCode(null);
      setForm({ ...emptyAccountForm, type: 'Expense' });
    }
    setEditorOpen(true);
  };

  const saveAccount = () => {
    if (!form.code.trim() || !form.name.trim()) {
      setMessage('Code and name are required.');
      return;
    }

    const nextAccount: AccountCode = {
      ...form,
      code: form.code.trim(),
      name: form.name.trim(),
      category: form.category.trim(),
      subcategory: form.subcategory?.trim() || undefined,
      gifiCode: form.gifiCode.trim() || undefined,
      standard: editorMode === 'add' ? false : form.standard,
      customAdded: editorMode === 'add' ? true : form.customAdded,
    };

    setAccounts((current) => {
      if (editorMode === 'edit' && editingCode) {
        return current.map((account) => (account.code === editingCode ? nextAccount : account));
      }
      if (current.some((account) => account.code === nextAccount.code)) {
        return current.map((account) => (account.code === nextAccount.code ? nextAccount : account));
      }
      return [...current, nextAccount];
    });

    setSelectedCode(nextAccount.code);
    setMessage(`${nextAccount.code} saved locally.`);
    setEditorOpen(false);
  };

  const importSampleRows = () => {
    const sampleImport: AccountCode[] = [
      {
        code: '6200',
        name: 'Software Subscriptions',
        type: 'Expense',
        category: 'Technology',
        subcategory: 'SaaS tools',
        gifiCode: '9060',
        active: true,
        standard: false,
        customAdded: true,
      },
      {
        code: '6250',
        name: 'Bank Charges',
        type: 'Expense',
        category: 'Finance',
        subcategory: 'Merchant fees',
        gifiCode: '9060',
        active: true,
        standard: false,
        customAdded: true,
      },
    ];

    setAccounts((current) => {
      const existing = new Set(current.map((account) => account.code));
      const additions = sampleImport.filter((account) => !existing.has(account.code));
      return [...current, ...additions];
    });
    setMessage('Sample import rows added locally.');
    setImportOpen(false);
  };

  const openImport = () => {
    setImportOpen(true);
  };

  const exportAccounts = () => {
    downloadCsv(accounts);
    setMessage('CSV export downloaded locally.');
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
              <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                Review and adjust the Canadian account code list used to map categories to GIFI codes during the prototype workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Accounts</p>
                <p className="text-2xl font-semibold">{accounts.length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Asset / Liability</p>
                <p className="text-2xl font-semibold text-[#3B82F6]">
                  {accounts.filter((account) => account.type === 'Asset' || account.type === 'Liability').length}
                </p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Mapped to GIFI</p>
                <p className="text-2xl font-semibold text-[#10B981]">
                  {accounts.filter((account) => Boolean(account.gifiCode)).length}
                </p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Custom added</p>
                <p className="text-2xl font-semibold text-[#F59E0B]">
                  {accounts.filter((account) => account.customAdded).length}
                </p>
              </div>
            </div>

            {message && (
              <div className="bg-[#10B981]/10 border border-[#10B981]/30 text-[#D1FAE5] rounded-lg px-4 py-3 text-sm">
                {message}
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search account code, name, category, or GIFI code"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditor('add')}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Account
                </button>
                <button
                  onClick={openImport}
                  className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Upload size={16} />
                  Import CSV
                </button>
                <button
                  onClick={exportAccounts}
                  className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Download size={16} />
                  Export Chart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_0.75fr] gap-4 items-start">
              <div className="space-y-4">
                {groupedAccounts.map((group) => (
                  <div key={group.type} className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#252C37] flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-semibold">{group.type}</h2>
                        <p className="text-xs text-[#6B7280]">Grouped Canadian accounts for prototype review.</p>
                      </div>
                      <div className="text-xs text-[#6B7280]">{group.rows.length} accounts</div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-[#252C37] text-xs uppercase tracking-wide text-[#9CA3AF]">
                          <tr>
                            <th className="px-4 py-3">Code</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">GIFI Code</th>
                            <th className="px-4 py-3">Active</th>
                            <th className="px-4 py-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map((account) => (
                            <tr
                              key={account.code}
                              onClick={() => setSelectedCode(account.code)}
                              className={`border-t border-[#252C37] cursor-pointer transition-colors ${
                                selectedCode === account.code ? 'bg-[#252C37]/70' : 'hover:bg-[#252C37]/40'
                              }`}
                            >
                              <td className="px-4 py-3 text-sm font-semibold">{account.code}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-start gap-2">
                                  <ArrowRightLeft size={14} className="mt-1 text-[#3B82F6]" />
                                  <div>
                                    <p className="text-sm font-medium">{account.name}</p>
                                    <p className="text-xs text-[#6B7280]">
                                      {account.category}
                                      {account.subcategory ? ` · ${account.subcategory}` : ''}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-[#D1D5DB]">{account.type}</td>
                              <td className="px-4 py-3 text-sm text-[#D1D5DB]">{account.gifiCode ?? '—'}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-medium ${
                                    account.active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                                  }`}
                                >
                                  {account.active ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    openEditor('edit', account);
                                  }}
                                  className="inline-flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#F9FAFB]"
                                >
                                  <PencilLine size={14} />
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Selected account</p>
                      <h3 className="text-lg font-semibold">{selectedAccount.name}</h3>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded bg-[#252C37] text-xs text-[#D1D5DB]">
                      {selectedAccount.code}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Type</span>
                      <span>{selectedAccount.type}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Category</span>
                      <span>{selectedAccount.category}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">GIFI Code</span>
                      <span>{selectedAccount.gifiCode ?? '—'}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Active</span>
                      <span>{selectedAccount.active ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Source</span>
                      <span>{selectedAccount.customAdded ? 'Custom added' : 'Standard'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Prototype Notes</h3>
                  <ul className="space-y-2 text-sm text-[#9CA3AF]">
                    <li>- Add/Edit actions update local state only.</li>
                    <li>- Export downloads a CSV snapshot of the current list.</li>
                    <li>- Import loads a small sample batch into the prototype.</li>
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
                  <p className="text-xs text-[#9CA3AF]">{editorMode === 'add' ? 'Add account' : 'Edit account'}</p>
                  <h3 className="text-lg font-semibold">{editorMode === 'add' ? 'New Chart of Accounts Entry' : `Edit ${form.code || 'account'}`}</h3>
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
                    placeholder="5000"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Office Supplies"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Type</span>
                  <select
                    value={form.type}
                    onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as AccountType }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    {accountTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">GIFI Code</span>
                  <input
                    value={form.gifiCode ?? ''}
                    onChange={(event) => setForm((current) => ({ ...current, gifiCode: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="9060"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Category</span>
                  <input
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Office overhead"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Subcategory</span>
                  <input
                    value={form.subcategory ?? ''}
                    onChange={(event) => setForm((current) => ({ ...current, subcategory: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Supplies and small equipment"
                  />
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Active
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.customAdded}
                    onChange={(event) => setForm((current) => ({ ...current, customAdded: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Custom added
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-[#252C37]">
                <p className="text-xs text-[#9CA3AF]">Standard = locked reference data. Custom added = locally created in this prototype.</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveAccount}
                    className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                  >
                    <Check size={16} />
                    Save Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {importOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-[#1A1F28] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#252C37]">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Import CSV</p>
                  <h3 className="text-lg font-semibold">Prototype import preview</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setImportOpen(false)}
                  className="p-2 rounded-full hover:bg-[#252C37] text-[#D1D5DB]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm text-[#9CA3AF]">
                  This prototype import adds a small local sample batch so you can see the account list change without claiming any backend sync.
                </p>

                <div className="bg-[#0F1419] border border-[#252C37] rounded-lg p-4 text-sm text-[#D1D5DB] space-y-2">
                  <div>6200 - Software Subscriptions → GIFI 9060</div>
                  <div>6250 - Bank Charges → GIFI 9060</div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setImportOpen(false)}
                    className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={importSampleRows}
                    className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                  >
                    <Upload size={16} />
                    Load Sample Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
