import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Upload, RotateCcw } from 'lucide-react';
import type {
  PatientIdentity,
  VitalSigns,
  AllergyItem,
  MedicationItem,
  ConditionItem,
  EmergencyContact,
  DoctorInfo,
  LabResultItem,
  ImmunizationItem,
  BloodType,
  AllergySeverity,
  LabStatus,
  RoleAvatarVariant,
} from '../types/profile';
import type { Translations } from '../i18n/translations';
import { PATIENT_AVATAR_OPTIONS, PatientAvatar, RoleAvatar } from './CharacterAvatars';

export type ModalState =
  | { type: 'none' }
  | { type: 'identity'; data: PatientIdentity }
  | { type: 'vitals'; data: VitalSigns }
  | { type: 'allergy'; data?: AllergyItem }
  | { type: 'medication'; data?: MedicationItem }
  | { type: 'condition'; data?: ConditionItem }
  | { type: 'contact'; data?: EmergencyContact }
  | { type: 'doctor'; data?: DoctorInfo }
  | { type: 'lab'; data?: LabResultItem }
  | { type: 'immunization'; data?: ImmunizationItem }
  | { type: 'export' }
  | { type: 'reset' };

interface ProfileModalsProps {
  modal: ModalState;
  t: Translations;
  onClose: () => void;
  onSaveIdentity: (patch: Partial<PatientIdentity>) => void;
  onSaveVitals: (patch: Partial<VitalSigns>) => void;
  onSaveAllergy: (item: Omit<AllergyItem, 'id'> & { id?: string }) => void;
  onSaveMedication: (item: Omit<MedicationItem, 'id'> & { id?: string }) => void;
  onSaveCondition: (item: Omit<ConditionItem, 'id'> & { id?: string }) => void;
  onSaveContact: (item: Omit<EmergencyContact, 'id'> & { id?: string }) => void;
  onSaveDoctor: (item: Omit<DoctorInfo, 'id'> & { id?: string }) => void;
  onSaveLab: (item: Omit<LabResultItem, 'id'> & { id?: string }) => void;
  onSaveImmunization: (item: Omit<ImmunizationItem, 'id'> & { id?: string }) => void;
  onPrint: () => void;
  onExportJson: () => void;
  onImportJson: (jsonText: string) => boolean;
  onResetDemo: () => void;
  onNotify: (message: string) => void;
}

