import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Check,
  Copy,
  FolderOpen,
  PencilLine,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Layout } from '../components/Layout';

type TemplateFormat = 'excel' | 'csv' | 'quickbooks-iif';

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  format: TemplateFormat;
  columns: string[];
  default: boolean;
  lastUsed: string;
}

interface TemplateFormState extends ExportTemplate {}

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const formatLabels: Record<TemplateFormat, string> = {
  excel: 'Excel',
  csv: 'CSV',
  'quickbooks-iif': 'QuickBooks IIF',
};

const seedTemplates: ExportTemplate[] = [
  {
    id: 'default-excel',
    name: 'Default Excel Template',
    description: 'Standard accountant review workbook.',
    format: 'excel',
    columns: ['Document ID', 'Date', 'Vendor', 'Amount', 'GIFI Code', 'Review Status'],
    default: true,
    lastUsed: '2026-05-12',
  },
  {
    id: 'quickbooks-import',
    name: 'QuickBooks Import CSV',
    description: 'Import-style export for a QuickBooks handoff.',
    format: 'csv',
    columns: ['Date', 'Vendor', 'Amount', 'Account Code', 'GIFI Code'],
    default: false,
    lastUsed: '2026-05-10',
  },
  {
    id: 'draft-review',
    name: 'Draft Review Pack',
    description: 'Compact review pack for the accountant.',
    format: 'excel',
    columns: ['Document ID', 'Date', 'Vendor', 'Amount', 'Notes'],
    default: false,
    lastUsed: '2026-05-08',
  },
];

const emptyForm: TemplateFormState = {
  id: '',
  name: '',
  description: '',
  format: 'excel',
  columns: [],
  default: false,
  lastUsed: 'Just now',
};

