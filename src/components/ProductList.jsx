import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ProductList({ items, onAddItem, onRemoveItem, onUpdateItem }) {
    const [newItem, setNewItem] = useState({ name: '', price: '', qty: '' });

    const handleAdd = () => {
        if (!newItem.name || !newItem.price || !newItem.qty) return;
        onAddItem({
            ...newItem,
            price: parseFloat(newItem.price),
            qty: parseInt(newItem.qty)
        });
        setNewItem({ name: '', price: '', qty: '' });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Products & Services</h2>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="w-full mb-6">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Product Name</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">Price (SAR)</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">Qty</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">Tax Type</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">Total</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 text-slate-800">{item.name}</td>
                                <td className="px-4 py-3 text-right text-slate-600">{item.price.toFixed(2)}</td>
                                <td className="px-4 py-3 text-right text-slate-600">{item.qty}</td>
                                <td className="px-4 py-3 text-center">
                                    <select
                                        value={item.taxType}
                                        onChange={(e) => onUpdateItem(item.id, 'taxType', e.target.value)}
                                        className="border p-1 rounded text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="15">15%</option>
                                        <option value="0">0%</option>
                                        <option value="exempt">Exempt</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3 text-right font-medium text-slate-800">
                                    {/* Placeholder for line total, calculating strictly for display here not logic */}
                                    {(item.price * item.qty).toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-4 py-8 text-center text-slate-400 italic">
                                    No items added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add New Item Form */}
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Add New Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-6">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="number"
                            placeholder="Price"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="number"
                            placeholder="Qty"
                            value={newItem.qty}
                            onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <button
                            onClick={handleAdd}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
