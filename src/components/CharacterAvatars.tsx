import React from 'react';
import { motion } from 'motion/react';
import type { PatientAvatarVariant, RoleAvatarVariant } from '../types/profile';

interface MascotProps {
  mood?: 'idle' | 'happy' | 'alert';
  size?: number;
  className?: string;
}

/**
 * Custom animated vector medical-tech mascot ("Medi") for MedProfil Template.
 * Features idle breathing bob, blinking eyes, glowing visor detail, and interactive hover wave.
 */
export const MediMascot: React.FC<MascotProps> = ({
  mood = 'idle',
  size = 84,
  className = '',
}) => {
  const accentColor =
    mood === 'alert' ? '#DC2626' : mood === 'happy' ? '#059669' : '#0D9488';

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.06, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Soft grounding shadow */}
        <motion.ellipse
          cx="60"
          cy="108"
          rx="26"
          ry="5"
          fill="currentColor"
          className="text-slate-900/10 dark:text-black/40"
          animate={{ rx: [26, 22, 26], opacity: [0.55, 0.35, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating body group */}
        <motion.g
          animate={{ y: [0, -4.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Antenna */}
          <line
            x1="60"
            y1="22"
            x2="60"
            y2="12"
            stroke="#64748B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.circle
            cx="60"
            cy="10"
            r="4.5"
            fill={accentColor}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '60px 10px' }}
          />

          {/* Torso */}
          <rect
            x="36"
            y="67"
            width="48"
            height="32"
            rx="14"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />
          {/* Teal clinical collar */}
          <path
            d="M46 68C50 74 70 74 74 68"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Medical cross crest on chest */}
          <rect x="57.2" y="77" width="5.6" height="14" rx="1.8" fill={accentColor} />
          <rect x="53" y="81.2" width="14" height="5.6" rx="1.8" fill={accentColor} />

          {/* Left Arm */}
          <rect
            x="24"
            y="71"
            width="10"
            height="22"
            rx="5"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Right Arm (waves gently) */}
          <motion.g
            animate={
              mood === 'happy'
                ? { rotate: [-12, -38, -12] }
                : { rotate: [0, -14, 0] }
            }
            transition={{
              duration: mood === 'happy' ? 0.8 : 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '88px 75px' }}
          >
            <rect
              x="86"
              y="71"
              width="10"
              height="22"
              rx="5"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
            />
          </motion.g>

          {/* Head Shell */}
          <rect
            x="27"
            y="21"
            width="66"
            height="48"
            rx="20"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />

          {/* Ear pods */}
          <rect x="21" y="36" width="6" height="18" rx="3" fill={accentColor} />
          <rect x="93" y="36" width="6" height="18" rx="3" fill={accentColor} />

          {/* Dark Display Visor */}
          <rect x="35" y="30" width="50" height="30" rx="12" fill="#0F172A" />

          {/* Subtle Visor Glint */}
          <path
            d="M42 35H52"
            stroke="#334155"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Animated Blinking Eyes */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
            transition={{
              duration: 4.5,
              times: [0, 0.88, 0.92, 0.96, 1],
              repeat: Infinity,
            }}
            style={{ transformOrigin: '60px 44px' }}
          >
            {mood === 'happy' ? (
              <>
                <path
                  d="M45 45C46.8 41.5 51.2 41.5 53 45"
                  stroke="#2DD4BF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M67 45C68.8 41.5 73.2 41.5 75 45"
                  stroke="#2DD4BF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <circle cx="49" cy="44" r="3.8" fill="#2DD4BF" />
                <circle cx="71" cy="44" r="3.8" fill="#2DD4BF" />
                <circle cx="50.3" cy="42.7" r="1.2" fill="#CCFBF1" />
                <circle cx="72.3" cy="42.7" r="1.2" fill="#CCFBF1" />
              </>
            )}
          </motion.g>

          {/* Friendly Smile / Status Curve */}
          <path
            d={
              mood === 'alert'
                ? 'M54 53H66'
                : 'M53 51.5C55.5 54.8 64.5 54.8 67 51.5'
            }
            stroke="#5EEAD4"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};

interface PatientAvatarProps {
  variant: PatientAvatarVariant;
  size?: number;
  className?: string;
}

const PATIENT_PALETTES: Record<
  PatientAvatarVariant,
  {
    bg: string;
    ring: string;
    shirt: string;
    skin: string;
    hair: string;
    accent: string;
    glasses: boolean;
    hairStyle: 'neat' | 'wavy' | 'bob' | 'curly';
  }
