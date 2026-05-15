import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, ChevronRight, Building2, Users, Calendar, FolderOpen } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export function WorkspaceScreen() {
  const {
    state,
    createFirm,
    createClient,
    createPeriod,
    createCase,
    selectFirm,
    selectClient,
    selectPeriod,
    selectCase,
    setCurrentScreen,
    resetWorkspace
  } = useApp();

  const [showCreateFirm, setShowCreateFirm] = useState(false);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [showCreatePeriod, setShowCreatePeriod] = useState(false);
  const [showCreateCase, setShowCreateCase] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const [firmName, setFirmName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientBN, setClientBN] = useState('');
  const [periodName, setPeriodName] = useState('');
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [caseName, setCaseName] = useState('');

  const selectedFirm = state.firms.find(f => f.id === state.selectedFirmId);
  const selectedClient = state.clients.find(c => c.id === state.selectedClientId);
  const selectedPeriod = state.periods.find(p => p.id === state.selectedPeriodId);

  const firmClients = state.clients.filter(c => c.firmId === state.selectedFirmId);
  const clientPeriods = state.periods.filter(p => p.clientId === state.selectedClientId);
  const periodCases = state.cases.filter(c => c.periodId === state.selectedPeriodId);

  const handleCreateFirm = () => {
    if (!firmName.trim()) return;
    const firm = createFirm(firmName);
    selectFirm(firm.id);
    setFirmName('');
    setShowCreateFirm(false);
  };

  const handleCreateClient = () => {
    if (!clientName.trim() || !state.selectedFirmId) return;
    const client = createClient(state.selectedFirmId, clientName, clientBN || undefined);
    selectClient(client.id);
    setClientName('');
    setClientBN('');
    setShowCreateClient(false);
  };

  const handleCreatePeriod = () => {
    if (!periodName.trim() || !periodStart || !periodEnd || !state.selectedClientId) return;
    const period = createPeriod(state.selectedClientId, periodName, periodStart, periodEnd);
    selectPeriod(period.id);
    setPeriodName('');
    setPeriodStart('');
    setPeriodEnd('');
    setShowCreatePeriod(false);
  };

  const handleCreateCase = () => {
    if (!caseName.trim() || !state.selectedPeriodId) return;
    const newCase = createCase(state.selectedPeriodId, caseName);
    selectCase(newCase.id);
    setCaseName('');
    setShowCreateCase(false);
    setCurrentScreen('documents');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-6">
        {/* Firms */}
        <div className="bg-slate-900 rounded-lg border border-slate-800">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" />
              <h3 className="text-white">Firms</h3>
            </div>
            <button
              onClick={() => setShowCreateFirm(true)}
              className="p-1 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-2 max-h-96 overflow-auto">
            {state.firms.length === 0 && !showCreateFirm && (
              <p className="text-sm text-slate-500 p-4 text-center">No firms yet</p>
            )}

            {state.firms.map(firm => (
              <button
                key={firm.id}
                onClick={() => selectFirm(firm.id)}
                className={`
                  w-full text-left px-3 py-2 rounded flex items-center justify-between group
                  ${firm.id === state.selectedFirmId
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'}
                `}
              >
                <span className="text-sm">{firm.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
              </button>
            ))}

            {showCreateFirm && (
              <div className="p-3 border border-blue-600 rounded">
                <input
                  type="text"
                  value={firmName}
                  onChange={e => setFirmName(e.target.value)}
                  placeholder="Firm name"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateFirm}
                    className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateFirm(false);
                      setFirmName('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clients */}
        <div className="bg-slate-900 rounded-lg border border-slate-800">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <h3 className="text-white">Clients</h3>
            </div>
            <button
              onClick={() => setShowCreateClient(true)}
              disabled={!state.selectedFirmId}
              className={`p-1 rounded transition-colors ${
                state.selectedFirmId
                  ? 'hover:bg-slate-800'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-2 max-h-96 overflow-auto">
            {!state.selectedFirmId && (
              <p className="text-sm text-slate-500 p-4 text-center">Select a firm first</p>
            )}

            {state.selectedFirmId && firmClients.length === 0 && !showCreateClient && (
              <p className="text-sm text-slate-500 p-4 text-center">No clients yet</p>
            )}

            {firmClients.map(client => (
              <button
                key={client.id}
                onClick={() => selectClient(client.id)}
                className={`
                  w-full text-left px-3 py-2 rounded group
                  ${client.id === state.selectedClientId
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">{client.name}</div>
                    {client.businessNumber && (
                      <div className="text-xs opacity-70 mt-0.5">{client.businessNumber}</div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}

            {showCreateClient && state.selectedFirmId && (
              <div className="p-3 border border-blue-600 rounded">
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Client name"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                  autoFocus
                />
                <input
                  type="text"
                  value={clientBN}
                  onChange={e => setClientBN(e.target.value)}
                  placeholder="Business Number (optional)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateClient}
                    className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateClient(false);
                      setClientName('');
                      setClientBN('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Periods */}
        <div className="bg-slate-900 rounded-lg border border-slate-800">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <h3 className="text-white">Periods</h3>
            </div>
            <button
              onClick={() => setShowCreatePeriod(true)}
              disabled={!state.selectedClientId}
              className={`p-1 rounded transition-colors ${
                state.selectedClientId
                  ? 'hover:bg-slate-800'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-2 max-h-96 overflow-auto">
            {!state.selectedClientId && (
              <p className="text-sm text-slate-500 p-4 text-center">Select a client first</p>
            )}

            {state.selectedClientId && clientPeriods.length === 0 && !showCreatePeriod && (
              <p className="text-sm text-slate-500 p-4 text-center">No periods yet</p>
            )}

            {clientPeriods.map(period => (
              <button
                key={period.id}
                onClick={() => selectPeriod(period.id)}
                className={`
                  w-full text-left px-3 py-2 rounded group
                  ${period.id === state.selectedPeriodId
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">{period.name}</div>
                    <div className="text-xs opacity-70 mt-0.5">
                      {period.startDate} to {period.endDate}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}

            {showCreatePeriod && state.selectedClientId && (
              <div className="p-3 border border-blue-600 rounded">
                <input
                  type="text"
                  value={periodName}
                  onChange={e => setPeriodName(e.target.value)}
                  placeholder="Period name (e.g., Q1 2026)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                  autoFocus
                />
                <input
                  type="date"
                  value={periodStart}
                  onChange={e => setPeriodStart(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                />
                <input
                  type="date"
                  value={periodEnd}
                  onChange={e => setPeriodEnd(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreatePeriod}
                    className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreatePeriod(false);
                      setPeriodName('');
                      setPeriodStart('');
                      setPeriodEnd('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cases */}
        <div className="bg-slate-900 rounded-lg border border-slate-800">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-slate-400" />
              <h3 className="text-white">Cases</h3>
            </div>
            <button
              onClick={() => setShowCreateCase(true)}
              disabled={!state.selectedPeriodId}
              className={`p-1 rounded transition-colors ${
                state.selectedPeriodId
                  ? 'hover:bg-slate-800'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-2 max-h-96 overflow-auto">
            {!state.selectedPeriodId && (
              <p className="text-sm text-slate-500 p-4 text-center">Select a period first</p>
            )}

            {state.selectedPeriodId && periodCases.length === 0 && !showCreateCase && (
              <p className="text-sm text-slate-500 p-4 text-center">No cases yet</p>
            )}

            {periodCases.map(caseItem => (
              <button
                key={caseItem.id}
                onClick={() => {
                  selectCase(caseItem.id);
                  setCurrentScreen('documents');
                }}
                className={`
                  w-full text-left px-3 py-2 rounded group
                  ${caseItem.id === state.selectedCaseId
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">{caseItem.name}</div>
                    <div className="text-xs opacity-70 mt-0.5 capitalize">{caseItem.status}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}

            {showCreateCase && state.selectedPeriodId && (
              <div className="p-3 border border-blue-600 rounded">
                <input
                  type="text"
                  value={caseName}
                  onChange={e => setCaseName(e.target.value)}
                  placeholder="Case name"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm mb-2"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateCase}
                    className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    Create & Open
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateCase(false);
                      setCaseName('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {state.firms.length === 0 && (
        <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-lg text-center">
          <h3 className="text-lg text-white mb-2">Welcome to Meridian</h3>
          <p className="text-slate-400 mb-4">
            Start by creating an accounting firm, then add clients, review periods, and cases.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowCreateFirm(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Create Your First Firm
            </button>
            <button
              onClick={() => setShowResetDialog(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Load Demo Data
            </button>
          </div>
        </div>
      )}

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Load demo data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset the workspace to the seeded demo case and clear your current selections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetWorkspace();
                setShowResetDialog(false);
              }}
            >
              Load Demo Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
