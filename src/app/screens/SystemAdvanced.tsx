import { useNavigate } from 'react-router';
import { Database, Settings, FileText, Activity, HardDrive, AlertTriangle } from 'lucide-react';
import { Layout } from '../components/Layout';

export function SystemAdvanced() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Backup / Restore',
      description: 'Export and import engagement data',
      icon: <Database size={20} className="text-[#3B82F6]" />
    },
    {
      title: 'OCR Engine Settings',
      description: 'Document processing configuration',
      icon: <FileText size={20} className="text-[#F59E0B]" />
    },
    {
      title: 'Diagnostics',
      description: 'System logs, debug mode, performance stats',
      icon: <Activity size={20} className="text-[#10B981]" />
    },
    {
      title: 'Data Management',
      description: 'Storage usage, cache clearing',
      icon: <HardDrive size={20} className="text-[#9CA3AF]" />
    },
    {
      title: 'Developer Tools',
      description: 'Advanced debugging and testing',
      icon: <Settings size={20} className="text-[#9CA3AF]" />
    }
  ];

  return (
    <Layout engagementName="Botax Accounting → Babak Mohammadhosseini → 2025 Annual">
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#252C37] p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-2">System / Advanced</h1>
            <p className="text-sm text-[#9CA3AF]">
              Technical settings and system management tools
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            {/* Warning Message */}
            <div className="bg-[#F59E0B]/10 border-2 border-[#F59E0B]/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-[#F59E0B] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#F59E0B] font-medium mb-1">⚠️ Advanced Settings</p>
                  <p className="text-sm text-[#D1D5DB]">
                    Most users don't need to change anything here. Business configuration (vendors, categories, codes) is in{' '}
                    <button
                      onClick={() => navigate('/accounting-setup')}
                      className="text-[#3B82F6] hover:underline font-medium"
                    >
                      Accounting Setup
                    </button>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {sections.map(section => (
                <div
                  key={section.title}
                  className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-6 hover:border-[#374151] cursor-pointer transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#252C37] rounded group-hover:bg-[#374151] transition-colors">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">{section.title}</h3>
                      <p className="text-sm text-[#9CA3AF]">{section.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* System Information */}
            <div className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-6">
              <h3 className="text-base font-semibold mb-4">Version Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-[#252C37]">
                  <span className="text-[#9CA3AF]">App Version</span>
                  <span className="text-[#D1D5DB]">1.0.0-beta</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#252C37]">
                  <span className="text-[#9CA3AF]">IndexedDB Version</span>
                  <span className="text-[#D1D5DB]">1</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#252C37]">
                  <span className="text-[#9CA3AF]">Storage Used</span>
                  <span className="text-[#D1D5DB]">12.5 MB</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#252C37]">
                  <span className="text-[#9CA3AF]">OCR Engine Status</span>
                  <span className="text-[#10B981]">Ready</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#9CA3AF]">Last Backup</span>
                  <span className="text-[#D1D5DB]">Never</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
