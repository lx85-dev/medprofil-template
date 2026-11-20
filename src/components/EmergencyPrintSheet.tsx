import React from 'react';
import type { MedicalProfile } from '../types/profile';
import type { Translations } from '../i18n/translations';

interface EmergencyPrintSheetProps {
  profile: MedicalProfile;
  t: Translations;
}

/**
 * Clean, high-contrast A4 clinical summary visible strictly during browser print / PDF export.
 */
export const EmergencyPrintSheet: React.FC<EmergencyPrintSheetProps> = ({ profile, t }) => {
  const { identity, vitals, allergies, medications, conditions, emergencyContacts, doctors, labResults } =
    profile;

  return (
    <div className="hidden print-only text-slate-900 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-5">
        <div>
          <p className="text-xs font-semibold text-slate-500">{t.print.subtitle}</p>
          <h1 className="text-2xl font-bold mt-1">{identity.fullName}</h1>
          <p className="text-xs text-slate-600 mt-1 font-mono tabular-nums">
            DOB: {identity.dateOfBirth} · {identity.gender} · {identity.heightCm} cm ·{' '}
            {identity.weightKg} kg
          </p>
          <p className="text-xs text-slate-600 mt-0.5">
            {identity.insuranceProvider} ({identity.insuranceNumber}) · {t.overview.organDonor}:{' '}
            {identity.organDonor ? t.overview.yes : t.overview.no}
          </p>
        </div>
        <div className="text-right border border-red-600 rounded-lg px-4 py-2">
          <div className="text-[11px] font-semibold text-red-700">{t.overview.bloodType}</div>
          <div className="text-2xl font-bold font-mono text-red-700">{identity.bloodType}</div>
        </div>
      </div>

      {/* Emergency Note */}
      <div className="mb-5 p-3 rounded-lg border border-slate-300 bg-slate-50">
        <div className="text-xs font-bold text-slate-800">{t.sections.criticalEmergencyNote}</div>
        <p className="text-xs text-slate-700 mt-1">{identity.emergencyNote}</p>
        <p className="text-xs text-slate-600 mt-1">
          <strong>{t.print.directive}:</strong> {identity.advanceDirective}
        </p>
      </div>

      {/* Two-Column Critical Clinical Data */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.overview.allergiesTitle} ({allergies.length})
          </h2>
          {allergies.length === 0 ? (
            <p className="text-xs text-slate-500">{t.overview.emptyAllergies}</p>
          ) : (
            <ul className="space-y-1.5 text-xs">
              {allergies.map((a) => (
                <li key={a.id}>
                  <strong>{a.allergen}</strong> ({t.status[a.severity]} · {a.category}) —{' '}
                  {a.reaction}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.sections.activeMedications} ({medications.filter((m) => m.active).length})
          </h2>
          {medications.length === 0 ? (
            <p className="text-xs text-slate-500">{t.overview.emptyMedications}</p>
          ) : (
            <ul className="space-y-1.5 text-xs">
              {medications.map((m) => (
                <li key={m.id}>
                  <strong>{m.name}</strong> ({m.dosage}) — {m.frequency}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Contacts & Care Team */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.overview.emergencyContacts}
          </h2>
          <ul className="space-y-1.5 text-xs">
            {emergencyContacts.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> ({c.relationship}) ·{' '}
                <span className="font-mono tabular-nums">{c.phone}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.overview.physiciansTitle}
          </h2>
          <ul className="space-y-1.5 text-xs">
            {doctors.map((d) => (
              <li key={d.id}>
                <strong>{d.name}</strong> ({d.specialty}) · {d.clinic} ·{' '}
                <span className="font-mono tabular-nums">{d.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Baseline Vitals & Conditions */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.overview.baselineVitals} ({vitals.recordedAt})
          </h2>
          <div className="text-xs font-mono tabular-nums space-y-1">
            <div>
              {t.overview.bloodPressure}: {vitals.systolic}/{vitals.diastolic} mmHg
            </div>
            <div>
              {t.overview.restingHeartRate}: {vitals.heartRateBpm} bpm
            </div>
            <div>
              {t.overview.fastingGlucose}: {vitals.bloodGlucoseMgDl} mg/dL · SpO₂:{' '}
              {vitals.spo2Percent}%
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.sections.medicalConditions}
          </h2>
          <ul className="space-y-1 text-xs">
            {conditions.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> ({t.status[c.status]}, {t.sections.since}{' '}
                {c.diagnosedYear})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Labs */}
      {labResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 mb-2">
            {t.overview.sampleLabsTitle}
          </h2>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-600">
                <th className="py-1">{t.overview.colBiomarker}</th>
                <th className="py-1 text-right">{t.overview.colResult}</th>
                <th className="py-1 text-right">{t.overview.colRefRange}</th>
                <th className="py-1 text-right">{t.overview.colStatus}</th>
                <th className="py-1 text-right">{t.overview.colDate}</th>
              </tr>
            </thead>
            <tbody>
              {labResults.map((l) => (
                <tr key={l.id} className="border-b border-slate-100">
                  <td className="py-1 font-medium">{l.testName}</td>
                  <td className="py-1 text-right font-mono tabular-nums">
                    {l.value} {l.unit}
                  </td>
                  <td className="py-1 text-right font-mono tabular-nums text-slate-500">
                    {l.refMin}–{l.refMax}
                  </td>
                  <td className="py-1 text-right">{t.status[l.status]}</td>
                  <td className="py-1 text-right font-mono tabular-nums text-slate-500">
                    {l.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
        <span>
          {t.print.generatedLocally} {profile.lastUpdated}
        </span>
        <span>{t.print.disclaimer}</span>
      </div>
    </div>
  );
};
