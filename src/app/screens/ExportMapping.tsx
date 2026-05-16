import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Layers3,
  Save,
  Search,
  Square,
  X,
} from 'lucide-react';
import { Layout } from '../components/Layout';

type ExportFormat = 'Accountant Review Excel' | 'QuickBooks CSV' | 'Generic CSV';

interface ExportColumn {
  id: string;
  label: string;
  enabled: boolean;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  format: ExportFormat;
  columns: ExportColumn[];
  default: boolean;
  lastUsed: string;
}

const engagementName = 'Botax Accounting → Babak Mohammadhosseini → 2025 Annual';

const defaultColumns: ExportColumn[] = [
  { id: 'document_id', label: 'Document ID', enabled: true },
  { id: 'date', label: 'Date', enabled: true },
  { id: 'vendor', label: 'Vendor', enabled: true },
  { id: 'amount', label: 'Amount', enabled: true },
  { id: 'suggested_category', label: 'Suggested Category', enabled: true },
  { id: 'final_category', label: 'Final Category', enabled: true },
  { id: 'account_code', label: 'Account Code', enabled: true },
  { id: 'gifi_code', label: 'GIFI Code', enabled: true },
  { id: 'tax_flag', label: 'HST/GST Flag', enabled: true },
  { id: 'confidence_score', label: 'Confidence Score', enabled: false },
  { id: 'review_status', label: 'Review Status', enabled: true },
  { id: 'processing_date', label: 'Processing Date', enabled: false },
  { id: 'notes', label: 'Notes', enabled: true },
  { id: 'source_file', label: 'Source File', enabled: true },
  { id: 'document_fingerprint', label: 'Document Fingerprint', enabled: false },
  { id: 'question_reference', label: 'Accountant Question Reference', enabled: true },
];

const initialTemplates: ExportTemplate[] = [
  {
    id: 'default-review',
    name: 'Default Excel Template',
    description: 'Standard accountant review workbook',
    format: 'Accountant Review Excel',
    columns: defaultColumns.map((column) => ({ ...column })),
    default: true,
    lastUsed: '2026-05-12',
  },
  {
    id: 'quickbooks-csv',
    name: 'QuickBooks Import CSV',
    description: 'Import-style export for QuickBooks handoff',
    format: 'QuickBooks CSV',
    columns: defaultColumns
      .filter((column) => column.enabled)
      .map((column) => ({ ...column })),
    default: false,
    lastUsed: '2026-05-10',
  },
  {
    id: 'draft-review',
    name: 'Draft Review Pack',
    description: 'Compact review pack for the accountant',
    format: 'Generic CSV',
    columns: defaultColumns.map((column) => ({ ...column })),
    default: false,
    lastUsed: '2026-05-08',
  },
];

function cloneColumns(columns: ExportColumn[]) {
  return columns.map((column) => ({ ...column }));
}

