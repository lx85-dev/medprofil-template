export type LanguageCode = 'en' | 'de' | 'es' | 'fr' | 'it' | 'tr' | 'ja';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  shortCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', shortCode: 'EN' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', shortCode: 'DE' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', shortCode: 'ES' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', shortCode: 'FR' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', shortCode: 'IT' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', shortCode: 'TR' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', shortCode: 'JA' },
];

export interface Translations {
  brandSubtitle: string;
  publicDemoBadge: string;
  editableInBrowser: string;
  updated: string;
  nav: {
    overview: string;
    emergency: string;
    medications: string;
    allergies: string;
    labs: string;
    contacts: string;
  };
  topBar: {
    resetFull: string;
    resetShort: string;
    exportPrint: string;
    languageLabel: string;
    lightMode: string;
    darkMode: string;
  };
  mascot: {
    title: string;
    savedLocally: string;
    demoHint: string;
    quickEdit: string;
    backupJson: string;
    mobileNote: string;
  };
  overview: {
    yrs: string;
    organDonor: string;
    yes: string;
    no: string;
    bloodType: string;
    severeAlerts: string;
    editProfile: string;
    emergencyNoteLabel: string;
    openEmergencyCard: string;
    baselineVitals: string;
    recorded: string;
    editVitals: string;
    bloodPressure: string;
    optimalRange: string;
    monitorReading: string;
    restingHeartRate: string;
    ecgSync: string;
    fastingGlucose: string;
    oxygenSaturation: string;
    normalSaturation: string;
    belowThreshold: string;
    allergiesTitle: string;
    recordedCount: string;
    severeCount: string;
    addAllergy: string;
    emptyAllergies: string;
    addFirstAllergy: string;
    medicationsTitle: string;
    activeTotal: string;
    addMedication: string;
    emptyMedications: string;
    addFirstMedication: string;
    pause: string;
    resume: string;
    emergencyContacts: string;
    contactsSubtitle: string;
    add: string;
    primary: string;
    physiciansTitle: string;
    physiciansSubtitle: string;
    sampleLabsTitle: string;
    sampleLabsSubtitle: string;
    addLabValue: string;
    fullView: string;
    colBiomarker: string;
    colCategory: string;
    colResult: string;
    colRefRange: string;
    colStatus: string;
    colDate: string;
    colActions: string;
    switchAvatarTitle: string;
  };
  sections: {
    firstResponderQuickView: string;
    printSheet: string;
    criticalEmergencyNote: string;
    editNote: string;
    noEmergencyNotes: string;
    advanceDirective: string;
    noneSpecified: string;
    severeAllergies: string;
    noSevereAllergies: string;
    primaryEmergencyContact: string;
    noEmergencyContact: string;
    activeMedications: string;
    primaryPhysician: string;
    medsSubtitle: string;
    filterAll: string;
    filterActive: string;
    filterPaused: string;
    searchMedsPlaceholder: string;
    noMedsMatch: string;
    markPaused: string;
    markActive: string;
    purposeLabel: string;
    prescriberLabel: string;
    allergiesPageTitle: string;
    allergiesPageSubtitle: string;
    noAllergiesForFilter: string;
    medicalConditions: string;
    addCondition: string;
    noConditions: string;
    since: string;
    immunizations: string;
    addVaccine: string;
    noImmunizations: string;
    received: string;
    nextDue: string;
    labsPageTitle: string;
    labsPageSubtitle: string;
    sinusSimulation: string;
    labBiomarkers: string;
    noLabsForFilter: string;
    contactsPageTitle: string;
    contactsPageSubtitle: string;
    addContact: string;
    physiciansClinics: string;
    addPhysician: string;
    primaryEmergencyContactTag: string;
  };
  status: {
    Mild: string;
    Moderate: string;
    Severe: string;
    Normal: string;
    Borderline: string;
    Attention: string;
    Active: string;
    Paused: string;
    Managed: string;
    Monitoring: string;
    Resolved: string;
    All: string;
  };
  modals: {
    cancel: string;
    saveChanges: string;
    close: string;
    editProfileTitle: string;
    editProfileSubtitle: string;
    avatarLabel: string;
    fullName: string;
    dateOfBirth: string;
    bloodType: string;
    gender: string;
    heightCm: string;
    weightKg: string;
    insuranceProvider: string;
    insuranceNumber: string;
    primaryLanguage: string;
    address: string;
    registeredOrganDonor: string;
    emergencyResponderNote: string;
    advanceDirective: string;
    updateVitalsTitle: string;
    updateVitalsSubtitle: string;
    systolic: string;
    diastolic: string;
    heartRateBpm: string;
    fastingGlucose: string;
    spo2: string;
    editAllergy: string;
    addAllergy: string;
    allergenName: string;
    category: string;
    severity: string;
    reaction: string;
    notes: string;
    updateAllergy: string;
    editMedication: string;
    addMedication: string;
    medName: string;
    dosage: string;
    frequency: string;
    purpose: string;
    prescriber: string;
    currentlyTaking: string;
    updateMedication: string;
    editCondition: string;
    addCondition: string;
    conditionName: string;
    yearDiagnosed: string;
    status: string;
    updateCondition: string;
    editContact: string;
    addContact: string;
    characterAvatar: string;
    relationship: string;
    phone: string;
    email: string;
    setPrimary: string;
    updateContact: string;
    editDoctor: string;
    addDoctor: string;
    doctorName: string;
    specialty: string;
    clinic: string;
    clinicAddress: string;
    updateDoctor: string;
    editLab: string;
    addLab: string;
    biomarkerName: string;
    value: string;
    unit: string;
    refMin: string;
    refMax: string;
    sampleDate: string;
    updateLab: string;
    editImmunization: string;
    addImmunization: string;
    vaccineName: string;
    dateReceived: string;
    nextBoosterDue: string;
    updateImmunization: string;
    exportTitle: string;
    exportSubtitle: string;
    printOptionTitle: string;
    printOptionDesc: string;
    downloadJsonTitle: string;
    downloadJsonDesc: string;
    importJsonTitle: string;
    importJsonDesc: string;
    invalidJsonError: string;
    resetTitle: string;
    resetDescription: string;
    resetConfirm: string;
  };
  toasts: {
    identityUpdated: string;
    vitalsUpdated: string;
    allergyUpdated: string;
    allergyAdded: string;
    allergyRemoved: string;
    medUpdated: string;
    medAdded: string;
    medRemoved: string;
    medPaused: string;
    medActive: string;
    conditionUpdated: string;
    conditionAdded: string;
    conditionRemoved: string;
    contactUpdated: string;
    contactAdded: string;
    contactRemoved: string;
    doctorUpdated: string;
    doctorAdded: string;
    doctorRemoved: string;
    labUpdated: string;
    labAdded: string;
    labRemoved: string;
    immUpdated: string;
    immAdded: string;
    immRemoved: string;
    demoRestored: string;
    jsonExported: string;
    jsonImported: string;
    avatarSwitched: string;
    languageChanged: string;
  };
  footer: {
    left: string;
    right: string;
  };
  print: {
    subtitle: string;
    directive: string;
    generatedLocally: string;
    disclaimer: string;
  };
}

