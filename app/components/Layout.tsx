import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Settings,
  CheckCircle2,
  MessageSquare,
  Store,
  Download
} from 'lucide-react';

const navItems = [
  { id: 'workspace', label: 'Workspace', icon: LayoutDashboard },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'processing', label: 'Processing', icon: Settings },
  { id: 'review', label: 'Review', icon: CheckCircle2 },
  { id: 'accountant-qa', label: 'Accountant Q&A', icon: MessageSquare },
  { id: 'vendors', label: 'Vendors', icon: Store },
  { id: 'export', label: 'Export', icon: Download }
] as const;

export function Layout({ children }: { children: React.ReactNode }) {
  const { state, setCurrentScreen, getCurrentFirm, getCurrentClient, getCurrentPeriod, getCurrentCase } = useApp();

  const firm = getCurrentFirm();
  const client = getCurrentClient();
  const period = getCurrentPeriod();
  const caseItem = getCurrentCase();

  const breadcrumbs = [
    firm?.name,
    client?.name,
    period?.name,
    caseItem?.name
  ].filter(Boolean);

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl tracking-tight text-white">Meridian</h1>
          <p className="text-sm text-slate-400 mt-1">Accounting Workflow</p>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = state.currentScreen === item.id;
            const isDisabled = item.id !== 'workspace' && !state.selectedCaseId;

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && setCurrentScreen(item.id as typeof state.currentScreen)}
                disabled={isDisabled}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : isDisabled
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="text-xs text-slate-500 text-center mb-2">
            Prototype Mode
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl text-white">
                {navItems.find(item => item.id === state.currentScreen)?.label}
              </h2>
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span>/</span>}
                      <span>{crumb}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {caseItem && (
              <div className="flex items-center gap-2">
                <span className={`
                  px-3 py-1 rounded-full text-xs
                  ${caseItem.status === 'complete' ? 'bg-green-900 text-green-200' :
                    caseItem.status === 'review' ? 'bg-yellow-900 text-yellow-200' :
                    caseItem.status === 'processing' ? 'bg-blue-900 text-blue-200' :
                    'bg-slate-800 text-slate-300'}
                `}>
                  {caseItem.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
