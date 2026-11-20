/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutGrid,
  ShieldAlert,
  Pill,
  AlertCircle,
  Activity,
  Users,
  RotateCcw,
  Printer,
  Sun,
  Moon,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';
import type { ActiveSection } from './types/profile';
import { TRANSLATIONS, type LanguageCode } from './i18n/translations';
import { useMedicalProfile } from './hooks/useMedicalProfile';
import { MediMascot } from './components/CharacterAvatars';
import { LanguageDropdown } from './components/LanguageDropdown';
import { OverviewView } from './components/OverviewView';
import {
  EmergencyCardView,
  MedicationsView,
  AllergiesConditionsView,
  LabsVitalsView,
  ContactsCareTeamView,
} from './components/SectionViews';
import { ProfileModals, type ModalState } from './components/ProfileModals';
import { EmergencyPrintSheet } from './components/EmergencyPrintSheet';

const SECTION_ICONS: Record<ActiveSection, React.ComponentType<{ className?: string }>> = {
  overview: LayoutGrid,
  emergency: ShieldAlert,
  medications: Pill,
  allergies: AlertCircle,
  labs: Activity,
  contacts: Users,
};

const NAV_ORDER: ActiveSection[] = [
  'overview',
  'emergency',
  'medications',
  'allergies',
  'labs',
  'contacts',
];

