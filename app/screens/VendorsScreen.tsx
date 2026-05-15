import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store, Plus, TrendingUp } from 'lucide-react';

export function VendorsScreen() {
  const { state, createVendorRule } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState('');
  const [accountCode, setAccountCode] = useState('');

  const handleCreate = () => {
    if (!vendorName.trim() || !category.trim() || !accountCode.trim()) return;
    createVendorRule(vendorName, category, accountCode);
    setVendorName('');
    setCategory('');
    setAccountCode('');
    setShowCreate(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-white">Vendor Directory</h2>
            <p className="text-slate-400 mt-1">
              Learned vendor rules and chart of accounts mappings
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Vendor Rule
          </button>
        </div>

        {showCreate && (
          <div className="bg-slate-900 border border-blue-600 rounded-lg p-6 mb-6">
            <h3 className="text-white mb-4">Create Vendor Rule</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Vendor Name</label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={e => setVendorName(e.target.value)}
                  placeholder="e.g., Home Depot"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Default Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="e.g., Materials"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Account Code</label>
                <input
                  type="text"
                  value={accountCode}
                  onChange={e => setAccountCode(e.target.value)}
                  placeholder="e.g., 5100"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={!vendorName.trim() || !category.trim() || !accountCode.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-lg transition-colors"
              >
                Create Rule
              </button>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setVendorName('');
                  setCategory('');
                  setAccountCode('');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {state.vendorRules.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
            <Store className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">
              No vendor rules yet. The system will learn vendor patterns as you process documents.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-400">Vendor Name</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-400">Default Category</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-400">Account Code</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-400">Tax Code</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-400">Personal</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-400">Last Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {state.vendorRules.map(vendor => (
                  <tr key={vendor.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-white">{vendor.vendorName}</td>
                    <td className="px-4 py-3 text-slate-300">{vendor.defaultCategory}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{vendor.defaultAccountCode}</td>
                    <td className="px-4 py-3 text-slate-300">{vendor.defaultTaxCode}</td>
                    <td className="px-4 py-3">
                      {vendor.isPersonalVendor ? (
                        <span className="px-2 py-1 bg-orange-900 text-orange-200 rounded text-xs">
                          Personal
                        </span>
                      ) : (
                        <span className="text-slate-500">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {new Date(vendor.lastUsedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Chart of Accounts */}
        <div className="mt-8">
          <h3 className="text-xl text-white mb-4">Chart of Accounts</h3>
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="overflow-auto max-h-96">
              <table className="w-full">
                <thead className="bg-slate-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Code</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Account Name</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Type</th>
                    <th className="px-4 py-3 text-left text-sm text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {state.chartOfAccounts.map(account => (
                    <tr key={account.code} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 text-white font-mono">{account.code}</td>
                      <td className="px-4 py-3 text-slate-300">{account.name}</td>
                      <td className="px-4 py-3">
                        <span className={`
                          px-2 py-1 rounded text-xs capitalize
                          ${account.type === 'asset' ? 'bg-green-900 text-green-200' :
                            account.type === 'liability' ? 'bg-red-900 text-red-200' :
                            account.type === 'equity' ? 'bg-purple-900 text-purple-200' :
                            account.type === 'income' ? 'bg-blue-900 text-blue-200' :
                            'bg-orange-900 text-orange-200'}
                        `}>
                          {account.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {account.isActive ? (
                          <span className="text-green-400">Active</span>
                        ) : (
                          <span className="text-slate-600">Inactive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
