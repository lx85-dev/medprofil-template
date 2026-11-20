# MedProfil Template

An open, immediately accessible **interactive personal medical profile & emergency summary web application** built with **React**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed for GitHub showcases and live public demos—with **no PIN lock screen, no login gate, and zero real personal medical data**.

## Live Demo

👉 **[Open Live Demo on Vercel](https://medprofil-template.vercel.app/)**

## Features

- **Instant Public Access:** Opens straight into the interactive profile dashboard with zero authentication or PIN barriers.
- **Worldwide Language Switcher (English Default):** Includes a crisp vector-flag language dropdown in the header supporting **English** (strict default on load), **Deutsch**, **Español**, **Français**, **Italiano**, **Türkçe**, and **日本語**.
- **100% Editable in the Browser:** Add, edit, or delete patient identity details, blood type, emergency notes, baseline vitals, allergies, active medications, conditions, immunizations, emergency contacts, physicians, and sample lab values right in the UI.
- **Browser-Local Persistence:** All edits are saved automatically to `localStorage` in your own browser—nothing is sent to a server.
- **Print & JSON Backup:**
  - **Print Emergency Summary (A4 / PDF)** with a dedicated high-contrast `@media print` layout.
  - **Export / Import JSON** to save a local backup or load a previously saved profile.
  - **Reset to Demo Data** to restore the fictional `Alex Morgan (Demo)` template at any time.
- **Custom Animated Vector Characters:**
  - **Medi Guide** animated medical-tech mascot that reacts to edits and alerts.
  - Switchable stylized **Patient Character Avatars** (`Classic`, `Active`, `Studio`, `Scholar`).
  - Role-specific vector character avatars for **Emergency Contacts**, **Primary & Specialist Physicians**, and **First Responders**.
- **Dynamic ECG Pulse Visualization:** The vital-signs resting heart rate waveform updates its sweep tempo live based on the configured BPM.
- **Light & Dark Themes:** Accessible dual-theme support with crisp contrast and tabular numerals.

## Project Structure

    ├── index.html                      # HTML entry & Google Fonts
    ├── src/
    │   ├── main.tsx                    # React entry point
    │   ├── index.css                   # Tailwind CSS v4 tokens & @media print styles
    │   ├── App.tsx                     # Workspace shell, sidebar, top bar & routing
    │   ├── i18n/
    │   │   └── translations.ts         # Multi-language dictionary (default: English)
    │   ├── types/
    │   │   └── profile.ts              # Strongly-typed MedicalProfile interfaces
    │   ├── data/
    │   │   └── demoProfile.ts          # 100% fictional default English demo dataset
    │   ├── hooks/
    │   │   └── useMedicalProfile.ts    # Browser-local CRUD state & JSON import/export
    │   └── components/
    │       ├── LanguageDropdown.tsx    # Vector-flag worldwide language selector
    │       ├── CharacterAvatars.tsx    # Custom animated SVG mascot & role avatars
    │       ├── VitalWaveform.tsx       # Heart-rate-synced SVG ECG animation
    │       ├── OverviewView.tsx        # Bento dashboard overview
    │       ├── SectionViews.tsx        # Emergency, Meds, Allergies, Labs & Contacts views
    │       ├── ProfileModals.tsx       # Inline editing, export/print & reset modals
    │       └── EmergencyPrintSheet.tsx # Dedicated A4 clinical print layout
    └── vite.config.ts                  # Static Vite build config

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Run Locally

    git clone [https://github.com/lx85-dev/medprofil-template.git](https://github.com/lx85-dev/medprofil-template.git)
    cd medprofil-template
    npm install --legacy-peer-deps
    npm run dev

Open `http://localhost:5173` in your browser.

### Build for Production (Static Hosting)

    npm run build

The production bundle is generated in `dist/` and can be deployed directly to **Vercel**, **GitHub Pages**, **Netlify**, or **Cloudflare Pages** as a pure static frontend (no backend or `/api` directory required).

## Customizing Default Demo Data

To change the default profile shown to new visitors, edit `src/data/demoProfile.ts`. Keep public repositories free of real personal health data.

## Privacy & Medical Disclaimer

- This repository contains **100% fictional placeholder data** (`Alex Morgan (Demo)` and sample values).
- All user edits stay strictly in browser `localStorage` unless manually exported by the user.
- **Not a certified electronic medical record (EMR).** Always verify critical medical information with qualified healthcare professionals.

## License

Distributed under the MIT License. See `LICENSE` for more information. Created by [@lx85-dev](https://github.com/lx85-dev).
