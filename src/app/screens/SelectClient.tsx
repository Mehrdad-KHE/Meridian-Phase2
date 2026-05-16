import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, ChevronDown } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';

export function SelectClient() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessType: 'Sole Proprietor',
    email: '',
    phone: '',
    businessNumber: '',
    address: ''
  });

  const canSubmit = formData.name.trim().length > 0 && formData.businessType.trim().length > 0;

  const handleSelect = () => {
    navigate('/setup/period');
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F9FAFB]">
      <WorkflowRoadmap currentStage="setup" />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Select Client</h1>

        <div className="mb-4">
          <span className="text-sm bg-[#3B82F6] text-white px-3 py-1 rounded">ENGAGEMENT SETUP</span>
        </div>

        <div className="bg-[#1A1F28] border-l-4 border-[#3B82F6] rounded p-4 mb-6">
          <p className="text-sm">Botax Accounting</p>
        </div>

        <p className="text-sm text-[#9CA3AF] mb-8">Select a client or add a new one</p>

        <div className="space-y-4 mb-6">
          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Babak Mohammadhosseini</h3>
            <p className="text-sm text-[#D1D5DB] mb-4">Self-employed contractor</p>
            <button
              onClick={handleSelect}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
            >
              Select Client
            </button>
          </div>

          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Acme Trucking Ltd.</h3>
            <p className="text-sm text-[#D1D5DB] mb-4">Corporation</p>
            <button
              onClick={handleSelect}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
            >
              Select Client
            </button>
          </div>
        </div>

        <div className="flex gap-3">
        <button
          onClick={() => {
            setAttemptedSubmit(false);
            setShowModal(true);
          }}
          className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
        >
          Add New Client
          </button>
          <button
            onClick={() => navigate('/setup/firm')}
            className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
          >
            Back
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-[#1A1F28] rounded-lg p-6 w-full max-w-md border border-[#252C37] my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Add New Client</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9CA3AF] hover:text-[#F9FAFB]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Client Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
                {attemptedSubmit && !formData.name.trim() && (
                  <p className="mt-1 text-xs text-[#FCA5A5]">Client name is required.</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Business Type <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6] appearance-none"
                  >
                    <option>Sole Proprietor</option>
                    <option>Corporation</option>
                    <option>Partnership</option>
                    <option>Self-employed contractor</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" size={16} />
                </div>
                {attemptedSubmit && !formData.businessType.trim() && (
                  <p className="mt-1 text-xs text-[#FCA5A5]">Business type is required.</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Business Number (Optional)</label>
                <input
                  type="text"
                  value={formData.businessNumber}
                  onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#2563EB]"
              >
                <ChevronDown size={16} className={showAdvanced ? 'rotate-180' : ''} />
                Show Additional Fields
              </button>

              {showAdvanced && (
                <div>
                  <label className="block text-sm mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setAttemptedSubmit(false);
                  setShowModal(false);
                }}
                className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAttemptedSubmit(true);
                  if (!canSubmit) {
                    return;
                  }
                  setAttemptedSubmit(false);
                  setShowModal(false);
                  handleSelect();
                }}
                disabled={!canSubmit}
                className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#374151] disabled:text-[#9CA3AF] text-white py-2 px-6 rounded-lg text-sm font-medium"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="pb-4 text-center text-[10px] text-[#6B7280]">
        © Meridian — All rights reserved.
      </p>
    </div>
  );
}
