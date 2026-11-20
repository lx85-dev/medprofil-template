import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Pencil,
  Trash2,
  Printer,
  Download,
  Phone,
  Mail,
  MapPin,
  Search,
  ShieldAlert,
} from 'lucide-react';
import type {
  MedicalProfile,
  AllergySeverity,
  LabStatus,
} from '../types/profile';
import type { Translations } from '../i18n/translations';
import type { ModalState } from './ProfileModals';
import { RoleAvatar } from './CharacterAvatars';
import { VitalWaveform } from './VitalWaveform';
import { severityTextStyle, labStatusTextStyle } from './OverviewView';

interface SectionViewCommonProps {
  profile: MedicalProfile;
  t: Translations;
  onOpenModal: (modal: ModalState) => void;
}

export const EmergencyCardView: React.FC<
  SectionViewCommonProps & { onPrint: () => void; onExportJson: () => void }
> = ({ profile, t, onOpenModal, onPrint, onExportJson }) => {
  const { identity, allergies, medications, emergencyContacts, doctors } = profile;
  const primaryContact =
    emergencyContacts.find((c) => c.isPrimary) ?? emergencyContacts[0] ?? null;
  const severeAllergies = allergies.filter((a) => a.severity === 'Severe');
  const activeMeds = medications.filter((m) => m.active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      {/* Responder High-Contrast Card */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 overflow-hidden">
        <div className="px-6 py-5 bg-red-50/70 dark:bg-red-950/30 border-b border-red-100 dark:border-red-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <RoleAvatar variant="paramedic" size={58} />
            <div>
              <div className="text-xs font-semibold text-red-700 dark:text-red-400">
                {t.sections.firstResponderQuickView}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-0.5">
                {identity.fullName}
              </h1>
              <div className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-300 mt-0.5">
                DOB {identity.dateOfBirth} · {identity.primaryLanguage} · {t.overview.organDonor}:{' '}
                {identity.organDonor ? t.overview.yes : t.overview.no}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 text-center">
              <div className="text-[11px] font-medium text-red-700 dark:text-red-400">
                {t.overview.bloodType}
              </div>
              <div className="text-2xl font-extrabold font-mono text-red-600 dark:text-red-400">
                {identity.bloodType}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={onPrint}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                {t.sections.printSheet}
              </button>
              <button
                type="button"
                onClick={onExportJson}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                JSON
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {t.sections.criticalEmergencyNote}
                </h2>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'identity', data: identity })}
                  className="text-xs font-medium text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  {t.sections.editNote}
                </button>
              </div>
              <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {identity.emergencyNote || t.sections.noEmergencyNotes}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t.sections.advanceDirective}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {identity.advanceDirective || t.sections.noneSpecified}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
                {t.sections.severeAllergies} ({severeAllergies.length})
              </h2>
              {severeAllergies.length === 0 ? (
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  {t.sections.noSevereAllergies}
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {severeAllergies.map((a) => (
                    <li key={a.id} className="text-sm text-slate-800 dark:text-slate-200">
                      <span className="font-semibold text-red-700 dark:text-red-400">
                        {a.allergen}
                      </span>{' '}
                      — {a.reaction}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-4 lg:pl-6 lg:border-l border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t.sections.primaryEmergencyContact}
              </h2>
              {primaryContact ? (
                <div className="mt-2.5 flex items-center gap-3.5">
                  <RoleAvatar variant={primaryContact.avatarVariant} size={50} />
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {primaryContact.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {primaryContact.relationship}
                    </div>
                    <a
                      href={`tel:${primaryContact.phone.replace(/\s+/g, '')}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-mono tabular-nums font-semibold text-teal-700 dark:text-teal-400 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {primaryContact.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-sm text-slate-500">{t.sections.noEmergencyContact}</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t.sections.activeMedications} ({activeMeds.length})
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {activeMeds.map((m) => (
                  <li key={m.id}>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{m.name}</span>{' '}
                    <span className="font-mono text-xs text-teal-700 dark:text-teal-400">
                      {m.dosage}
                    </span>{' '}
                    · {m.frequency}
                  </li>
                ))}
              </ul>
            </div>

            {doctors[0] && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {t.sections.primaryPhysician}
                </h2>
                <div className="mt-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {doctors[0].name}
                  </span>{' '}
                  ({doctors[0].clinic}) ·{' '}
                  <span className="font-mono tabular-nums">{doctors[0].phone}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export const MedicationsView: React.FC<
  SectionViewCommonProps & {
    onDeleteMedication: (id: string) => void;
    onToggleMedicationActive: (id: string) => void;
  }
> = ({ profile, t, onOpenModal, onDeleteMedication, onToggleMedicationActive }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [query, setQuery] = useState('');

  const filtered = profile.medications.filter((m) => {
    const matchesStatus =
      filter === 'all' ? true : filter === 'active' ? m.active : !m.active;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.purpose.toLowerCase().includes(q) ||
      m.prescriber.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const filterLabels: Record<'all' | 'active' | 'paused', string> = {
    all: t.sections.filterAll,
    active: t.sections.filterActive,
    paused: t.sections.filterPaused,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {t.overview.medicationsTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t.sections.medsSubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenModal({ type: 'medication' })}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.overview.addMedication}
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 self-start">
          {(['all', 'active', 'paused'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filter === tab
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {filterLabels[tab]}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.sections.searchMedsPlaceholder}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.sections.noMedsMatch}</p>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'medication' })}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {t.overview.addMedication}
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filtered.map((med) => (
              <li
                key={med.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span
                      className={`text-base font-semibold ${
                        med.active
                          ? 'text-slate-900 dark:text-slate-100'
                          : 'text-slate-400 dark:text-slate-500 line-through'
                      }`}
                    >
                      {med.name}
                    </span>
                    <span className="font-mono tabular-nums text-xs font-semibold text-teal-700 dark:text-teal-400">
                      {med.dosage}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      · {med.active ? t.status.Active : t.status.Paused}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {med.frequency}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t.sections.purposeLabel}: {med.purpose || '—'} · {t.sections.prescriberLabel}:{' '}
                    {med.prescriber || '—'}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleMedicationActive(med.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {med.active ? t.sections.markPaused : t.sections.markActive}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'medication', data: med })}
                    aria-label={`Edit ${med.name}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteMedication(med.id)}
                    aria-label={`Delete ${med.name}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </motion.div>
  );
};

export const AllergiesConditionsView: React.FC<
  SectionViewCommonProps & {
    onDeleteAllergy: (id: string) => void;
    onDeleteCondition: (id: string) => void;
    onDeleteImmunization: (id: string) => void;
  }
> = ({ profile, t, onOpenModal, onDeleteAllergy, onDeleteCondition, onDeleteImmunization }) => {
  const [severityFilter, setSeverityFilter] = useState<'All' | AllergySeverity>('All');

  const filteredAllergies = profile.allergies.filter((a) =>
    severityFilter === 'All' ? true : a.severity === severityFilter
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {t.sections.allergiesPageTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t.sections.allergiesPageSubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenModal({ type: 'allergy' })}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.overview.addAllergy}
        </button>
      </div>

      {/* Allergies Section */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
            {t.overview.allergiesTitle}
          </h2>
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
            {(['All', 'Severe', 'Moderate', 'Mild'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSeverityFilter(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  severityFilter === lvl
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {t.status[lvl]}
              </button>
            ))}
          </div>
        </div>

        {filteredAllergies.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {t.sections.noAllergiesForFilter}
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredAllergies.map((a) => (
              <li
                key={a.id}
                className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {a.allergen}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className={`text-xs ${severityTextStyle(a.severity)}`}>
                      {t.status[a.severity]}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{a.category}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{a.reaction}</p>
                  {a.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{a.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'allergy', data: a })}
                    aria-label={`Edit ${a.allergen}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteAllergy(a.id)}
                    aria-label={`Delete ${a.allergen}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Two-Column Conditions & Immunizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
              {t.sections.medicalConditions}
            </h2>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'condition' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {t.sections.addCondition}
            </button>
          </div>
          {profile.conditions.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">{t.sections.noConditions}</div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {profile.conditions.map((c) => (
                <li key={c.id} className="px-6 py-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {c.name}
                      </span>
                      <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                        · {t.sections.since} {c.diagnosedYear} · {t.status[c.status]}
                      </span>
                    </div>
                    {c.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenModal({ type: 'condition', data: c })}
                      aria-label={`Edit ${c.name}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteCondition(c.id)}
                      aria-label={`Delete ${c.name}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
              {t.sections.immunizations}
            </h2>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'immunization' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {t.sections.addVaccine}
            </button>
          </div>
          {profile.immunizations.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              {t.sections.noImmunizations}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {profile.immunizations.map((imm) => (
                <li key={imm.id} className="px-6 py-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {imm.vaccine}
                    </div>
                    <div className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-1">
                      {t.sections.received} {imm.date}
                      {imm.nextDue ? ` · ${t.sections.nextDue} ${imm.nextDue}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenModal({ type: 'immunization', data: imm })}
                      aria-label={`Edit ${imm.vaccine}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteImmunization(imm.id)}
                      aria-label={`Delete ${imm.vaccine}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export const LabsVitalsView: React.FC<
  SectionViewCommonProps & { onDeleteLab: (id: string) => void }
> = ({ profile, t, onOpenModal, onDeleteLab }) => {
  const [statusFilter, setStatusFilter] = useState<'All' | LabStatus>('All');
  const { vitals, labResults } = profile;

  const filteredLabs = labResults.filter((l) =>
    statusFilter === 'All' ? true : l.status === statusFilter
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {t.sections.labsPageTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t.sections.labsPageSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'vitals', data: vitals })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            {t.overview.editVitals}
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'lab' })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.overview.addLabValue}
          </button>
        </div>
      </div>

      {/* Live Pulse Monitor + Baseline Vitals */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs font-medium text-teal-700 dark:text-teal-400">
              {t.sections.sinusSimulation} ({vitals.heartRateBpm} BPM)
            </div>
            <VitalWaveform
              heartRateBpm={vitals.heartRateBpm}
              className="mt-2 text-teal-600 dark:text-teal-400"
            />
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:pl-6 lg:border-l border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.bloodPressure}
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50 mt-1">
                {vitals.systolic}/{vitals.diastolic}
              </div>
              <div className="text-xs font-mono text-slate-400">mmHg</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.restingHeartRate}
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50 mt-1">
                {vitals.heartRateBpm}
              </div>
              <div className="text-xs font-mono text-slate-400">bpm</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.fastingGlucose}
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50 mt-1">
                {vitals.bloodGlucoseMgDl}
              </div>
              <div className="text-xs font-mono text-slate-400">mg/dL</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">SpO₂</div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50 mt-1">
                {vitals.spo2Percent}%
              </div>
              <div className="text-xs font-mono text-slate-400">O₂</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Results Table */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
            {t.sections.labBiomarkers} ({filteredLabs.length})
          </h2>
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
            {(['All', 'Normal', 'Borderline', 'Attention'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {t.status[st]}
              </button>
            ))}
          </div>
        </div>

        {filteredLabs.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
            {t.sections.noLabsForFilter}
          </div>
        ) : (
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
                {filteredLabs.map((lab) => {
                  const span = Math.max(0.001, lab.refMax - lab.refMin);
                  const pct = Math.min(100, Math.max(0, ((lab.value - lab.refMin) / span) * 100));
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
                      <td className="py-3.5 px-4 min-w-[175px]">
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${markerColor}`}
                              style={{ left: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
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
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteLab(lab.id)}
                            aria-label={`Delete ${lab.testName}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
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
        )}
      </section>
    </motion.div>
  );
};

export const ContactsCareTeamView: React.FC<
  SectionViewCommonProps & {
    onDeleteContact: (id: string) => void;
    onDeleteDoctor: (id: string) => void;
  }
> = ({ profile, t, onOpenModal, onDeleteContact, onDeleteDoctor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {t.sections.contactsPageTitle}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {t.sections.contactsPageSubtitle}
        </p>
      </div>

      {/* Emergency Contacts Directory */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
            {t.overview.emergencyContacts} ({profile.emergencyContacts.length})
          </h2>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'contact' })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t.sections.addContact}
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {profile.emergencyContacts.map((c) => (
            <div
              key={c.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <RoleAvatar variant={c.avatarVariant} size={56} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {c.name}
                    </span>
                    {c.isPrimary && (
                      <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                        · {t.sections.primaryEmergencyContactTag}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{c.relationship}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <a
                      href={`tel:${c.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 font-mono tabular-nums hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {c.phone}
                    </a>
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {c.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'contact', data: c })}
                  aria-label={`Edit ${c.name}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteContact(c.id)}
                  aria-label={`Delete ${c.name}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physicians Directory */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
            {t.sections.physiciansClinics} ({profile.doctors.length})
          </h2>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'doctor' })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t.sections.addPhysician}
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {profile.doctors.map((d) => (
            <div
              key={d.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <RoleAvatar variant={d.avatarVariant} size={56} />
                <div>
                  <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {d.name}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {d.specialty} · {d.clinic}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <a
                      href={`tel:${d.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 font-mono tabular-nums hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {d.phone}
                    </a>
                    {d.address && (
                      <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {d.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'doctor', data: d })}
                  aria-label={`Edit ${d.name}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteDoctor(d.id)}
                  aria-label={`Delete ${d.name}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
