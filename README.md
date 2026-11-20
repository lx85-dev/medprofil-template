# MedProfil Template

An open, immediately accessible **interactive personal medical profile & emergency summary web application** built with **React**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed for GitHub showcases and live public demos—with **no PIN lock screen, no login gate, and zero real personal medical data**.

## Live Demo

👉 **[Open Live Demo on Vercel](https://medprofil-template.vercel.app/)**

![MedProfil Preview](./public/preview.png)

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

```text
├── index.html                      # HTML entry & Google Fonts
├── public/
│   └── preview.png                 # Dashboard preview screenshot
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
│       └── EmergencyPrintSheet.tsx #