const BLOOD_TYPES: BloodType[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Unknown'];

const inputClasses =
  'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 dark:focus:border-teal-400 transition-colors';

const labelClasses = 'block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1';

export const ProfileModals: React.FC<ProfileModalsProps> = ({
  modal,
  t,
  onClose,
  onSaveIdentity,
  onSaveVitals,
  onSaveAllergy,
  onSaveMedication,
  onSaveCondition,
  onSaveContact,
  onSaveDoctor,
  onSaveLab,
  onSaveImmunization,
  onPrint,
  onExportJson,
  onImportJson,
  onResetDemo,
  onNotify,
}) => {
  useEffect(() => {
    if (modal.type === 'none') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal.type, onClose]);

  return (
    <AnimatePresence>
      {modal.type !== 'none' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55 backdrop-blur-[2px] no-print"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {modal.type === 'identity' && (
              <IdentityForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(data) => {
                  onSaveIdentity(data);
                  onNotify(t.toasts.identityUpdated);
                  onClose();
                }}
              />
            )}

            {modal.type === 'vitals' && (
              <VitalsForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(data) => {
                  onSaveVitals(data);
                  onNotify(t.toasts.vitalsUpdated);
                  onClose();
                }}
              />
            )}

            {modal.type === 'allergy' && (
              <AllergyForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveAllergy(item);
                  onNotify(item.id ? t.toasts.allergyUpdated : t.toasts.allergyAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'medication' && (
              <MedicationForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveMedication(item);
                  onNotify(item.id ? t.toasts.medUpdated : t.toasts.medAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'condition' && (
              <ConditionForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveCondition(item);
                  onNotify(item.id ? t.toasts.conditionUpdated : t.toasts.conditionAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'contact' && (
              <ContactForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveContact(item);
                  onNotify(item.id ? t.toasts.contactUpdated : t.toasts.contactAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'doctor' && (
              <DoctorForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveDoctor(item);
                  onNotify(item.id ? t.toasts.doctorUpdated : t.toasts.doctorAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'lab' && (
              <LabForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveLab(item);
                  onNotify(item.id ? t.toasts.labUpdated : t.toasts.labAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'immunization' && (
              <ImmunizationForm
                initial={modal.data}
                t={t}
                onClose={onClose}
                onSave={(item) => {
                  onSaveImmunization(item);
                  onNotify(item.id ? t.toasts.immUpdated : t.toasts.immAdded);
                  onClose();
                }}
              />
            )}

            {modal.type === 'export' && (
              <ExportModalContent
                t={t}
                onClose={onClose}
                onPrint={onPrint}
                onExportJson={() => {
                  onExportJson();
                  onNotify(t.toasts.jsonExported);
                }}
                onImportJson={(text) => {
                  const ok = onImportJson(text);
                  if (ok) {
                    onNotify(t.toasts.jsonImported);
                    onClose();
                  }
                  return ok;
                }}
              />
            )}

            {modal.type === 'reset' && (
              <div className="p-6">
                <ModalHeader title={t.modals.resetTitle} onClose={onClose} />
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.modals.resetDescription}
                </p>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {t.modals.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onResetDemo();
                      onNotify(t.toasts.demoRestored);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t.modals.resetConfirm}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ModalHeader: React.FC<{ title: string; subtitle?: string; onClose: () => void }> = ({
  title,
  subtitle,
  onClose,
}) => (
  <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
    <div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">{title}</h2>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    <button
      type="button"
      onClick={onClose}
      aria-label="Close modal"
      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

const FormFooter: React.FC<{
  onClose: () => void;
  cancelLabel: string;
  submitLabel: string;
}> = ({ onClose, cancelLabel, submitLabel }) => (
  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
    >
      {cancelLabel}
    </button>
    <button
      type="submit"
      className="px-4 py-2 rounded-lg text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer"
    >
      {submitLabel}
    </button>
  </div>
);

const IdentityForm: React.FC<{
  initial: PatientIdentity;
  t: Translations;
  onClose: () => void;
  onSave: (data: PatientIdentity) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<PatientIdentity>(initial);

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={t.modals.editProfileTitle}
        subtitle={t.modals.editProfileSubtitle}
        onClose={onClose}
      />

      <div className="mt-5 space-y-4">
        <div>
          <span className={labelClasses}>{t.modals.avatarLabel}</span>
          <div className="grid grid-cols-4 gap-2.5 mt-1.5">
            {PATIENT_AVATAR_OPTIONS.map((opt) => {
              const selected = form.avatarVariant === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setForm({ ...form, avatarVariant: opt.id })}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                    selected
                      ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-400'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <PatientAvatar variant={opt.id} size={48} />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.fullName}</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.dateOfBirth}</label>
            <input
              type="date"
              required
              value={form.dateOfBirth}
              onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className={labelClasses}>{t.modals.bloodType}</label>
            <select
              value={form.bloodType}
              onChange={(e) => setForm({ ...form, bloodType: e.target.value as BloodType })}
              className={inputClasses}
            >
              {BLOOD_TYPES.map((bt) => (
                <option key={bt} value={bt}>
                  {bt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>{t.modals.gender}</label>
            <input
              type="text"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.heightCm}</label>
            <input
              type="number"
              min={40}
              max={260}
              value={form.heightCm}
              onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) || 0 })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.weightKg}</label>
            <input
              type="number"
              min={1}
              max={350}
              value={form.weightKg}
              onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) || 0 })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.insuranceProvider}</label>
            <input
              type="text"
              value={form.insuranceProvider}
              onChange={(e) => setForm({ ...form, insuranceProvider: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.insuranceNumber}</label>
            <input
              type="text"
              value={form.insuranceNumber}
              onChange={(e) => setForm({ ...form, insuranceNumber: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.primaryLanguage}</label>
            <input
              type="text"
              value={form.primaryLanguage}
              onChange={(e) => setForm({ ...form, primaryLanguage: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.address}</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={form.organDonor}
            onChange={(e) => setForm({ ...form, organDonor: e.target.checked })}
            className="w-4 h-4 rounded accent-teal-600"
          />
          {t.modals.registeredOrganDonor}
        </label>

        <div>
          <label className={labelClasses}>{t.modals.emergencyResponderNote}</label>
          <textarea
            rows={2}
            value={form.emergencyNote}
            onChange={(e) => setForm({ ...form, emergencyNote: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>{t.modals.advanceDirective}</label>
          <input
            type="text"
            value={form.advanceDirective}
            onChange={(e) => setForm({ ...form, advanceDirective: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={t.modals.saveChanges}
      />
    </form>
  );
};

const VitalsForm: React.FC<{
  initial: VitalSigns;
  t: Translations;
  onClose: () => void;
  onSave: (data: VitalSigns) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<VitalSigns>(initial);

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={t.modals.updateVitalsTitle}
        subtitle={t.modals.updateVitalsSubtitle}
        onClose={onClose}
      />

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>{t.modals.systolic}</label>
          <input
            type="number"
            min={60}
            max={250}
            required
            value={form.systolic}
            onChange={(e) => setForm({ ...form, systolic: Number(e.target.value) })}
            className={`${inputClasses} font-mono tabular-nums`}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.modals.diastolic}</label>
          <input
            type="number"
            min={40}
            max={160}
            required
            value={form.diastolic}
            onChange={(e) => setForm({ ...form, diastolic: Number(e.target.value) })}
            className={`${inputClasses} font-mono tabular-nums`}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.modals.heartRateBpm}</label>
          <input
            type="number"
            min={35}
            max={200}
            required
            value={form.heartRateBpm}
            onChange={(e) => setForm({ ...form, heartRateBpm: Number(e.target.value) })}
            className={`${inputClasses} font-mono tabular-nums`}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.modals.fastingGlucose}</label>
          <input
            type="number"
            min={40}
            max={400}
            required
            value={form.bloodGlucoseMgDl}
            onChange={(e) => setForm({ ...form, bloodGlucoseMgDl: Number(e.target.value) })}
            className={`${inputClasses} font-mono tabular-nums`}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.modals.spo2}</label>
          <input
            type="number"
            min={70}
            max={100}
            required
            value={form.spo2Percent}
            onChange={(e) => setForm({ ...form, spo2Percent: Number(e.target.value) })}
            className={`${inputClasses} font-mono tabular-nums`}
          />
        </div>
      </div>

      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={t.modals.saveChanges}
      />
    </form>
  );
};

const AllergyForm: React.FC<{
  initial?: AllergyItem;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<AllergyItem, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<AllergyItem, 'id'> & { id?: string }>(
    initial ?? {
      allergen: '',
      category: 'Medication',
      severity: 'Moderate',
      reaction: '',
      notes: '',
    }
  );

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={initial ? t.modals.editAllergy : t.modals.addAllergy}
        onClose={onClose}
      />
      <div className="mt-5 space-y-4">
        <div>
          <label className={labelClasses}>{t.modals.allergenName}</label>
          <input
            type="text"
            required
            placeholder="e.g., Penicillin, Peanuts, Latex"
            value={form.allergen}
            onChange={(e) => setForm({ ...form, allergen: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.category}</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as AllergyItem['category'] })
              }
              className={inputClasses}
            >
              <option value="Medication">Medication</option>
              <option value="Food">Food</option>
              <option value="Environmental">Environmental</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>{t.modals.severity}</label>
            <select
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: e.target.value as AllergySeverity })}
              className={inputClasses}
            >
              <option value="Mild">{t.status.Mild}</option>
              <option value="Moderate">{t.status.Moderate}</option>
              <option value="Severe">{t.status.Severe}</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClasses}>{t.modals.reaction}</label>
          <input
            type="text"
            required
            placeholder="e.g., Skin rash, airway swelling"
            value={form.reaction}
            onChange={(e) => setForm({ ...form, reaction: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.modals.notes}</label>
          <textarea
            rows={2}
            placeholder="Optional clinical instructions or alternatives"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateAllergy : t.overview.addAllergy}
      />
    </form>
  );
};

const MedicationForm: React.FC<{
  initial?: MedicationItem;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<MedicationItem, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<MedicationItem, 'id'> & { id?: string }>(
    initial ?? {
      name: '',
      dosage: '',
      frequency: '',
      purpose: '',
      prescriber: '',
      active: true,
    }
  );

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={initial ? t.modals.editMedication : t.modals.addMedication}
        onClose={onClose}
      />
      <div className="mt-5 space-y-4">
        <div>
          <label className={labelClasses}>{t.modals.medName}</label>
          <input
            type="text"
            required
            placeholder="e.g., Vitamin D3, Ibuprofen"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.dosage}</label>
            <input
              type="text"
              required
              placeholder="e.g., 10 mg, 2,000 IU"
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.frequency}</label>
            <input
              type="text"
              required
              placeholder="e.g., Once daily in morning"
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.purpose}</label>
            <input
              type="text"
              placeholder="e.g., Allergy relief"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.prescriber}</label>
            <input
              type="text"
              placeholder="e.g., Dr. Claire Bennett"
              value={form.prescriber}
              onChange={(e) => setForm({ ...form, prescriber: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
        <label className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="w-4 h-4 rounded accent-teal-600"
          />
          {t.modals.currentlyTaking}
        </label>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateMedication : t.overview.addMedication}
      />
    </form>
  );
};

const ConditionForm: React.FC<{
  initial?: ConditionItem;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<ConditionItem, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<ConditionItem, 'id'> & { id?: string }>(
    initial ?? {
      name: '',
      diagnosedYear: new Date().getFullYear().toString(),
      status: 'Managed',
      notes: '',
    }
  );

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={initial ? t.modals.editCondition : t.modals.addCondition}
        onClose={onClose}
      />
      <div className="mt-5 space-y-4">
        <div>
          <label className={labelClasses}>{t.modals.conditionName}</label>
          <input
            type="text"
            required
            placeholder="e.g., Seasonal Allergic Rhinitis"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.yearDiagnosed}</label>
            <input
              type="text"
              value={form.diagnosedYear}
              onChange={(e) => setForm({ ...form, diagnosedYear: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.status}</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as ConditionItem['status'] })
              }
              className={inputClasses}
            >
              <option value="Managed">{t.status.Managed}</option>
              <option value="Monitoring">{t.status.Monitoring}</option>
              <option value="Resolved">{t.status.Resolved}</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClasses}>{t.modals.notes}</label>
          <textarea
            rows={2}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateCondition : t.sections.addCondition}
      />
    </form>
  );
};

const ContactForm: React.FC<{
  initial?: EmergencyContact;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<EmergencyContact, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<EmergencyContact, 'id'> & { id?: string }>(
    initial ?? {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      isPrimary: false,
      avatarVariant: 'emergency-partner',
    }
  );

  const avatarChoices: { id: RoleAvatarVariant; label: string }[] = [
    { id: 'emergency-partner', label: 'Family' },
    { id: 'emergency-friend', label: 'Friend' },
  ];

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={initial ? t.modals.editContact : t.modals.addContact}
        onClose={onClose}
      />
      <div className="mt-5 space-y-4">
        <div>
          <span className={labelClasses}>{t.modals.characterAvatar}</span>
          <div className="flex gap-3 mt-1">
            {avatarChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => setForm({ ...form, avatarVariant: choice.id })}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                  form.avatarVariant === choice.id
                    ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-400'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <RoleAvatar variant={choice.id} size={36} />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {choice.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.fullName}</label>
            <input
              type="text"
              required
              placeholder="e.g., Sarah Morgan (Demo)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.relationship}</label>
            <input
              type="text"
              required
              placeholder="e.g., Partner, Sibling"
              value={form.relationship}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.phone}</label>
            <input
              type="tel"
              required
              placeholder="+1 (555) 010-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.email}</label>
            <input
              type="email"
              placeholder="contact@example.test"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
        <label className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isPrimary}
            onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })}
            className="w-4 h-4 rounded accent-teal-600"
          />
          {t.modals.setPrimary}
        </label>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateContact : t.sections.addContact}
      />
    </form>
  );
};

