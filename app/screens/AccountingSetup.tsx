import { useNavigate } from 'react-router';
import { Building2, FileText, Hash, ArrowRightLeft, Download, FolderOpen, ChevronRight } from 'lucide-react';
import { Layout } from '../components/Layout';

interface SetupCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  badge?: string;
  badgeColor?: string;
}

export function AccountingSetup() {
  const navigate = useNavigate();

  const cards: SetupCard[] = [
    {
      title: 'Vendor Rules',
      description: 'Pattern matching rules for vendor categorization',
      icon: <Building2 size={24} className="text-[#3B82F6]" />,
      route: '/vendors',
      badge: '3 rules',
      badgeColor: 'text-[#10B981] bg-[#10B981]/10'
    },
    {
      title: 'Chart of Accounts',
      description: 'View and edit account codes',
      icon: <FileText size={24} className="text-[#3B82F6]" />,
      route: '/accounting-setup/chart-of-accounts',
      badge: 'Not configured',
      badgeColor: 'text-[#9CA3AF] bg-[#252C37]'
    },
    {
      title: 'GIFI Codes',
      description: 'Canadian tax reporting codes',
      icon: <Hash size={24} className="text-[#3B82F6]" />,
      route: '/accounting-setup/gifi-codes',
      badge: 'Standard codes loaded',
      badgeColor: 'text-[#10B981] bg-[#10B981]/10'
    },
    {
      title: 'Category Mapping',
      description: 'Map categories to account codes and GIFI codes',
      icon: <ArrowRightLeft size={24} className="text-[#3B82F6]" />,
      route: '/accounting-setup/category-mapping',
      badge: 'Not configured',
      badgeColor: 'text-[#9CA3AF] bg-[#252C37]'
    },
    {
      title: 'Export Mapping',
      description: 'QuickBooks-specific column mappings',
      icon: <Download size={24} className="text-[#3B82F6]" />,
      route: '/accounting-setup/export-mapping',
      badge: 'Default template',
      badgeColor: 'text-[#3B82F6] bg-[#3B82F6]/10'
    },
    {
      title: 'Saved Templates',
      description: 'Reusable export and mapping templates',
      icon: <FolderOpen size={24} className="text-[#3B82F6]" />,
      route: '/accounting-setup/templates',
      badge: '0 templates',
      badgeColor: 'text-[#9CA3AF] bg-[#252C37]'
    }
  ];

  return (
    <Layout engagementName="Botax Accounting → Babak Mohammadhosseini → 2025 Annual">
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#252C37] p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-2">Accounting Setup</h1>
            <p className="text-sm text-[#9CA3AF]">
              Configure business rules, codes, and mappings for accounting workflows
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map(card => (
                <button
                  key={card.route}
                  onClick={() => navigate(card.route)}
                  className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-6 text-left hover:border-[#374151] hover:bg-[#252C37]/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-[#3B82F6]/10 rounded-lg group-hover:bg-[#3B82F6]/20 transition-colors">
                      {card.icon}
                    </div>
                    <ChevronRight size={20} className="text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors" />
                  </div>

                  <h3 className="text-base font-semibold mb-2 text-[#F9FAFB]">{card.title}</h3>
                  <p className="text-sm text-[#9CA3AF] mb-4">{card.description}</p>

                  {card.badge && (
                    <div className={`inline-block text-xs px-2 py-1 rounded ${card.badgeColor}`}>
                      {card.badge}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-8 bg-[#1A1F28] border border-[#252C37] rounded-lg p-6">
              <h3 className="text-base font-semibold mb-3">About Accounting Setup</h3>
              <div className="space-y-2 text-sm text-[#9CA3AF]">
                <p>
                  <strong className="text-[#D1D5DB]">Vendor Rules:</strong> Define patterns to automatically categorize documents from specific vendors.
                </p>
                <p>
                  <strong className="text-[#D1D5DB]">Chart of Accounts:</strong> Manage your account codes and descriptions for financial reporting.
                </p>
                <p>
                  <strong className="text-[#D1D5DB]">GIFI Codes:</strong> Canadian tax reporting codes required for T2 corporate tax returns.
                </p>
                <p>
                  <strong className="text-[#D1D5DB]">Category Mapping:</strong> Connect expense categories to account codes and GIFI codes.
                </p>
                <p>
                  <strong className="text-[#D1D5DB]">Export Mapping:</strong> Customize which columns appear in your QuickBooks or CSV exports.
                </p>
                <p>
                  <strong className="text-[#D1D5DB]">Saved Templates:</strong> Save and reuse your configuration settings across engagements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
