import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { generateZatcaBase64 } from './utils/zatca';
import { Trash2, Plus } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import ProductList from './components/ProductList';
import InvoicePreview from './components/InvoicePreview';


function App() {
    const [invoiceType, setInvoiceType] = useState('B2C');
    const [customerName, setCustomerName] = useState('');
    const [customerVat, setCustomerVat] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    // Set default precise date
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
    const [date, setDate] = useState(getCurrentDateTime());

    const [items, setItems] = useState([]);

    // بيانات الشركة (динаmic state)
    const [sellerName, setSellerName] = useState('اسم متجرك هنا');
    const [sellerVAT, setSellerVAT] = useState('300012345600003');
    const [sellerAddress, setSellerAddress] = useState({
        buildingNo: '1234',
        street: 'شارع الملك فهد',
        district: 'العليا',
        city: 'الرياض',
        zipCode: '12211'
    });

    // Invoice Sequential Number
    const [invoiceSequence, setInvoiceSequence] = useState(1);
    const invoiceNumber = `INV-${String(invoiceSequence).padStart(4, '0')}`;

    const handleGenerateNewInvoice = () => {
        setInvoiceSequence(prev => prev + 1);
        setItems([]);
        setCustomerName('');
        setCustomerVat('');
        setCustomerAddress('');
        setDate(getCurrentDateTime());
    };

    const validateVat = (vat) => {
        if (!vat) return false;
        return /^3\d{13}3$/.test(vat);
    };

    const isSellerVatValid = validateVat(sellerVAT);
    const isCustomerVatValid = invoiceType === 'B2B' ? validateVat(customerVat) : true;
    const canGenerateQrAndPrint = isSellerVatValid && isCustomerVatValid;

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
                    <h1 className="text-3xl font-bold text-gray-800">نظام الفاتورة الإلكترونية السعودية</h1>
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
                                    className={`border p-2 rounded focus:outline-none focus:ring-2 ${!isSellerVatValid && sellerVAT ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                <input
                                    type="text"
                                    placeholder="رقم المبنى"
                                    value={sellerAddress.buildingNo}
                                    onChange={(e) => setSellerAddress({ ...sellerAddress, buildingNo: e.target.value })}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="اسم الشارع"
                                    value={sellerAddress.street}
                                    onChange={(e) => setSellerAddress({ ...sellerAddress, street: e.target.value })}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="الحي"
                                    value={sellerAddress.district}
                                    onChange={(e) => setSellerAddress({ ...sellerAddress, district: e.target.value })}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="المدينة"
                                    value={sellerAddress.city}
                                    onChange={(e) => setSellerAddress({ ...sellerAddress, city: e.target.value })}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="الرمز البريدي"
                                    value={sellerAddress.zipCode}
                                    onChange={(e) => setSellerAddress({ ...sellerAddress, zipCode: e.target.value })}
                                    className="border p-2 rounded"
                                />
                            </div>
                            {!isSellerVatValid && (
                                <p className="text-red-500 text-xs mt-2">
                                    الرقم الضريبي يجب أن يكون 15 رقماً ويبدأ بـ 3 وينتهي بـ 3.
                                </p>
                            )}
                        </div>

                        <InvoiceForm
                            invoiceType={invoiceType}
                            setInvoiceType={setInvoiceType}
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            customerVat={customerVat}
                            setCustomerVat={setCustomerVat}
                            customerAddress={customerAddress}
                            setCustomerAddress={setCustomerAddress}
                            date={date}
                            setDate={setDate}
                            isCustomerVatValid={isCustomerVatValid}
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
                            invoiceType={invoiceType}
                            customerName={customerName}
                            customerVat={customerVat}
                            customerAddress={customerAddress}
                            date={date}
                            items={items}
                            subtotal={subtotal}
                            vat={vat}
                            total={total}
                            sellerName={sellerName}
                            sellerVat={sellerVAT}
                            sellerAddress={sellerAddress}
                            canGenerateQrAndPrint={canGenerateQrAndPrint}
                            invoiceNumber={invoiceNumber}
                            onGenerateNewInvoice={handleGenerateNewInvoice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
