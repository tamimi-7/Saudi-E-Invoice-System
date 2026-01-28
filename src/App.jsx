import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import ProductList from './components/ProductList';
import InvoicePreview from './components/InvoicePreview';

function App() {
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [items, setItems] = useState([]);

    // Seller Info (Static for now)
    const sellerName = "Al-Amal Tech Solutions";
    const sellerVat = "300012345600003";

    // --- CALCULATION LOGIC (TODO: Implement these functions) ---

    // TODO: Calculate the total for a single line item (price * qty)
    const calculateLineTotal = (price, qty) => {
        return 0; // Replace with actual calculation
    };

    // TODO: Calculate the sum of all line totals
    const calculateSubtotal = (items) => {
        return 0; // Replace with actual calculation
    };

    // TODO: Calculate VAT (15% of subtotal)
    const calculateVAT = (subtotal) => {
        return 0; // Replace with actual calculation
    };

    // TODO: Calculate Final Total (Subtotal + VAT)
    const calculateTotal = (subtotal, vat) => {
        return 0; // Replace with actual calculation
    };

    // --- END OF CALCULATION LOGIC ---

    // Derived values
    const subtotal = calculateSubtotal(items);
    const vat = calculateVAT(subtotal);
    const total = calculateTotal(subtotal, vat);

    const handleAddItem = (newItem) => {
        setItems([...items, { ...newItem, id: Date.now() }]);
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Saudi E-Invoicing System</h1>
                    <p className="text-slate-500 mt-2">ZATCA Phase 1 Compliant Invoice Generator</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Input Forms */}
                    <div className="lg:col-span-7">
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
                            sellerVat={sellerVat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
