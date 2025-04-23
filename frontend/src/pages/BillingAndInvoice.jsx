import React, { useState } from 'react';
import InvoiceDashboard from './InvoiceDashboard';
import ShopInvoice from './ShopInvoice'; // You’ll create this next
import { FileText, ShoppingCart } from 'lucide-react';

function BillingAndInvoice() {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            activeTab === 'services'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-green-500 transition`}
        >
          <FileText size={20} />
          Services
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            activeTab === 'shop'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-500 transition`}
        >
          <ShoppingCart size={20} />
          Shop
        </button>
      </div>

      {/* Content for Tabs */}
      <div>
        {activeTab === 'services' && <InvoiceDashboard />}
        {activeTab === 'shop' && <ShopInvoice />}
      </div>
    </div>
  );
}

export default BillingAndInvoice;
