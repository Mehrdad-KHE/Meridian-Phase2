import { useNavigate } from 'react-router';
import { Building2, TrendingUp, ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { EngagementContextBar } from '../components/EngagementContextBar';

export function Vendors() {
  const navigate = useNavigate();

  const vendors = [
    { name: 'Petro-Canada', category: 'Vehicle Fuel', count: 8, confidence: 95 },
    { name: 'Staples', category: 'Office Supplies', count: 3, confidence: 88 },
    { name: 'Tim Hortons', category: 'Meals & Entertainment', count: 12, confidence: 76 },
  ];

  return (
    <Layout>
      <div className="h-screen bg-[#0F1419] text-[#F9FAFB] flex flex-col overflow-hidden">
        <EngagementContextBar />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-8">
            <button
              onClick={() => navigate('/accounting-setup')}
              className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] w-fit mb-6"
            >
              <ArrowLeft size={16} />
              Back to Accounting Setup
            </button>

            <h1 className="text-2xl font-semibold mb-2">Vendors / Rules</h1>
            <p className="text-sm text-[#9CA3AF] mb-6">Vendor categorization rules learned from your documents.</p>

            <div className="space-y-4">
              {vendors.map((vendor) => (
                <div key={vendor.name} className="bg-[#1A1F28] border border-[#252C37] rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Building2 size={20} className="text-[#3B82F6] mt-1" />
                      <div className="flex-1">
                        <h3 className="text-base font-medium mb-1">{vendor.name}</h3>
                        <p className="text-sm text-[#D1D5DB] mb-2">Category: {vendor.category}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[#9CA3AF]">{vendor.count} transactions</span>
                          <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-[#10B981]" />
                            <span className="text-[#10B981]">{vendor.confidence}% confidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-4 rounded text-sm font-medium">
                      Edit Rule
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 border border-[#374151] hover:bg-[#374151] text-[#D1D5DB] py-2 px-6 rounded-lg text-sm font-medium">
              Add New Vendor Rule
            </button>

            <div className="flex justify-between mt-8" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