> = {
  classic: {
    bg: '#E6F4F1',
    ring: '#0D9488',
    shirt: '#1E293B',
    skin: '#F3C6A5',
    hair: '#1E293B',
    accent: '#0D9488',
    glasses: true,
    hairStyle: 'neat',
  },
  active: {
    bg: '#FEF3C7',
    ring: '#D97706',
    shirt: '#0F766E',
    skin: '#E0AC84',
    hair: '#451A03',
    accent: '#F59E0B',
    glasses: false,
    hairStyle: 'wavy',
  },
  studio: {
    bg: '#E0F2FE',
    ring: '#0284C7',
    shirt: '#334155',
    skin: '#F7D2B8',
    hair: '#3F2718',
    accent: '#38BDF8',
    glasses: false,
    hairStyle: 'bob',
  },
  scholar: {
    bg: '#EDE9FE',
    ring: '#4F46E5',
    shirt: '#312E81',
    skin: '#B57C58',
    hair: '#18181B',
    accent: '#818CF8',
    glasses: true,
    hairStyle: 'curly',
  },
};

export const PATIENT_AVATAR_OPTIONS: {
  id: PatientAvatarVariant;
  label: string;
}[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'active', label: 'Active' },
  { id: 'studio', label: 'Studio' },
  { id: 'scholar', label: 'Scholar' },
];

/**
 * Stylized vector human character avatar for the patient profile.
 */
