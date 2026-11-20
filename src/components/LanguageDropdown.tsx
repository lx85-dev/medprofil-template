import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n/translations';

interface FlagIconProps {
  code: LanguageCode;
  className?: string;
}

/**
 * Crisp inline vector flags so flags render cleanly across Windows, macOS, Linux, and mobile.
 */
export const FlagIcon: React.FC<FlagIconProps> = ({ code, className = 'w-5 h-3.5' }) => {
  const baseClass = `${className} rounded-[3px] overflow-hidden shrink-0 ring-1 ring-black/10 dark:ring-white/15`;

  switch (code) {
    case 'en':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="3.2" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.6" />
          <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="5.2" />
          <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="24" height="5.34" y="0" fill="#111827" />
          <rect width="24" height="5.34" y="5.33" fill="#DC2626" />
          <rect width="24" height="5.34" y="10.66" fill="#FACC15" />
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="24" height="16" fill="#AA151B" />
          <rect width="24" height="8" y="4" fill="#F1BF00" />
          <rect width="2.4" height="3.2" x="5.2" y="6.4" rx="0.6" fill="#AA151B" />
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="8" height="16" x="0" fill="#1D4ED8" />
          <rect width="8" height="16" x="8" fill="#FFFFFF" />
          <rect width="8" height="16" x="16" fill="#DC2626" />
        </svg>
      );
    case 'it':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="8" height="16" x="0" fill="#15803D" />
          <rect width="8" height="16" x="8" fill="#FFFFFF" />
          <rect width="8" height="16" x="16" fill="#DC2626" />
        </svg>
      );
    case 'tr':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="24" height="16" fill="#E30A17" />
          <circle cx="9.8" cy="8" r="4" fill="#FFFFFF" />
          <circle cx="10.9" cy="8" r="3.2" fill="#E30A17" />
          <polygon
            points="15.2,6.2 15.8,7.7 17.4,7.7 16.1,8.6 16.6,10.1 15.2,9.2 13.9,10.1 14.4,8.6 13.1,7.7 14.7,7.7"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'ja':
      return (
        <svg viewBox="0 0 24 16" className={baseClass} aria-hidden="true">
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="4.4" fill="#BC002D" />
        </svg>
      );
  }
};

interface LanguageDropdownProps {
  value: LanguageCode;
  onChange: (code: LanguageCode, nativeName: string) => void;
  ariaLabel: string;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  value,
  onChange,
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current =
    SUPPORTED_LANGUAGES.find((l) => l.code === value) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <FlagIcon code={current.code} />
        <span className="font-mono tracking-tight">{current.shortCode}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            aria-label={ariaLabel}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg py-1.5 z-50"
          >
            {SUPPORTED_LANGUAGES.map((lang) => {
              const selected = lang.code === value;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(lang.code, lang.nativeName);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                    selected
                      ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <FlagIcon code={lang.code} />
                    <span className="truncate">{lang.nativeName}</span>
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                      {lang.shortCode}
                    </span>
                    {selected && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