export default function App() {
  // Strictly default to English ('en') on every fresh page load for worldwide accessibility
  const [language, setLanguage] = useState<LanguageCode>('en');
  const t = TRANSLATIONS[language];

  const {
    profile,
    isModified,
    updateIdentity,
    updateVitals,
    saveAllergy,
    deleteAllergy,
    saveMedication,
    deleteMedication,
    saveCondition,
    deleteCondition,
    saveEmergencyContact,
    deleteEmergencyContact,
    saveDoctor,
    deleteDoctor,
    saveLabResult,
    deleteLabResult,
    saveImmunization,
    deleteImmunization,
    resetToDemo,
    exportProfileJson,
    importProfileJson,
  } = useMedicalProfile(language);

  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'alert'>('idle');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('medprofil_theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('medprofil_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [darkMode]);

  const notify = useCallback((message: string) => {
    setToast(message);
    setMascotMood('happy');
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast(null);
      setMascotMood(activeSection === 'emergency' ? 'alert' : 'idle');
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [toast, activeSection]);

  useEffect(() => {
    if (!toast) {
      setMascotMood(activeSection === 'emergency' ? 'alert' : 'idle');
    }
  }, [activeSection, toast]);

  const handleToggleMedicationActive = useCallback(
    (id: string) => {
      const target = profile.medications.find((m) => m.id === id);
      if (!target) return;
      saveMedication({ ...target, active: !target.active });
      notify(
        `${target.name} ${target.active ? t.toasts.medPaused : t.toasts.medActive}`
      );
    },
    [profile.medications, saveMedication, notify, t.toasts.medPaused, t.toasts.medActive]
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleLanguageChange = useCallback((code: LanguageCode, nativeName: string) => {
    setLanguage(code);
    const nextT = TRANSLATIONS[code];
    setToast(`${nextT.toasts.languageChanged} ${nativeName}`);
    setMascotMood('happy');
  }, []);

  const getSectionCount = (section: ActiveSection): number | null => {
    switch (section) {
      case 'medications':
        return profile.medications.filter((m) => m.active).length;
      case 'allergies':
        return profile.allergies.length;
      case 'labs':
        return profile.labResults.length;
      case 'contacts':
        return profile.emergencyContacts.length + profile.doctors.length;
      default:
        return null;
    }
  };

  const navigateTo = (section: ActiveSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Interactive Application Shell (hidden when printing) */}
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 no-print">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen">
          <div className="px-6 pt-6 pb-5 border-b border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigateTo('overview')}
              className="flex items-center gap-2.5 text-left cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-display font-extrabold text-lg shrink-0">
                +
              </span>
              <div>
                <div className="text-lg font-display font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-none">
                  MedProfil
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.brandSubtitle}
                </div>
              </div>
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Profile sections">
            {NAV_ORDER.map((sectionId) => {
              const Icon = SECTION_ICONS[sectionId];
              const isActive = activeSection === sectionId;
              const count = getSectionCount(sectionId);

              return (
                <button
                  key={sectionId}
                  type="button"
                  onClick={() => navigateTo(sectionId)}
                  className={`relative w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-teal-800 dark:text-teal-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSidebarTab"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/70 dark:border-teal-800/60"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t.nav[sectionId]}</span>
                  </span>
                  {count !== null && (
                    <span className="relative z-10 text-xs font-mono tabular-nums text-slate-400 dark:text-slate-500">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Animated Mascot Companion Footer Card */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-3.5">
              <div className="flex items-center gap-3">
                <MediMascot mood={mascotMood} size={62} className="shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {t.mascot.title}
                  </div>
                  <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400 mt-0.5">
                    {isModified ? t.mascot.savedLocally : t.mascot.demoHint}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setModal({ type: 'identity', data: profile.identity })}
                  className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline whitespace-nowrap cursor-pointer"
                >
                  {t.mascot.quickEdit}
                </button>
                <button
                  type="button"
                  onClick={() => setModal({ type: 'export' })}
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap cursor-pointer"
                >
                  {t.mascot.backupJson}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-Over Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 lg:hidden flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <div
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-[2px]"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="relative z-10 w-72 max-w-[85vw] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-display font-extrabold">
                      +
                    </span>
                    <span className="font-display font-bold text-slate-900 dark:text-slate-50">
                      MedProfil
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                  {NAV_ORDER.map((sectionId) => {
                    const Icon = SECTION_ICONS[sectionId];
                    const isActive = activeSection === sectionId;
                    const count = getSectionCount(sectionId);
                    return (
                      <button
                        key={sectionId}
                        type="button"
                        onClick={() => navigateTo(sectionId)}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{t.nav[sectionId]}</span>
                        </span>
                        {count !== null && (
                          <span className="text-xs font-mono tabular-nums text-slate-400">
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <MediMascot mood={mascotMood} size={52} />
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {t.mascot.mobileNote}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 lg:px-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-sm min-w-0">
                <button
                  type="button"
                  onClick={() => navigateTo('overview')}
                  className="font-display font-bold text-slate-900 dark:text-slate-50 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  MedProfil
                </button>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  /
                </span>
                <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
                  {t.nav[activeSection]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <LanguageDropdown
                value={language}
                onChange={handleLanguageChange}
                ariaLabel={t.topBar.languageLabel}
              />

              <button
                type="button"
                onClick={() => setModal({ type: 'reset' })}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.topBar.resetFull}</span>
                <span className="md:hidden">{t.topBar.resetShort}</span>
              </button>

              <button
                type="button"
                onClick={() => setModal({ type: 'export' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-teal-600 text-white text-xs font-medium hover:bg-slate-800 dark:hover:bg-teal-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.topBar.exportPrint}</span>
                <span className="sm:hidden">Print</span>
              </button>

              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label={darkMode ? t.topBar.lightMode : t.topBar.darkMode}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </header>

          {/* Main Content Container */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <AnimatePresence mode="wait">
              {activeSection === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <OverviewView
                    profile={profile}
                    t={t}
                    onOpenModal={setModal}
                    onNavigate={navigateTo}
                    onQuickAvatarCycle={(next) => {
                      updateIdentity({ avatarVariant: next });
                      notify(t.toasts.avatarSwitched);
                    }}
                    onDeleteAllergy={(id) => {
                      deleteAllergy(id);
                      notify(t.toasts.allergyRemoved);
                    }}
                    onDeleteMedication={(id) => {
                      deleteMedication(id);
                      notify(t.toasts.medRemoved);
                    }}
                    onToggleMedicationActive={handleToggleMedicationActive}
                    onDeleteLab={(id) => {
                      deleteLabResult(id);
                      notify(t.toasts.labRemoved);
                    }}
                  />
                </motion.div>
              )}

              {activeSection === 'emergency' && (
                <motion.div
                  key="emergency"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <EmergencyCardView
                    profile={profile}
                    t={t}
                    onOpenModal={setModal}
                    onPrint={handlePrint}
                    onExportJson={() => {
                      exportProfileJson();
                      notify(t.toasts.jsonExported);
                    }}
                  />
                </motion.div>
              )}

              {activeSection === 'medications' && (
                <motion.div
                  key="medications"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <MedicationsView
                    profile={profile}
                    t={t}
                    onOpenModal={setModal}
                    onDeleteMedication={(id) => {
                      deleteMedication(id);
                      notify(t.toasts.medRemoved);
                    }}
                    onToggleMedicationActive={handleToggleMedicationActive}
                  />
                </motion.div>
              )}

              {activeSection === 'allergies' && (
                <motion.div
                  key="allergies"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <AllergiesConditionsView
                    profile={profile}
                    t={t}
                    onOpenModal={setModal}
                    onDeleteAllergy={(id) => {
                      deleteAllergy(id);
                      notify(t.toasts.allergyRemoved);
                    }}
                    onDeleteCondition={(id) => {
                      deleteCondition(id);
                      notify(t.toasts.conditionRemoved);
                    }}
                    onDeleteImmunization={(id) => {
                      deleteImmunization(id);
                      notify(t.toasts.immRemoved);
                    }}
                  />
                </motion.div>
              )}

              {activeSection === 'labs' && (
                <motion.div
                  key="labs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <LabsVitalsView
                    profile={profile}
                    t={t}
                    onOpenModal={setModal}
                    onDeleteLab={(id) => {
                      deleteLabResult(id);
                      notify(t.toasts.labRemoved);
                    }}
                  />
                </motion.div>
              )}

              {activeSection === 'contacts' && (
                <motion.div
                  key="contacts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <ContactsCareTeamView
                    profile={profile}
                    t={t}
                    onOpenModal={setModal}
                    onDeleteContact={(id) => {
                      deleteEmergencyContact(id);
                      notify(t.toasts.contactRemoved);
                    }}
                    onDeleteDoctor={(id) => {
                      deleteDoctor(id);
                      notify(t.toasts.doctorRemoved);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiet Template Footer */}
            <footer className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div>{t.footer.left}</div>
              <div>{t.footer.right}</div>
            </footer>
          </main>
        </div>

        {/* Modals */}
        <ProfileModals
          modal={modal}
          t={t}
          onClose={() => setModal({ type: 'none' })}
          onSaveIdentity={updateIdentity}
          onSaveVitals={updateVitals}
          onSaveAllergy={saveAllergy}
          onSaveMedication={saveMedication}
          onSaveCondition={saveCondition}
          onSaveContact={saveEmergencyContact}
          onSaveDoctor={saveDoctor}
          onSaveLab={saveLabResult}
          onSaveImmunization={saveImmunization}
          onPrint={handlePrint}
          onExportJson={exportProfileJson}
          onImportJson={importProfileJson}
          onResetDemo={resetToDemo}
          onNotify={notify}
        />

        {/* Non-Intrusive Feedback Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium shadow-lg"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-400 dark:text-teal-600 shrink-0" />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print-Only Clinical A4 Emergency Sheet */}
      <EmergencyPrintSheet profile={profile} t={t} />
    </>
  );
}