export function ExportMapping() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [columns, setColumns] = useState(cloneColumns(defaultColumns));
  const [appliedColumns, setAppliedColumns] = useState(cloneColumns(defaultColumns));
  const [exportFormat, setExportFormat] = useState<ExportFormat>('Accountant Review Excel');
  const [appliedExportFormat, setAppliedExportFormat] = useState<ExportFormat>('Accountant Review Excel');
  const [templateName, setTemplateName] = useState('Default Excel Template');
  const [appliedTemplateName, setAppliedTemplateName] = useState('Default Excel Template');
  const [description, setDescription] = useState('Standard accountant review');
  const [appliedDescription, setAppliedDescription] = useState('Standard accountant review');
  const [templates, setTemplates] = useState<ExportTemplate[]>(initialTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplates[0].id);
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);
  const [message, setMessage] = useState('Export settings are local to the prototype until applied.');

  const filteredColumns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return columns.filter((column) => column.label.toLowerCase().includes(query) || column.id.includes(query));
  }, [columns, search]);

  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) ?? templates[0];

  const toggleColumn = (id: string) => {
    setColumns((current) => current.map((column) => (column.id === id ? { ...column, enabled: !column.enabled } : column)));
  };

  const moveColumn = (index: number, direction: -1 | 1) => {
    setColumns((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  };

  const selectAll = () => {
    setColumns((current) => current.map((column) => ({ ...column, enabled: true })));
    setMessage('All export columns enabled locally.');
  };

  const resetToDefault = () => {
    const reset = cloneColumns(defaultColumns);
    setColumns(reset);
    setTemplateName('Default Excel Template');
    setDescription('Standard accountant review');
    setExportFormat('Accountant Review Excel');
    setMessage('Draft reset to default local values.');
  };

  const saveAsNewTemplate = () => {
    const id = `template-${Date.now()}`;
    const newTemplate: ExportTemplate = {
      id,
      name: templateName.trim() || 'Untitled Template',
      description: description.trim() || 'Saved from export configuration',
      format: exportFormat,
      columns: cloneColumns(columns),
      default: false,
      lastUsed: 'Just now',
    };

    setTemplates((current) => [newTemplate, ...current.map((template) => ({ ...template, default: template.default }))]);
    setSelectedTemplateId(id);
    setMessage(`${newTemplate.name} saved locally.`);
  };

  const loadTemplate = (template: ExportTemplate) => {
    setColumns(cloneColumns(template.columns));
    setAppliedColumns(cloneColumns(template.columns));
    setExportFormat(template.format);
    setAppliedExportFormat(template.format);
    setTemplateName(template.name);
    setAppliedTemplateName(template.name);
    setDescription(template.description);
    setAppliedDescription(template.description);
    setSelectedTemplateId(template.id);
    setMessage(`${template.name} loaded into the draft.`);
    setTemplateMenuOpen(false);
  };

  const applyConfiguration = () => {
    setAppliedColumns(cloneColumns(columns));
    setAppliedExportFormat(exportFormat);
    setAppliedTemplateName(templateName);
    setAppliedDescription(description);
    setMessage('Export configuration applied locally for the next export.');
    setReorderOpen(false);
    setTemplateMenuOpen(false);
  };

  const cancelChanges = () => {
    setColumns(cloneColumns(appliedColumns));
    setExportFormat(appliedExportFormat);
    setTemplateName(appliedTemplateName);
    setDescription(appliedDescription);
    setMessage('Unapplied changes were reverted locally.');
    setReorderOpen(false);
    setTemplateMenuOpen(false);
  };

  return (
    <Layout engagementName={engagementName}>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        <div className="bg-[#1A1F28] border-b border-[#374151] py-1.5 px-6 flex justify-center">
          <p className="text-xs text-[#9CA3AF] text-center w-full">{engagementName}</p>
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
              <h1 className="text-2xl font-semibold">Export Configuration</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                Adjust export format and column order locally for the prototype review and export flow.
              </p>
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
                  placeholder="Search export columns"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2 relative">
                <button
                  onClick={saveAsNewTemplate}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Save size={16} />
                  Save as New Template
                </button>

                <div className="relative">
                  <button
                    onClick={() => setTemplateMenuOpen((current) => !current)}
                    className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                  >
                    <Layers3 size={16} />
                    Load Template
                    <ChevronDown size={14} />
                  </button>

                  {templateMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg border border-[#374151] bg-[#1A1F28] shadow-2xl z-20 overflow-hidden">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => loadTemplate(template)}
                          className="w-full text-left px-4 py-3 hover:bg-[#252C37] border-b border-[#252C37] last:border-b-0"
                        >
                          <p className="text-sm font-medium">{template.name}</p>
                          <p className="text-xs text-[#6B7280]">{template.format}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-4 items-start">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-[#252C37] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">Columns</h2>
                    <p className="text-xs text-[#6B7280]">Toggle columns and open the reorder modal for the full pipeline order.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={selectAll}
                      className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded text-xs font-medium"
                    >
                      <CheckSquare size={14} />
                      Select All
                    </button>
                    <button
                      onClick={() => setReorderOpen(true)}
                      className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded text-xs font-medium"
                    >
                      <GripVertical size={14} />
                      Reorder Columns
                    </button>
                    <button
                      onClick={resetToDefault}
                      className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded text-xs font-medium"
                    >
                      <ChevronUp size={14} />
                      Reset to Default
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-[#252C37]">
                  {filteredColumns.map((column) => (
                    <div key={column.id} className="flex items-center gap-3 px-4 py-3">
                      <button
                        type="button"
                        aria-label={`Toggle ${column.label}`}
                        onClick={() => toggleColumn(column.id)}
                        className="text-[#3B82F6] shrink-0"
                      >
                        {column.enabled ? <CheckSquare size={18} /> : <Square size={18} />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{column.label}</p>
                        <p className="text-xs text-[#6B7280]">{column.id.replace(/_/g, ' ')}</p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <div className="space-y-3">
                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Export format</span>
                      <select
                        value={exportFormat}
                        onChange={(event) => setExportFormat(event.target.value as ExportFormat)}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option>Accountant Review Excel</option>
                        <option>QuickBooks CSV</option>
                        <option>Generic CSV</option>
                      </select>
                    </label>

                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Template name</span>
                      <input
                        value={templateName}
                        onChange={(event) => setTemplateName(event.target.value)}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </label>

                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Description</span>
                      <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={3}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <button
                      onClick={cancelChanges}
                      className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyConfiguration}
                      className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      <Save size={16} />
                      Apply Configuration
                    </button>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Saved templates</h3>
                  <div className="space-y-2 text-sm">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplateId(template.id)}
                        className={`w-full text-left p-3 rounded border transition-colors ${
                          selectedTemplateId === template.id
                            ? 'border-[#3B82F6] bg-[#3B82F6]/10'
                            : 'border-[#252C37] hover:border-[#374151] bg-[#0F1419]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[#F9FAFB] font-medium">{template.name}</p>
                            <p className="text-xs text-[#6B7280]">
                              {template.format} · Last used {template.lastUsed}
                            </p>
                          </div>
                          {template.default && (
                            <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-[#10B981]/10 text-[#10B981]">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-2">{template.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-[#252C37] bg-[#0F1419] p-3 text-xs text-[#9CA3AF]">
                    Need to edit the full template library?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/accounting-setup/templates')}
                      className="text-[#3B82F6] hover:underline"
                    >
                      Open Saved Templates
                    </button>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {reorderOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-[#1A1F28] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#252C37]">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Column reorder</p>
                  <h3 className="text-lg font-semibold">Reorder Export Columns</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setReorderOpen(false)}
                  className="p-2 rounded-full hover:bg-[#252C37] text-[#D1D5DB]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5">
                <p className="text-sm text-[#9CA3AF] mb-4">Drag-handle style list with manual up/down controls for the prototype.</p>
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {columns.map((column, index) => (
                    <div key={column.id} className="flex items-center gap-3 bg-[#0F1419] border border-[#252C37] rounded-lg px-4 py-3">
                      <GripVertical size={16} className="text-[#6B7280]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{column.label}</p>
                        <p className="text-xs text-[#6B7280]">{column.id.replace(/_/g, ' ')}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveColumn(index, -1)}
                          className="p-2 rounded border border-[#374151] hover:bg-[#374151] text-[#D1D5DB]"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveColumn(index, 1)}
                          className="p-2 rounded border border-[#374151] hover:bg-[#374151] text-[#D1D5DB]"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 border-t border-[#252C37] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReorderOpen(false)}
                  className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={applyConfiguration}
                  className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Save size={16} />
                  Apply Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
