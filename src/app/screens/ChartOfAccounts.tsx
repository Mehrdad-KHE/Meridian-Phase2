import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Building2, FileText, Plus, Search, PencilLine, CircleDollarSign } from 'lucide-react';
import { Layout } from '../components/Layout';

type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';

type AccountRow = {
  code: string;
  name: string;
  type: AccountType;
  gifi: string;
  taxTreatment: string;
  status: 'Mapped' | 'Needs review' | 'Active';
  description: string;
};

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const accounts: AccountRow[] = [
  { code: '1000', name: 'Bank - Operating', type: 'Asset', gifi: '1001', taxTreatment: 'N/A', status: 'Mapped', description: 'Primary operating cash account.' },
  { code: '1200', name: 'Accounts Receivable', type: 'Asset', gifi: '1002', taxTreatment: 'N/A', status: 'Mapped', description: 'Outstanding customer balances.' },
  { code: '2000', name: 'Accounts Payable', type: 'Liability', gifi: '2001', taxTreatment: 'N/A', status: 'Mapped', description: 'Supplier balances due.' },
  { code: '3000', name: "Owner's Equity", type: 'Equity', gifi: '3001', taxTreatment: 'N/A', status: 'Active', description: 'Owner contribution and retained earnings.' },
  { code: '4000', name: 'Sales Revenue', type: 'Income', gifi: '8000', taxTreatment: 'GST/HST excluded', status: 'Mapped', description: 'Service and product revenue.' },
  { code: '5450', name: 'Vehicle Fuel Expense', type: 'Expense', gifi: '8811', taxTreatment: 'HST included', status: 'Mapped', description: 'Fuel and vehicle operating costs.' },
  { code: '5000', name: 'Office Supplies', type: 'Expense', gifi: '9060', taxTreatment: 'HST included', status: 'Mapped', description: 'Paper, pens, printer supplies, and small office items.' },
  { code: '5500', name: 'Meals & Entertainment', type: 'Expense', gifi: '8523', taxTreatment: 'HST included', status: 'Needs review', description: 'Meals subject to partial deduction handling.' },
  { code: '6100', name: 'Professional Fees', type: 'Expense', gifi: '9220', taxTreatment: 'HST included', status: 'Active', description: 'Bookkeeping, legal, and consulting fees.' },
];

export function ChartOfAccounts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | AccountType>('All');
  const [selectedCode, setSelectedCode] = useState('5450');

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return accounts.filter((account) => {
      const matchesSearch =
        query.length === 0 ||
        [account.code, account.name, account.type, account.gifi, account.description]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const matchesType = typeFilter === 'All' || account.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const selectedAccount = accounts.find((account) => account.code === selectedCode) ?? accounts[0];

  return (
    <Layout engagementName={engagementName}>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6">
          <p className="text-xs text-[#9CA3AF]">{engagementName}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate('/accounting-setup')}
                className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] w-fit"
              >
                <ArrowLeft size={16} />
                Back to Accounting Setup
              </button>

              <div>
                <h1 className="text-2xl font-semibold mb-2">Chart of Accounts</h1>
                <p className="text-sm text-[#9CA3AF] max-w-3xl">
                  View and manage the working account code list used for mapping document categories to Canadian accounting codes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF] mb-1">Accounts</p>
                  <p className="text-2xl font-semibold">{accounts.length}</p>
                </div>
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF] mb-1">Mapped to GIFI</p>
                  <p className="text-2xl font-semibold">{accounts.filter((account) => account.status === 'Mapped').length}</p>
                </div>
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF] mb-1">Needs review</p>
                  <p className="text-2xl font-semibold text-[#F59E0B]">
                    {accounts.filter((account) => account.status === 'Needs review').length}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <div className="relative flex-1 max-w-xl">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search accounts, codes, or descriptions"
                      className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as 'All' | AccountType)}
                    className="bg-[#1A1F28] border border-[#252C37] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option>All</option>
                    <option>Asset</option>
                    <option>Liability</option>
                    <option>Equity</option>
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                    <Plus size={16} />
                    Add Account
                  </button>
                  <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                    <FileText size={16} />
                    Import CSV
                  </button>
                  <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                    <CircleDollarSign size={16} />
                    Export List
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_0.85fr] gap-4 items-start">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-[#252C37] flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">Account Codes</h2>
                    <p className="text-xs text-[#6B7280]">Canadian account codes and related GIFI assignments.</p>
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    Showing {filteredAccounts.length} of {accounts.length}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-[#252C37] text-xs uppercase tracking-wide text-[#9CA3AF]">
                      <tr>
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">GIFI</th>
                        <th className="px-4 py-3">Tax</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map((account) => (
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
                              <Building2 size={14} className="mt-1 text-[#3B82F6]" />
                              <div>
                                <p className="text-sm font-medium">{account.name}</p>
                                <p className="text-xs text-[#6B7280]">{account.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{account.type}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{account.gifi}</td>
                          <td className="px-4 py-3 text-sm text-[#D1D5DB]">{account.taxTreatment}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-medium ${
                                account.status === 'Mapped'
                                  ? 'bg-[#10B981]/10 text-[#10B981]'
                                  : account.status === 'Needs review'
                                  ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                                  : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                              }`}
                            >
                              {account.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="inline-flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#F9FAFB]">
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
                      <span className="text-[#9CA3AF]">GIFI</span>
                      <span>{selectedAccount.gifi}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Tax</span>
                      <span>{selectedAccount.taxTreatment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Status</span>
                      <span>{selectedAccount.status}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Prototype Notes</h3>
                  <ul className="space-y-2 text-sm text-[#9CA3AF]">
                    <li>• Accounts are local sample data only.</li>
                    <li>• GIFI links are Canadian reporting examples.</li>
                    <li>• Changes are not persisted to any backend.</li>
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
