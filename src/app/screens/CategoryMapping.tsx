import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRightLeft,
  Check,
  PencilLine,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { EngagementContextBar } from '../components/EngagementContextBar';

type TaxTreatment = 'None' | 'HST Included' | 'GST Included' | 'GST/HST Excluded';

interface CategoryMapping {
  id: string;
  categoryName: string;
  accountCode: string;
  gifiCode?: string;
  taxTreatment: TaxTreatment;
  deductible: boolean;
  deductiblePercent: number;
  requiresReceipt: boolean;
  notes?: string;
}

interface MappingFormState extends CategoryMapping {}

const taxTreatmentOptions: TaxTreatment[] = ['None', 'HST Included', 'GST Included', 'GST/HST Excluded'];

const seedMappings: CategoryMapping[] = [
  {
    id: 'vehicle-fuel',
    categoryName: 'Vehicle Fuel Expense',
    accountCode: '5450',
    gifiCode: '8811',
    taxTreatment: 'HST Included',
    deductible: true,
    deductiblePercent: 100,
    requiresReceipt: true,
    notes: 'Fuel and mileage for business driving.',
  },
  {
    id: 'office-supplies',
    categoryName: 'Office Supplies',
    accountCode: '5000',
    gifiCode: '9060',
    taxTreatment: 'HST Included',
    deductible: true,
    deductiblePercent: 100,
    requiresReceipt: false,
    notes: 'Paper, pens, printer paper, and small office items.',
  },
  {
    id: 'meals',
    categoryName: 'Meals & Entertainment',
    accountCode: '5500',
    gifiCode: '8523',
    taxTreatment: 'HST Included',
    deductible: true,
    deductiblePercent: 50,
    requiresReceipt: true,
    notes: '50% CRA limit for meals and entertainment.',
  },
  {
    id: 'professional-fees',
    categoryName: 'Professional Fees',
    accountCode: '6100',
    gifiCode: '9220',
    taxTreatment: 'HST Included',
    deductible: true,
    deductiblePercent: 100,
    requiresReceipt: true,
    notes: 'Bookkeeping, legal, and advisory work.',
  },
  {
    id: 'software',
    categoryName: 'Software Subscriptions',
    accountCode: '6200',
    gifiCode: '9060',
    taxTreatment: 'GST Included',
    deductible: true,
    deductiblePercent: 100,
    requiresReceipt: false,
    notes: 'Recurring SaaS tools and cloud subscriptions.',
  },
];

const emptyForm: MappingFormState = {
  id: '',
  categoryName: '',
  accountCode: '',
  gifiCode: '',
  taxTreatment: 'HST Included',
  deductible: true,
  deductiblePercent: 100,
  requiresReceipt: false,
  notes: '',
};

