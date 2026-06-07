# Energy Audit

Small web app for processing energy measurement files and generating reports (Frontend + Backend).

Problem
-------

Energy auditors and facility managers commonly receive large CSV or TXT measurement files from meters and data loggers that are noisy, inconsistent, and sampled at different intervals. Manually cleaning, resampling, extracting key metrics (peak demand, energy use, load factor) and producing formatted client reports is time consuming, error prone, and difficult to scale when working across many sites.

Solution
--------

This project automates the end-to-end flow: ingesting measurement files, normalizing and cleaning the time series, extracting energy metrics and features, optionally applying lightweight AI/heuristic models for pattern detection, and producing human-readable reports (PDF/DOC/TXT) with visualizations. Key design points:

- Modular processing pipeline: file ingestion, cleaning/resampling, feature extraction, analysis (`Backend/service/file_processor.py`, `ai_service.py`).
- Robust time handling: aligns and resamples data to uniform intervals, interpolates or flags missing values, and removes obvious outliers.
- Automated analytics: computes common KPIs (total energy, peak demand, load factor, daily/weekly profiles) and detects anomalies or unusual patterns.
- Report generation: programmatic creation of formatted reports and charts (`Backend/service/pdf_report.py`) so outputs are consistent and reproducible.
- API-first architecture: a lightweight backend exposes endpoints for uploads and processing, and a frontend provides file upload, progress, and results visualization.

Benefits
--------

- Reduces manual preprocessing and report preparation time from hours to minutes.
- Produces repeatable, auditable results useful for clients and energy-saving recommendations.
- Easy to extend: new file formats, analysis modules, or ML models can be added to the pipeline.

Project structure
- Backend: Python API and services ([Backend/requirements.txt](Backend/requirements.txt))
- Frontend: Vite + React TypeScript app ([Frontend/package.json](Frontend/package.json))

Quick start

Backend (local)
1. Change to the backend folder:

   cd Backend

2. Install dependencies:

   python -m pip install -r requirements.txt

3. Run the API (example using uvicorn):

   uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

Frontend (local)
1. Change to the frontend folder:

   cd Frontend

2. Install dependencies and start dev server:

   npm install
   npm run dev

Notes
- The backend contains a `Dockerfile` for containerized runs.
- If the backend uses FastAPI, API docs are typically available at `http://localhost:8000/docs`.

Where to look
- Backend main: [Backend/src/main.py](Backend/src/main.py)
- Frontend entry: [Frontend/src/main.tsx](Frontend/src/main.tsx)

If you want, I can also commit this file to Git, expand the README with API details, or add examples.



production link:
https://energy-audit-frontend.dev.codexcape.solutions

