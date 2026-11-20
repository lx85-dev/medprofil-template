import React from 'react';
import { motion } from 'motion/react';
import {
  Pencil,
  Plus,
  Trash2,
  Phone,
  ArrowRight,
  AlertTriangle,
  Shuffle,
  ShieldAlert,
} from 'lucide-react';
import type {
  MedicalProfile,
  ActiveSection,
  PatientAvatarVariant,
  AllergySeverity,
  LabStatus,
} from '../types/profile';
import type { Translations } from '../i18n/translations';
import type { ModalState } from './ProfileModals';
import { PatientAvatar, RoleAvatar, PATIENT_AVATAR_OPTIONS } from './CharacterAvatars';
import { VitalWaveform } from './VitalWaveform';

interface OverviewViewProps {
  profile: MedicalProfile;
  t: Translations;
  onOpenModal: (modal: ModalState) => void;
  onNavigate: (section: ActiveSection) => void;
  onQuickAvatarCycle: (next: PatientAvatarVariant) => void;
  onDeleteAllergy: (id: string) => void;
  onDeleteMedication: (id: string) => void;
  onToggleMedicationActive: (id: string) => void;
  onDeleteLab: (id: string) => void;
}

function calculateAge(dob: string): number | null {
  const parsed = new Date(dob);
  if (Number.isNaN(parsed.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - parsed.getFullYear();
  const m = now.getMonth() - parsed.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < parsed.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
}

function calculateBmi(heightCm: number, weightKg: number): string {
  if (!heightCm || !weightKg) return '—';
  const heightM = heightCm / 100;
  return (weightKg / (heightM * heightM)).toFixed(1);
}

export function severityTextStyle(severity: AllergySeverity): string {
  switch (severity) {
    case 'Severe':
      return 'text-red-700 dark:text-red-400 font-semibold';
    case 'Moderate':
      return 'text-amber-700 dark:text-amber-400 font-semibold';
    case 'Mild':
      return 'text-slate-600 dark:text-slate-400 font-medium';
  }
}

export function labStatusTextStyle(status: LabStatus): string {
  switch (status) {
    case 'Normal':
      return 'text-emerald-700 dark:text-emerald-400 font-medium';
    case 'Borderline':
      return 'text-amber-700 dark:text-amber-400 font-semibold';
    case 'Attention':
      return 'text-red-700 dark:text-red-400 font-semibold';
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.045,
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  profile,
  t,
  onOpenModal,
  onNavigate,
  onQuickAvatarCycle,
  onDeleteAllergy,
  onDeleteMedication,
  onToggleMedicationActive,
  onDeleteLab,
}) => {
  const { identity, vitals, allergies, medications, emergencyContacts, doctors, labResults } =
    profile;
  const age = calculateAge(identity.dateOfBirth);
  const bmi = calculateBmi(identity.heightCm, identity.weightKg);

  const cycleAvatar = () => {
    const idx = PATIENT_AVATAR_OPTIONS.findIndex((o) => o.id === identity.avatarVariant);
    const next = PATIENT_AVATAR_OPTIONS[(idx + 1) % PATIENT_AVATAR_OPTIONS.length].id;
    onQuickAvatarCycle(next);
  };

  const severeCount = allergies.filter((a) => a.severity === 'Severe').length;
  const activeMeds = medications.filter((m) => m.active);

  return (
    <div className="space-y-6">
      {/* Row 1: Focal Hero Patient Profile Header */}
      <motion.section
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 transition-colors"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 min-w-0">
            <div className="relative shrink-0 self-start sm:self-auto">
              <PatientAvatar variant={identity.avatarVariant} size={92} />
              <button
                type="button"
                onClick={cycleAvatar}
                title={t.overview.switchAvatarTitle}
                aria-label={t.overview.switchAvatarTitle}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-teal-700 dark:text-teal-400 font-medium">
                <span>{t.publicDemoBadge}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  ·
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">
                  {t.editableInBrowser}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  ·
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-mono tabular-nums font-normal">
                  {t.updated} {profile.lastUpdated}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-1 text-balance">
                {identity.fullName}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-mono tabular-nums">
                  {identity.dateOfBirth}
                  {age !== null ? ` (${age} ${t.overview.yrs})` : ''}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  ·
                </span>
                <span>{identity.gender}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  ·
                </span>
                <span className="font-mono tabular-nums">
                  {identity.heightCm} cm / {identity.weightKg} kg (BMI {bmi})
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  ·
                </span>
                <span>
                  {t.overview.organDonor}: {identity.organDonor ? t.overview.yes : t.overview.no}
                </span>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span>{identity.insuranceProvider}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">ID {identity.insuranceNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{identity.primaryLanguage}</span>
              </div>
            </div>
          </div>

          {/* Right Focal Blood Type & Edit Action */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-3.5 pr-4 sm:border-r border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t.overview.bloodType}
                </div>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-red-600 dark:text-red-400 leading-none mt-1">
                  {identity.bloodType}
                </div>
              </div>
              {severeCount > 0 && (
                <div className="pl-3.5 border-l border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.overview.severeAlerts}
                  </div>
                  <div className="text-lg font-bold font-mono tabular-nums text-red-600 dark:text-red-400 leading-tight mt-0.5 flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {severeCount}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onOpenModal({ type: 'identity', data: identity })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              {t.overview.editProfile}
            </button>
          </div>
        </div>

        {/* Emergency Responder Summary Bar inside Hero separated by hairline divider */}
        {identity.emergencyNote && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {t.overview.emergencyNoteLabel}:{' '}
                </span>
                {identity.emergencyNote}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('emergency')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.overview.openEmergencyCard}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.section>

      {/* Row 2: 4-Column Baseline Vitals Strip + Interactive Heartbeat Waveform */}
      <motion.section
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
              {t.overview.baselineVitals}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              {t.overview.recorded} {vitals.recordedAt}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'vitals', data: vitals })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            {t.overview.editVitals}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
          {/* Blood Pressure */}
          <div className="p-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.overview.bloodPressure}
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
                {vitals.systolic}/{vitals.diastolic}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">mmHg</span>
            </div>
            <div className="mt-1.5 text-xs text-emerald-700 dark:text-emerald-400">
              {vitals.systolic < 130 && vitals.diastolic < 85
                ? t.overview.optimalRange
                : t.overview.monitorReading}
            </div>
          </div>

          {/* Resting Heart Rate + Dynamic ECG Waveform */}
          <div className="p-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t.overview.restingHeartRate}
              </span>
              <span className="text-[11px] font-mono tabular-nums text-teal-700 dark:text-teal-400">
                {t.overview.ecgSync}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-1.5 shrink-0">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
                  {vitals.heartRateBpm}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">bpm</span>
              </div>
              <VitalWaveform
                heartRateBpm={vitals.heartRateBpm}
                className="w-28 text-teal-600 dark:text-teal-400 shrink-0"
              />
            </div>
          </div>

          {/* Fasting Glucose */}
          <div className="p-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.overview.fastingGlucose}
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
                {vitals.bloodGlucoseMgDl}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">mg/dL</span>
            </div>
            <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Ref: 70–99 mg/dL
            </div>
          </div>

          {/* Oxygen Saturation */}
          <div className="p-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.overview.oxygenSaturation}
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
                {vitals.spo2Percent}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">%</span>
            </div>
            <div className="mt-1.5 text-xs text-emerald-700 dark:text-emerald-400">
              {vitals.spo2Percent >= 95 ? t.overview.normalSaturation : t.overview.belowThreshold}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Row 3: 12-Column Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Allergies & Active Medications */}
        <div className="xl:col-span-7 space-y-6">
          {/* Allergies Card */}
          <motion.section
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {t.overview.allergiesTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono tabular-nums">
                  {allergies.length} {t.overview.recordedCount} · {severeCount}{' '}
                  {t.overview.severeCount}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'allergy' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.overview.addAllergy}
              </button>
            </div>

            {allergies.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t.overview.emptyAllergies}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'allergy' })}
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t.overview.addFirstAllergy}
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {allergies.map((item) => (
                  <li
                    key={item.id}
                    className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {item.allergen}
                        </span>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                          ·
                        </span>
                        <span className={`text-xs ${severityTextStyle(item.severity)}`}>
                          {t.status[item.severity]}
                        </span>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                          ·
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {item.reaction}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenModal({ type: 'allergy', data: item })}
                        aria-label={`Edit ${item.allergen}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteAllergy(item.id)}
                        aria-label={`Delete ${item.allergen}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>

          {/* Medications Card */}
          <motion.section
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {t.overview.medicationsTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono tabular-nums">
                  {activeMeds.length} {t.overview.activeTotal} · {medications.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'medication' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.overview.addMedication}
              </button>
            </div>

            {medications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t.overview.emptyMedications}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'medication' })}
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t.overview.addFirstMedication}
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {medications.map((med) => (
                  <li
                    key={med.id}
                    className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span
                          className={`text-sm font-semibold ${
                            med.active
                              ? 'text-slate-900 dark:text-slate-100'
                              : 'text-slate-400 dark:text-slate-500 line-through'
                          }`}
                        >
                          {med.name}
                        </span>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                          ·
                        </span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-teal-700 dark:text-teal-400">
                          {med.dosage}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {med.frequency}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{med.purpose || 'General care'}</span>
                        <span aria-hidden="true">·</span>
                        <span>{med.prescriber || 'Self-reported'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleMedicationActive(med.id)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {med.active ? t.overview.pause : t.overview.resume}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenModal({ type: 'medication', data: med })}
                        aria-label={`Edit ${med.name}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteMedication(med.id)}
                        aria-label={`Delete ${med.name}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        </div>

        {/* Right 5 Columns: Emergency Contacts & Care Team with Character Avatars */}
        <div className="xl:col-span-5 space-y-6">
          {/* Emergency Contacts */}
          <motion.section
            custom={4}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {t.overview.emergencyContacts}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.overview.contactsSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'contact' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.overview.add}
              </button>
            </div>

            <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {emergencyContacts.map((contact) => (
                <li
                  key={contact.id}
                  className="px-6 py-4 flex items-center justify-between gap-3.5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <RoleAvatar variant={contact.avatarVariant} size={48} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {contact.name}
                        </span>
                        {contact.isPrimary && (
                          <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 shrink-0">
                            · {t.overview.primary}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {contact.relationship}
                      </div>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'contact', data: contact })}
                    aria-label={`Edit ${contact.name}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Care Team / Physicians */}
          <motion.section
            custom={5}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {t.overview.physiciansTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.overview.physiciansSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'doctor' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.overview.add}
              </button>
            </div>

            <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {doctors.map((doc) => (
                <li
                  key={doc.id}
                  className="px-6 py-4 flex items-center justify-between gap-3.5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <RoleAvatar variant={doc.avatarVariant} size={48} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {doc.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {doc.specialty} · {doc.clinic}
                      </div>
                      <a
                        href={`tel:${doc.phone.replace(/\s+/g, '')}`}
                        className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        <Phone className="w-3 h-3" />
                        {doc.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'doctor', data: doc })}
                    aria-label={`Edit ${doc.name}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>

      {/* Row 4: High-Density Tabular Lab Values Preview */}
      <motion.section
        custom={6}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
              {t.overview.sampleLabsTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.overview.sampleLabsSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'lab' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {t.overview.addLabValue}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('labs')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.overview.fullView}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                <th className="py-3 pl-6 pr-4">{t.overview.colBiomarker}</th>
                <th className="py-3 px-4">{t.overview.colCategory}</th>
                <th className="py-3 px-4 text-right">{t.overview.colResult}</th>
                <th className="py-3 px-4">{t.overview.colRefRange}</th>
                <th className="py-3 px-4">{t.overview.colStatus}</th>
                <th className="py-3 px-4 text-right">{t.overview.colDate}</th>
                <th className="py-3 pl-4 pr-6 text-right">{t.overview.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
              {labResults.map((lab) => {
                const span = Math.max(0.001, lab.refMax - lab.refMin);
                const rawPct = ((lab.value - lab.refMin) / span) * 100;
                const clampedPct = Math.min(100, Math.max(0, rawPct));
                const markerColor =
                  lab.status === 'Normal'
                    ? 'bg-emerald-600 dark:bg-emerald-400'
                    : lab.status === 'Borderline'
                    ? 'bg-amber-500'
                    : 'bg-red-600';

                return (
                  <tr
                    key={lab.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 pl-6 pr-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {lab.testName}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {lab.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {lab.value}{' '}
                      <span className="text-xs font-normal text-slate-500">{lab.unit}</span>
                    </td>
                    <td className="py-3.5 px-4 min-w-[165px]">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                          <div
                            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${markerColor}`}
                            style={{ left: `${clampedPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {lab.refMin}–{lab.refMax}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`text-xs ${labStatusTextStyle(lab.status)}`}>
                        {t.status[lab.status]}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {lab.date}
                    </td>
                    <td className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onOpenModal({ type: 'lab', data: lab })}
                          aria-label={`Edit ${lab.testName}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteLab(lab.id)}
                          aria-label={`Delete ${lab.testName}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};