const EN: Translations = {
  brandSubtitle: 'Public Demo · Template',
  publicDemoBadge: 'Public Demo / Template',
  editableInBrowser: 'Editable directly in browser',
  updated: 'Updated',
  nav: {
    overview: 'Overview',
    emergency: 'Emergency Card',
    medications: 'Medications',
    allergies: 'Allergies & Conditions',
    labs: 'Lab Values & Vitals',
    contacts: 'Care Team & Contacts',
  },
  topBar: {
    resetFull: 'Reset to Demo',
    resetShort: 'Reset',
    exportPrint: 'Export / Print',
    languageLabel: 'Select language',
    lightMode: 'Switch to light theme',
    darkMode: 'Switch to dark theme',
  },
  mascot: {
    title: 'Medi Guide',
    savedLocally: 'Your custom edits are saved locally in this browser.',
    demoHint: 'Fictional demo profile. Click any section to customize.',
    quickEdit: 'Quick Edit',
    backupJson: 'Backup JSON',
    mobileNote: 'Public demo template. Zero authentication required.',
  },
  overview: {
    yrs: 'yrs',
    organDonor: 'Organ Donor',
    yes: 'Yes',
    no: 'No',
    bloodType: 'Blood Type',
    severeAlerts: 'Severe Alerts',
    editProfile: 'Edit Profile',
    emergencyNoteLabel: 'Emergency Note',
    openEmergencyCard: 'Open Emergency Card',
    baselineVitals: 'Baseline Vitals',
    recorded: 'Recorded',
    editVitals: 'Edit Vitals',
    bloodPressure: 'Blood Pressure',
    optimalRange: 'Optimal range',
    monitorReading: 'Monitor reading',
    restingHeartRate: 'Resting Heart Rate',
    ecgSync: 'ECG Sync',
    fastingGlucose: 'Fasting Blood Glucose',
    oxygenSaturation: 'Oxygen Saturation (SpO₂)',
    normalSaturation: 'Normal saturation',
    belowThreshold: 'Below 95% threshold',
    allergiesTitle: 'Allergies & Intolerances',
    recordedCount: 'recorded',
    severeCount: 'severe',
    addAllergy: 'Add Allergy',
    emptyAllergies: 'No allergies listed. Add medication, food, or environmental sensitivities.',
    addFirstAllergy: 'Add First Allergy',
    medicationsTitle: 'Medications & Supplements',
    activeTotal: 'active',
    addMedication: 'Add Medication',
    emptyMedications: 'No medications recorded yet.',
    addFirstMedication: 'Add First Medication',
    pause: 'Pause',
    resume: 'Resume',
    emergencyContacts: 'Emergency Contacts',
    contactsSubtitle: 'Next-of-kin & rapid call directory',
    add: 'Add',
    primary: 'Primary',
    physiciansTitle: 'Physicians & Care Team',
    physiciansSubtitle: 'Primary care & specialists',
    sampleLabsTitle: 'Sample Lab Values',
    sampleLabsSubtitle: 'Fictional reference panel — click any row to edit or log your own values',
    addLabValue: 'Add Lab Value',
    fullView: 'Full View',
    colBiomarker: 'Biomarker',
    colCategory: 'Category',
    colResult: 'Result',
    colRefRange: 'Reference Range',
    colStatus: 'Status',
    colDate: 'Date',
    colActions: 'Actions',
    switchAvatarTitle: 'Switch character avatar style',
  },
  sections: {
    firstResponderQuickView: 'First Responder Quick View · Public Demo Template',
    printSheet: 'Print Sheet',
    criticalEmergencyNote: 'Critical Emergency Note',
    editNote: 'Edit Note',
    noEmergencyNotes: 'No emergency responder notes entered.',
    advanceDirective: 'Advance Directive',
    noneSpecified: 'None specified.',
    severeAllergies: 'Severe Allergies',
    noSevereAllergies: 'No severe allergies flagged.',
    primaryEmergencyContact: 'Primary Emergency Contact',
    noEmergencyContact: 'No emergency contact added yet.',
    activeMedications: 'Active Medications',
    primaryPhysician: 'Primary Physician',
    medsSubtitle: 'Track current prescriptions, dosage schedules, and over-the-counter supplements.',
    filterAll: 'All',
    filterActive: 'Active',
    filterPaused: 'Paused',
    searchMedsPlaceholder: 'Filter medications...',
    noMedsMatch: 'No medications match your current filter.',
    markPaused: 'Mark Paused',
    markActive: 'Mark Active',
    purposeLabel: 'Purpose',
    prescriberLabel: 'Prescriber',
    allergiesPageTitle: 'Allergies, Conditions & Immunizations',
    allergiesPageSubtitle: 'Maintain sensitivities, ongoing conditions, and vaccine records in one structured view.',
    noAllergiesForFilter: 'No allergies recorded for this severity level.',
    medicalConditions: 'Medical Conditions',
    addCondition: 'Add Condition',
    noConditions: 'No conditions recorded.',
    since: 'Since',
    immunizations: 'Immunizations',
    addVaccine: 'Add Vaccine',
    noImmunizations: 'No immunizations recorded.',
    received: 'Received',
    nextDue: 'Next due',
    labsPageTitle: 'Lab Values & Vitals',
    labsPageSubtitle: 'Sample clinical biomarkers and baseline physiological measurements.',
    sinusSimulation: 'Resting Sinus Rhythm Simulation',
    labBiomarkers: 'Laboratory Biomarkers',
    noLabsForFilter: 'No lab entries match the selected status filter.',
    contactsPageTitle: 'Care Team & Emergency Contacts',
    contactsPageSubtitle: 'All names, clinics, and numbers shown by default are fictional template placeholders.',
    addContact: 'Add Contact',
    physiciansClinics: 'Physicians & Clinics',
    addPhysician: 'Add Physician',
    primaryEmergencyContactTag: 'Primary Emergency Contact',
  },
  status: {
    Mild: 'Mild',
    Moderate: 'Moderate',
    Severe: 'Severe',
    Normal: 'Normal',
    Borderline: 'Borderline',
    Attention: 'Attention',
    Active: 'Active',
    Paused: 'Paused',
    Managed: 'Managed',
    Monitoring: 'Monitoring',
    Resolved: 'Resolved',
    All: 'All',
  },
  modals: {
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    close: 'Close',
    editProfileTitle: 'Edit Patient Profile',
    editProfileSubtitle: 'Changes are stored locally in your browser only.',
    avatarLabel: 'Profile Character Avatar',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    bloodType: 'Blood Type',
    gender: 'Gender',
    heightCm: 'Height (cm)',
    weightKg: 'Weight (kg)',
    insuranceProvider: 'Insurance Provider',
    insuranceNumber: 'Insurance / Member ID',
    primaryLanguage: 'Primary Language(s)',
    address: 'Address',
    registeredOrganDonor: 'Registered Organ Donor',
    emergencyResponderNote: 'Emergency Responder Note',
    advanceDirective: 'Advance Medical Directive',
    updateVitalsTitle: 'Update Baseline Vitals',
    updateVitalsSubtitle: 'Resting heart rate dynamically adjusts the live ECG pulse waveform.',
    systolic: 'Systolic Blood Pressure (mmHg)',
    diastolic: 'Diastolic Blood Pressure (mmHg)',
    heartRateBpm: 'Resting Heart Rate (BPM)',
    fastingGlucose: 'Fasting Blood Glucose (mg/dL)',
    spo2: 'Oxygen Saturation SpO₂ (%)',
    editAllergy: 'Edit Allergy',
    addAllergy: 'Add Allergy or Intolerance',
    allergenName: 'Allergen Name',
    category: 'Category',
    severity: 'Severity',
    reaction: 'Typical Reaction',
    notes: 'Additional Notes',
    updateAllergy: 'Update Allergy',
    editMedication: 'Edit Medication',
    addMedication: 'Add Medication',
    medName: 'Medication / Supplement Name',
    dosage: 'Dosage',
    frequency: 'Schedule / Frequency',
    purpose: 'Purpose',
    prescriber: 'Prescribing Doctor',
    currentlyTaking: 'Currently taking (Active)',
    updateMedication: 'Update Medication',
    editCondition: 'Edit Condition',
    addCondition: 'Add Medical Condition',
    conditionName: 'Condition Name',
    yearDiagnosed: 'Year Diagnosed',
    status: 'Status',
    updateCondition: 'Update Condition',
    editContact: 'Edit Emergency Contact',
    addContact: 'Add Emergency Contact',
    characterAvatar: 'Character Avatar',
    relationship: 'Relationship',
    phone: 'Phone Number',
    email: 'Email Address',
    setPrimary: 'Set as Primary Emergency Contact',
    updateContact: 'Update Contact',
    editDoctor: 'Edit Physician',
    addDoctor: 'Add Physician / Clinic',
    doctorName: 'Doctor Name',
    specialty: 'Specialty',
    clinic: 'Practice / Clinic',
    clinicAddress: 'Clinic Address',
    updateDoctor: 'Update Doctor',
    editLab: 'Edit Lab Value',
    addLab: 'Add Lab Result',
    biomarkerName: 'Biomarker / Test Name',
    value: 'Value',
    unit: 'Unit',
    refMin: 'Ref Min',
    refMax: 'Ref Max',
    sampleDate: 'Sample Date',
    updateLab: 'Update Lab Value',
    editImmunization: 'Edit Immunization',
    addImmunization: 'Add Immunization Record',
    vaccineName: 'Vaccine Name',
    dateReceived: 'Date Received',
    nextBoosterDue: 'Next Booster Due',
    updateImmunization: 'Update Immunization',
    exportTitle: 'Export, Print & Backup',
    exportSubtitle: 'Everything runs locally in your browser—no data leaves your device.',
    printOptionTitle: 'Print Emergency Summary (A4 / PDF)',
    printOptionDesc: 'Opens your browser print dialog with a clean clinical one-page layout.',
    downloadJsonTitle: 'Download Profile JSON',
    downloadJsonDesc: 'Save your edited profile locally to re-import later or store safely.',
    importJsonTitle: 'Import Profile JSON',
    importJsonDesc: 'Load a previously exported MedProfil JSON file into this browser.',
    invalidJsonError: 'Invalid MedProfil JSON file. Please select a previously exported JSON file.',
    resetTitle: 'Reset to Demo Data',
    resetDescription:
      'This replaces your current in-browser edits with the default fictional Alex Morgan (Demo) template profile. Export a JSON backup first if you want to keep your changes.',
    resetConfirm: 'Reset Data',
  },
  toasts: {
    identityUpdated: 'Profile identity updated',
    vitalsUpdated: 'Vital signs updated',
    allergyUpdated: 'Allergy entry updated',
    allergyAdded: 'Allergy added to profile',
    allergyRemoved: 'Allergy removed',
    medUpdated: 'Medication updated',
    medAdded: 'Medication added to profile',
    medRemoved: 'Medication removed',
    medPaused: 'paused',
    medActive: 'marked active',
    conditionUpdated: 'Condition updated',
    conditionAdded: 'Condition added to profile',
    conditionRemoved: 'Condition removed',
    contactUpdated: 'Emergency contact updated',
    contactAdded: 'Emergency contact added',
    contactRemoved: 'Emergency contact removed',
    doctorUpdated: 'Care team entry updated',
    doctorAdded: 'Doctor added to care team',
    doctorRemoved: 'Physician removed',
    labUpdated: 'Lab result updated',
    labAdded: 'Lab value added',
    labRemoved: 'Lab value removed',
    immUpdated: 'Immunization updated',
    immAdded: 'Immunization recorded',
    immRemoved: 'Immunization removed',
    demoRestored: 'Demo template data restored',
    jsonExported: 'Profile exported as JSON',
    jsonImported: 'Profile imported from JSON',
    avatarSwitched: 'Profile character avatar switched',
    languageChanged: 'Language switched to',
  },
  footer: {
    left: 'MedProfil Template · 100% fictional demo data by default · No PIN or account required',
    right: 'Stored locally in your browser · Not a certified medical record',
  },
  print: {
    subtitle: 'MedProfil Emergency Medical Summary · Self-Reported Template',
    directive: 'Directive',
    generatedLocally: 'Generated locally via MedProfil Template · Last updated',
    disclaimer: 'Not a certified electronic medical record — verify clinically',
  },
};

