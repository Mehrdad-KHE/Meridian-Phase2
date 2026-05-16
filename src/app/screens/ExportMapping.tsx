import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckSquare, ChevronDown, ChevronUp, GripVertical, Layers3, Save, Search, Square, RotateCcw } from 'lucide-react';
import { Layout } from '../components/Layout';

type ExportColumn = {
  id: string;
  label: string;
  enabled: boolean;
};

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

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
  { id: 'confidence', label: 'Confidence Score', enabled: false },
  { id: 'review_status', label: 'Review Status', enabled: true },
  { id: 'processing_date', label: 'Processing Date', enabled: false },
  { id: 'notes', label: 'Notes', enabled: true },
  { id: 'source_file', label: 'Source File', enabled: true },
  { id: 'fingerprint', label: 'Document Fingerprint', enabled: false },
  { id: 'qa_ref', label: 'Accountant Question Reference', enabled: true },
];

const templates = [
  { name: 'Default Excel Template', format: 'Excel', description: 'Standard accountant review layout' },
  { name: 'QuickBooks Import', format: 'CSV', description: 'Import-ready QuickBooks columns' },
  { name: 'Draft Review', format: 'Excel', description: 'Compact internal review pack' },
];

export function ExportMapping() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [columns, setColumns] = useState(defaultColumns);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].name);
  const [templateName, setTemplateName] = useState('Default Excel Template');
  const [description, setDescription] = useState('Standard accountant review');

  const filteredColumns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return columns.filter((column) => column.label.toLowerCase().includes(query) || column.id.toLowerCase().includes(query));
  }, [columns, search]);

  const toggleColumn = (id: string) => {
    setColumns((current) => current.map((column) => (column.id === id ? { ...column, enabled: !column.enabled } : column)));
  };

  const moveColumn = (index: number, direction: -1 | 1) => {
    setColumns((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  };

  const selectAll = () => {
    setColumns((current) => current.map((column) => ({ ...column, enabled: true })));
  };

  const resetColumns = () => {
    setColumns(defaultColumns);
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
              <h1 className="text-2xl font-semibold">Export Configuration</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                Configure export format and the columns included in the accountant review or import-style workbook.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search export columns"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Save size={16} />
                  Save as Template
                </button>
                <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Layers3 size={16} />
                  Load Template
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.95fr] gap-4 items-start">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-[#252C37] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">Columns</h2>
                    <p className="text-xs text-[#6B7280]">Toggle columns on or off and move them into the preferred order.</p>
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
                      onClick={resetColumns}
                      className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded text-xs font-medium"
                    >
                      <RotateCcw size={14} />
                      Reset to Default
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-[#252C37]">
                  {filteredColumns.map((column) => {
                    const index = columns.findIndex((item) => item.id === column.id);
                    return (
                      <div key={column.id} className="flex items-center gap-3 px-4 py-3">
                        <button
                          type="button"
                          aria-label={`Move ${column.label}`}
                          className="text-[#6B7280] hover:text-[#F9FAFB] cursor-grab"
                        >
                          <GripVertical size={16} />
                        </button>

                        <button
                          onClick={() => toggleColumn(column.id)}
                          className="text-[#3B82F6] shrink-0"
                        >
                          {column.enabled ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{column.label}</p>
                          <p className="text-xs text-[#6B7280]">{column.id.replace(/_/g, ' ')}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveColumn(index, -1)}
                            className="p-2 rounded border border-[#374151] hover:bg-[#374151] text-[#D1D5DB]"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            onClick={() => moveColumn(index, 1)}
                            className="p-2 rounded border border-[#374151] hover:bg-[#374151] text-[#D1D5DB]"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <div className="space-y-3">
                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Export format</span>
                      <select className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]">
                        <option>Accountant Review Excel</option>
                        <option>QuickBooks CSV</option>
                        <option>Generic CSV</option>
                      </select>
                    </label>

                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Load template</span>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                      >
                        {templates.map((template) => (
                          <option key={template.name}>{template.name}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Template name</span>
                      <input
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </label>

                    <label className="space-y-1 block">
                      <span className="text-sm text-[#9CA3AF]">Description</span>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                      <Save size={16} />
                      Apply Configuration
                    </button>
                    <button className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Selected template preview</h3>
                  <div className="space-y-2 text-sm text-[#9CA3AF]">
                    {templates.map((template) => (
                      <div
                        key={template.name}
                        className={`p-3 rounded border ${
                          selectedTemplate === template.name
                            ? 'border-[#3B82F6] bg-[#3B82F6]/10'
                            : 'border-[#252C37] bg-[#0F1419]'
                        }`}
                      >
                        <p className="text-[#F9FAFB] font-medium">{template.name}</p>
                        <p className="text-xs text-[#6B7280]">{template.format} - {template.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
