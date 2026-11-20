export type BloodType =
  | 'O+'
  | 'O-'
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'Unknown';

export type PatientAvatarVariant = 'classic' | 'active' | 'studio' | 'scholar';

export type RoleAvatarVariant =
  | 'emergency-partner'
  | 'emergency-friend'
  | 'doctor-primary'
  | 'doctor-specialist'
  | 'paramedic';

export type AllergySeverity = 'Mild' | 'Moderate' | 'Severe';

export type LabStatus = 'Normal' | 'Borderline' | 'Attention';

export interface PatientIdentity {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: BloodType;
  heightCm: number;
  weightKg: number;
  organDonor: boolean;
  insuranceProvider: string;
  insuranceNumber: string;
  primaryLanguage: string;
  address: string;
  avatarVariant: PatientAvatarVariant;
  emergencyNote: string;
  advanceDirective: string;
}

export interface VitalSigns {
  systolic: number;
  diastolic: number;
  heartRateBpm: number;
  bloodGlucoseMgDl: number;
  spo2Percent: number;
  recordedAt: string;
}

export interface AllergyItem {
  id: string;
  allergen: string;
  category: 'Medication' | 'Food' | 'Environmental' | 'Other';
  severity: AllergySeverity;
  reaction: string;
  notes: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  prescriber: string;
  active: boolean;
}

export interface ConditionItem {
  id: string;
  name: string;
  diagnosedYear: string;
  status: 'Managed' | 'Monitoring' | 'Resolved';
  notes: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  avatarVariant: RoleAvatarVariant;
}

export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  phone: string;
  address: string;
  avatarVariant: RoleAvatarVariant;
}

export interface LabResultItem {
  id: string;
  testName: string;
  category: 'Blood Panel' | 'Metabolic' | 'Vitamins' | 'Thyroid' | 'Lipids';
  value: number;
  unit: string;
  refMin: number;
  refMax: number;
  status: LabStatus;
  date: string;
}

export interface ImmunizationItem {
  id: string;
  vaccine: string;
  date: string;
  nextDue: string;
}

export interface MedicalProfile {
  templateVersion: string;
  lastUpdated: string;
  identity: PatientIdentity;
  vitals: VitalSigns;
  allergies: AllergyItem[];
  medications: MedicationItem[];
  conditions: ConditionItem[];
  emergencyContacts: EmergencyContact[];
  doctors: DoctorInfo[];
  labResults: LabResultItem[];
  immunizations: ImmunizationItem[];
}

export type ActiveSection =
  | 'overview'
  | 'emergency'
  | 'medications'
  | 'allergies'
  | 'labs'
  | 'contacts';
