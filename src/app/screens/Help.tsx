import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, X } from 'lucide-react';
import { Layout } from '../components/Layout';

interface HelpSection {
  id: string;
  title: string;
  description: string;
}

export function Help() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const helpSections: HelpSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Onboarding new users, first-time setup guidance, quick start checklist'
    },
    {
      id: 'workflow-guide',
      title: 'Workflow Guide',
      description: 'Understanding the correction loop, workflow stages, bidirectional navigation, incremental reprocessing'
    },
    {
      id: 'engagement-setup',
      title: 'Engagement Setup Guide',
      description: 'Selecting firm/accountant, adding clients, choosing accounting periods'
    },
    {
      id: 'documents-upload',
      title: 'Documents & Upload Guide',
      description: 'Supported file types, document upload, status tracking, filtering documents'
    },
    {
      id: 'ocr-reading',
      title: 'OCR / Document Reading Guide',
      description: 'How OCR works, improving scan quality, troubleshooting unreadable documents'
    },
    {
      id: 'review-decisions',
      title: 'Review & Decisions Guide',
      description: 'Exception-based review, grouped items, reading evidence, making decisions'
    },
    {
      id: 'accountant-qa',
      title: 'Accountant Q&A Guide',
      description: 'When to ask your accountant, how to send questions, how answers are used as evidence'
    },
    {
      id: 'export-package',
      title: 'Export Package Guide',
      description: 'Export readiness status, package formats, customizing exports, downloading packages'
    },
    {
      id: 'backup-restore',
      title: 'Backup / Restore Guide',
      description: 'Creating engagement backups, restoring data, data portability, best practices'
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common problems, error messages, solutions, how to report bugs'
    },
    {
      id: 'accounting-terminology',
      title: 'Accounting Terminology',
      description: 'Common accounting terms, Chart of Accounts, categories, GIFI codes, tax concepts'
    },
    {
      id: 'gifi-codes',
      title: 'GIFI / Accounting Codes Guide',
      description: 'GIFI codes for Canadian tax reporting, mapping categories to codes, standard codes'
    }
  ];

  const selectedSectionData = helpSections.find(s => s.id === selectedSection);

  return (
    <Layout>
      <div className="h-screen flex flex-col bg-[#0F1419] text-[#F9FAFB]">
        {/* Header */}
        <div className="border-b border-[#252C37] p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <BookOpen size={24} className="text-[#3B82F6]" />
              <h1 className="text-2xl font-semibold">Help & Documentation</h1>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-[#9CA3AF] hover:text-[#F9FAFB]"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search bar (placeholder for future) */}
        <div className="border-b border-[#252C37] p-4">
          <div className="max-w-6xl mx-auto">
            <input
              type="text"
              placeholder="Search help... (coming soon)"
              disabled
              className="w-full bg-[#1A1F28] border border-[#374151] rounded px-4 py-2 text-sm text-[#D1D5DB] placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            {!selectedSection ? (
              // Section list
              <div className="grid gap-3">
                {helpSections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4 text-left hover:border-[#374151] transition-colors"
                  >
                    <h3 className="text-base font-medium mb-1 text-[#F9FAFB]">{section.title}</h3>
                    <p className="text-sm text-[#9CA3AF]">{section.description}</p>
                  </button>
                ))}
              </div>
            ) : (
              // Selected section content
              <div>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-sm text-[#3B82F6] hover:text-[#2563EB] mb-4"
                >
                  ← Back to all sections
                </button>

                <h2 className="text-xl font-semibold mb-4">{selectedSectionData?.title}</h2>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-8 text-center">
                  <BookOpen size={48} className="mx-auto mb-4 text-[#9CA3AF]" />
                  <h3 className="text-lg font-medium mb-2 text-[#D1D5DB]">Content Coming Soon</h3>
                  <p className="text-sm text-[#9CA3AF] mb-4">
                    This section will cover:
                  </p>
                  <p className="text-sm text-[#D1D5DB] max-w-2xl mx-auto">
                    {selectedSectionData?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
