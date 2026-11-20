import { useState, useEffect, useCallback } from 'react';
import type {
  MedicalProfile,
  PatientIdentity,
  VitalSigns,
  AllergyItem,
  MedicationItem,
  ConditionItem,
  EmergencyContact,
  DoctorInfo,
  LabResultItem,
  ImmunizationItem,
} from '../types/profile';
import type { LanguageCode } from '../i18n/translations';
import { DEMO_MEDICAL_PROFILE, getDemoProfileForLanguage } from '../data/demoProfile';

const STORAGE_KEY = 'medprofil_template_v2';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function loadStoredProfile(lang: LanguageCode): { profile: MedicalProfile; modified: boolean } {
  const fallback = getDemoProfileForLanguage(lang);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { profile: fallback, modified: false };
    const parsed = JSON.parse(raw) as Partial<MedicalProfile>;
    if (!parsed || !parsed.identity || !parsed.vitals) {
      return { profile: fallback, modified: false };
    }
    return {
      modified: true,
      profile: {
        ...DEMO_MEDICAL_PROFILE,
        ...parsed,
        identity: { ...DEMO_MEDICAL_PROFILE.identity, ...parsed.identity },
        vitals: { ...DEMO_MEDICAL_PROFILE.vitals, ...parsed.vitals },
        allergies: Array.isArray(parsed.allergies) ? parsed.allergies : fallback.allergies,
        medications: Array.isArray(parsed.medications) ? parsed.medications : fallback.medications,
        conditions: Array.isArray(parsed.conditions) ? parsed.conditions : fallback.conditions,
        emergencyContacts: Array.isArray(parsed.emergencyContacts)
          ? parsed.emergencyContacts
          : fallback.emergencyContacts,
        doctors: Array.isArray(parsed.doctors) ? parsed.doctors : fallback.doctors,
        labResults: Array.isArray(parsed.labResults) ? parsed.labResults : fallback.labResults,
        immunizations: Array.isArray(parsed.immunizations)
          ? parsed.immunizations
          : fallback.immunizations,
      },
    };
  } catch {
    return { profile: fallback, modified: false };
  }
}

