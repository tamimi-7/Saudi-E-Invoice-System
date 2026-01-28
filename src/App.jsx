import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { generateZatcaBase64 } from './utils/zatca';
import { Trash2, Plus } from 'lucide-react';


function App() {
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [items, setItems] = useState([]);

    // بيانات الشركة (динаmic state)
    const [sellerName, setSellerName] = useState('اسم متجرك هنا');
    const [sellerVAT, setSellerVAT] = useState('300012345600003');

    // --- CALCULATION LOGIC (TODO: Implement these functions) ---

    // TODO: Calculate the total for a single line item (price * qty)
    const calculateLineTotal = (price, qty) => {
        return price * qty;
    };

    // TODO: Calculate the sum of all line totals
    const calculateSubtotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    // TODO: Calculate VAT (based on item tax type)
    const calculateVAT = (items) => {
        return items.reduce((totalVat, item) => {
            const lineTotal = item.price * item.qty;
            if (item.taxType === '15') return totalVat + (lineTotal * 0.15);
            return totalVat;
        }, 0);
    };

    // TODO: Calculate Final Total (Subtotal + VAT)
    const calculateTotal = (subtotal, vat) => {
        return subtotal + vat;
    };

    // --- END OF CALCULATION LOGIC ---

    // Derived values
    const subtotal = calculateSubtotal(items);
    const vat = calculateVAT(items); // Pass items instead of subtotal
    const total = calculateTotal(subtotal, vat);

    const handleAddItem = (newItem) => {
        // Default taxType to '15'
        setItems([...items, { ...newItem, id: Date.now(), taxType: '15' }]);
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleUpdateItem = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">نظام الفوترة الإلكترونية السعودي</h1>
                    <p className="text-gray-600 mt-2">إصدار الفواتير الضريبية المعتمدة</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Input Forms */}
                    <div className="lg:col-span-7">
                        {/* Seller Details Form (User Provided Snippet) */}
                        <div className="bg-white p-4 rounded shadow mb-6">
                            <h3 className="font-bold mb-2">بيانات المنشأة (تظهر في الـ QR)</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="اسم المتجر/الشركة"
                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="الرقم الضريبي"
                                    value={sellerVAT}
                                    onChange={(e) => setSellerVAT(e.target.value)}
                                    className="border p-2 rounded"
                                />
                            </div>
                        </div>

                        <InvoiceForm
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            date={date}
                            setDate={setDate}
                        />
                        <ProductList
                            items={items}
                            onAddItem={handleAddItem}
                            onRemoveItem={handleRemoveItem}
                            onUpdateItem={handleUpdateItem}
                        />
                    </div>

                    {/* Right Column: Preview */}
                    <div className="lg:col-span-5">
                        <InvoicePreview
                            customerName={customerName}
                            date={date}
                            items={items}
                            subtotal={subtotal}
                            vat={vat}
                            total={total}
                            sellerName={sellerName}
                            sellerVat={sellerVAT}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
