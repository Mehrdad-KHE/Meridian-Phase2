import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Copy, FolderOpen, Plus, Search, Save, Trash2, PencilLine } from 'lucide-react';
import { Layout } from '../components/Layout';

type TemplateRow = {
  name: string;
  format: 'Excel' | 'CSV' | 'Review Pack';
  columns: number;
  updatedAt: string;
  source: string;
  description: string;
};

const engagementName = 'Botax Accounting -> Babak Mohammadhosseini -> 2025 Annual';

const templates: TemplateRow[] = [
  { name: 'Default Excel Template', format: 'Excel', columns: 14, updatedAt: '2026-05-12', source: 'Accounting Setup', description: 'Standard accountant review workbook.' },
  { name: 'QuickBooks Import CSV', format: 'CSV', columns: 12, updatedAt: '2026-05-10', source: 'Export Mapping', description: 'Import-style mapping for accounting export.' },
  { name: 'Draft Review Pack', format: 'Review Pack', columns: 16, updatedAt: '2026-05-08', source: 'Export Mapping', description: 'Human-readable review summary for the accountant.' },
];

export function SavedTemplates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState('Default Excel Template');

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates.filter((template) =>
      [template.name, template.format, template.source, template.description]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const selectedTemplate = templates.find((template) => template.name === selectedName) ?? templates[0];

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
              <h1 className="text-2xl font-semibold">Saved Templates</h1>
              <p className="text-sm text-[#9CA3AF] max-w-3xl">
                Save and reuse export and mapping templates across engagements without changing the current prototype data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Templates</p>
                <p className="text-2xl font-semibold">{templates.length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Excel templates</p>
                <p className="text-2xl font-semibold text-[#3B82F6]">{templates.filter((template) => template.format === 'Excel').length}</p>
              </div>
              <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">Last updated</p>
                <p className="text-2xl font-semibold text-[#10B981]">2026-05-12</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search saved templates"
                  className="w-full bg-[#1A1F28] border border-[#252C37] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Plus size={16} />
                  New Template
                </button>
                <button className="inline-flex items-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                  <Save size={16} />
                  Save Current
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-4 items-start">
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => setSelectedName(template.name)}
                    className={`w-full text-left bg-[#1A1F28] border rounded-lg p-5 transition-colors ${
                      selectedName === template.name ? 'border-[#3B82F6]' : 'border-[#252C37] hover:border-[#374151]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <FolderOpen size={20} className="text-[#3B82F6] mt-1" />
                        <div>
                          <h3 className="text-base font-semibold mb-1">{template.name}</h3>
                          <p className="text-sm text-[#9CA3AF] mb-2">{template.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-[#D1D5DB]">
                            <span className="px-2 py-1 rounded bg-[#252C37]">{template.format}</span>
                            <span className="px-2 py-1 rounded bg-[#252C37]">{template.columns} columns</span>
                            <span className="px-2 py-1 rounded bg-[#252C37]">{template.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded">
                          <Copy size={14} />
                          Duplicate
                        </button>
                        <button className="inline-flex items-center gap-1 text-xs border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-3 py-1.5 rounded">
                          <PencilLine size={14} />
                          Rename
                        </button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <p className="text-xs text-[#6B7280] mb-1">Selected template</p>
                  <h3 className="text-xl font-semibold mb-3">{selectedTemplate.name}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Format</span>
                      <span>{selectedTemplate.format}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Columns</span>
                      <span>{selectedTemplate.columns}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252C37] pb-2">
                      <span className="text-[#9CA3AF]">Updated</span>
                      <span>{selectedTemplate.updatedAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Source</span>
                      <span>{selectedTemplate.source}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-5">
                  <h3 className="text-sm font-semibold mb-3">Template actions</h3>
                  <div className="space-y-2">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                      Apply Template
                    </button>
                    <button className="w-full inline-flex items-center justify-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                      Delete Template
                    </button>
                    <button className="w-full inline-flex items-center justify-center gap-2 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] px-4 py-2.5 rounded-lg text-sm font-medium">
                      Export Reference
                    </button>
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
