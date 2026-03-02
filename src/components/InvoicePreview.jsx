import React from 'react';
import QRCode from "react-qr-code";
import { generateZatcaBase64 } from '../utils/zatca';

export default function InvoicePreview({
    invoiceType,
    customerName,
    customerVat,
    customerAddress,
    date,
    items,
    subtotal,
    vat,
    total,
    sellerName,
    sellerVat,
    sellerAddress,
    canGenerateQrAndPrint,
    invoiceNumber,
    onGenerateNewInvoice
}) {
    const formattedDate = date ? date.replace('T', ' ') : new Date().toISOString().replace('T', ' ').substring(0, 19);

    return (
        <div className="invoice-preview bg-white p-8 rounded shadow-lg border print:border-none print:shadow-none max-w-[210mm] mx-auto min-h-[297mm]">

            {/* رأس الفاتورة */}
            <div className="flex justify-between items-start mb-8 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {invoiceType === 'B2B' ? 'فاتورة ضريبية' : 'فاتورة ضريبية مبسطة'}
                    </h2>
                    <p className="text-sm font-bold text-blue-600 mt-1">{invoiceNumber}</p>
                </div>
                <div className="text-left w-1/2">
                    <h3 className="font-bold text-lg text-gray-800">{sellerName || 'اسم المنشأة'}</h3>
                    <p className="text-gray-600 text-sm mt-1">الرقم الضريبي: {sellerVat || '3000...'}</p>
                    <div className="text-gray-500 text-xs mt-2 leading-relaxed">
                        <p>{sellerAddress?.buildingNo} {sellerAddress?.street}</p>
                        <p>حي {sellerAddress?.district}، {sellerAddress?.city} {sellerAddress?.zipCode}</p>
                        <p>المملكة العربية السعودية</p>
                    </div>
                </div>
            </div>

            {/* معلومات العميل والتاريخ */}
            <div className="flex justify-between mb-8">
                <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">العميل</p>
                    <h4 className="font-bold text-gray-800">{customerName || 'عميل نقدي'}</h4>
                    {invoiceType === 'B2B' && (
                        <div className="mt-2 text-sm text-gray-600">
                            {customerVat && <p>الرقم الضريبي للعميل: {customerVat}</p>}
                            {customerAddress && <p>العنوان: {customerAddress}</p>}
                        </div>
                    )}
                </div>
                <div className="text-left">
                    <p className="text-gray-500 text-xs uppercase mb-1">تاريخ ووقت الإصدار</p>
                    <p className="font-bold text-gray-800">{formattedDate}</p>
                </div>
            </div>

            {/* جدول الفاتورة */}
            <table className="w-full mb-8">
                <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="text-right py-2 text-sm font-bold text-gray-600">المنتج</th>
                        <th className="text-center py-2 text-sm font-bold text-gray-600">سعر الوحدة</th>
                        <th className="text-center py-2 text-sm font-bold text-gray-600">الكمية</th>
                        <th className="text-left py-2 text-sm font-bold text-gray-600">الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 text-gray-800">{item.name}</td>
                            <td className="py-3 text-center text-gray-600">{Number(item.price).toFixed(2)} ر.س</td>
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
            {canGenerateQrAndPrint ? (
                <div className="flex flex-col items-center pt-4">
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
                    <p className="text-center text-xs text-slate-400 mt-4">
                        امسح الكود عبر تطبيق الزكاة للتأكد
                    </p>
                </div>
            ) : (
                <div className="flex justify-center pt-4">
                    <p className="text-red-500 text-sm font-bold text-center border border-red-200 bg-red-50 p-4 rounded">
                        يرجى إدخال الرقم الضريبي بشكل صحيح (15 رقماً يبدأ وينتهي بـ 3) لتوليد رمز الاستجابة السريعة (QR Code) والطباعة.
                    </p>
                </div>
            )}

            <div className="mt-6 flex flex-col gap-3 print:hidden">
                <button
                    onClick={() => window.print()}
                    disabled={!canGenerateQrAndPrint}
                    className={`w-full text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 ${canGenerateQrAndPrint ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    🖨️ طباعة الفاتورة / حفظ PDF
                </button>

                <button
                    onClick={onGenerateNewInvoice}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 mt-4"
                >
                    ➕ إصدار فاتورة جديدة
                </button>
            </div>
        </div>
    );
}