export function SavedTemplates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<ExportTemplate[]>(seedTemplates);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(seedTemplates[0].id);
  const [message, setMessage] = useState('Templates are stored locally in the prototype only.');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TemplateFormState>(emptyForm);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates.filter((template) =>
      [template.name, template.description, template.lastUsed, formatLabels[template.format]]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search, templates]);

  const selectedTemplate = templates.find((template) => template.id === selectedId) ?? templates[0];

  const openEditor = (mode: 'add' | 'edit', template?: ExportTemplate) => {
    setEditorMode(mode);
    if (template) {
      setEditingId(template.id);
      setForm({ ...template });
    } else {
      setEditingId(null);
      setForm({ ...emptyForm, id: `template-${Date.now()}`, name: 'New Template' });
    }
    setEditorOpen(true);
  };

  const saveTemplate = () => {
    if (!form.name.trim()) {
      setMessage('Template name is required.');
      return;
    }

    const nextTemplate: ExportTemplate = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      columns: form.columns.filter((column) => column.trim().length > 0),
    };

    setTemplates((current) => {
      if (editorMode === 'edit' && editingId) {
        return current.map((template) => (template.id === editingId ? nextTemplate : template));
      }
      if (current.some((template) => template.id === nextTemplate.id)) {
        return current.map((template) => (template.id === nextTemplate.id ? nextTemplate : template));
      }
      return [nextTemplate, ...current];
    });

    setSelectedId(nextTemplate.id);
    setMessage(`${nextTemplate.name} saved locally.`);
    setEditorOpen(false);
  };

  const loadTemplate = (template: ExportTemplate) => {
    setSelectedId(template.id);
    setTemplates((current) =>
      current.map((item) => (item.id === template.id ? { ...item, lastUsed: 'Just now' } : item)),
    );
    setMessage(`${template.name} loaded locally.`);
  };

  const duplicateTemplate = (template: ExportTemplate) => {
    const copy: ExportTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} Copy`,
      default: false,
      lastUsed: 'Just now',
    };
    setTemplates((current) => [copy, ...current]);
    setSelectedId(copy.id);
    setMessage(`${template.name} duplicated locally.`);
  };

  const deleteTemplate = (id: string) => {
    setTemplates((current) => current.filter((template) => template.id !== id));
    if (selectedId === id) {
      const fallback = templates.find((template) => template.id !== id) ?? templates[0];
      if (fallback) {
        setSelectedId(fallback.id);
      }
    }
    setMessage('Template deleted locally.');
  };

  const setDefaultTemplate = (id: string) => {
    setTemplates((current) =>
      current.map((template) => ({
        ...template,
        default: template.id === id,
      })),
    );
    setMessage('Default template updated locally.');
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
              <h1 className="text-2xl font-semibold">Saved Templates</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                Save, load, duplicate, and mark export templates as default inside the prototype workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Templates</p>
                <p className="text-2xl font-semibold">{templates.length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Default template</p>
                <p className="text-2xl font-semibold text-[#10B981]">{templates.find((template) => template.default)?.name ?? 'None'}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Excel templates</p>
                <p className="text-2xl font-semibold text-[#3B82F6]">{templates.filter((template) => template.format === 'excel').length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Last used</p>
                <p className="text-2xl font-semibold text-[#F59E0B]">{selectedTemplate.lastUsed}</p>
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
                  placeholder="Search saved templates"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditor('add')}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} />
                  Create New Template
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-4 items-start">
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedId(template.id)}
                    className={`w-full text-left bg-[#1A1F28] border rounded-lg p-5 transition-colors ${
                      selectedId === template.id ? 'border-[#3B82F6]' : 'border-[#252C37] hover:border-[#374151]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <FolderOpen size={20} className="text-[#3B82F6] mt-1" />
                        <div>
                          <h3 className="text-base font-semibold mb-1">{template.name}</h3>
                          <p className="text-sm text-[#9CA3AF] mb-2">{template.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-[#D1D5DB]">
                            <span className="px-2 py-1 rounded bg-[#252C37]">{formatLabels[template.format]}</span>
                            <span className="px-2 py-1 rounded bg-[#252C37]">{template.columns.length} columns</span>
                            <span className="px-2 py-1 rounded bg-[#252C37]">Last used {template.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            loadTemplate(template);
                          }}
                          className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditor('edit', template);
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
                            duplicateTemplate(template);
                          }}
                          className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded"
                        >
                          <Copy size={14} />
                          Duplicate
                        </button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Selected template</p>
                      <h3 className="text-lg font-semibold">{selectedTemplate.name}</h3>
                    </div>
                    {selectedTemplate.default && (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-xs">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Format</span>
                      <span>{formatLabels[selectedTemplate.format]}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Columns</span>
                      <span>{selectedTemplate.columns.length}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Last used</span>
                      <span>{selectedTemplate.lastUsed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Default flag</span>
                      <span>{selectedTemplate.default ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Template actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => loadTemplate(selectedTemplate)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      Load Template
                    </button>
                    <button
                      onClick={() => setDefaultTemplate(selectedTemplate.id)}
                      className="w-full inline-flex items-center justify-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      Set as Default
                    </button>
                    <button
                      onClick={() => deleteTemplate(selectedTemplate.id)}
                      className="w-full inline-flex items-center justify-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Delete Template
                    </button>
                  </div>
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
                  <p className="text-xs text-[#9CA3AF]">{editorMode === 'add' ? 'Create template' : 'Edit template'}</p>
                  <h3 className="text-lg font-semibold">
                    {editorMode === 'add' ? 'New Saved Template' : `Edit ${form.name || 'template'}`}
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
                  <span className="text-sm text-[#9CA3AF]">Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Client Review Template"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Description</span>
                  <textarea
                    value={form.description}
                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                    rows={3}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Short description for the accountant"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Format</span>
                  <select
                    value={form.format}
                    onChange={(event) => setForm((current) => ({ ...current, format: event.target.value as TemplateFormat }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="quickbooks-iif">QuickBooks IIF</option>
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-sm text-[#9CA3AF]">Last used</span>
                  <input
                    value={form.lastUsed}
                    onChange={(event) => setForm((current) => ({ ...current, lastUsed: event.target.value }))}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </label>

                <label className="space-y-1 block md:col-span-2">
                  <span className="text-sm text-[#9CA3AF]">Columns (comma separated)</span>
                  <textarea
                    value={form.columns.join(', ')}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        columns: event.target.value
                          .split(',')
                          .map((item) => item.trim())
                          .filter((item) => item.length > 0),
                      }))
                    }
                    rows={3}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Document ID, Date, Vendor, Amount"
                  />
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
                  <input
                    type="checkbox"
                    checked={form.default}
                    onChange={(event) => setForm((current) => ({ ...current, default: event.target.checked }))}
                    className="accent-[#3B82F6]"
                  />
                  Default template
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
                  onClick={saveTemplate}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Check size={16} />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