export function useMedicalProfile(language: LanguageCode) {
  const [initialState] = useState(() => loadStoredProfile(language));
  const [profile, setProfile] = useState<MedicalProfile>(initialState.profile);
  const [isModified, setIsModified] = useState<boolean>(initialState.modified);

  // When unmodified, switch the demo profile data cleanly between English (default) and German
  useEffect(() => {
    if (!isModified) {
      setProfile(getDemoProfileForLanguage(language));
    }
  }, [language, isModified]);

  useEffect(() => {
    try {
      if (isModified) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      }
    } catch {
      // Ignore storage quota errors in private browsing modes
    }
  }, [profile, isModified]);

  const mutate = useCallback((updater: (prev: MedicalProfile) => MedicalProfile) => {
    setProfile((prev) => ({
      ...updater(prev),
      lastUpdated: todayIso(),
    }));
    setIsModified(true);
  }, []);

  const updateIdentity = useCallback(
    (patch: Partial<PatientIdentity>) => {
      mutate((prev) => ({
        ...prev,
        identity: { ...prev.identity, ...patch },
      }));
    },
    [mutate]
  );

  const updateVitals = useCallback(
    (patch: Partial<VitalSigns>) => {
      mutate((prev) => ({
        ...prev,
        vitals: { ...prev.vitals, ...patch, recordedAt: todayIso() },
      }));
    },
    [mutate]
  );

  const saveAllergy = useCallback(
    (item: Omit<AllergyItem, 'id'> & { id?: string }) => {
      mutate((prev) => {
        if (item.id) {
          return {
            ...prev,
            allergies: prev.allergies.map((a) => (a.id === item.id ? (item as AllergyItem) : a)),
          };
        }
        return {
          ...prev,
          allergies: [{ ...item, id: createId('alg') }, ...prev.allergies],
        };
      });
    },
    [mutate]
  );

  const deleteAllergy = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        allergies: prev.allergies.filter((a) => a.id !== id),
      }));
    },
    [mutate]
  );

  const saveMedication = useCallback(
    (item: Omit<MedicationItem, 'id'> & { id?: string }) => {
      mutate((prev) => {
        if (item.id) {
          return {
            ...prev,
            medications: prev.medications.map((m) =>
              m.id === item.id ? (item as MedicationItem) : m
            ),
          };
        }
        return {
          ...prev,
          medications: [{ ...item, id: createId('med') }, ...prev.medications],
        };
      });
    },
    [mutate]
  );

  const deleteMedication = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        medications: prev.medications.filter((m) => m.id !== id),
      }));
    },
    [mutate]
  );

  const saveCondition = useCallback(
    (item: Omit<ConditionItem, 'id'> & { id?: string }) => {
      mutate((prev) => {
        if (item.id) {
          return {
            ...prev,
            conditions: prev.conditions.map((c) =>
              c.id === item.id ? (item as ConditionItem) : c
            ),
          };
        }
        return {
          ...prev,
          conditions: [{ ...item, id: createId('cond') }, ...prev.conditions],
        };
      });
    },
    [mutate]
  );

  const deleteCondition = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        conditions: prev.conditions.filter((c) => c.id !== id),
      }));
    },
    [mutate]
  );

  const saveEmergencyContact = useCallback(
    (item: Omit<EmergencyContact, 'id'> & { id?: string }) => {
      mutate((prev) => {
        const list = item.isPrimary
          ? prev.emergencyContacts.map((c) => ({ ...c, isPrimary: false }))
          : prev.emergencyContacts;

        if (item.id) {
          return {
            ...prev,
            emergencyContacts: list.map((c) =>
              c.id === item.id ? (item as EmergencyContact) : c
            ),
          };
        }
        return {
          ...prev,
          emergencyContacts: [...list, { ...item, id: createId('ec') }],
        };
      });
    },
    [mutate]
  );

  const deleteEmergencyContact = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        emergencyContacts: prev.emergencyContacts.filter((c) => c.id !== id),
      }));
    },
    [mutate]
  );

  const saveDoctor = useCallback(
    (item: Omit<DoctorInfo, 'id'> & { id?: string }) => {
      mutate((prev) => {
        if (item.id) {
          return {
            ...prev,
            doctors: prev.doctors.map((d) => (d.id === item.id ? (item as DoctorInfo) : d)),
          };
        }
        return {
          ...prev,
          doctors: [...prev.doctors, { ...item, id: createId('doc') }],
        };
      });
    },
    [mutate]
  );

  const deleteDoctor = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        doctors: prev.doctors.filter((d) => d.id !== id),
      }));
    },
    [mutate]
  );

  const saveLabResult = useCallback(
    (item: Omit<LabResultItem, 'id'> & { id?: string }) => {
      mutate((prev) => {
        if (item.id) {
          return {
            ...prev,
            labResults: prev.labResults.map((l) =>
              l.id === item.id ? (item as LabResultItem) : l
            ),
          };
        }
        return {
          ...prev,
          labResults: [{ ...item, id: createId('lab') }, ...prev.labResults],
        };
      });
    },
    [mutate]
  );

  const deleteLabResult = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        labResults: prev.labResults.filter((l) => l.id !== id),
      }));
    },
    [mutate]
  );

  const saveImmunization = useCallback(
    (item: Omit<ImmunizationItem, 'id'> & { id?: string }) => {
      mutate((prev) => {
        if (item.id) {
          return {
            ...prev,
            immunizations: prev.immunizations.map((i) =>
              i.id === item.id ? (item as ImmunizationItem) : i
            ),
          };
        }
        return {
          ...prev,
          immunizations: [{ ...item, id: createId('imm') }, ...prev.immunizations],
        };
      });
    },
    [mutate]
  );

  const deleteImmunization = useCallback(
    (id: string) => {
      mutate((prev) => ({
        ...prev,
        immunizations: prev.immunizations.filter((i) => i.id !== id),
      }));
    },
    [mutate]
  );

  const resetToDemo = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProfile(getDemoProfileForLanguage(language));
    setIsModified(false);
  }, [language]);

  const exportProfileJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = profile.identity.fullName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    link.download = `medprofil-${safeName || 'profile'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [profile]);

  const importProfileJson = useCallback((jsonText: string): boolean => {
    try {
      const parsed = JSON.parse(jsonText) as Partial<MedicalProfile>;
      if (!parsed || !parsed.identity || !parsed.vitals) {
        return false;
      }
      setProfile({
        ...DEMO_MEDICAL_PROFILE,
        ...parsed,
        identity: { ...DEMO_MEDICAL_PROFILE.identity, ...parsed.identity },
        vitals: { ...DEMO_MEDICAL_PROFILE.vitals, ...parsed.vitals },
        allergies: Array.isArray(parsed.allergies) ? parsed.allergies : [],
        medications: Array.isArray(parsed.medications) ? parsed.medications : [],
        conditions: Array.isArray(parsed.conditions) ? parsed.conditions : [],
        emergencyContacts: Array.isArray(parsed.emergencyContacts) ? parsed.emergencyContacts : [],
        doctors: Array.isArray(parsed.doctors) ? parsed.doctors : [],
        labResults: Array.isArray(parsed.labResults) ? parsed.labResults : [],
        immunizations: Array.isArray(parsed.immunizations) ? parsed.immunizations : [],
        lastUpdated: todayIso(),
      });
      setIsModified(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
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
  };
}