const DE: Translations = {
  brandSubtitle: 'Öffentliche Demo · Vorlage',
  publicDemoBadge: 'Öffentliche Demo / Vorlage',
  editableInBrowser: 'Direkt im Browser bearbeitbar',
  updated: 'Aktualisiert',
  nav: {
    overview: 'Übersicht',
    emergency: 'Notfallpass',
    medications: 'Medikamente',
    allergies: 'Allergien & Diagnosen',
    labs: 'Laborwerte & Vitaldaten',
    contacts: 'Ärzte & Notfallkontakte',
  },
  topBar: {
    resetFull: 'Demo zurücksetzen',
    resetShort: 'Zurücksetzen',
    exportPrint: 'Export / Drucken',
    languageLabel: 'Sprache wählen',
    lightMode: 'Zum hellen Design wechseln',
    darkMode: 'Zum dunklen Design wechseln',
  },
  mascot: {
    title: 'Medi-Assistent',
    savedLocally: 'Deine Änderungen werden lokal in diesem Browser gespeichert.',
    demoHint: 'Fiktives Demo-Profil. Klicke einen Bereich an zum Bearbeiten.',
    quickEdit: 'Schnell bearbeiten',
    backupJson: 'JSON sichern',
    mobileNote: 'Öffentliche Demo-Vorlage. Kein PIN oder Login nötig.',
  },
  overview: {
    yrs: 'Jahre',
    organDonor: 'Organspender',
    yes: 'Ja',
    no: 'Nein',
    bloodType: 'Blutgruppe',
    severeAlerts: 'Schwere Warnungen',
    editProfile: 'Profil bearbeiten',
    emergencyNoteLabel: 'Notfallhinweis',
    openEmergencyCard: 'Notfallpass öffnen',
    baselineVitals: 'Basis-Vitalwerte',
    recorded: 'Erfasst',
    editVitals: 'Vitalwerte bearbeiten',
    bloodPressure: 'Blutdruck',
    optimalRange: 'Optimaler Bereich',
    monitorReading: 'Wert beobachten',
    restingHeartRate: 'Ruhepuls',
    ecgSync: 'EKG-Sync',
    fastingGlucose: 'Nüchtern-Blutzucker',
    oxygenSaturation: 'Sauerstoffsättigung (SpO₂)',
    normalSaturation: 'Normale Sättigung',
    belowThreshold: 'Unter 95%-Schwelle',
    allergiesTitle: 'Allergien & Unverträglichkeiten',
    recordedCount: 'erfasst',
    severeCount: 'schwer',
    addAllergy: 'Allergie hinzufügen',
    emptyAllergies: 'Keine Allergien eingetragen. Füge Medikamenten- oder Umweltallergien hinzu.',
    addFirstAllergy: 'Erste Allergie eintragen',
    medicationsTitle: 'Medikamente & Präparate',
    activeTotal: 'aktiv',
    addMedication: 'Medikament hinzufügen',
    emptyMedications: 'Noch keine Medikamente eingetragen.',
    addFirstMedication: 'Erstes Medikament eintragen',
    pause: 'Pausieren',
    resume: 'Aktivieren',
    emergencyContacts: 'Notfallkontakte',
    contactsSubtitle: 'Angehörige & Direktwahl',
    add: 'Neu',
    primary: 'Primär',
    physiciansTitle: 'Ärzte & Behandlungsteam',
    physiciansSubtitle: 'Hausarzt & Fachärzte',
    sampleLabsTitle: 'Beispiel-Laborwerte',
    sampleLabsSubtitle: 'Fiktive Referenzwerte — zum Bearbeiten oder Ergänzen anklicken',
    addLabValue: 'Laborwert hinzufügen',
    fullView: 'Vollansicht',
    colBiomarker: 'Biomarker',
    colCategory: 'Kategorie',
    colResult: 'Ergebnis',
    colRefRange: 'Referenzbereich',
    colStatus: 'Status',
    colDate: 'Datum',
    colActions: 'Aktionen',
    switchAvatarTitle: 'Avatar-Figur wechseln',
  },
  sections: {
    firstResponderQuickView: 'Ersthelfer-Kurzansicht · Öffentliche Demo-Vorlage',
    printSheet: 'Blatt drucken',
    criticalEmergencyNote: 'Wichtiger Notfallhinweis',
    editNote: 'Hinweis bearbeiten',
    noEmergencyNotes: 'Keine Notfallhinweise hinterlegt.',
    advanceDirective: 'Patientenverfügung',
    noneSpecified: 'Keine Angabe.',
    severeAllergies: 'Schwere Allergien',
    noSevereAllergies: 'Keine schweren Allergien markiert.',
    primaryEmergencyContact: 'Primärer Notfallkontakt',
    noEmergencyContact: 'Noch kein Notfallkontakt eingetragen.',
    activeMedications: 'Aktive Medikamente',
    primaryPhysician: 'Hausarzt / Primärarzt',
    medsSubtitle: 'Aktuelle Verordnungen, Dosierungspläne und frei verkäufliche Präparate verwalten.',
    filterAll: 'Alle',
    filterActive: 'Aktiv',
    filterPaused: 'Pausiert',
    searchMedsPlaceholder: 'Medikamente filtern...',
    noMedsMatch: 'Keine Medikamente entsprechen dem Filter.',
    markPaused: 'Pausieren',
    markActive: 'Aktivieren',
    purposeLabel: 'Zweck',
    prescriberLabel: 'Verordnet von',
    allergiesPageTitle: 'Allergien, Diagnosen & Impfungen',
    allergiesPageSubtitle: 'Unverträglichkeiten, Vorerkrankungen und Impfstatus übersichtlich pflegen.',
    noAllergiesForFilter: 'Keine Allergien in dieser Schweregradstufe.',
    medicalConditions: 'Vorerkrankungen & Diagnosen',
    addCondition: 'Diagnose hinzufügen',
    noConditions: 'Keine Diagnosen eingetragen.',
    since: 'Seit',
    immunizations: 'Impfungen',
    addVaccine: 'Impfung hinzufügen',
    noImmunizations: 'Keine Impfungen eingetragen.',
    received: 'Erhalten',
    nextDue: 'Nächste Auffrischung',
    labsPageTitle: 'Laborwerte & Vitaldaten',
    labsPageSubtitle: 'Beispielhafte klinische Laborwerte und physiologische Basisdaten.',
    sinusSimulation: 'Ruhepuls-EKG-Simulation',
    labBiomarkers: 'Labor-Biomarker',
    noLabsForFilter: 'Keine Laborwerte für diesen Statusfilter.',
    contactsPageTitle: 'Ärzte & Notfallkontakte',
    contactsPageSubtitle: 'Alle standardmäßig angezeigten Namen, Praxen und Nummern sind fiktive Platzhalter.',
    addContact: 'Kontakt hinzufügen',
    physiciansClinics: 'Ärzte & Praxen',
    addPhysician: 'Arzt hinzufügen',
    primaryEmergencyContactTag: 'Primärer Notfallkontakt',
  },
  status: {
    Mild: 'Leicht',
    Moderate: 'Mittel',
    Severe: 'Schwer',
    Normal: 'Normal',
    Borderline: 'Grenzwertig',
    Attention: 'Auffällig',
    Active: 'Aktiv',
    Paused: 'Pausiert',
    Managed: 'Eingestellt',
    Monitoring: 'Beobachtung',
    Resolved: 'Abgeklungen',
    All: 'Alle',
  },
  modals: {
    cancel: 'Abbrechen',
    saveChanges: 'Änderungen speichern',
    close: 'Schließen',
    editProfileTitle: 'Patientenprofil bearbeiten',
    editProfileSubtitle: 'Änderungen werden ausschließlich lokal im Browser gespeichert.',
    avatarLabel: 'Profil-Charakter-Avatar',
    fullName: 'Vollständiger Name',
    dateOfBirth: 'Geburtsdatum',
    bloodType: 'Blutgruppe',
    gender: 'Geschlecht',
    heightCm: 'Größe (cm)',
    weightKg: 'Gewicht (kg)',
    insuranceProvider: 'Krankenkasse',
    insuranceNumber: 'Versichertennummer',
    primaryLanguage: 'Sprache(n)',
    address: 'Adresse',
    registeredOrganDonor: 'Organspendeausweis vorhanden',
    emergencyResponderNote: 'Hinweis für Rettungskräfte',
    advanceDirective: 'Patientenverfügung / Hinweis',
    updateVitalsTitle: 'Basis-Vitalwerte aktualisieren',
    updateVitalsSubtitle: 'Der Ruhepuls passt das Tempo der Live-EKG-Kurve automatisch an.',
    systolic: 'Systolischer Blutdruck (mmHg)',
    diastolic: 'Diastolischer Blutdruck (mmHg)',
    heartRateBpm: 'Ruhepuls (BPM)',
    fastingGlucose: 'Nüchtern-Blutzucker (mg/dL)',
    spo2: 'Sauerstoffsättigung SpO₂ (%)',
    editAllergy: 'Allergie bearbeiten',
    addAllergy: 'Allergie / Unverträglichkeit hinzufügen',
    allergenName: 'Allergen',
    category: 'Kategorie',
    severity: 'Schweregrad',
    reaction: 'Typische Reaktion',
    notes: 'Zusätzliche Hinweise',
    updateAllergy: 'Allergie speichern',
    editMedication: 'Medikament bearbeiten',
    addMedication: 'Medikament hinzufügen',
    medName: 'Medikament / Präparat',
    dosage: 'Dosierung',
    frequency: 'Einnahmeplan',
    purpose: 'Anwendungszweck',
    prescriber: 'Verordnender Arzt',
    currentlyTaking: 'Aktuell eingenommen (Aktiv)',
    updateMedication: 'Medikament speichern',
    editCondition: 'Diagnose bearbeiten',
    addCondition: 'Diagnose hinzufügen',
    conditionName: 'Bezeichnung',
    yearDiagnosed: 'Diagnosejahr',
    status: 'Status',
    updateCondition: 'Diagnose speichern',
    editContact: 'Notfallkontakt bearbeiten',
    addContact: 'Notfallkontakt hinzufügen',
    characterAvatar: 'Charakter-Avatar',
    relationship: 'Beziehung / Rolle',
    phone: 'Telefonnummer',
    email: 'E-Mail-Adresse',
    setPrimary: 'Als primären Notfallkontakt festlegen',
    updateContact: 'Kontakt speichern',
    editDoctor: 'Arzt bearbeiten',
    addDoctor: 'Arzt / Praxis hinzufügen',
    doctorName: 'Name des Arztes',
    specialty: 'Fachrichtung',
    clinic: 'Praxis / Klinik',
    clinicAddress: 'Praxisadresse',
    updateDoctor: 'Arzt speichern',
    editLab: 'Laborwert bearbeiten',
    addLab: 'Laborwert hinzufügen',
    biomarkerName: 'Biomarker / Testname',
    value: 'Wert',
    unit: 'Einheit',
    refMin: 'Ref. Min',
    refMax: 'Ref. Max',
    sampleDate: 'Abnahmedatum',
    updateLab: 'Laborwert speichern',
    editImmunization: 'Impfung bearbeiten',
    addImmunization: 'Impfung hinzufügen',
    vaccineName: 'Impfstoff / Impfung',
    dateReceived: 'Impfdatum',
    nextBoosterDue: 'Nächste Auffrischung',
    updateImmunization: 'Impfung speichern',
    exportTitle: 'Export, Drucken & Backup',
    exportSubtitle: 'Alles läuft lokal im Browser — keine Daten verlassen dein Gerät.',
    printOptionTitle: 'Notfallzusammenfassung drucken (A4 / PDF)',
    printOptionDesc: 'Öffnet den Druckdialog mit einem klaren einseitigen Klinik-Layout.',
    downloadJsonTitle: 'Profil als JSON herunterladen',
    downloadJsonDesc: 'Speichere dein bearbeitetes Profil lokal als Backup-Datei.',
    importJsonTitle: 'Profil-JSON importieren',
    importJsonDesc: 'Lade eine zuvor exportierte MedProfil-JSON-Datei in diesen Browser.',
    invalidJsonError: 'Ungültige MedProfil-JSON-Datei. Bitte eine gültige Exportdatei wählen.',
    resetTitle: 'Auf Demo-Daten zurücksetzen',
    resetDescription:
      'Dadurch werden deine aktuellen Browser-Änderungen durch das fiktive Standardprofil Max Mustermann (Demo) ersetzt. Exportiere vorher ein JSON-Backup, falls du deine Daten behalten möchtest.',
    resetConfirm: 'Daten zurücksetzen',
  },
  toasts: {
    identityUpdated: 'Profilangaben aktualisiert',
    vitalsUpdated: 'Vitalwerte aktualisiert',
    allergyUpdated: 'Allergie-Eintrag aktualisiert',
    allergyAdded: 'Allergie zum Profil hinzugefügt',
    allergyRemoved: 'Allergie entfernt',
    medUpdated: 'Medikament aktualisiert',
    medAdded: 'Medikament hinzugefügt',
    medRemoved: 'Medikament entfernt',
    medPaused: 'pausiert',
    medActive: 'als aktiv markiert',
    conditionUpdated: 'Diagnose aktualisiert',
    conditionAdded: 'Diagnose hinzugefügt',
    conditionRemoved: 'Diagnose entfernt',
    contactUpdated: 'Notfallkontakt aktualisiert',
    contactAdded: 'Notfallkontakt hinzugefügt',
    contactRemoved: 'Notfallkontakt entfernt',
    doctorUpdated: 'Arzteintrag aktualisiert',
    doctorAdded: 'Arzt zum Team hinzugefügt',
    doctorRemoved: 'Arzt entfernt',
    labUpdated: 'Laborwert aktualisiert',
    labAdded: 'Laborwert hinzugefügt',
    labRemoved: 'Laborwert entfernt',
    immUpdated: 'Impfung aktualisiert',
    immAdded: 'Impfung erfasst',
    immRemoved: 'Impfung entfernt',
    demoRestored: 'Demo-Vorlagendaten wiederhergestellt',
    jsonExported: 'Profil als JSON exportiert',
    jsonImported: 'Profil aus JSON importiert',
    avatarSwitched: 'Profil-Avatar gewechselt',
    languageChanged: 'Sprache geändert zu',
  },
  footer: {
    left: 'MedProfil Vorlage · 100 % fiktive Demo-Daten · Kein PIN oder Konto erforderlich',
    right: 'Lokal im Browser gespeichert · Keine zertifizierte Patientenakte',
  },
  print: {
    subtitle: 'MedProfil Notfall-Zusammenfassung · Selbstauskunft-Vorlage',
    directive: 'Verfügung',
    generatedLocally: 'Lokal erstellt mit MedProfil Template · Zuletzt aktualisiert',
    disclaimer: 'Keine zertifizierte elektronische Patientenakte — klinisch prüfen',
  },
};

