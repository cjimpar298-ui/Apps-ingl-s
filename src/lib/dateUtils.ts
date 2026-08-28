// Date utility helpers for Visual Agenda (Spanish formatting & localization)

const SPANISH_MONTHS_SHORT = [
  'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
];

const SPANISH_MONTHS_LONG = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Returns today's date formatted as YYYY-MM-DD for standard HTML date input.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD or ISO string into year, month (0-indexed), and day numbers safely.
 */
export function parseDateParts(dateStr?: string): { year: number; month: number; day: number; dateObj: Date } {
  if (!dateStr) {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
      dateObj: today
    };
  }

  // Handle YYYY-MM-DD
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day, 12, 0, 0); // Noon to avoid TZ shifts
    return { year, month, day, dateObj };
  }

  const fallback = new Date(dateStr);
  if (!isNaN(fallback.getTime())) {
    return {
      year: fallback.getFullYear(),
      month: fallback.getMonth(),
      day: fallback.getDate(),
      dateObj: fallback
    };
  }

  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    dateObj: today
  };
}

/**
 * Formats a date string (YYYY-MM-DD) into standard Spanish numerical format: DD/MM/YYYY
 * e.g. "03/09/2026"
 */
export function formatSpanishDate(dateStr?: string): string {
  const { day, month, year } = parseDateParts(dateStr);
  const dd = String(day).padStart(2, '0');
  const mm = String(month + 1).padStart(2, '0');
  return `${dd}/${mm}/${year}`;
}

/**
 * Formats a date string into visual badge parts:
 * day: "03"
 * monthShort: "SEP"
 * year: "2026"
 */
export function formatVisualDateBadge(dateStr?: string): { day: string; monthShort: string; year: string } {
  const { day, month, year } = parseDateParts(dateStr);
  return {
    day: String(day).padStart(2, '0'),
    monthShort: SPANISH_MONTHS_SHORT[month] || '---',
    year: String(year)
  };
}

/**
 * Formats full human date: "3 de Septiembre de 2026"
 */
export function formatFullSpanishDate(dateStr?: string): string {
  const { day, month, year } = parseDateParts(dateStr);
  const monthName = SPANISH_MONTHS_LONG[month] || '';
  return `${day} de ${monthName} de ${year}`;
}

/**
 * Compares a date string (YYYY-MM-DD) with today.
 * Returns: 'today' | 'future' | 'past'
 */
export function compareWithToday(dateStr?: string): 'today' | 'future' | 'past' {
  const todayStr = getTodayDateString();
  if (!dateStr || dateStr === todayStr) return 'today';
  return dateStr > todayStr ? 'future' : 'past';
}
