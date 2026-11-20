import React from 'react';
import { motion } from 'motion/react';

interface VitalWaveformProps {
  heartRateBpm: number;
  className?: string;
}

/**
 * Functional vital-sign ECG waveform visualization whose sweep tempo
 * dynamically reflects the profile's configured resting heart rate (BPM).
 */
export const VitalWaveform: React.FC<VitalWaveformProps> = ({
  heartRateBpm,
  className = '',
}) => {
  const safeBpm = Math.min(180, Math.max(40, heartRateBpm || 68));
  // Duration for two full beats across the SVG viewport
  const sweepDuration = (60 / safeBpm) * 2.2;

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 260 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-11"
        preserveAspectRatio="none"
      >
        {/* Subtle clinical reference baseline */}
        <line
          x1="0"
          y1="30"
          x2="260"
          y2="30"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Static ghost trace */}
        <path
          d="M0 30 L34 30 L42 26 L48 30 L58 30 L64 36 L71 8 L78 44 L84 30 L96 30 L104 23 L113 30 L156 30 L164 26 L170 30 L180 30 L186 36 L193 8 L200 44 L206 30 L218 30 L226 23 L235 30 L260 30"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated live pulse trace */}
        <motion.path
          d="M0 30 L34 30 L42 26 L48 30 L58 30 L64 36 L71 8 L78 44 L84 30 L96 30 L104 23 L113 30 L156 30 L164 26 L170 30 L180 30 L186 36 L193 8 L200 44 L206 30 L218 30 L226 23 L235 30 L260 30"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.2, pathOffset: 0, opacity: 0.9 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{
            duration: sweepDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  );
};