const ES: Translations = {
  ...EN,
  brandSubtitle: 'Demo Pública · Plantilla',
  publicDemoBadge: 'Demo Pública / Plantilla',
  editableInBrowser: 'Editable directamente en el navegador',
  updated: 'Actualizado',
  nav: {
    overview: 'Resumen',
    emergency: 'Tarjeta de Emergencia',
    medications: 'Medicamentos',
    allergies: 'Alergias y Condiciones',
    labs: 'Laboratorio y Signos',
    contacts: 'Equipo Médico y Contactos',
  },
  topBar: {
    resetFull: 'Restablecer Demo',
    resetShort: 'Restablecer',
    exportPrint: 'Exportar / Imprimir',
    languageLabel: 'Seleccionar idioma',
    lightMode: 'Cambiar a tema claro',
    darkMode: 'Cambiar a tema oscuro',
  },
  mascot: {
    title: 'Guía Medi',
    savedLocally: 'Tus cambios se guardan localmente en este navegador.',
    demoHint: 'Perfil de prueba ficticio. Haz clic en cualquier sección para editar.',
    quickEdit: 'Edición rápida',
    backupJson: 'Respaldo JSON',
    mobileNote: 'Plantilla pública. Sin PIN ni inicio de sesión.',
  },
  overview: {
    ...EN.overview,
    yrs: 'años',
    organDonor: 'Donante de órganos',
    yes: 'Sí',
    no: 'No',
    bloodType: 'Grupo Sanguíneo',
    severeAlerts: 'Alertas Graves',
    editProfile: 'Editar Perfil',
    emergencyNoteLabel: 'Nota de Emergencia',
    openEmergencyCard: 'Abrir Tarjeta de Emergencia',
    baselineVitals: 'Signos Vitales Basales',
    recorded: 'Registrado',
    editVitals: 'Editar Signos',
    bloodPressure: 'Presión Arterial',
    optimalRange: 'Rango óptimo',
    monitorReading: 'Vigilar lectura',
    restingHeartRate: 'Frecuencia Cardíaca',
    fastingGlucose: 'Glucosa en Ayunas',
    oxygenSaturation: 'Saturación de Oxígeno (SpO₂)',
    normalSaturation: 'Saturación normal',
    belowThreshold: 'Por debajo del 95%',
    allergiesTitle: 'Alergias e Intolerancias',
    recordedCount: 'registradas',
    severeCount: 'graves',
    addAllergy: 'Añadir Alergia',
    medicationsTitle: 'Medicamentos y Suplementos',
    activeTotal: 'activos',
    addMedication: 'Añadir Medicamento',
    pause: 'Pausar',
    resume: 'Reanudar',
    emergencyContacts: 'Contactos de Emergencia',
    contactsSubtitle: 'Familiares y llamada rápida',
    add: 'Añadir',
    primary: 'Principal',
    physiciansTitle: 'Médicos y Especialistas',
    physiciansSubtitle: 'Atención primaria y especialistas',
    sampleLabsTitle: 'Valores de Laboratorio (Ejemplo)',
    sampleLabsSubtitle: 'Panel ficticio de referencia — haz clic para editar o añadir valores',
    addLabValue: 'Añadir Valor',
    fullView: 'Vista Completa',
    colBiomarker: 'Biomarcador',
    colCategory: 'Categoría',
    colResult: 'Resultado',
    colRefRange: 'Rango Ref.',
    colStatus: 'Estado',
    colDate: 'Fecha',
    colActions: 'Acciones',
  },
  sections: {
    ...EN.sections,
    firstResponderQuickView: 'Vista Rápida para Paramédicos · Plantilla Demo',
    printSheet: 'Imprimir Hoja',
    criticalEmergencyNote: 'Nota Crítica de Emergencia',
    editNote: 'Editar Nota',
    advanceDirective: 'Voluntad Anticipada',
    severeAllergies: 'Alergias Graves',
    primaryEmergencyContact: 'Contacto Principal de Emergencia',
    activeMedications: 'Medicamentos Activos',
    primaryPhysician: 'Médico Principal',
    filterAll: 'Todos',
    filterActive: 'Activos',
    filterPaused: 'Pausados',
    searchMedsPlaceholder: 'Filtrar medicamentos...',
    allergiesPageTitle: 'Alergias, Condiciones y Vacunas',
    medicalConditions: 'Condiciones Médicas',
    addCondition: 'Añadir Condición',
    immunizations: 'Vacunas',
    addVaccine: 'Añadir Vacuna',
    labsPageTitle: 'Laboratorio y Signos Vitales',
    contactsPageTitle: 'Equipo Médico y Contactos',
    addContact: 'Añadir Contacto',
    physiciansClinics: 'Médicos y Clínicas',
    addPhysician: 'Añadir Médico',
  },
  status: {
    Mild: 'Leve',
    Moderate: 'Moderada',
    Severe: 'Grave',
    Normal: 'Normal',
    Borderline: 'Límite',
    Attention: 'Atención',
    Active: 'Activo',
    Paused: 'Pausado',
    Managed: 'Controlado',
    Monitoring: 'Seguimiento',
    Resolved: 'Resuelto',
    All: 'Todos',
  },
  modals: {
    ...EN.modals,
    cancel: 'Cancelar',
    saveChanges: 'Guardar Cambios',
    close: 'Cerrar',
    editProfileTitle: 'Editar Perfil del Paciente',
    exportTitle: 'Exportar, Imprimir y Respaldar',
    printOptionTitle: 'Imprimir Resumen de Emergencia (A4 / PDF)',
    downloadJsonTitle: 'Descargar Perfil JSON',
    importJsonTitle: 'Importar Perfil JSON',
    resetTitle: 'Restablecer Datos Demo',
    resetConfirm: 'Restablecer',
  },
  toasts: {
    ...EN.toasts,
    demoRestored: 'Datos demo restablecidos',
    languageChanged: 'Idioma cambiado a',
  },
  footer: {
    left: 'MedProfil Plantilla · Datos 100% ficticios por defecto · Sin PIN ni cuenta',
    right: 'Guardado localmente en tu navegador · No es un historial médico certificado',
  },
};

