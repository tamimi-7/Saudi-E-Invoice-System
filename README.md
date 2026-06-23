# Invoice — ZATCA Phase 1 Tax Invoice Tool 🇸🇦

A lightweight, open-source tool for generating and printing
tax invoices compliant with ZATCA Phase 1 requirements.

## Features
- Supports B2C and B2B invoice types
- QR Code with TLV Base64 encoding — scannable via the
  official ZATCA app
- Auto-calculates 15% VAT and totals per line item
- Print-ready layout (clean PDF export, no buttons/menus)
- Auto-incremented invoice numbering

## Tech Stack
React.js (Vite) — Tailwind CSS — Custom TLV Base64 encoder

## ⚠️ Disclaimer
This tool covers Phase 1 only (generation & printing).
It does not produce XML UBL 2.1 files or integrate with
ZATCA servers (Phase 2). Use in production at your own risk
and always consult your accountant.
