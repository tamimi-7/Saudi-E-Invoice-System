// Simple UUIDv4 Generator using crypto if available, or fallback
const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const generateZatcaXML = (
    invoiceType,
    invoiceNumber,
    date,
    sellerName,
    sellerVat,
    sellerAddress,
    customerName,
    customerVat,
    customerAddress,
    items,
    subtotal,
    vat,
    total
) => {
    // Basic ZATCA UBL 2.1 Structure
    // In a real-world scenario, this should be mathematically exact and cryptographically signed.
    const isB2B = invoiceType === 'B2B';
    const invoiceTypeCode = isB2B ? '388' : '388'; // Simplified for demo
    const formattedDate = date ? date.split('T')[0] : '';
    const formattedTime = date ? date.split('T')[1]?.substring(0, 8) : '';
    const uniqueInvoiceId = generateUUID();

    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
    <ext:UBLExtensions>
        <!-- Empty extension for Cryptographic Stamp (ZATCA requirement) -->
    </ext:UBLExtensions>
    <cbc:ProfileID>reporting:1.0</cbc:ProfileID>
    <cbc:ID>${invoiceNumber}</cbc:ID>
    <cbc:UUID>${uniqueInvoiceId}</cbc:UUID>
    <cbc:IssueDate>${formattedDate}</cbc:IssueDate>
    <cbc:IssueTime>${formattedTime}</cbc:IssueTime>
    <cbc:InvoiceTypeCode name="${isB2B ? '0100000' : '0200000'}">${invoiceTypeCode}</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>SAR</cbc:DocumentCurrencyCode>
    <cbc:TaxCurrencyCode>SAR</cbc:TaxCurrencyCode>
    
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cac:PartyIdentification>
                <cbc:ID schemeID="CRN">1234567890</cbc:ID>
            </cac:PartyIdentification>
            <cac:PostalAddress>
                <cbc:StreetName>${sellerAddress?.street || 'N/A'}</cbc:StreetName>
                <cbc:BuildingNumber>${sellerAddress?.buildingNo || 'N/A'}</cbc:BuildingNumber>
                <cbc:CitySubdivisionName>${sellerAddress?.district || 'N/A'}</cbc:CitySubdivisionName>
                <cbc:CityName>${sellerAddress?.city || 'N/A'}</cbc:CityName>
                <cbc:PostalZone>${sellerAddress?.zipCode || 'N/A'}</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>SA</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${sellerVat}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>${sellerName}</cbc:RegistrationName>
            </cac:PartyLegalEntity>
        </cac:Party>
    </cac:AccountingSupplierParty>
    
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PostalAddress>
                <cbc:StreetName>${customerAddress || 'N/A'}</cbc:StreetName>
                <cac:Country>
                    <cbc:IdentificationCode>SA</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            ${isB2B ? `
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${customerVat}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            ` : ''}
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>${customerName || 'Cash Customer'}</cbc:RegistrationName>
            </cac:PartyLegalEntity>
        </cac:Party>
    </cac:AccountingCustomerParty>
    
    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount currencyID="SAR">${subtotal.toFixed(2)}</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="SAR">${subtotal.toFixed(2)}</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="SAR">${total.toFixed(2)}</cbc:TaxInclusiveAmount>
        <cbc:AllowanceTotalAmount currencyID="SAR">0.00</cbc:AllowanceTotalAmount>
        <cbc:PrepaidAmount currencyID="SAR">0.00</cbc:PrepaidAmount>
        <cbc:PayableAmount currencyID="SAR">${total.toFixed(2)}</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>
</Invoice>`;

    return xmlString;
};