const FR: Translations = {
  ...EN,
  brandSubtitle: 'Démo Publique · Modèle',
  publicDemoBadge: 'Démo Publique / Modèle',
  editableInBrowser: 'Modifiable directement dans le navigateur',
  updated: 'Mis à jour',
  nav: {
    overview: 'Vue d’ensemble',
    emergency: 'Carte d’Urgence',
    medications: 'Médicaments',
    allergies: 'Allergies & Antécédents',
    labs: 'Analyses & Constantes',
    contacts: 'Équipe & Contacts',
  },
  topBar: {
    resetFull: 'Réinitialiser Démo',
    resetShort: 'Réinit.',
    exportPrint: 'Exporter / Imprimer',
    languageLabel: 'Choisir la langue',
    lightMode: 'Passer au thème clair',
    darkMode: 'Passer au thème sombre',
  },
  mascot: {
    title: 'Guide Medi',
    savedLocally: 'Vos modifications sont enregistrées localement dans ce navigateur.',
    demoHint: 'Profil fictif de démo. Cliquez sur une section pour la modifier.',
    quickEdit: 'Édition rapide',
    backupJson: 'Sauvegarde JSON',
    mobileNote: 'Modèle public. Aucun code PIN requis.',
  },
  overview: {
    ...EN.overview,
    yrs: 'ans',
    organDonor: 'Donneur d’organes',
    yes: 'Oui',
    no: 'Non',
    bloodType: 'Groupe Sanguin',
    severeAlerts: 'Alertes Graves',
    editProfile: 'Modifier le profil',
    emergencyNoteLabel: 'Note d’urgence',
    openEmergencyCard: 'Ouvrir la carte d’urgence',
    baselineVitals: 'Constantes de base',
    recorded: 'Relevé le',
    editVitals: 'Modifier',
    bloodPressure: 'Tension artérielle',
    optimalRange: 'Plage optimale',
    monitorReading: 'À surveiller',
    restingHeartRate: 'Fréquence cardiaque',
    fastingGlucose: 'Glycémie à jeun',
    oxygenSaturation: 'Saturation en oxygène (SpO₂)',
    normalSaturation: 'Saturation normale',
    belowThreshold: 'Sous le seuil de 95%',
    allergiesTitle: 'Allergies & Intolérances',
    recordedCount: 'enregistrées',
    severeCount: 'graves',
    addAllergy: 'Ajouter allergie',
    medicationsTitle: 'Médicaments & Compléments',
    activeTotal: 'actifs',
    addMedication: 'Ajouter médicament',
    pause: 'Suspendre',
    resume: 'Reprendre',
    emergencyContacts: 'Contacts d’urgence',
    contactsSubtitle: 'Proches & appel rapide',
    add: 'Ajouter',
    primary: 'Principal',
    physiciansTitle: 'Médecins & Spécialistes',
    physiciansSubtitle: 'Médecin traitant & spécialistes',
    sampleLabsTitle: 'Analyses biologiques (Exemple)',
    sampleLabsSubtitle: 'Valeurs fictives — cliquez pour éditer ou ajouter vos résultats',
    addLabValue: 'Ajouter analyse',
    fullView: 'Vue complète',
    colBiomarker: 'Biomarqueur',
    colCategory: 'Catégorie',
    colResult: 'Résultat',
    colRefRange: 'Norme',
    colStatus: 'Statut',
    colDate: 'Date',
    colActions: 'Actions',
  },
  sections: {
    ...EN.sections,
    firstResponderQuickView: 'Vue Secouriste · Modèle Public',
    printSheet: 'Imprimer la fiche',
    criticalEmergencyNote: 'Note critique d’urgence',
    editNote: 'Modifier',
    advanceDirective: 'Directives anticipées',
    severeAllergies: 'Allergies graves',
    primaryEmergencyContact: 'Contact d’urgence principal',
    activeMedications: 'Traitements actifs',
    primaryPhysician: 'Médecin traitant',
    filterAll: 'Tous',
    filterActive: 'Actifs',
    filterPaused: 'En pause',
    searchMedsPlaceholder: 'Filtrer les médicaments...',
    allergiesPageTitle: 'Allergies, Antécédents & Vaccins',
    medicalConditions: 'Antécédents médicaux',
    addCondition: 'Ajouter',
    immunizations: 'Vaccinations',
    addVaccine: 'Ajouter vaccin',
    labsPageTitle: 'Analyses & Constantes',
    contactsPageTitle: 'Équipe médicale & Contacts',
    addContact: 'Ajouter contact',
    physiciansClinics: 'Médecins & Cabinets',
    addPhysician: 'Ajouter médecin',
  },
  status: {
    Mild: 'Légère',
    Moderate: 'Modérée',
    Severe: 'Sévère',
    Normal: 'Normal',
    Borderline: 'Limite',
    Attention: 'Attention',
    Active: 'Actif',
    Paused: 'En pause',
    Managed: 'Stabilisé',
    Monitoring: 'Suivi',
    Resolved: 'Résolu',
    All: 'Tous',
  },
  modals: {
    ...EN.modals,
    cancel: 'Annuler',
    saveChanges: 'Enregistrer',
    close: 'Fermer',
    editProfileTitle: 'Modifier le profil patient',
    exportTitle: 'Exporter, Imprimer & Sauvegarder',
    printOptionTitle: 'Imprimer la fiche d’urgence (A4 / PDF)',
    downloadJsonTitle: 'Télécharger le profil JSON',
    importJsonTitle: 'Importer un profil JSON',
    resetTitle: 'Réinitialiser les données démo',
    resetConfirm: 'Réinitialiser',
  },
  toasts: {
    ...EN.toasts,
    demoRestored: 'Données de démonstration restaurées',
    languageChanged: 'Langue changée en',
  },
  footer: {
    left: 'Modèle MedProfil · Données 100 % fictives · Sans code PIN ni compte',
    right: 'Stocké localement dans votre navigateur · Non certifié dossier médical',
  },
};