export const PatientAvatar: React.FC<PatientAvatarProps> = ({
  variant,
  size = 88,
  className = '',
}) => {
  const p = PATIENT_PALETTES[variant] ?? PATIENT_PALETTES.classic;

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden shrink-0 select-none ${className}`}
      style={{ width: size, height: size, backgroundColor: p.bg }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Subtle geometric backdrop arc */}
        <circle cx="84" cy="18" r="24" fill={p.ring} fillOpacity="0.14" />
        <circle cx="16" cy="88" r="18" fill={p.ring} fillOpacity="0.1" />

        {/* Back hair for bob/curly */}
        {p.hairStyle === 'bob' && (
          <path
            d="M27 42C27 25 38 18 50 18C62 18 73 25 73 42V66H27V42Z"
            fill={p.hair}
          />
        )}
        {p.hairStyle === 'curly' && (
          <g fill={p.hair}>
            <circle cx="33" cy="36" r="11" />
            <circle cx="67" cy="36" r="11" />
            <circle cx="38" cy="24" r="10" />
            <circle cx="62" cy="24" r="10" />
            <circle cx="50" cy="20" r="11" />
          </g>
        )}

        {/* Shoulders & Shirt */}
        <path
          d="M18 100C20 80 33 72 50 72C67 72 80 80 82 100H18Z"
          fill={p.shirt}
        />
        {/* Shirt collar accent */}
        <path
          d="M41 73L50 84L59 73"
          stroke={p.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neck */}
        <rect x="44" y="61" width="12" height="14" rx="5" fill={p.skin} />

        {/* Head & Subtle Idle Tilt */}
        <motion.g
          animate={{ rotate: [0, 1.4, 0, -1.2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 58px' }}
        >
          {/* Ears */}
          <circle cx="31" cy="48" r="4.5" fill={p.skin} />
          <circle cx="69" cy="48" r="4.5" fill={p.skin} />

          {/* Face oval */}
          <rect x="32" y="26" width="36" height="41" rx="18" fill={p.skin} />

          {/* Top Hair */}
          {p.hairStyle === 'neat' && (
            <path
              d="M31 40C31 26 40 20 51 20C62 20 69 27 69 40C65 34 57 32 49 32C41 32 35 35 31 40Z"
              fill={p.hair}
            />
          )}
          {p.hairStyle === 'wavy' && (
            <path
              d="M30 41C30 25 40 18 52 19C64 20 71 28 70 41C64 33 56 30 47 33C40 35 34 36 30 41Z"
              fill={p.hair}
            />
          )}
          {p.hairStyle === 'bob' && (
            <path
              d="M31 38C33 25 41 21 50 21C60 21 68 27 69 38C63 32 55 31 46 33C39 34 35 36 31 38Z"
              fill={p.hair}
            />
          )}

          {/* Eyes (blinking) */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{
              duration: 5.2,
              times: [0, 0.9, 0.93, 0.96, 1],
              repeat: Infinity,
            }}
            style={{ transformOrigin: '50px 46px' }}
          >
            <circle cx="42.5" cy="46" r="2.3" fill="#0F172A" />
            <circle cx="57.5" cy="46" r="2.3" fill="#0F172A" />
          </motion.g>

          {/* Optional Glasses */}
          {p.glasses && (
            <g stroke="#1E293B" strokeWidth="1.8" fill="none">
              <rect x="36.5" y="41.5" width="11.5" height="9" rx="3.5" />
              <rect x="52" y="41.5" width="11.5" height="9" rx="3.5" />
              <line x1="48" y1="45.5" x2="52" y2="45.5" />
            </g>
          )}

          {/* Warm smile */}
          <path
            d="M44.5 55.5C47 58.2 53 58.2 55.5 55.5"
            stroke="#7C2D12"
            strokeOpacity="0.65"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};

interface RoleAvatarProps {
  variant: RoleAvatarVariant;
  size?: number;
  className?: string;
}

/**
 * Stylized vector character avatars for Care Team doctors, emergency contacts, and paramedics.
 */
export const RoleAvatar: React.FC<RoleAvatarProps> = ({
  variant,
  size = 52,
  className = '',
}) => {
  const isDoctor = variant === 'doctor-primary' || variant === 'doctor-specialist';
  const isParamedic = variant === 'paramedic';

  const config = {
    'emergency-partner': {
      bg: '#FFE4E6',
      coat: '#BE123C',
      skin: '#F3C6A5',
      hair: '#4A2C2A',
      accent: '#FB7185',
    },
    'emergency-friend': {
      bg: '#E0E7FF',
      coat: '#3730A3',
      skin: '#D69E76',
      hair: '#1E293B',
      accent: '#818CF8',
    },
    'doctor-primary': {
      bg: '#CCFBF1',
      coat: '#FFFFFF',
      skin: '#F5CBA7',
      hair: '#5C3A21',
      accent: '#0D9488',
    },
    'doctor-specialist': {
      bg: '#E0F2FE',
      coat: '#FFFFFF',
      skin: '#E6B48F',
      hair: '#334155',
      accent: '#0284C7',
    },
    paramedic: {
      bg: '#FEE2E2',
      coat: '#DC2626',
      skin: '#EBC09D',
      hair: '#1E293B',
      accent: '#FFFFFF',
    },
  }[variant];

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden shrink-0 select-none ${className}`}
      style={{ width: size, height: size, backgroundColor: config.bg }}
      whileHover={{ scale: 1.07, y: -1 }}
      transition={{ duration: 0.16 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Back hair for female/longer hair roles */}
        {(variant === 'emergency-partner' || variant === 'doctor-primary') && (
          <path
            d="M22 36C22 20 31 15 40 15C49 15 58 20 58 36V54H22V36Z"
            fill={config.hair}
          />
        )}

        {/* Torso / Coat */}
        <path
          d="M14 80C16 63 26 57 40 57C54 57 64 63 66 80H14Z"
          fill={config.coat}
          stroke={isDoctor ? '#CBD5E1' : 'none'}
          strokeWidth={isDoctor ? '1.5' : '0'}
        />

        {/* Doctor Scrub V-Neck & Stethoscope */}
        {isDoctor && (
          <>
            <path d="M32 58L40 70L48 58H32Z" fill={config.accent} />
            <path
              d="M29 58C29 66 33 72 40 72C47 72 51 66 51 58"
              stroke="#334155"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="51" cy="69" r="3" fill="#475569" />
          </>
        )}

        {/* Paramedic Cross Emblem */}
        {isParamedic && (
          <>
            <rect x="38.2" y="63" width="3.6" height="10" rx="1" fill="#FFFFFF" />
            <rect x="35" y="66.2" width="10" height="3.6" rx="1" fill="#FFFFFF" />
          </>
        )}

        {/* Neck */}
        <rect x="35" y="48" width="10" height="11" rx="4" fill={config.skin} />

        {/* Head */}
        <rect x="26" y="21" width="28" height="32" rx="14" fill={config.skin} />

        {/* Top hair */}
        <path
          d="M25 33C26 21 33 17 41 17C49 17 55 22 55 33C50 28 44 26 37 27C31 28 28 30 25 33Z"
          fill={config.hair}
        />

        {/* Eyes */}
        <circle cx="34.5" cy="37" r="1.9" fill="#0F172A" />
        <circle cx="45.5" cy="37" r="1.9" fill="#0F172A" />

        {/* Specialist glasses */}
        {variant === 'doctor-specialist' && (
          <g stroke="#1E293B" strokeWidth="1.4">
            <rect x="30" y="33.5" width="8.5" height="6.8" rx="2.5" />
            <rect x="41.5" y="33.5" width="8.5" height="6.8" rx="2.5" />
            <line x1="38.5" y1="36.8" x2="41.5" y2="36.8" />
          </g>
        )}

        {/* Smile */}
        <path
          d="M36 44.5C38 46.5 42 46.5 44 44.5"
          stroke="#7C2D12"
          strokeOpacity="0.6"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};