const DoctorForm: React.FC<{
  initial?: DoctorInfo;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<DoctorInfo, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<DoctorInfo, 'id'> & { id?: string }>(
    initial ?? {
      name: '',
      specialty: '',
      clinic: '',
      phone: '',
      address: '',
      avatarVariant: 'doctor-primary',
    }
  );

  const avatarChoices: { id: RoleAvatarVariant; label: string }[] = [
    { id: 'doctor-primary', label: 'Primary Care' },
    { id: 'doctor-specialist', label: 'Specialist' },
  ];

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={initial ? t.modals.editDoctor : t.modals.addDoctor}
        onClose={onClose}
      />
      <div className="mt-5 space-y-4">
        <div>
          <span className={labelClasses}>{t.modals.characterAvatar}</span>
          <div className="flex gap-3 mt-1">
            {avatarChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => setForm({ ...form, avatarVariant: choice.id })}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                  form.avatarVariant === choice.id
                    ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-400'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <RoleAvatar variant={choice.id} size={36} />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {choice.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.doctorName}</label>
            <input
              type="text"
              required
              placeholder="Dr. Claire Bennett"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.specialty}</label>
            <input
              type="text"
              required
              placeholder="General Practice, Cardiology"
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.clinic}</label>
            <input
              type="text"
              required
              placeholder="Central Sample Medical Clinic"
              value={form.clinic}
              onChange={(e) => setForm({ ...form, clinic: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.phone}</label>
            <input
              type="tel"
              required
              placeholder="+1 (555) 010-3300"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>
        <div>
          <label className={labelClasses}>{t.modals.clinicAddress}</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateDoctor : t.sections.addPhysician}
      />
    </form>
  );
};