const IT: Translations = {
  ...EN,
  brandSubtitle: 'Demo Pubblica · Modello',
  publicDemoBadge: 'Demo Pubblica / Modello',
  editableInBrowser: 'Modificabile direttamente nel browser',
  updated: 'Aggiornato',
  nav: {
    overview: 'Panoramica',
    emergency: 'Scheda Emergenza',
    medications: 'Farmaci',
    allergies: 'Allergie e Patologie',
    labs: 'Esami e Parametri',
    contacts: 'Medici e Contatti',
  },
  topBar: {
    resetFull: 'Ripristina Demo',
    resetShort: 'Ripristina',
    exportPrint: 'Esporta / Stampa',
    languageLabel: 'Seleziona lingua',
    lightMode: 'Passa al tema chiaro',
    darkMode: 'Passa al tema scuro',
  },
  mascot: {
    title: 'Guida Medi',
    savedLocally: 'Le modifiche sono salvate localmente nel tuo browser.',
    demoHint: 'Profilo demo fittizio. Clicca una sezione per personalizzare.',
    quickEdit: 'Modifica rapida',
    backupJson: 'Backup JSON',
    mobileNote: 'Modello pubblico. Nessun PIN richiesto.',
  },
  overview: {
    ...EN.overview,
    yrs: 'anni',
    organDonor: 'Donatore organi',
    yes: 'Sì',
    no: 'No',
    bloodType: 'Gruppo Sanguigno',
    severeAlerts: 'Allerte Gravi',
    editProfile: 'Modifica Profilo',
    emergencyNoteLabel: 'Nota Emergenza',
    openEmergencyCard: 'Apri Scheda Emergenza',
    baselineVitals: 'Parametri Vitali',
    recorded: 'Rilevato',
    editVitals: 'Modifica Parametri',
    bloodPressure: 'Pressione Arteriosa',
    restingHeartRate: 'Frequenza Cardiaca',
    fastingGlucose: 'Glicemia a Digiuno',
    oxygenSaturation: 'Saturazione Ossigeno (SpO₂)',
    allergiesTitle: 'Allergie e Intolleranze',
    addAllergy: 'Aggiungi Allergia',
    medicationsTitle: 'Farmaci e Integratori',
    addMedication: 'Aggiungi Farmaco',
    emergencyContacts: 'Contatti di Emergenza',
    physiciansTitle: 'Medici e Specialisti',
    sampleLabsTitle: 'Esami di Laboratorio (Esempio)',
    addLabValue: 'Aggiungi Esame',
    fullView: 'Vista Completa',
  },
  status: {
    Mild: 'Lieve',
    Moderate: 'Moderata',
    Severe: 'Grave',
    Normal: 'Normale',
    Borderline: 'Limite',
    Attention: 'Attenzione',
    Active: 'Attivo',
    Paused: 'In pausa',
    Managed: 'Gestito',
    Monitoring: 'Monitoraggio',
    Resolved: 'Risolto',
    All: 'Tutti',
  },
  modals: {
    ...EN.modals,
    cancel: 'Annulla',
    saveChanges: 'Salva Modifiche',
    close: 'Chiudi',
    resetTitle: 'Ripristina Dati Demo',
    resetConfirm: 'Ripristina',
  },
  toasts: {
    ...EN.toasts,
    demoRestored: 'Dati demo ripristinati',
    languageChanged: 'Lingua impostata su',
  },
  footer: {
    left: 'Modello MedProfil · Dati 100% fittizi · Nessun PIN o account richiesto',
    right: 'Salvato localmente nel browser · Non è una cartella clinica certificata',
  },
};

