import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Search, X } from 'lucide-react';
import { Layout } from '../components/Layout';

interface HelpSection {
  id: string;
  title: string;
  description: string;
  paragraphs: string[];
  bullets: string[];
}

export function Help() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const helpSections: HelpSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Onboarding new users, first-time setup guidance, quick start checklist',
      paragraphs: [
        'Meridian is designed to keep the workflow local and easy to understand. Start with a firm, choose a client, and pick a period so the engagement label stays visible across the app.',
        'If you want a quick demo, load the sample engagement from the home screen. If you want to work from a clean slate, start a new engagement and add your own documents as you go.',
      ],
      bullets: ['Choose a firm first, then a client, then a period.', 'Use the demo toggle only when you want seeded example data.', 'The app saves progress locally in your browser.'],
    },
    {
      id: 'workflow-guide',
      title: 'Workflow Guide',
      description: 'Understanding the correction loop, workflow stages, bidirectional navigation, incremental reprocessing',
      paragraphs: [
        'The workflow moves from setup to documents, processing, review, Q&A, and export. You can jump around freely because every stage is clickable in the roadmap.',
        'When documents change, the related review items reopen automatically. That keeps the prototype honest about reprocessing without needing a backend.',
      ],
      bullets: ['Add or edit documents to reopen dependent review items.', 'Use Review and Accountant Q&A together when decisions are uncertain.', 'Export only becomes ready when every review item is resolved.'],
    },
    {
      id: 'engagement-setup',
      title: 'Engagement Setup Guide',
      description: 'Selecting firm/accountant, adding clients, choosing accounting periods',
      paragraphs: [
        'The setup screens build one engagement label from the firm, client, and period. That label follows you through the rest of the workflow.',
        'Changing any of those setup fields clears the current workflow data so a fresh engagement does not inherit the wrong documents or decisions.',
      ],
      bullets: ['Firm, client, and period are the core identity fields.', 'The same label appears in the context bar and sidebar.', 'The demo seed uses Northpeak Accounting, Daniel Roberts, and 2025 Annual.'],
    },
    {
      id: 'documents-upload',
      title: 'Documents & Upload Guide',
      description: 'Supported file types, document upload, status tracking, filtering documents',
      paragraphs: [
        'The Documents screen acts like a local inbox for scans, receipts, and statements. You can add a document, mark it reviewed, or flag it for another pass.',
        'Status tabs help you focus on the subset you want to work on. New, read, needs fix, duplicate, and excluded documents each tell a different story about the current state of the engagement.',
      ],
      bullets: ['Use Add Document to append a new local item.', 'Mark reviewed turns a new scan into a read document.', 'Changing a document status re-opens linked review items.'],
    },
    {
      id: 'ocr-reading',
      title: 'OCR / Document Reading Guide',
      description: 'How OCR works, improving scan quality, troubleshooting unreadable documents',
      paragraphs: [
        'Processing in this prototype stands in for OCR and document classification. It does not connect to a real engine, but it does show how the workflow would react to different document conditions.',
        'If a document is unreadable or needs a better scan, the review loop will open again once you change that document. That keeps the error handling visible instead of hidden.',
      ],
      bullets: ['Needs fix documents stand in for unreadable scans.', 'Duplicate documents show what the system considered a repeated file.', 'Better scan actions re-open the related review item.'],
    },
    {
      id: 'review-decisions',
      title: 'Review & Decisions Guide',
      description: 'Exception-based review, grouped items, reading evidence, making decisions',
      paragraphs: [
        'Review items are grouped by the issue they are trying to explain, such as repeated fuel receipts or duplicate invoices. Each card includes a short reason, the evidence behind it, and a suggested direction.',
        'You can accept the recommendation, change the category, exclude the item, ask an accountant, or send it back for a better scan. Each choice changes the same local workflow store.',
      ],
      bullets: ['Accepted recommendations resolve immediately.', 'Ask Accountant creates a question that appears in the Q&A screen.', 'Reopening items keeps the export gate honest.'],
    },
    {
      id: 'accountant-qa',
      title: 'Accountant Q&A Guide',
      description: 'When to ask your accountant, how to send questions, how answers are used as evidence',
      paragraphs: [
        'Use Accountant Q&A when the evidence is real but the decision still needs professional judgment. The Review screen creates the question and sends it to the local Q&A list.',
        'When you type an answer on the Q&A screen, Meridian adds that answer back to the linked review item as evidence and re-opens the item so you can finalize the decision afterward.',
      ],
      bullets: ['Questions stay linked to the review item that created them.', 'Saved answers become part of the review evidence trail.', 'Answering a question re-opens the item for a final decision.'],
    },
    {
      id: 'export-package',
      title: 'Export Package Guide',
      description: 'Export readiness status, package formats, customizing exports, downloading packages',
      paragraphs: [
        'Export is only ready when every review item is resolved. If even one item is still open or waiting for an accountant answer, the export screen stays blocked.',
        'Once the review loop is clean, you can download one of the available package formats. The options are still prototype-friendly and local-only.',
      ],
      bullets: ['The gate is derived from the review items, not a separate toggle.', 'Blocked export always tells you why it is blocked.', 'Ready export shows the package choices instead of a warning.'],
    },
    {
      id: 'backup-restore',
      title: 'Backup / Restore Guide',
      description: 'Creating engagement backups, restoring data, data portability, best practices',
      paragraphs: [
        'Because the app stores everything in localStorage, the browser is effectively the working database for the prototype. That makes backups simple but also local to the device.',
        'If you want to preserve a session, export it as a packaged demo or let the browser keep the state. Clearing the browser storage resets the app back to the empty state.',
      ],
      bullets: ['LocalStorage is the only persistence layer right now.', 'Clearing site data returns the app to an empty engagement.', 'Packaged demos are meant for portable review, not production storage.'],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common problems, error messages, solutions, how to report bugs',
      paragraphs: [
        'If the app seems to forget data, check whether the browser cleared local storage or you switched to a fresh profile. The state is intentionally local and ephemeral.',
        'If the export screen is blocked, look for the remaining open review items or an unanswered accountant question. The blocker text points to what still needs attention.',
      ],
      bullets: ['Fresh profiles start empty unless the demo seed is enabled.', 'The export button only becomes active after all review items are resolved.', 'If a screen looks stale, return to Home and reload the demo or clear the current engagement.'],
    },
    {
      id: 'accounting-terminology',
      title: 'Accounting Terminology',
      description: 'Common accounting terms, Chart of Accounts, categories, GIFI codes, tax concepts',
      paragraphs: [
        'This section gives short explanations for the labels you see in the prototype. The goal is to keep the workflow understandable without requiring accounting background before every click.',
        'Terms like chart of accounts, category mapping, and GIFI codes appear throughout the setup screens. They are shown only where they help explain what the user is configuring.',
      ],
      bullets: ['Chart of Accounts groups transactions into reporting buckets.', 'Category mapping helps connect raw documents to a usable classification.', 'GIFI codes are relevant to Canadian corporate tax reporting.'],
    },
    {
      id: 'gifi-codes',
      title: 'GIFI / Accounting Codes Guide',
      description: 'GIFI codes for Canadian tax reporting, mapping categories to codes, standard codes',
      paragraphs: [
        'GIFI codes are used for reporting financial information in a structured way. In the prototype, they act as an example of how a category can map to a more specific accounting code.',
        'You do not need to memorize the codes to use Meridian. What matters is that the mapping screen shows how a category can be tied to a consistent reporting destination.',
      ],
      bullets: ['Keep mappings predictable across engagements.', 'Use saved templates when the same code set applies to more than one client.', 'Review mappings whenever the export format changes.'],
    },
  ];

  const filteredSections = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return helpSections;
    }

    return helpSections.filter((section) => {
      const haystack = [section.title, section.description, ...section.paragraphs, ...section.bullets].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }, [helpSections, searchTerm]);

  const selectedSectionData = helpSections.find((section) => section.id === selectedSection);

  return (
    <Layout>
      <div className="h-screen flex flex-col bg-[#0F1419] text-[#F9FAFB]">
        <div className="border-b border-[#252C37] p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <BookOpen size={24} className="text-[#3B82F6]" />
              <h1 className="text-2xl font-semibold">Help & Documentation</h1>
            </div>
            <button onClick={() => navigate(-1)} className="text-[#9CA3AF] hover:text-[#F9FAFB]" title="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="border-b border-[#252C37] p-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search help sections"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A1F28] border border-[#374151] rounded px-10 py-2 text-sm text-[#D1D5DB] placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            {!selectedSection ? (
              <div className="grid gap-3">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-4 text-left hover:border-[#374151] transition-colors"
                  >
                    <h3 className="text-base font-medium mb-1 text-[#F9FAFB]">{section.title}</h3>
                    <p className="text-sm text-[#9CA3AF]">{section.description}</p>
                  </button>
                ))}
                {filteredSections.length === 0 && (
                  <div className="rounded-lg border border-[#252C37] bg-[#1A1F28] p-6 text-sm text-[#9CA3AF]">
                    No matching help sections found.
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-sm text-[#3B82F6] hover:text-[#2563EB] mb-4 inline-flex items-center gap-2"
                >
                  <X size={14} />
                  Back to all sections
                </button>

                <h2 className="text-xl font-semibold mb-3">{selectedSectionData?.title}</h2>
                <p className="text-sm text-[#9CA3AF] mb-6">{selectedSectionData?.description}</p>

                <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-6 space-y-4">
                  {selectedSectionData?.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm text-[#D1D5DB] leading-6">
                      {paragraph}
                    </p>
                  ))}

                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-2">Key points</p>
                    <ul className="space-y-2">
                      {selectedSectionData?.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm text-[#D1D5DB] flex items-start gap-2">
                          <span className="text-[#3B82F6] mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
