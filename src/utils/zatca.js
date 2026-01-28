// src/utils/zatca.js

const getTLV = (tag, value) => {
    const valueBytes = new TextEncoder().encode(value);
    const length = valueBytes.length;
    // دمج التاق والطول والقيمة في مصفوفة بايتات
    const tlvBytes = new Uint8Array(2 + length);
    tlvBytes[0] = tag;
    tlvBytes[1] = length;
    tlvBytes.set(valueBytes, 2);
    return tlvBytes;
};

export const generateZatcaBase64 = (sellerName, vatRegistrationNumber, timestamp, invoiceTotal, vatTotal) => {
    // تجميع البيانات الخمسة المطلوبة من الهيئة
    const tags = [
        getTLV(1, sellerName),           // اسم المورد
        getTLV(2, vatRegistrationNumber),// الرقم الضريبي
        getTLV(3, timestamp),            // الوقت والتاريخ
        getTLV(4, invoiceTotal),         // إجمالي الفاتورة
        getTLV(5, vatTotal)              // إجمالي الضريبة
    ];

    // دمج كل البايتات مع بعض
    const totalLength = tags.reduce((acc, tag) => acc + tag.length, 0);
    const allBytes = new Uint8Array(totalLength);

    let offset = 0;
    tags.forEach(tag => {
        allBytes.set(tag, offset);
        offset += tag.length;
    });

    // التحويل النهائي إلى Base64
    // نستخدم طريقة تدعم المتصفح للتعامل مع الباينري
    let binary = '';
    const len = allBytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(allBytes[i]);
    }

    return window.btoa(binary);
};
