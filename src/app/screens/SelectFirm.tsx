import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { WorkflowRoadmap } from '../components/WorkflowRoadmap';

export function SelectFirm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const canSubmit = formData.name.trim().length > 0 && formData.email.trim().length > 0;

  const handleSelect = () => {
    navigate('/setup/client');
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F9FAFB]">
      <WorkflowRoadmap currentStage="setup" />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Select Accountant / Firm</h1>

        <div className="mb-4">
          <span className="text-sm bg-[#3B82F6] text-white px-3 py-1 rounded">ENGAGEMENT SETUP</span>
        </div>

        <p className="text-sm text-[#9CA3AF] mb-8">Select a firm or add a new one</p>

        <div className="space-y-4 mb-6">
          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Botax Accounting</h3>
            <p className="text-sm text-[#D1D5DB] mb-4">Toronto, ON</p>
            <button
              onClick={handleSelect}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
            >
              Select Firm
            </button>
          </div>

          <div className="bg-[#1A1F28] rounded-lg p-6 border border-[#252C37]">
            <h3 className="text-base font-medium mb-1">Smith & Associates CPA</h3>
            <p className="text-sm text-[#D1D5DB] mb-4">Vancouver, BC</p>
            <button
              onClick={handleSelect}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-6 rounded-lg text-sm font-medium"
            >
              Select Firm
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setAttemptedSubmit(false);
            setShowModal(true);
          }}
          className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium"
        >
          Add New Firm
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A1F28] rounded-lg p-6 w-full max-w-md border border-[#252C37]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Add New Firm</h2>
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
                  Firm / Accountant Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
                {attemptedSubmit && !formData.name.trim() && (
                  <p className="mt-1 text-xs text-[#FCA5A5]">Firm name is required.</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Email <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
                {attemptedSubmit && !formData.email.trim() && (
                  <p className="mt-1 text-xs text-[#FCA5A5]">Email is required.</p>
                )}
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
                <label className="block text-sm mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#0F1419] border border-[#374151] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
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
                Add Firm
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