const TR: Translations = {
  ...EN,
  brandSubtitle: 'Açık Demo · Şablon',
  publicDemoBadge: 'Açık Demo / Şablon',
  editableInBrowser: 'Tarayıcıda doğrudan düzenlenebilir',
  updated: 'Güncellendi',
  nav: {
    overview: 'Genel Bakış',
    emergency: 'Acil Durum Kartı',
    medications: 'İlaçlar',
    allergies: 'Alerjiler ve Durumlar',
    labs: 'Tahliller ve Vitaller',
    contacts: 'Doktorlar ve Kişiler',
  },
  topBar: {
    resetFull: 'Demoyu Sıfırla',
    resetShort: 'Sıfırla',
    exportPrint: 'Dışa Aktar / Yazdır',
    languageLabel: 'Dil seçin',
    lightMode: 'Açık temaya geç',
    darkMode: 'Koyu temaya geç',
  },
  mascot: {
    title: 'Medi Rehber',
    savedLocally: 'Düzenlemeleriniz yalnızca bu tarayıcıda yerel olarak saklanır.',
    demoHint: 'Kurgusal demo profili. Özelleştirmek için herhangi bir bölüme tıklayın.',
    quickEdit: 'Hızlı Düzenle',
    backupJson: 'JSON Yedekle',
    mobileNote: 'Herkese açık demo şablonu. PIN veya giriş gerekmez.',
  },
  overview: {
    ...EN.overview,
    yrs: 'yaş',
    organDonor: 'Organ Bağışçısı',
    yes: 'Evet',
    no: 'Hayır',
    bloodType: 'Kan Grubu',
    severeAlerts: 'Ciddi Uyarılar',
    editProfile: 'Profili Düzenle',
    emergencyNoteLabel: 'Acil Durum Notu',
    openEmergencyCard: 'Acil Kartını Aç',
    baselineVitals: 'Temel Vital Bulgular',
    recorded: 'Kayıt',
    editVitals: 'Vitalleri Düzenle',
    bloodPressure: 'Tansiyon',
    restingHeartRate: 'Dinlenme Nabzı',
    fastingGlucose: 'Açlık Kan Şekeri',
    oxygenSaturation: 'Oksijen Satürasyonu (SpO₂)',
    allergiesTitle: 'Alerjiler ve Hassasiyetler',
    addAllergy: 'Alerji Ekle',
    medicationsTitle: 'İlaçlar ve Takviyeler',
    addMedication: 'İlaç Ekle',
    emergencyContacts: 'Acil Durum Kişileri',
    physiciansTitle: 'Doktorlar ve Bakım Ekibi',
    sampleLabsTitle: 'Örnek Laboratuvar Değerleri',
    addLabValue: 'Değer Ekle',
    fullView: 'Tam Görünüm',
  },
  status: {
    Mild: 'Hafif',
    Moderate: 'Orta',
    Severe: 'Şiddetli',
    Normal: 'Normal',
    Borderline: 'Sınırda',
    Attention: 'Dikkat',
    Active: 'Aktif',
    Paused: 'Duraklatıldı',
    Managed: 'Kontrol Altında',
    Monitoring: 'Takipte',
    Resolved: 'İyileşti',
    All: 'Tümü',
  },
  modals: {
    ...EN.modals,
    cancel: 'İptal',
    saveChanges: 'Değişiklikleri Kaydet',
    close: 'Kapat',
    resetTitle: 'Demo Verilerine Sıfırla',
    resetConfirm: 'Verileri Sıfırla',
  },
  toasts: {
    ...EN.toasts,
    demoRestored: 'Demo verileri geri yüklendi',
    languageChanged: 'Dil değiştirildi:',
  },
  footer: {
    left: 'MedProfil Şablonu · Varsayılan %100 kurgusal veri · PIN veya hesap gerekmez',
    right: 'Tarayıcıda yerel saklanır · Resmi tıbbi kayıt değildir',
  },
};