const LabForm: React.FC<{
  initial?: LabResultItem;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<LabResultItem, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<LabResultItem, 'id'> & { id?: string }>(
    initial ?? {
      testName: '',
      category: 'Blood Panel',
      value: 0,
      unit: 'mg/dL',
      refMin: 0,
      refMax: 100,
      status: 'Normal',
      date: new Date().toISOString().slice(0, 10),
    }
  );

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader title={initial ? t.modals.editLab : t.modals.addLab} onClose={onClose} />
      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.biomarkerName}</label>
            <input
              type="text"
              required
              placeholder="e.g., Ferritin, Hemoglobin"
              value={form.testName}
              onChange={(e) => setForm({ ...form, testName: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.category}</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as LabResultItem['category'] })
              }
              className={inputClasses}
            >
              <option value="Blood Panel">Blood Panel</option>
              <option value="Metabolic">Metabolic</option>
              <option value="Vitamins">Vitamins</option>
              <option value="Thyroid">Thyroid</option>
              <option value="Lipids">Lipids</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className={labelClasses}>{t.modals.value}</label>
            <input
              type="number"
              step="any"
              required
              value={form.value}
              onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.unit}</label>
            <input
              type="text"
              required
              placeholder="g/dL"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className={`${inputClasses} font-mono`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.refMin}</label>
            <input
              type="number"
              step="any"
              required
              value={form.refMin}
              onChange={(e) => setForm({ ...form, refMin: Number(e.target.value) })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.refMax}</label>
            <input
              type="number"
              step="any"
              required
              value={form.refMax}
              onChange={(e) => setForm({ ...form, refMax: Number(e.target.value) })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.status}</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as LabStatus })}
              className={inputClasses}
            >
              <option value="Normal">{t.status.Normal}</option>
              <option value="Borderline">{t.status.Borderline}</option>
              <option value="Attention">{t.status.Attention}</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>{t.modals.sampleDate}</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateLab : t.overview.addLabValue}
      />
    </form>
  );
};

