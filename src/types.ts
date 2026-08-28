export type Activity = {
  id: string;
  name: string;
  icon: string;
  color: string;
  customImage?: string;
  description?: string;
  typeId?: string;
  originalId?: string;
};

export type ActivityType = {
  id: string;
  name: string;
  icon: string;
  color?: string;
  customImage?: string;
  description?: string;
  category?: string;
  isCustom?: boolean;
};

export type Theme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
};

export interface VisualAgendaV3Data {
  schemaVersion: 3;
  selectedGrade: string;
  activitiesByGrade: Record<string, Activity[]>;
  sequence: Activity[];
  title: string;
  themeId: string;
  activityTypes?: ActivityType[];
}

export type ToastNotification = {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const GRADES = ['1.º EP', '2.º EP', '3.º EP', '4.º EP', '5.º EP', '6.º EP'] as const;
export type Grade = typeof GRADES[number];

export type SessionStatus = 'planned' | 'in_progress' | 'completed';

export interface ClassSession {
  id: string;
  plannedDate: string; // YYYY-MM-DD
  grade: Grade;
  name: string;
  ls: string;
  greeting: string;
  activities: Activity[]; // Snapshot copy with instance IDs
  completedActivityIds: string[]; // IDs of completed activity instances
  status: SessionStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export const STANDARD_GREETINGS = [
  'GOOD MORNING CLASS!',
  'GOOD AFTERNOON CLASS!',
  'HELLO EVERYONE!',
  'TODAY WE WILL...'
] as const;

export interface VisualAgendaV4Data {
  schemaVersion: 4;
  selectedGrade: string;
  activitiesByGrade: Record<string, Activity[]>;
  sequence: Activity[];
  title: string;
  themeId: string;
  activityTypes?: ActivityType[];
  sessions: ClassSession[];
  currentSessionId?: string | null;
  plannedDate?: string;
  ls?: string;
  greeting?: string;
}