const JA: Translations = {
  ...EN,
  brandSubtitle: '公開デモ · テンプレート',
  publicDemoBadge: '公開デモ / テンプレート',
  editableInBrowser: 'ブラウザ上でそのまま編集可能',
  updated: '更新日',
  nav: {
    overview: '概要',
    emergency: '緊急カード',
    medications: '服用薬',
    allergies: 'アレルギー・既往歴',
    labs: '検査値・バイタル',
    contacts: '主治医・緊急連絡先',
  },
  topBar: {
    resetFull: 'デモに戻す',
    resetShort: 'リセット',
    exportPrint: '出力 / 印刷',
    languageLabel: '言語を選択',
    lightMode: 'ライトテーマに切替',
    darkMode: 'ダークテーマに切替',
  },
  mascot: {
    title: 'Medi ガイド',
    savedLocally: '編集内容はこのブラウザ内にローカル保存されます。',
    demoHint: '架空のデモプロフィールです。各項目をクリックして自由に編集できます。',
    quickEdit: 'クイック編集',
    backupJson: 'JSON保存',
    mobileNote: '公開デモテンプレート。PIN・ログイン不要。',
  },
  overview: {
    ...EN.overview,
    yrs: '歳',
    organDonor: '臓器提供意思',
    yes: 'あり',
    no: 'なし',
    bloodType: '血液型',
    severeAlerts: '重度アラート',
    editProfile: 'プロフィール編集',
    emergencyNoteLabel: '緊急時メモ',
    openEmergencyCard: '緊急カードを開く',
    baselineVitals: '基本バイタルサイン',
    recorded: '記録日',
    editVitals: 'バイタル編集',
    bloodPressure: '血圧',
    restingHeartRate: '安静時心拍数',
    fastingGlucose: '空腹時血糖値',
    oxygenSaturation: '血中酸素飽和度 (SpO₂)',
    allergiesTitle: 'アレルギー・不耐性',
    addAllergy: 'アレルギー追加',
    medicationsTitle: '服用薬・サプリメント',
    addMedication: '薬を追加',
    emergencyContacts: '緊急連絡先',
    physiciansTitle: '主治医・専門医',
    sampleLabsTitle: 'サンプル検査値',
    addLabValue: '検査値を追加',
    fullView: 'すべて表示',
  },
  status: {
    Mild: '軽度',
    Moderate: '中等度',
    Severe: '重度',
    Normal: '正常',
    Borderline: '境界域',
    Attention: '要注意',
    Active: '服用中',
    Paused: '休止中',
    Managed: '管理中',
    Monitoring: '経過観察',
    Resolved: '完治',
    All: 'すべて',
  },
  modals: {
    ...EN.modals,
    cancel: 'キャンセル',
    saveChanges: '変更を保存',
    close: '閉じる',
    resetTitle: 'デモデータにリセット',
    resetConfirm: 'リセットする',
  },
  toasts: {
    ...EN.toasts,
    demoRestored: 'デモデータを復元しました',
    languageChanged: '言語を切り替えました:',
  },
  footer: {
    left: 'MedProfil テンプレート · デフォルトは架空のデモデータ · PIN・ログイン不要',
    right: 'ブラウザにローカル保存 · 公的な診療記録ではありません',
  },
};

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: EN,
  de: DE,
  es: ES,
  fr: FR,
  it: IT,
  tr: TR,
  ja: JA,
};
