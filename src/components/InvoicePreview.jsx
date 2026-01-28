import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
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
    const qrCodeValue = generateZatcaBase64(
        sellerName,
        sellerVat,
        new Date().toISOString(), // Using current timestamp for generation or pass date if needed
        total.toString(),
        vat.toString()
    );

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200 sticky top-6">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Tax Invoice</h1>
                    <p className="text-slate-500 text-sm mt-1">#INV-0001</p>
                </div>
                <div className="text-right">
                    <h3 className="font-bold text-slate-800">{sellerName}</h3>
                    <p className="text-sm text-slate-500">VAT: {sellerVat}</p>
                    <p className="text-sm text-slate-500">Riyadh, Saudi Arabia</p>
                </div>
            </div>

            <div className="border-t border-b border-slate-100 py-4 mb-6 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">Bill To</p>
                    <p className="text-slate-800 font-medium mt-1">{customerName || 'walk-in customer'}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Date</p>
                    <p className="text-slate-800 font-medium mt-1">{date || new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <div className="mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-100">
                            <th className="py-2 text-left text-xs font-semibold text-slate-500 uppercase">Item</th>
                            <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Qty</th>
                            <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="py-3 text-sm text-slate-700">{item.name}</td>
                                <td className="py-3 text-right text-sm text-slate-700">{item.qty}</td>
                                <td className="py-3 text-right text-sm text-slate-900 font-medium">
                                    {/* Display logic only */}
                                    {(item.price * item.qty).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                    <span className="text-slate-600 text-sm">Subtotal</span>
                    <span className="text-slate-900 font-medium">{subtotal.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="text-slate-600 text-sm">VAT (15%)</span>
                    <span className="text-slate-900 font-medium">{vat.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-200">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">{total.toFixed(2)} SAR</span>
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <QRCodeSVG value={qrCodeValue} size={128} className="p-2 bg-white border border-slate-100 rounded-lg shadow-sm" />
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">
                Scan to verify with ZATCA App
            </p>
        </div>
    );
}
