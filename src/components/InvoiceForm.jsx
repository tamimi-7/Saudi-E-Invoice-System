import React from 'react';
import { Calendar } from 'lucide-react';

export default function InvoiceForm({
    invoiceType,
    setInvoiceType,
    customerName,
    setCustomerName,
    customerVat,
    setCustomerVat,
    customerAddress,
    setCustomerAddress,
    date: invoiceDate,
    setDate: setInvoiceDate,
    isCustomerVatValid
}) {

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-bold mb-4 text-gray-700">تفاصيل الفاتورة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm text-gray-600 mb-1">نوع الفاتورة</label>
                    <select
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={invoiceType}
                        onChange={(e) => setInvoiceType(e.target.value)}
                    >
                        <option value="B2C">أفراد (B2C) - فاتورة ضريبية مبسطة</option>
                        <option value="B2B">أعمال (B2B) - فاتورة ضريبية</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">تاريخ ووقت الإصدار</label>
                    <input
                        type="datetime-local"
                        step="1"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={invoiceDate || getCurrentDateTime()}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                </div>

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

                {invoiceType === 'B2B' && (
                    <>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">الرقم الضريبي للعميل</label>
                            <input
                                type="text"
                                placeholder="أدخل الرقم الضريبي للعميل"
                                className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${!isCustomerVatValid && customerVat ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                value={customerVat}
                                onChange={(e) => setCustomerVat(e.target.value)}
                            />
                            {!isCustomerVatValid && customerVat && (
                                <p className="text-red-500 text-xs mt-1">الرقم الضريبي يجب أن يكون 15 رقماً ويبدأ وينتهي بـ 3</p>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-600 mb-1">عنوان العميل</label>
                            <input
                                type="text"
                                placeholder="أدخل عنوان العميل بالكامل"
                                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
