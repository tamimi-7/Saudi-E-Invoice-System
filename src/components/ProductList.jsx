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

        <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-bold mb-4 text-gray-700">المنتجات والخدمات</h3>

            <table className="w-full mb-4">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="text-right p-2 text-sm text-gray-600">اسم المنتج</th>
                        <th className="text-right p-2 text-sm text-gray-600 w-24">السعر</th>
                        <th className="text-right p-2 text-sm text-gray-600 w-20">الكمية</th>
                        <th className="text-right p-2 text-sm text-gray-600 w-24">الضريبة</th>
                        <th className="text-right p-2 text-sm text-gray-600 w-24">المجموع</th>
                        <th className="text-center p-2 text-sm text-gray-600 w-16">حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        onUpdateItem(item.id, 'price', isNaN(val) ? 0 : val);
                                    }}
                                    className="w-20 border p-1 rounded"
                                />
                            </td>
                            <td className="p-2">
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={item.qty}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value, 10);
                                        onUpdateItem(item.id, 'qty', isNaN(val) || val < 1 ? 1 : val);
                                    }}
                                    className="w-16 border p-1 rounded"
                                />
                            </td>
                            <td className="p-2">
                                <select
                                    value={item.taxType}
                                    onChange={(e) => onUpdateItem(item.id, 'taxType', e.target.value)}
                                    className="border p-1 rounded text-sm"
                                >
                                    <option value="15">15%</option>
                                    <option value="0">0%</option>
                                    <option value="exempt">معفاة</option>
                                </select>
                            </td>
                            <td className="p-2">{(item.price * item.qty).toFixed(2)}</td>
                            <td className="p-2 text-center">
                                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center p-4 text-gray-400">لا يوجد منتجات مضافة</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* منطقة إضافة صنف جديد */}
            <div className="bg-gray-50 p-4 rounded border">
                <h4 className="text-sm font-bold text-gray-600 mb-2">إضافة صنف جديد</h4>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="اسم المنتج"
                        className="border p-2 rounded flex-grow"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="السعر"
                        className="border p-2 rounded w-24"
                        value={newItem.price}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setNewItem({ ...newItem, price: val < 0 ? 0 : val });
                        }}
                    />
                    <input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="الكمية"
                        className="border p-2 rounded w-20"
                        value={newItem.qty}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setNewItem({ ...newItem, qty: isNaN(val) || val < 1 ? 1 : val });
                        }}
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
                    >
                        <Plus size={16} /> إضافة
                    </button>
                </div>
            </div>
        </div>
    );
}
