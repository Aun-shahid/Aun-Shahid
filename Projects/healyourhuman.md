# Heal Your Human

Heal Your Human is an MVP health & longevity analysis platform that ingests consumer raw DNA files (e.g., 23andMe, Ancestry), extracts relevant SNPs, normalizes genetic data, and generates an AI-driven health report with a free snapshot preview and an option to purchase a full PDF report.

## Problem

Many consumers have raw DNA data but lack tools to translate selected SNPs into actionable, understandable health insights. The main problems addressed are:
- Raw DNA files are inconsistent across providers and require normalization.
- Producing high-quality, interpretable health summaries from genetic variants is time-consuming.
- Delivering polished, downloadable reports and managing paid access is operationally heavy.

## How This Project Solves It

- Parsing & normalization: Server-side parsers convert raw files into a canonical JSON SNP format.
- AI-driven interpretation: An LLM service analyzes normalized SNPs and produces narrative insights and recommendations.
- Snapshot & paywall flow: Users get a free snapshot preview; full reports are produced as PDFs and gated behind a membership flow.
- Automation & delivery: PDF generation and email delivery are integrated so full reports are automatically created and sent post-purchase.

## Architecture (high level)

- Frontend: React + Vite + Tailwind — dashboard, upload, preview, admin views.
- Backend: Python FastAPI — file upload, parsing, normalization, LLM integration, PDF rendering, webhooks.
- Storage: Postgres (or Supabase) for users and metadata; local or object storage for uploaded files and reports.
- Integrations: OpenAI (or configurable LLM endpoint), Stripe for payments, email provider for delivery.

## Key Components

- Backend entry: [Backend/src/main.py](Backend/src/main.py)
- Parser & services: [Backend/src/services/](Backend/src/services/)
- Frontend entry: [Frontend/src/App.tsx](Frontend/src/App.tsx)

## Quick Start

Backend (basic):

1. Create a Python venv and install dependencies:

```bash
cd Backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

2. Set environment variables (copy `.env` or `.env.production` and fill values):
- `OPENAI_API_KEY`, `DATABASE_URL`, `STRIPE_SECRET_KEY`, other keys used in `Backend/src/config.py`.

3. Run the backend:

```bash
uvicorn src.main:app --reload --port 8000
```

Frontend (basic):

1. From the `Frontend` folder install and run:

```bash
cd Frontend
npm install
npm run dev
```

## Where to look

- Parsing and analysis: [Backend/src/services/blood_parsing.py](Backend/src/services/blood_parsing.py) and [Backend/src/services/ai_service.py](Backend/src/services/ai_service.py)
- API endpoints: [Backend/src/api/v1/](Backend/src/api/v1/)
- Report/PDF generation: [Backend/src/services/pdf_report.py](Backend/src/services/pdf_report.py) and [Backend/src/services/pdf_report_blood.py](Backend/src/services/pdf_report_blood.py)

## Security & Data Handling

- Uploaded DNA files and generated reports are stored in `uploads/` and `static/reports/` respectively. Implement or configure encrypted object storage and deletion endpoints for production.
- Auth and permissions live under `Backend/src/auth/` and should be integrated with a production identity provider.

## Notes & Next Steps

- Replace or configure the LLM provider endpoint in `Backend/src/services/ai_service.py` depending on quota/cost requirements.
- Add automated tests for the SNP parser and normalization pipeline.

## License & Credits

This repository is an internal MVP. Credit: CodeXcape — Software Solutions.

---

If you'd like, I can expand any section (detailed API docs, example payloads, or deployment notes).
