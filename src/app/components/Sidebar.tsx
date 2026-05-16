import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Home,
  FileText,
  CheckSquare,
  Download,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useEngagement } from '../state/engagement';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useEngagement();
  const engagementName = state.engagementLabel ?? 'No engagement selected';
  const isAccountingSetupActive = () =>
    location.pathname.startsWith('/accounting-setup') || location.pathname === '/vendors';
  const isActive = (path: string) => location.pathname === path;
  const [accountingSetupExpanded, setAccountingSetupExpanded] = useState(() => isAccountingSetupActive());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAccountingSetupActive()) {
      setAccountingSetupExpanded(true);
    }
  }, [location.pathname]);

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#1A1F28] border-r border-[#252C37]">
      {/* Header */}
      <div className="p-4 border-b border-[#252C37]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#F9FAFB]">MERIDIAN</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-[#9CA3AF] hover:text-[#F9FAFB]"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Home */}
        <button
          onClick={() => {
            navigate('/');
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
            isActive('/')
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#D1D5DB] hover:bg-[#252C37]'
          }`}
        >
          <Home size={16} />
          <span>Home</span>
        </button>

        {/* Divider */}
        <div className="my-3 border-t border-[#252C37]">
          <p className="text-xs text-[#6B7280] mt-3 mb-2 px-3">Current Engagement</p>
        </div>

        {/* Documents */}
        <button
          onClick={() => {
            navigate('/documents');
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
            isActive('/documents')
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#D1D5DB] hover:bg-[#252C37]'
          }`}
        >
          <FileText size={16} />
          <span>Documents</span>
        </button>

        {/* Review */}
        <button
          onClick={() => {
            navigate('/review');
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
            isActive('/review')
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#D1D5DB] hover:bg-[#252C37]'
          }`}
        >
          <CheckSquare size={16} />
          <span>Review</span>
        </button>

        {/* Export */}
        <button
          onClick={() => {
            navigate('/export');
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
            isActive('/export')
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#D1D5DB] hover:bg-[#252C37]'
          }`}
        >
          <Download size={16} />
          <span>Export</span>
        </button>

        {/* Divider */}
        <div className="my-3 border-t border-[#252C37]"></div>

        {/* Accounting Setup (expandable) */}
        <div>
          <button
            onClick={() => setAccountingSetupExpanded(!accountingSetupExpanded)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm ${
              isAccountingSetupActive()
                ? 'bg-[#252C37] text-[#F9FAFB]'
                : 'text-[#D1D5DB] hover:bg-[#252C37]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span>Accounting Setup</span>
            </div>
            {accountingSetupExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>

          {accountingSetupExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              <button
                onClick={() => {
                  navigate('/vendors');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                  isActive('/vendors')
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#252C37] hover:text-[#D1D5DB]'
                }`}
              >
                Vendor Rules
              </button>
              <button
                onClick={() => {
                  navigate('/accounting-setup/chart-of-accounts');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                  isActive('/accounting-setup/chart-of-accounts')
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#252C37] hover:text-[#D1D5DB]'
                }`}
              >
                Chart of Accounts
              </button>
              <button
                onClick={() => {
                  navigate('/accounting-setup/gifi-codes');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                  isActive('/accounting-setup/gifi-codes')
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#252C37] hover:text-[#D1D5DB]'
                }`}
              >
                GIFI Codes
              </button>
              <button
                onClick={() => {
                  navigate('/accounting-setup/category-mapping');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                  isActive('/accounting-setup/category-mapping')
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#252C37] hover:text-[#D1D5DB]'
                }`}
              >
                Category Mapping
              </button>
              <button
                onClick={() => {
                  navigate('/accounting-setup/export-mapping');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                  isActive('/accounting-setup/export-mapping')
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#252C37] hover:text-[#D1D5DB]'
                }`}
              >
                Export Mapping
              </button>
              <button
                onClick={() => {
                  navigate('/accounting-setup/templates');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                  isActive('/accounting-setup/templates')
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#252C37] hover:text-[#D1D5DB]'
                }`}
              >
                Saved Templates
              </button>
            </div>
          )}
        </div>

        {/* System / Advanced */}
        <button
          onClick={() => {
            navigate('/system');
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
            isActive('/system')
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#D1D5DB] hover:bg-[#252C37]'
          }`}
        >
          <Settings size={16} />
          <span>System / Advanced</span>
        </button>

        {/* Help */}
        <button
          onClick={() => {
            navigate('/help');
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
            isActive('/help')
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#D1D5DB] hover:bg-[#252C37]'
          }`}
        >
          <HelpCircle size={16} />
          <span>Help</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#252C37] space-y-2">
        <p className="text-xs text-[#6B7280] truncate" title={engagementName}>
          {engagementName}
        </p>
        <p className="text-[10px] text-[#6B7280]">© 2026 Mehrdad Kheirollahi. All rights reserved.</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-[#1A1F28] border border-[#252C37] rounded p-2 text-[#D1D5DB]"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 h-screen">{sidebarContent}</div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 h-screen w-64 z-50">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
