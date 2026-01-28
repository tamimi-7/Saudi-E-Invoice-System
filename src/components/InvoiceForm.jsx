import React from 'react';
import { Calendar } from 'lucide-react';

export default function InvoiceForm({ customerName, setCustomerName, date: invoiceDate, setDate: setInvoiceDate }) {
    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-bold mb-4 text-gray-700">تفاصيل الفاتورة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">اسم العميل</label>
                    <input
                        type="text"
                        placeholder="أدخل اسم العميل"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">تاريخ الإصدار</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
