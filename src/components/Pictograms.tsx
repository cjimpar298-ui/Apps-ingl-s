import React from 'react';

export interface PictogramProps {
  className?: string;
  size?: number | string;
}

const defaultProps = {
  width: 64,
  height: 64,
  viewBox: "0 0 64 64",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

export const Pictograms: Record<string, React.FC<PictogramProps>> = {
  // 1. ROUTINES & CLASSROOM
  Sun: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M32 6V12M32 52V58M6 32H12M52 32H58M13.6 13.6L17.8 17.8M46.2 46.2L50.4 50.4M13.6 50.4L17.8 46.2M46.2 17.8L50.4 13.6" 
        stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="16" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <circle cx="26" cy="30" r="2.5" fill="#1e293b" />
      <circle cx="38" cy="30" r="2.5" fill="#1e293b" />
      <path d="M26 36C27.8 39.5 36.2 39.5 38 36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="34" r="2" fill="#f43f5e" opacity="0.6" />
      <circle cx="42" cy="34" r="2" fill="#f43f5e" opacity="0.6" />
    </svg>
  ),

  Clock: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M12 18L20 12M52 18L44 12" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="15" cy="14" r="4" fill="#f43f5e" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="49" cy="14" r="4" fill="#f43f5e" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="32" cy="36" r="20" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <circle cx="32" cy="36" r="15" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <path d="M32 25V36L40 40" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="36" r="2.5" fill="#f43f5e" />
      <path d="M20 54L16 60M44 54L48 60" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  Explanation: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M20 56L24 44M44 56L40 44M32 44V58" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <rect x="8" y="10" width="48" height="34" rx="4" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="12" y="14" width="40" height="26" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <path d="M18 24L26 30L34 22L44 32" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="24" r="2.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="26" cy="30" r="2.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="34" cy="22" r="2.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="44" cy="32" r="2.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  Instructions: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="12" y="12" width="40" height="46" rx="4" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <rect x="22" y="6" width="20" height="10" rx="3" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <circle cx="32" cy="11" r="2" fill="#ffffff" />
      <rect x="18" y="22" width="6" height="6" rx="1.5" fill="#34d399" stroke="#1e293b" strokeWidth="2" />
      <path d="M28 25H44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <rect x="18" y="33" width="6" height="6" rx="1.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" />
      <path d="M28 36H44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <rect x="18" y="44" width="6" height="6" rx="1.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
      <path d="M28 47H38" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  // 2. SPEAKING & ORAL
  Mic: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="24" y="8" width="16" height="28" rx="8" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <line x1="24" y1="20" x2="40" y2="20" stroke="#1e293b" strokeWidth="2" />
      <line x1="24" y1="26" x2="40" y2="26" stroke="#1e293b" strokeWidth="2" />
      <path d="M16 24C16 33 23 39 32 39C41 39 48 33 48 24" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 39V52M20 56H44" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M10 20C8 24 8 28 10 32M54 20C56 24 56 28 54 32" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  OralQuestion: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M10 28C10 16.95 19.85 8 32 8C44.15 8 54 16.95 54 28C54 39.05 44.15 48 32 48C28 48 24.5 47 21 45.2L10 52L13 41.5C11.1 37.7 10 33 10 28Z" 
        fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 22C26 18.5 28.5 16 32 16C35.5 16 38 18.5 38 21.5C38 25 34.5 27 32 29.5V34" 
        stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="40" r="2.5" fill="#1e293b" />
    </svg>
  ),

  Speaking: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Student Head Profile Speaking */}
      {/* Neck & Shoulder */}
      <path d="M12 56C12 46 16 42 24 42H28V56" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      {/* Head & Hair */}
      <path d="M10 26C10 16 16 10 26 10C34 10 38 15 38 22V28C38 34 32 38 24 38C16 38 10 34 10 26Z" 
        fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <path d="M10 22C10 14 16 8 28 8C34 8 38 12 36 18C30 14 20 16 16 22" 
        fill="#b45309" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Eye & Open Smiling Mouth */}
      <circle cx="28" cy="22" r="2.5" fill="#1e293b" />
      <path d="M26 30C29 30 33 28 35 31C33 34 29 35 26 33Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      {/* Speech Bubble coming out of mouth */}
      <path d="M38 16C38 11.5 43 8 50 8C57 8 62 11.5 62 16C62 20.5 57 24 50 24C47.5 24 45.5 23.5 44 22.5L38 25L40 20C38.8 19 38 17.5 38 16Z" 
        fill="#4ade80" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="50" y="18.5" fill="#065f46" fontWeight="900" fontSize="8" fontFamily="sans-serif" textAnchor="middle">HI!</text>
      {/* Expanding Vocal Sound Waves */}
      <path d="M42 32C45 34 47 37 47 41C47 45 45 48 42 50" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M48 28C53 32 56 36 56 41C56 46 53 50 48 54" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M54 24C60 29 63 35 63 41C63 47 60 53 54 58" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  ),

  PairSpeaking: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M8 22C8 14 15 8 24 8C33 8 40 14 40 22C40 30 33 36 24 36C21 36 18.5 35.2 16 34L8 38L10 30.5C8.8 28 8 25 8 22Z" 
        fill="#2dd4bf" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="18" cy="22" r="2" fill="#1e293b" />
      <circle cx="24" cy="22" r="2" fill="#1e293b" />
      <circle cx="30" cy="22" r="2" fill="#1e293b" />
      <path d="M30 38C30 32 36 27 43 27C50 27 56 32 56 38C56 44 50 49 43 49C40.5 49 38.5 48.3 36.5 47.3L30 51L31.5 44.8C30.5 42.8 30 40.5 30 38Z" 
        fill="#f43f5e" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="38" cy="38" r="1.8" fill="#ffffff" />
      <circle cx="43" cy="38" r="1.8" fill="#ffffff" />
      <circle cx="48" cy="38" r="1.8" fill="#ffffff" />
    </svg>
  ),

  GroupSpeaking: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="18" cy="34" r="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M8 54C8 46 12 43 18 43C24 43 28 46 28 54" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="46" cy="34" r="8" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M36 54C36 46 40 43 46 43C52 43 56 46 56 54" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="32" cy="28" r="9" fill="#c084fc" stroke="#1e293b" strokeWidth="3" />
      <path d="M20 54C20 44 25 41 32 41C39 41 44 44 44 54" fill="#c084fc" stroke="#1e293b" strokeWidth="3" />
      <path d="M24 10C24 6 27.5 4 32 4C36.5 4 40 6 40 10C40 14 36.5 16 32 16L28 18L29 15C26 14 24 12 24 10Z" 
        fill="#34d399" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),

  Presentation: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="6" y="8" width="52" height="32" rx="4" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="10" y="12" width="44" height="24" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <path d="M16 28L24 20L32 25L42 16" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 40H38V56H26V40Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="32" cy="46" r="3" fill="#34d399" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M20 56H44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  Megaphone: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M10 24V40L18 36L44 48V16L18 28L10 24Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="44" cy="32" rx="4" ry="16" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <path d="M22 36V48C22 51 26 51 26 48V34" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M52 24C56 28 56 36 52 40M57 18C62 26 62 38 57 46" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  // 3. READING & VOCABULARY
  Reading: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M32 46C24 40 14 42 6 46V18C14 14 24 16 32 22C40 16 50 14 58 18V46C50 42 40 40 32 46Z" 
        fill="#38bdf8" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 46V22" stroke="#1e293b" strokeWidth="3" />
      <path d="M12 24C18 22 24 23 28 26M12 32C18 30 24 31 28 34M36 26C40 23 46 22 52 24M36 34C40 31 46 30 52 32" 
        stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 14V30L36 26L40 30V14" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
    </svg>
  ),

  VocabPres: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="8" y="14" width="40" height="42" rx="4" fill="#c084fc" stroke="#1e293b" strokeWidth="3" />
      <rect x="12" y="18" width="32" height="24" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="28" cy="30" r="7" fill="#f43f5e" />
      <path d="M28 23C28 21 30 19 32 19" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="48" x2="36" y2="48" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 50L56 22" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 26L56 22L54 28" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
      <path d="M50 8L52 14L58 16L52 18L50 24L48 18L42 16L48 14L50 8Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
    </svg>
  ),

  StructuresPres: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="8" y="16" width="22" height="20" rx="3" fill="#2dd4bf" stroke="#1e293b" strokeWidth="3" />
      <text x="14" y="30" fill="#1e293b" fontWeight="900" fontSize="11" fontFamily="sans-serif">He</text>
      <path d="M31 26H35M33 24V28" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <rect x="36" y="16" width="22" height="20" rx="3" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <text x="40" y="30" fill="#1e293b" fontWeight="900" fontSize="11" fontFamily="sans-serif">likes</text>
      <rect x="18" y="38" width="30" height="18" rx="3" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <text x="24" y="51" fill="#ffffff" fontWeight="900" fontSize="11" fontFamily="sans-serif">apples.</text>
    </svg>
  ),

  Flashcards: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="18" y="6" width="38" height="46" rx="4" transform="rotate(10 37 29)" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <rect x="10" y="14" width="38" height="46" rx="4" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="14" y="18" width="30" height="26" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <path d="M29 23L31 27L36 28L32 32L33 37L29 34L25 37L26 32L22 28L27 27L29 23Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="18" y1="50" x2="40" y2="50" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),

  // 4. WRITING & NOTEBOOK
  Worksheet: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M12 10C12 7.79 13.79 6 16 6H40L52 18V54C52 56.21 50.21 58 48 58H16C13.79 58 12 56.21 12 54V10Z" 
        fill="#ffffff" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 6V18H52" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <rect x="18" y="16" width="18" height="5" rx="1.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="18" y="27" width="5" height="5" rx="1" fill="#34d399" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="27" y1="29.5" x2="44" y2="29.5" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="37" width="5" height="5" rx="1" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="27" y1="39.5" x2="44" y2="39.5" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="47" width="5" height="5" rx="1" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="27" y1="49.5" x2="40" y2="49.5" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  WorksheetCorrection: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="10" y="8" width="40" height="48" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
      <line x1="18" y1="18" x2="38" y2="18" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="28" x2="38" y2="28" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="38" x2="38" y2="38" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="44" cy="42" r="14" fill="#34d399" stroke="#1e293b" strokeWidth="3" />
      <path d="M37 42L42 47L51 37" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 8L44 20" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  NotebookCopy: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="16" y="8" width="38" height="48" rx="4" fill="#818cf8" stroke="#1e293b" strokeWidth="3" />
      <circle cx="16" cy="16" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="16" cy="26" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="16" cy="36" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="16" cy="46" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <rect x="23" y="14" width="25" height="36" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <line x1="27" y1="22" x2="44" y2="22" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="28" x2="44" y2="28" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="34" x2="44" y2="34" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="40" x2="40" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 56L54 28L48 24L36 52L42 56Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M54 28L58 22L52 18L48 24" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M36 52L33 60L42 56" fill="#fed7aa" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="33,60 36,58 35,56" fill="#1e293b" />
    </svg>
  ),

  VocabCopy: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="12" y="8" width="40" height="48" rx="4" fill="#c084fc" stroke="#1e293b" strokeWidth="3" />
      <rect x="18" y="14" width="28" height="36" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <text x="22" y="27" fill="#f43f5e" fontWeight="900" fontSize="12" fontFamily="sans-serif">A</text>
      <text x="30" y="27" fill="#38bdf8" fontWeight="900" fontSize="12" fontFamily="sans-serif">B</text>
      <text x="38" y="27" fill="#34d399" fontWeight="900" fontSize="12" fontFamily="sans-serif">C</text>
      <line x1="22" y1="34" x2="42" y2="34" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="41" x2="38" y2="41" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 52L56 22L50 18L38 48L42 52Z" fill="#34d399" stroke="#1e293b" strokeWidth="2" />
    </svg>
  ),

  StructuresCopy: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="10" y="8" width="44" height="48" rx="4" fill="#2dd4bf" stroke="#1e293b" strokeWidth="3" />
      <rect x="16" y="14" width="32" height="36" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <rect x="20" y="20" width="10" height="8" rx="1.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="32" y="20" width="12" height="8" rx="1.5" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="20" y1="34" x2="44" y2="34" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="41" x2="40" y2="41" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  Pencil: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M18 52L50 20L44 14L12 46L18 52Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 20L56 14L50 8L44 14" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <line x1="48" y1="18" x2="46" y2="12" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M12 46L6 58L18 52" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="6,58 10,55 9,53" fill="#1e293b" />
    </svg>
  ),

  // 5. LISTENING & AUDIO
  Listening: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M14 36C14 22 22 12 32 12C42 12 50 22 50 36" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="8" y="32" width="12" height="20" rx="6" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="44" y="32" width="12" height="20" rx="6" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M26 38V46M32 34V50M38 38V46" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),

  Song: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="20" cy="46" r="8" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <circle cx="44" cy="38" r="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M28 46V18L52 10V38" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 18L52 10" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <circle cx="36" cy="28" r="2.5" fill="#fbbf24" />
      <circle cx="16" cy="18" r="2" fill="#34d399" />
    </svg>
  ),

  Radio: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="8" y="20" width="48" height="34" rx="6" fill="#818cf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M16 20L36 8" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="37" r="10" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="24" cy="37" r="4" fill="#f43f5e" />
      <rect x="40" y="28" width="10" height="5" rx="1.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="40" y="38" width="10" height="5" rx="1.5" fill="#34d399" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  // 6. DIGITAL & INTERACTIVE
  GeniallyVocab: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="8" y="8" width="48" height="36" rx="4" fill="#c084fc" stroke="#1e293b" strokeWidth="3" />
      <rect x="12" y="12" width="40" height="28" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="24" cy="24" r="6" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
      <path d="M36 20L44 26L36 32Z" fill="#34d399" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M26 44H38V54H26V44Z" fill="#818cf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M20 54H44" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),

  GeniallyStruct: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="14" y="10" width="36" height="28" rx="3" fill="#818cf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="18" y="14" width="28" height="20" rx="1.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <rect x="22" y="18" width="8" height="5" rx="1" fill="#f43f5e" />
      <rect x="32" y="18" width="10" height="5" rx="1" fill="#38bdf8" />
      <rect x="22" y="25" width="20" height="5" rx="1" fill="#34d399" />
      <path d="M6 42H58L54 48H10L6 42Z" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <line x1="28" y1="45" x2="36" y2="45" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  YouTubeVideo: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="6" y="12" width="52" height="38" rx="10" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <path d="M26 22L44 31L26 40V22Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="2" fill="#ffffff" />
      <circle cx="48" cy="18" r="2" fill="#ffffff" />
    </svg>
  ),

  WordwallGame: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M12 24C12 18 18 14 32 14C46 14 52 18 52 24C52 38 46 50 38 50C34 50 32 44 32 44C32 44 30 50 26 50C18 50 12 38 12 24Z" 
        fill="#818cf8" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 24V32M18 28H26" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="24" r="3" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="44" cy="30" r="3" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="36" cy="30" r="3" fill="#34d399" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  GoogleForm: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="12" y="10" width="40" height="48" rx="4" fill="#a855f7" stroke="#1e293b" strokeWidth="3" />
      <rect x="16" y="16" width="32" height="38" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <rect x="24" y="6" width="16" height="8" rx="2" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="22" cy="24" r="3" fill="#a855f7" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="28" y1="24" x2="42" y2="24" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="34" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="28" y1="34" x2="42" y2="34" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="44" r="3" fill="#a855f7" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="28" y1="44" x2="38" y2="44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  Quizlet: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="12" y="10" width="40" height="44" rx="6" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="16" y="14" width="32" height="36" rx="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <path d="M35 18L24 33H33L29 46L42 29H33L35 18Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),

  CanvaProject: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C36.4 56 40 52.4 40 48C40 46 39.2 44.2 37.8 42.8C36.4 41.4 35.6 39.6 35.6 37.6C35.6 33.2 39.2 29.6 43.6 29.6H48C52.4 29.6 56 26 56 21.6C56 14.1 45.3 8 32 8Z" 
        fill="#fed7aa" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="20" cy="24" r="4.5" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="32" cy="18" r="4.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="44" cy="22" r="4.5" fill="#34d399" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="22" cy="38" r="4.5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M42 42L56 56" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 40L46 46" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  Laptop: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="12" y="12" width="40" height="28" rx="3" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="16" y="16" width="32" height="20" rx="1.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="32" cy="26" r="4" fill="#fbbf24" />
      <path d="M6 42H58L54 50H10L6 42Z" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <line x1="28" y1="46" x2="36" y2="46" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  Tablet: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="12" y="8" width="40" height="48" rx="6" fill="#818cf8" stroke="#1e293b" strokeWidth="3" />
      <rect x="16" y="14" width="32" height="36" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="32" cy="52.5" r="1.5" fill="#ffffff" />
      <rect x="20" y="20" width="10" height="10" rx="2" fill="#fbbf24" />
      <rect x="34" y="20" width="10" height="10" rx="2" fill="#f43f5e" />
      <rect x="20" y="34" width="10" height="10" rx="2" fill="#34d399" />
      <rect x="34" y="34" width="10" height="10" rx="2" fill="#38bdf8" />
    </svg>
  ),

  Bot: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="14" y="16" width="36" height="32" rx="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M32 8V16" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="8" r="3" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="40" cy="28" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx="24" cy="28" r="1.5" fill="#1e293b" />
      <circle cx="40" cy="28" r="1.5" fill="#1e293b" />
      <rect x="24" y="38" width="16" height="4" rx="2" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M8 28H14M50 28H56" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  Globe: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="32" cy="32" r="22" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M12 24C16 26 22 22 26 26C30 30 26 36 32 38C38 40 44 32 50 34" fill="#34d399" stroke="#1e293b" strokeWidth="2" />
      <path d="M16 42C20 44 26 42 30 48C34 54 28 54 28 54" fill="#34d399" stroke="#1e293b" strokeWidth="2" />
      <path d="M32 10C32 10 42 16 44 22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // 7. GAMES & CHALLENGES
  Challenge: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M32 6C32 6 38 16 38 22C38 26 36 28 34 30C38 30 46 26 46 36C46 47 38 56 30 56C18 56 12 46 12 36C12 24 22 14 32 6Z" 
        fill="#f43f5e" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 24C30 24 34 30 34 34C34 36 32 38 31 39C34 39 38 36 38 42C38 48 34 52 29 52C22 52 18 46 18 40C18 32 24 28 30 24Z" 
        fill="#fbbf24" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),

  FinalTask: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M18 12H46V28C46 36 39.7 42 32 42C24.3 42 18 36 18 28V12Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M18 16H10C7.8 16 6 17.8 6 20V24C6 28.4 9.6 32 14 32H18" stroke="#1e293b" strokeWidth="3" fill="none" />
      <path d="M46 16H54C56.2 16 58 17.8 58 20V24C58 28.4 54.4 32 50 32H46" stroke="#1e293b" strokeWidth="3" fill="none" />
      <polygon points="32,20 34,25 39,25 35,28 37,33 32,30 27,33 29,28 25,25 30,25" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M32 42V50M22 50H42V58H22V50Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),

  Project: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="10" y="20" width="44" height="34" rx="4" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M10 28H54" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M22 10L42 30" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 10L22 30" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="42" r="5" fill="#34d399" stroke="#1e293b" strokeWidth="2" />
    </svg>
  ),

  Game: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <rect x="8" y="16" width="30" height="30" rx="6" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <circle cx="16" cy="24" r="3" fill="#ffffff" />
      <circle cx="23" cy="31" r="3" fill="#ffffff" />
      <circle cx="30" cy="38" r="3" fill="#ffffff" />
      <rect x="28" y="8" width="28" height="28" rx="6" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <circle cx="36" cy="16" r="2.5" fill="#1e293b" />
      <circle cx="48" cy="28" r="2.5" fill="#1e293b" />
    </svg>
  ),

  Review: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="32" cy="32" r="22" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <circle cx="32" cy="32" r="15" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" />
      <circle cx="32" cy="32" r="3" fill="#fbbf24" />
      <circle cx="48" cy="18" r="8" fill="#34d399" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M44 18L47 21L52 15" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  ExitTicket: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M10 18C10 18 10 26 16 26C22 26 22 18 22 18H54V46H22C22 46 22 38 16 38C10 38 10 46 10 46V18Z" 
        fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <line x1="28" y1="18" x2="28" y2="46" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="42,26 44,30 49,30 45,33 47,38 42,35 37,38 39,33 35,30 40,30" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  Trophy: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M18 14H46V28C46 36 40 42 32 42C24 42 18 36 18 28V14Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <path d="M18 18H10C8 18 6 20 6 22V26C6 30 10 34 14 34H18" stroke="#1e293b" strokeWidth="3" fill="none" />
      <path d="M46 18H54C56 18 58 20 58 22V26C58 30 54 34 50 34H46" stroke="#1e293b" strokeWidth="3" fill="none" />
      <path d="M32 42V50M22 50H42V56H22V50Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
    </svg>
  ),

  Award: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="32" cy="26" r="16" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <polygon points="32,18 34,22 38,22 35,25 36,29 32,27 28,29 29,25 26,22 30,22" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
      <path d="M24 38L20 54L30 48L32 50L34 48L44 54L40 38" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),

  Sparkles: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M32 6L36 22L52 26L36 30L32 46L28 30L12 26L28 22L32 6Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 40L50 46L56 48L50 50L48 56L46 50L40 48L46 46L48 40Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="46" r="3" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  GraduationCap: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polygon points="32,10 60,22 32,34 4,22" fill="#818cf8" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M16 28V42C16 46 23 50 32 50C41 50 48 46 48 42V28" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <path d="M52 26V44L56 46" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <circle cx="56" cy="48" r="3" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  Crown: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M8 48L12 20L24 32L32 14L40 32L52 20L56 48H8Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="12" cy="18" r="3" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="32" cy="12" r="3.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="52" cy="18" r="3" fill="#34d399" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="12" y1="42" x2="52" y2="42" stroke="#1e293b" strokeWidth="2.5" />
    </svg>
  ),

  Scissors: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="18" cy="46" r="8" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <circle cx="46" cy="46" r="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <circle cx="18" cy="46" r="4" fill="#ffffff" />
      <circle cx="46" cy="46" r="4" fill="#ffffff" />
      <path d="M24 40L48 10" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 40L16 10" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
      <circle cx="32" cy="30" r="3" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
    </svg>
  ),

  Brush: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M44 8L56 20L34 42L22 30L44 8Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 30L34 42L28 48L16 36L22 30Z" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3" />
      <path d="M16 36L28 48C28 48 24 58 14 58C14 48 16 36 16 36Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),

  Brain: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <path d="M24 16C18 16 14 20 14 26C10 28 8 33 8 38C8 44 13 49 19 49C21 51 25 53 30 53H34C39 53 43 51 45 49C51 49 56 44 56 38C56 33 54 28 50 26C50 20 46 16 40 16C37 12 27 12 24 16Z" 
        fill="#f472b6" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 16V50M22 28C26 30 26 36 22 40M42 28C38 30 38 36 42 40" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  PartyPopper: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <polygon points="12,52 38,42 22,16" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M17 34L30 29" stroke="#f43f5e" strokeWidth="3" />
      <path d="M14 43L34 35" stroke="#38bdf8" strokeWidth="3" />
      <circle cx="44" cy="18" r="3" fill="#f43f5e" />
      <circle cx="52" cy="30" r="3" fill="#34d399" />
      <circle cx="38" cy="10" r="2.5" fill="#38bdf8" />
      <rect x="48" y="10" width="4" height="4" rx="1" fill="#c084fc" transform="rotate(25 50 12)" />
    </svg>
  ),

  Shapes: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      <circle cx="20" cy="22" r="10" fill="#f43f5e" stroke="#1e293b" strokeWidth="3" />
      <rect x="34" y="12" width="20" height="20" rx="3" fill="#38bdf8" stroke="#1e293b" strokeWidth="3" />
      <polygon points="32,36 50,56 14,56" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),

  // 8. NEW EDUCATIONAL ACTIVITIES & METHODOLOGIES
  Brainstorming: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Lightbulb & Cloud ideas */}
      <path d="M12 28C8 28 6 23 9 19C7 14 13 9 18 11C21 7 28 7 31 11C36 8 42 12 40 17C44 20 42 26 38 28" 
        fill="#bae6fd" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 28C22 20 42 20 42 28C42 33 37 36 37 42H27C27 36 22 33 22 28Z" 
        fill="#fde047" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <rect x="28" y="42" width="8" height="4" rx="1.5" fill="#94a3b8" stroke="#1e293b" strokeWidth="2" />
      <path d="M29 46H35L33 50H31L29 46Z" fill="#64748b" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      {/* Lightning & Idea Sparks */}
      <path d="M14 38L10 46H18L14 54" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M50 14L53 20L59 21L54 25L56 31L50 28L45 31L47 25L42 21L48 20L50 14Z" 
        fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="48" cy="42" r="3" fill="#f43f5e" />
      <circle cx="54" cy="38" r="2" fill="#38bdf8" />
    </svg>
  ),

  PlickersQuiz: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Plickers QR / Response Card with A B C D */}
      <rect x="10" y="8" width="44" height="48" rx="8" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
      {/* Center QR block matrix */}
      <rect x="18" y="16" width="28" height="28" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <rect x="22" y="20" width="8" height="8" rx="2" fill="#ffffff" />
      <rect x="24" y="22" width="4" height="4" fill="#0f172a" />
      <rect x="34" y="20" width="8" height="8" rx="2" fill="#ffffff" />
      <rect x="36" y="22" width="4" height="4" fill="#0f172a" />
      <rect x="22" y="32" width="8" height="8" rx="2" fill="#ffffff" />
      <rect x="24" y="34" width="4" height="4" fill="#0f172a" />
      <rect x="34" y="32" width="4" height="4" fill="#ffffff" />
      <rect x="38" y="36" width="4" height="4" fill="#ffffff" />
      {/* Edge Letters A, B, C, D */}
      <text x="30" y="14" fill="#f43f5e" fontWeight="900" fontSize="8" fontFamily="sans-serif" textAnchor="middle">A</text>
      <text x="50" y="33" fill="#3b82f6" fontWeight="900" fontSize="8" fontFamily="sans-serif" textAnchor="middle">B</text>
      <text x="30" y="52" fill="#10b981" fontWeight="900" fontSize="8" fontFamily="sans-serif" textAnchor="middle">C</text>
      <text x="14" y="33" fill="#f59e0b" fontWeight="900" fontSize="8" fontFamily="sans-serif" textAnchor="middle">D</text>
      {/* Scan beam */}
      <path d="M6 30H58" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 2" />
      <circle cx="52" cy="12" r="3" fill="#f43f5e" />
    </svg>
  ),

  LearningStations: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Station 1 (Top) */}
      <circle cx="32" cy="16" r="10" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <text x="32" y="20" fill="#ffffff" fontWeight="900" fontSize="11" fontFamily="sans-serif" textAnchor="middle">1</text>
      {/* Station 2 (Bottom Right) */}
      <circle cx="48" cy="44" r="10" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" />
      <text x="48" y="48" fill="#1e293b" fontWeight="900" fontSize="11" fontFamily="sans-serif" textAnchor="middle">2</text>
      {/* Station 3 (Bottom Left) */}
      <circle cx="16" cy="44" r="10" fill="#34d399" stroke="#1e293b" strokeWidth="2.5" />
      <text x="16" y="48" fill="#ffffff" fontWeight="900" fontSize="11" fontFamily="sans-serif" textAnchor="middle">3</text>
      {/* Rotating cycle arrows between stations */}
      <path d="M42 20C47 24 50 30 50 34" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" fill="none" />
      <polygon points="52,34 50,39 46,35" fill="#f43f5e" />
      <path d="M42 50C36 53 28 53 22 50" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <polygon points="22,52 17,49 22,46" fill="#8b5cf6" />
      <path d="M14 34C14 30 17 24 22 20" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" />
      <polygon points="22,17 26,21 21,24" fill="#f59e0b" />
    </svg>
  ),

  EscapeRoom: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Padlock Body */}
      <rect x="14" y="24" width="36" height="32" rx="8" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      {/* Shackle */}
      <path d="M22 24V16C22 10.5 26.5 6 32 6C37.5 6 42 10.5 42 16V24" 
        stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Keyhole */}
      <circle cx="32" cy="36" r="4" fill="#1e293b" />
      <polygon points="30,38 34,38 35,46 29,46" fill="#1e293b" />
      {/* Golden Clue Key */}
      <path d="M42 12L56 12M52 12V16M56 12V16" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="12" r="3" fill="#f43f5e" />
      <circle cx="48" cy="46" r="2" fill="#38bdf8" />
    </svg>
  ),

  RolePlay: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Theater Comedy Mask (Left) */}
      <path d="M8 20C8 12 18 10 26 10C34 10 38 16 36 26C34 36 28 44 20 44C12 44 8 32 8 20Z" 
        fill="#fed7aa" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="16" cy="22" r="2" fill="#1e293b" />
      <circle cx="26" cy="22" r="2" fill="#1e293b" />
      <path d="M16 30C18 34 24 34 26 30" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Drama / Role Mask (Right) */}
      <path d="M30 26C30 18 38 14 46 14C54 14 58 20 56 30C54 40 48 52 40 52C32 52 30 40 30 26Z" 
        fill="#c084fc" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="38" cy="28" r="2" fill="#ffffff" />
      <circle cx="48" cy="28" r="2" fill="#ffffff" />
      <path d="M38 38C40 35 46 35 48 38" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      {/* Spotlight stars */}
      <polygon points="54,8 55,12 59,12 56,15 57,19 54,16 51,19 52,15 49,12 53,12" fill="#fbbf24" stroke="#1e293b" strokeWidth="1" />
    </svg>
  ),

  KahootQuiz: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Main console screen */}
      <rect x="8" y="10" width="48" height="44" rx="8" fill="#818cf8" stroke="#1e293b" strokeWidth="3" />
      {/* 4 Multi-colored quiz answer buttons */}
      {/* Red Triangle Button */}
      <rect x="12" y="15" width="19" height="16" rx="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
      <polygon points="21.5,19 26,26 17,26" fill="#ffffff" />
      {/* Blue Diamond Button */}
      <rect x="33" y="15" width="19" height="16" rx="4" fill="#3b82f6" stroke="#1e293b" strokeWidth="2" />
      <polygon points="42.5,18 47.5,23 42.5,28 37.5,23" fill="#ffffff" />
      {/* Yellow Circle Button */}
      <rect x="12" y="33" width="19" height="16" rx="4" fill="#eab308" stroke="#1e293b" strokeWidth="2" />
      <circle cx="21.5" cy="41" r="4.5" fill="#ffffff" />
      {/* Green Square Button */}
      <rect x="33" y="33" width="19" height="16" rx="4" fill="#22c55e" stroke="#1e293b" strokeWidth="2" />
      <rect x="38.5" y="37" width="8" height="8" rx="1" fill="#ffffff" />
    </svg>
  ),

  MindMap: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Connection branches */}
      <path d="M32 32L16 18M32 32L48 18M32 32L14 44M32 32L50 44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      {/* Center Core Node */}
      <circle cx="32" cy="32" r="11" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      <circle cx="32" cy="32" r="6" fill="#f43f5e" />
      {/* Outer branch nodes */}
      <circle cx="16" cy="18" r="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="48" cy="18" r="8" fill="#a855f7" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="14" cy="44" r="8" fill="#34d399" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="50" cy="44" r="8" fill="#f97316" stroke="#1e293b" strokeWidth="2.5" />
    </svg>
  ),

  PeerAssessment: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Student 1 (Left) */}
      <circle cx="20" cy="22" r="9" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M10 46C10 38 14 34 20 34C26 34 30 38 30 46" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      {/* Student 2 (Right) */}
      <circle cx="44" cy="22" r="9" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M34 46C34 38 38 34 44 34C50 34 54 38 54 46" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
      {/* Review Star & Check bubble in center */}
      <rect x="22" y="40" width="20" height="18" rx="5" fill="#34d399" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M27 49L30 52L37 45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Feedback star above */}
      <polygon points="32,6 34,10 38,10 35,13 36,17 32,14 28,17 29,13 26,10 30,10" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  ),

  SpeedDating: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Pair conversation facing each other */}
      <circle cx="16" cy="24" r="8" fill="#f472b6" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M8 48C8 40 12 36 16 36C20 36 24 40 24 48" fill="#f472b6" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx="48" cy="24" r="8" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M40 48C40 40 44 36 48 36C52 36 56 40 56 48" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      {/* Center Clock / Timer */}
      <circle cx="32" cy="32" r="10" fill="#fbbf24" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M32 26V32L36 34" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Rapid Rotation speech arrows */}
      <path d="M22 14C26 10 38 10 42 14" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
      <polygon points="42,11 46,15 41,17" fill="#10b981" />
      <path d="M42 50C38 54 26 54 22 50" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" fill="none" />
      <polygon points="22,53 18,49 23,47" fill="#f43f5e" />
    </svg>
  ),

  Dictogloss: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Ear Listening */}
      <path d="M12 28C12 18 18 12 26 12C34 12 38 17 38 24C38 29 35 32 32 34C28 37 28 42 28 46" 
        stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M20 28C20 22 23 18 26 18" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Writing Paper & Pencil */}
      <rect x="26" y="22" width="28" height="34" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
      <line x1="32" y1="30" x2="48" y2="30" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="36" x2="48" y2="36" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="42" x2="44" y2="42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      {/* Active Pencil */}
      <path d="M44 48L58 20L52 16L38 44L44 48Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M38 44L34 52L44 48" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),

  Lapbook: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Main folder base */}
      <rect x="10" y="14" width="44" height="40" rx="4" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
      {/* Left flap fold */}
      <rect x="10" y="14" width="20" height="40" rx="4" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      {/* Right flap fold */}
      <rect x="34" y="14" width="20" height="40" rx="4" fill="#34d399" stroke="#1e293b" strokeWidth="2.5" />
      {/* Interactive tabs & pockets */}
      <rect x="14" y="22" width="12" height="8" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="38" y="22" width="12" height="8" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="14" y="34" width="12" height="14" rx="2" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="38" y="34" width="12" height="14" rx="2" fill="#c084fc" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="32" cy="10" r="3" fill="#f59e0b" />
    </svg>
  ),

  SelfAssessment: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Self-Assessment Rubric / Clipboard */}
      {/* Clipboard board */}
      <rect x="10" y="10" width="44" height="48" rx="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" />
      {/* Clip top */}
      <rect x="22" y="6" width="20" height="8" rx="3" fill="#94a3b8" stroke="#1e293b" strokeWidth="2" />
      <circle cx="32" cy="10" r="2" fill="#ffffff" />
      {/* Checklist items with green checkmarks */}
      {/* Item 1 */}
      <rect x="16" y="20" width="8" height="8" rx="2" fill="#bbf7d0" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M18 24L20 26L23 21" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="24" x2="48" y2="24" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Item 2 */}
      <rect x="16" y="32" width="8" height="8" rx="2" fill="#bbf7d0" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M18 36L20 38L23 33" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="36" x2="48" y2="36" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Item 3 */}
      <rect x="16" y="44" width="8" height="8" rx="2" fill="#bbf7d0" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M18 48L20 50L23 45" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="48" x2="40" y2="48" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Golden 3-Star / Reflection Badge */}
      <circle cx="48" cy="46" r="8" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
      <polygon points="48,41 49.5,44 53,44.5 50.5,47 51,50.5 48,49 45,50.5 45.5,47 43,44.5 46.5,44" fill="#ffffff" />
    </svg>
  ),

  Dictation: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Audio / Voice speaker broadcasting words */}
      <path d="M8 26H14L22 18V46L14 38H8C6.9 38 6 37.1 6 36V28C6 26.9 6.9 26 8 26Z" 
        fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Soundwaves entering the page */}
      <path d="M26 24C28 27 28 37 26 40" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M30 20C34 25 34 39 30 44" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Dictation Notebook Sheet */}
      <rect x="30" y="12" width="28" height="42" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
      {/* Notebook Lines */}
      <line x1="36" y1="20" x2="52" y2="20" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="28" x2="52" y2="28" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="36" x2="48" y2="36" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      {/* Written letters on sheet */}
      <text x="36" y="27" fill="#1e293b" fontWeight="800" fontSize="7" fontFamily="sans-serif">A B C</text>
      {/* Active Writing Pencil */}
      <path d="M46 50L60 26L55 22L41 46L46 50Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M41 46L38 52L46 50" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="38" cy="52" r="1" fill="#1e293b" />
    </svg>
  ),

  OralVocabQuestion: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Head Profile Speaking (Left) */}
      <path d="M8 56C8 46 12 43 18 43H22V56" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M6 28C6 18 12 12 20 12C26 12 30 16 30 22V28C30 34 24 38 18 38C12 38 6 34 6 28Z" 
        fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <path d="M6 24C6 16 12 10 22 10C26 10 30 13 28 18C24 14 16 16 12 22" 
        fill="#b45309" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="22" cy="22" r="2" fill="#1e293b" />
      <path d="M20 30C23 30 26 28 28 31C26 33 23 34 20 32Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
      {/* Sound Waves */}
      <path d="M30 22C32 25 32 31 30 34" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      {/* Big Speech Bubble with Vocabulary Card & Question Mark (Right) */}
      <path d="M26 28L32 24V14C32 8.5 37.5 4 45 4C52.5 4 58 8.5 58 14V34C58 39.5 52.5 44 45 44C41 44 37 42.5 34.5 40L28 44L30 36C27.5 33.5 26 31 26 28Z" 
        fill="#fef08a" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      
      {/* Vocabulary Flashcard inside speech bubble */}
      <rect x="36" y="9" width="18" height="15" rx="3" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      {/* Flashcard icon/star */}
      <polygon points="45,12 46.5,15 50,15.5 47.5,18 48,21.5 45,20 42,21.5 42.5,18 40,15.5 43.5,15" fill="#f59e0b" stroke="#1e293b" strokeWidth="1" />
      
      {/* Red question mark asking vocabulary */}
      <path d="M42 27C42 25 44 24 46 24C48 24 49.5 25 49.5 26.5C49.5 28.5 47 29.5 46 31V34" 
        stroke="#e11d48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="46" cy="38" r="1.8" fill="#e11d48" />
    </svg>
  ),

  OralStructuresQuestion: ({ className, size = 64 }) => (
    <svg {...defaultProps} width={size} height={size} className={className}>
      {/* Head Profile Speaking (Left) */}
      <path d="M8 56C8 46 12 43 18 43H22V56" fill="#818cf8" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M6 28C6 18 12 12 20 12C26 12 30 16 30 22V28C30 34 24 38 18 38C12 38 6 34 6 28Z" 
        fill="#fed7aa" stroke="#1e293b" strokeWidth="3" />
      <path d="M6 24C6 16 12 10 22 10C26 10 30 13 28 18C24 14 16 16 12 22" 
        fill="#b45309" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="22" cy="22" r="2" fill="#1e293b" />
      <path d="M20 30C23 30 26 28 28 31C26 33 23 34 20 32Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
      {/* Sound Waves */}
      <path d="M28 22C30 25 30 31 28 34" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Speech Bubble Containing Connected Structure Blocks (Right) */}
      <path d="M24 26L30 22V12C30 6.5 36 3 45 3C54 3 60 6.5 60 12V42C60 47.5 54 51 45 51C40.5 51 36.5 49.5 34 47L26 51L28 43C25.5 40 24 37 24 34V26Z" 
        fill="#ccfbf1" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />

      {/* Grammar Block 1: Subject (Teal) */}
      <rect x="33" y="9" width="10" height="11" rx="2" fill="#2dd4bf" stroke="#1e293b" strokeWidth="1.8" />
      <text x="38" y="17.5" fill="#0f766e" fontWeight="900" fontSize="7" fontFamily="sans-serif" textAnchor="middle">S</text>

      {/* Connector + */}
      <path d="M44.5 14.5H46.5M45.5 13.5V15.5" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

      {/* Grammar Block 2: Verb (Yellow) */}
      <rect x="48" y="9" width="9" height="11" rx="2" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.8" />
      <text x="52.5" y="17.5" fill="#92400e" fontWeight="900" fontSize="7" fontFamily="sans-serif" textAnchor="middle">V</text>

      {/* Sentence puzzle connector arrow down */}
      <path d="M45 22V27M42 25L45 28L48 25" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Bottom Target Structure / Question Bubble with '?' (Rose) */}
      <rect x="33" y="30" width="24" height="13" rx="3" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
      <text x="40" y="39.5" fill="#ffffff" fontWeight="900" fontSize="8" fontFamily="sans-serif">Do you...?</text>
    </svg>
  ),

  // Aliases for convenience
  OralVocab: (props: any) => <Pictograms.OralVocabQuestion {...props} />,
  OralStructures: (props: any) => <Pictograms.OralStructuresQuestion {...props} />,
};