export function CategoryMapping() {
  const navigate = useNavigate();
  const [mappings, setMappings] = useState<CategoryMapping[]>(seedMappings);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(seedMappings[0].id);
  const [message, setMessage] = useState('Prototype-only mapping cards. Changes stay local.');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MappingFormState>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredMappings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mappings.filter((mapping) =>
      query.length === 0 ||
      [
        mapping.categoryName,
        mapping.accountCode,
        mapping.gifiCode ?? '',
        mapping.taxTreatment,
        mapping.notes ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [mappings, search]);

  const selectedMapping = mappings.find((mapping) => mapping.id === selectedId) ?? mappings[0];

  const openEditor = (mode: 'add' | 'edit', mapping?: CategoryMapping) => {
    setEditorMode(mode);
    if (mapping) {
      setEditingId(mapping.id);
      setForm({ ...mapping });
    } else {
      setEditingId(null);
      setForm({ ...emptyForm, id: `mapping-${Date.now()}` });
    }
    setEditorOpen(true);
  };

  const saveMapping = () => {
    if (!form.categoryName.trim() || !form.accountCode.trim()) {
      setMessage('Category and account code are required.');
      return;
    }

    const nextMapping: CategoryMapping = {
      ...form,
      categoryName: form.categoryName.trim(),
      accountCode: form.accountCode.trim(),
      gifiCode: form.gifiCode.trim() || undefined,
      notes: form.notes.trim() || undefined,
    };

    setMappings((current) => {
      if (editorMode === 'edit' && editingId) {
        return current.map((mapping) => (mapping.id === editingId ? nextMapping : mapping));
      }
      if (current.some((mapping) => mapping.id === nextMapping.id)) {
        return current.map((mapping) => (mapping.id === nextMapping.id ? nextMapping : mapping));
      }
      return [...current, nextMapping];
    });

    setSelectedId(nextMapping.id);
    setMessage(`${nextMapping.categoryName} saved locally.`);
    setEditorOpen(false);
  };

  const deleteMapping = (id: string) => {
    setMappings((current) => current.filter((mapping) => mapping.id !== id));
    if (selectedId === id) {
      const fallback = mappings.find((mapping) => mapping.id !== id) ?? mappings[0];
      if (fallback) {
        setSelectedId(fallback.id);
      }
    }
    setMessage('Mapping removed locally.');
  };

  return (
    <Layout>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        <EngagementContextBar />

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
                Review category-to-account mappings and keep Canadian tax treatment local to the prototype.
              </p>
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
                  placeholder="Search category, account code, GIFI code, or tax treatment"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditor('add')}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} />
                  Add New Mapping
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-4 items-start">
              <div className="space-y-3">
                {filteredMappings.map((mapping) => {
                  const isPartial = mapping.deductiblePercent < 100;
                  return (
                    <div
                      key={mapping.id}
                      onClick={() => setSelectedId(mapping.id)}
                      className={`bg-[#1A1F28] border rounded-lg p-5 cursor-pointer transition-colors ${
                        selectedId === mapping.id ? 'border-[#3B82F6]' : 'border-[#252C37] hover:border-[#374151]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <ArrowRightLeft size={20} className="text-[#3B82F6] mt-1" />
                            <div>
                              <h3 className="text-base font-semibold mb-1">{mapping.categoryName}</h3>
                              <p className="text-sm text-[#9CA3AF]">
                                Account {mapping.accountCode}
                                {mapping.gifiCode ? ` · GIFI ${mapping.gifiCode}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs text-[#D1D5DB]">
                            <span className="px-2 py-1 rounded bg-[#252C37]">Tax: {mapping.taxTreatment}</span>
                            <span className="px-2 py-1 rounded bg-[#252C37]">Deductible: {mapping.deductiblePercent}%</span>
                            <span className="px-2 py-1 rounded bg-[#252C37]">Receipt: {mapping.requiresReceipt ? 'Required' : 'Optional'}</span>
                            {isPartial && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B]">
                                <AlertTriangle size={12} />
                                50% CRA limit
                              </span>
                            )}
                          </div>

                          {mapping.notes && <p className="text-sm text-[#9CA3AF] max-w-2xl">{mapping.notes}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openEditor('edit', mapping);
                            }}
                            className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded"
                          >
                            <PencilLine size={14} />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setDeleteConfirmId(mapping.id);
                            }}
                            className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Selected mapping</p>
                      <h3 className="text-lg font-semibold">{selectedMapping.categoryName}</h3>
                    </div>
                    {selectedMapping.deductiblePercent < 100 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                        <AlertTriangle size={12} />
                        Partial
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-xs">
                        Full
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Account Code</span>
                      <span>{selectedMapping.accountCode}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">GIFI Code</span>
                      <span>{selectedMapping.gifiCode ?? '—'}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Tax Treatment</span>
                      <span>{selectedMapping.taxTreatment}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Deductible %</span>
                      <span>{selectedMapping.deductiblePercent}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Receipt</span>
                      <span>{selectedMapping.requiresReceipt ? 'Required' : 'Optional'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Prototype Notes</h3>
                  <ul className="space-y-2 text-sm text-[#9CA3AF]">
                    <li>- Edit and delete update the local list only.</li>
                    <li>- Partial deductions are highlighted for review.</li>
                    <li>- CRA wording stays prototype-safe and non-advisory.</li>
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
                  <p className="text-xs text-[#9CA3AF]">{editorMode === 'add' ? 'Add mapping' : 'Edit mapping'}</p>
                  <h3 className="text-lg font-semibold">
                    {editorMode === 'add' ? 'New Category Mapping' : `Edit ${form.categoryName || 'mapping'}`}
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
                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Category Name</span>
                  <input
                    value={form.categoryName}
                    onChange={(event) => setForm((current) => ({ ...current, categoryName: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Office Supplies"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Account Code</span>
                  <input
                    value={form.accountCode}
                    onChange={(event) => setForm((current) => ({ ...current, accountCode: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="5000"
                  />
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

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Tax Treatment</span>
                  <select
                    value={form.taxTreatment}
                    onChange={(event) => setForm((current) => ({ ...current, taxTreatment: event.target.value as TaxTreatment }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    {taxTreatmentOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Deductible %</span>
                  <input
                    value={form.deductiblePercent}
                    onChange={(event) => setForm((current) => ({ ...current, deductiblePercent: Number(event.target.value) || 0 }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    type="number"
                    min={0}
                    max={100}
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Notes</span>
                  <textarea
                    value={form.notes ?? ''}
                    onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    rows={3}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Add prototype note..."
                  />
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.deductible}
                    onChange={(event) => setForm((current) => ({ ...current, deductible: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Deductible
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.requiresReceipt}
                    onChange={(event) => setForm((current) => ({ ...current, requiresReceipt: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Requires receipt
                </label>
              </div>

              <div className="px-5 py-4 border-t border-[#252C37] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveMapping}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Check size={16} />
                  Save Mapping
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1A1F28] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#252C37]">
                <h3 className="text-lg font-semibold">Delete mapping?</h3>
                <p className="text-sm text-[#9CA3AF] mt-1">This removes the local mapping from the prototype only.</p>
              </div>
              <div className="px-5 py-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteMapping(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="inline-flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
