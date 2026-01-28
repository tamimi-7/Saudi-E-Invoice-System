import React from 'react';
import QRCode from "react-qr-code";
import { generateZatcaBase64 } from '../utils/zatca';

export default function InvoicePreview({
    customerName,
    date,
    items,
    subtotal,
    vat,
    total,
    sellerName,
    sellerVat
}) {
    return (
        <div className="invoice-preview bg-white p-8 rounded shadow-lg border print:border-none print:shadow-none max-w-[210mm] mx-auto min-h-[297mm]">

            {/* رأس الفاتورة */}
            <div className="flex justify-between items-start mb-8 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">فاتورة ضريبية</h2>
                    <p className="text-sm text-gray-500">#{'INV-001'}</p>
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-800">{sellerName || 'اسم المنشأة'}</h3>
                    <p className="text-gray-600 text-sm">الرقم الضريبي: {sellerVat || '3000...'}</p>
                    <p className="text-gray-600 text-sm">الرياض، المملكة العربية السعودية</p>
                </div>
            </div>

            {/* معلومات العميل والتاريخ */}
            <div className="flex justify-between mb-8">
                <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">العميل</p>
                    <h4 className="font-bold text-gray-800">{customerName || 'عميل نقدي'}</h4>
                </div>
                <div className="text-left">
                    <p className="text-gray-500 text-xs uppercase mb-1">التاريخ</p>
                    <p className="font-bold text-gray-800">{date || new Date().toLocaleDateString('en-CA')}</p>
                </div>
            </div>

            {/* جدول الفاتورة */}
            <table className="w-full mb-8">
                <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="text-right py-2 text-sm font-bold text-gray-600">المنتج</th>
                        <th className="text-center py-2 text-sm font-bold text-gray-600">الكمية</th>
                        <th className="text-left py-2 text-sm font-bold text-gray-600">الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 text-gray-800">{item.name}</td>
                            <td className="py-3 text-center text-gray-600">{item.qty}</td>
                            <td className="py-3 text-left text-gray-800">
                                {(item.price * item.qty).toFixed(2)} ر.س
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* الإجماليات */}
            <div className="flex justify-end mb-8">
                <div className="w-1/2">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">المجموع (قبل الضريبة)</span>
                        <span className="font-medium">{subtotal.toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">ضريبة القيمة المضافة (15%)</span>
                        <span className="font-medium">{vat.toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold text-blue-600">
                        <span>الإجمالي المستحق</span>
                        <span>{total.toFixed(2)} ر.س</span>
                    </div>
                </div>
            </div>

            {/* ZATCA QR Code */}
            <div className="flex justify-center pt-4">
                <div className="h-auto max-w-[150px] mx-auto">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={generateZatcaBase64(
                            sellerName,
                            sellerVat,
                            new Date().toISOString(),
                            total.toFixed(2),
                            vat.toFixed(2)
                        )}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">
                امسح الكود عبر تطبيق الزكاة للتأكد
            </p>

            <button
                onClick={() => window.print()}
                className="mt-6 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 print:hidden transition-colors flex items-center justify-center gap-2"
            >
                🖨️ طباعة الفاتورة / حفظ PDF
            </button>
        </div>
    );
}