const ImmunizationForm: React.FC<{
  initial?: ImmunizationItem;
  t: Translations;
  onClose: () => void;
  onSave: (item: Omit<ImmunizationItem, 'id'> & { id?: string }) => void;
}> = ({ initial, t, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<ImmunizationItem, 'id'> & { id?: string }>(
    initial ?? {
      vaccine: '',
      date: new Date().toISOString().slice(0, 10),
      nextDue: '',
    }
  );

  return (
    <form
      className="p-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <ModalHeader
        title={initial ? t.modals.editImmunization : t.modals.addImmunization}
        onClose={onClose}
      />
      <div className="mt-5 space-y-4">
        <div>
          <label className={labelClasses}>{t.modals.vaccineName}</label>
          <input
            type="text"
            required
            placeholder="e.g., Tetanus / Diphtheria (Tdap)"
            value={form.vaccine}
            onChange={(e) => setForm({ ...form, vaccine: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={labelClasses}>{t.modals.dateReceived}</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
          <div>
            <label className={labelClasses}>{t.modals.nextBoosterDue}</label>
            <input
              type="date"
              value={form.nextDue}
              onChange={(e) => setForm({ ...form, nextDue: e.target.value })}
              className={`${inputClasses} font-mono tabular-nums`}
            />
          </div>
        </div>
      </div>
      <FormFooter
        onClose={onClose}
        cancelLabel={t.modals.cancel}
        submitLabel={initial ? t.modals.updateImmunization : t.sections.addVaccine}
      />
    </form>
  );
};

const ExportModalContent: React.FC<{
  t: Translations;
  onClose: () => void;
  onPrint: () => void;
  onExportJson: () => void;
  onImportJson: (jsonText: string) => boolean;
}> = ({ t, onClose, onPrint, onExportJson, onImportJson }) => {
  const [importError, setImportError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || '');
      const ok = onImportJson(content);
      if (!ok) {
        setImportError(t.modals.invalidJsonError);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6">
      <ModalHeader
        title={t.modals.exportTitle}
        subtitle={t.modals.exportSubtitle}
        onClose={onClose}
      />

      <div className="mt-5 space-y-3">
        <button
          type="button"
          onClick={() => {
            onClose();
            setTimeout(onPrint, 120);
          }}
          className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t.modals.printOptionTitle}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.modals.printOptionDesc}
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={onExportJson}
          className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t.modals.downloadJsonTitle}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.modals.downloadJsonDesc}
              </div>
            </div>
          </div>
        </button>

        <label className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-left cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t.modals.importJsonTitle}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.modals.importJsonDesc}
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {importError && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400 px-1">{importError}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {t.modals.close}
        </button>
      </div>
    </div>
  );
};
