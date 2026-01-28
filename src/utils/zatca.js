/**
 * Generates a TLV (Tag-Length-Value) encoded buffer field.
 * @param {number} tag - The tag number (1 to 5 for Phase 1).
 * @param {string} value - The string value to encode.
 * @returns {Uint8Array} - The encoded TLV byte array.
 */
const generateTLV = (tag, value) => {
    const encoder = new TextEncoder();
    const valueBytes = encoder.encode(value);
    const length = valueBytes.length;

    // Create a buffer: Tag (1 byte) + Length (1 byte) + Value (length bytes)
    // Note: This implementation assumes length < 256 bytes, which is standard for Phase 1 basic fields.
    const tlvBuffer = new Uint8Array(2 + length);

    tlvBuffer[0] = tag;
    tlvBuffer[1] = length;
    tlvBuffer.set(valueBytes, 2);

    return tlvBuffer;
};

/**
 * Generates the Base64 encoded QR code string for ZATCA E-Invoicing Phase 1.
 * @param {string} sellerName - The name of the seller.
 * @param {string} vatRegNumber - The VAT registration number of the seller.
 * @param {string} timestamp - The invoice timestamp (ISO 8601).
 * @param {string} total - The invoice total amount (with VAT).
 * @param {string} vatTotal - The VAT total amount.
 * @returns {string} - Base64 encoded string.
 */
export const generateZatcaBase64 = (sellerName, vatRegNumber, timestamp, total, vatTotal) => {
    // Define the tags in order
    const tags = [
        { tag: 1, value: sellerName },
        { tag: 2, value: vatRegNumber },
        { tag: 3, value: timestamp },
        { tag: 4, value: String(total) },
        { tag: 5, value: String(vatTotal) },
    ];

    // Calculate total length
    let totalLength = 0;
    const buffers = tags.map(({ tag, value }) => {
        const tlv = generateTLV(tag, value);
        totalLength += tlv.length;
        return tlv;
    });

    // Concatenate all buffers
    const finalBuffer = new Uint8Array(totalLength);
    let offset = 0;
    buffers.forEach((buffer) => {
        finalBuffer.set(buffer, offset);
        offset += buffer.length;
    });

    // Convert Uint8Array to binary string
    let binaryString = '';
    for (let i = 0; i < finalBuffer.length; i++) {
        binaryString += String.fromCharCode(finalBuffer[i]);
    }

    // Base64 encode
    return btoa(binaryString);
};
