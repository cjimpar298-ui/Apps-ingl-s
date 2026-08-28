import { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  X, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Edit2, 
  RotateCcw, 
  Palette, 
  LayoutGrid, 
  Clock, 
  PartyPopper, 
  Upload, 
  CheckCircle2, 
  Circle,
  Download,
  FileArchive,
  AlertCircle,
  Info,
  Sparkles,
  Layers,
  HelpCircle,
  Play,
  Calendar,
  Save,
  BookmarkCheck,
  BookOpen,
  CheckCheck,
  CheckSquare,
  Settings,
  Cloud,
  CloudOff,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { 
  Activity, 
  ActivityType, 
  Theme, 
  VisualAgendaV3Data, 
  VisualAgendaV4Data, 
  ClassSession, 
  ToastNotification, 
  GRADES, 
  Grade,
  STANDARD_GREETINGS
} from './types';
import { PREDEFINED_ACTIVITY_TYPES, DEFAULT_INITIAL_ACTIVITIES } from './data/activityTypes';
import { formatSpanishDate, getTodayDateString, formatVisualDateBadge } from './lib/dateUtils';
import { fetchCloudAgenda, saveCloudAgenda, SyncStatus } from './lib/cloudSync';
import { SortableActivityCard } from './components/ActivityCard';
import { SortableSequenceItem } from './components/SortableSequenceItem';
import { ActivityModal } from './components/ActivityModal';
import { ActivityTypesModal } from './components/ActivityTypesModal';
import { SessionConfigCard } from './components/SessionConfigCard';
import { SessionsModal } from './components/SessionsModal';
import { ThemeModal, THEMES } from './components/ThemeModal';
import { ActivityIconBadge, IconRenderer } from './components/IconRenderer';
import { ClassroomProjectionView } from './components/ClassroomProjectionView';

function normalizeGrade(raw: string | undefined): Grade {
  if (!raw) return '4.º EP';
  const trimmed = raw.trim();
  if (trimmed.includes('1')) return '1.º EP';
  if (trimmed.includes('2')) return '2.º EP';
  if (trimmed.includes('3')) return '3.º EP';
  if (trimmed.includes('4')) return '4.º EP';
  if (trimmed.includes('5')) return '5.º EP';
  if (trimmed.includes('6')) return '6.º EP';
  return '4.º EP';
}

function createInitialActivitiesByGrade(): Record<string, Activity[]> {
  const result: Record<string, Activity[]> = {};
  GRADES.forEach(grade => {
    result[grade] = DEFAULT_INITIAL_ACTIVITIES.map(act => ({
      ...act,
      id: `${grade.replace(/[^a-zA-Z0-9]/g, '')}-${act.id}`
    }));
  });
  return result;
}

export default function App() {
  const [view, setView] = useState<'setup' | 'class'>('setup');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('4.º EP');
  const [title, setTitle] = useState('English Lesson Routine & Activities');
  const [plannedDate, setPlannedDate] = useState<string>(getTodayDateString());
  const [ls, setLs] = useState<string>('LS 1');
  const [greeting, setGreeting] = useState<string>('GOOD MORNING CLASS!');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const [activitiesByGrade, setActivitiesByGrade] = useState<Record<string, Activity[]>>(createInitialActivitiesByGrade);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>(PREDEFINED_ACTIVITY_TYPES);
  const [sequence, setSequence] = useState<Activity[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [sessions, setSessions] = useState<ClassSession[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // UI Panels
  const [isSessionDrawerOpen, setIsSessionDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Modals
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isActivityTypesModalOpen, setIsActivityTypesModalOpen] = useState(false);
  const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (
    message: string, 
    type: 'success' | 'error' | 'info' = 'info',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, message, actionLabel, onAction }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, actionLabel ? 6500 : 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cloud Synchronization state
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('');
  const isRemoteUpdatingRef = useRef<boolean>(false);
  const lastCloudTimestampRef = useRef<number>(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to apply complete agenda dataset
  const applyAgendaData = useCallback((data: VisualAgendaV4Data) => {
    if (!data) return;
    isRemoteUpdatingRef.current = true;

    if (data.activitiesByGrade) {
      const initialMap = createInitialActivitiesByGrade();
      GRADES.forEach(g => {
        if (Array.isArray(data.activitiesByGrade[g])) {
          initialMap[g] = data.activitiesByGrade[g];
        }
      });
      setActivitiesByGrade(initialMap);
    }
    if (data.selectedGrade) setSelectedGrade(normalizeGrade(data.selectedGrade));
    if (Array.isArray(data.sequence)) setSequence(data.sequence);
    if (data.title) setTitle(data.title);
    if (data.plannedDate) setPlannedDate(data.plannedDate);
    if (data.ls) setLs(data.ls);
    if (data.greeting) setGreeting(data.greeting);
    if (data.currentSessionId !== undefined) setCurrentSessionId(data.currentSessionId);
    if (Array.isArray(data.sessions)) setSessions(data.sessions);
    if (Array.isArray(data.activityTypes)) setActivityTypes(data.activityTypes);
    if (data.themeId) {
      const matched = THEMES.find(t => t.id === data.themeId);
      if (matched) setTheme(matched);
    }

    setTimeout(() => {
      isRemoteUpdatingRef.current = false;
    }, 300);
  }, []);

  // 1. Initial Load: Cloud Priority -> LocalStorage Fallback
  useEffect(() => {
    let isMounted = true;

    async function initialLoad() {
      try {
        // Try Cloud first
        const cloudResult = await fetchCloudAgenda();
        if (cloudResult.data && cloudResult.updatedAt > 0 && isMounted) {
          lastCloudTimestampRef.current = cloudResult.updatedAt;
          applyAgendaData(cloudResult.data);
          setSyncStatus('synced');
          const timeStr = new Date(cloudResult.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastSyncedTime(timeStr);
          showToast('Sincronizado con la nube ☁️', 'success');
          return;
        }
      } catch (err) {
        console.warn('Initial cloud fetch failed, loading local storage:', err);
      }

      // Local storage fallback
      try {
        const v4Saved = localStorage.getItem('visual-agenda-v4');
        if (v4Saved) {
          const data = JSON.parse(v4Saved);
          if (data && data.schemaVersion === 4 && data.activitiesByGrade) {
            applyAgendaData(data);
            setSyncStatus('synced');
            return;
          }
        }

        // Migration from v3
        const v3Saved = localStorage.getItem('visual-agenda-v3');
        if (v3Saved) {
          const data: VisualAgendaV3Data = JSON.parse(v3Saved);
          if (data && data.activitiesByGrade) {
            const initialMap = createInitialActivitiesByGrade();
            GRADES.forEach(g => {
              if (Array.isArray(data.activitiesByGrade[g])) {
                initialMap[g] = data.activitiesByGrade[g];
              }
            });
            setActivitiesByGrade(initialMap);
            if (data.selectedGrade) setSelectedGrade(normalizeGrade(data.selectedGrade));
            if (Array.isArray(data.sequence)) setSequence(data.sequence);
            if (data.title) setTitle(data.title);
            if (Array.isArray(data.activityTypes)) setActivityTypes(data.activityTypes);
            if (data.themeId) {
              const matched = THEMES.find(t => t.id === data.themeId);
              if (matched) setTheme(matched);
            }
            showToast('Datos actualizados a la versión v4', 'info');
            return;
          }
        }
      } catch (e) {
        console.error('Error loading local agenda data:', e);
      }
    }

    initialLoad();

    return () => {
      isMounted = false;
    };
  }, [applyAgendaData]);

  // 2. Real-time Multi-Device Background Sync Polling
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      if (isRemoteUpdatingRef.current) return;

      try {
        const remote = await fetchCloudAgenda();
        if (remote.data && remote.updatedAt > lastCloudTimestampRef.current + 1000) {
          lastCloudTimestampRef.current = remote.updatedAt;
          applyAgendaData(remote.data);
          setSyncStatus('synced');
          const timeStr = new Date(remote.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastSyncedTime(timeStr);
        }
      } catch (e) {
        // Silent background check
      }
    }, 4500);

    return () => clearInterval(pollInterval);
  }, [applyAgendaData]);

  // 3. Save to localStorage + Debounced Cloud Save on local user changes
  useEffect(() => {
    if (isRemoteUpdatingRef.current) return;

    const dataToSave: VisualAgendaV4Data = {
      schemaVersion: 4,
      selectedGrade,
      activitiesByGrade,
      sequence,
      title,
      plannedDate,
      ls,
      greeting,
      currentSessionId,
      sessions,
      themeId: theme.id,
      activityTypes
    };

    // Save to local storage immediately
    try {
      localStorage.setItem('visual-agenda-v4', JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Error saving local storage:', e);
    }

    // Debounce cloud save (600ms)
    setSyncStatus('saving');
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const savedTime = await saveCloudAgenda(dataToSave);
        lastCloudTimestampRef.current = savedTime;
        setSyncStatus('synced');
        setLastSyncedTime(new Date(savedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        console.warn('Cloud save failed, saved locally:', err);
        setSyncStatus('offline');
      }
    }, 600);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [selectedGrade, activitiesByGrade, sequence, title, plannedDate, ls, greeting, currentSessionId, sessions, theme, activityTypes]);

  // Manual Force Cloud Synchronization
  const handleForceSync = async () => {
    setSyncStatus('saving');
    try {
      const dataToSave: VisualAgendaV4Data = {
        schemaVersion: 4,
        selectedGrade,
        activitiesByGrade,
        sequence,
        title,
        plannedDate,
        ls,
        greeting,
        currentSessionId,
        sessions,
        themeId: theme.id,
        activityTypes
      };
      const savedTime = await saveCloudAgenda(dataToSave);
      lastCloudTimestampRef.current = savedTime;
      setSyncStatus('synced');
      setLastSyncedTime(new Date(savedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      showToast('¡Sincronización en la nube completada! ☁️', 'success');
    } catch (e) {
      setSyncStatus('offline');
      showToast('Error al conectar con la nube. Guardado en local.', 'error');
    }
  };

  // Reset to default 3 activities
  const handleResetToDefaultThree = () => {
    if (window.confirm(`¿Quieres restablecer las actividades de ${selectedGrade} a las 3 predeterminadas?`)) {
      const initialMap = createInitialActivitiesByGrade();
      setActivitiesByGrade(prev => ({
        ...prev,
        [selectedGrade]: initialMap[selectedGrade]
      }));
      setSequence([]);
      showToast(`Actividades de ${selectedGrade} restablecidas a 3`, 'info');
    }
  };

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // DND Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentGradeActivities = activitiesByGrade[selectedGrade] || [];

  // Reorder library
  const handleDragEndLibrary = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const currentList = activitiesByGrade[selectedGrade] || [];
      const oldIndex = currentList.findIndex((i) => i.id === active.id);
      const newIndex = currentList.findIndex((i) => i.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(currentList, oldIndex, newIndex);
        setActivitiesByGrade(prev => ({
          ...prev,
          [selectedGrade]: reordered
        }));
      }
    }
  };

  const handleDragEndSequence = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSequence((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Activity selection status derived from Today's Sequence
  const isActivitySelected = (activity: Activity) => {
    return sequence.some(s => s.originalId === activity.id || s.id === activity.id);
  };

  // Toggle single activity selection
  const handleToggleSelectActivity = (activity: Activity, selected: boolean) => {
    if (selected) {
      // Add to Today's Sequence
      const newItem: Activity = {
        ...activity,
        id: `seq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalId: activity.id
      };
      setSequence(prev => [...prev, newItem]);
      showToast(`"${activity.name}" añadida a la sesión`, 'success');
    } else {
      // Remove from Today's Sequence
      setSequence(prev => prev.filter(s => s.originalId !== activity.id && s.id !== activity.id));
      showToast(`"${activity.name}" quitada de la sesión`, 'info');
    }
  };

  // Toggle "Seleccionar todo" for current grade bank
  const allCurrentGradeSelected = currentGradeActivities.length > 0 && currentGradeActivities.every(act => isActivitySelected(act));
  const selectedCountInGrade = currentGradeActivities.filter(act => isActivitySelected(act)).length;

  const handleToggleSelectAll = () => {
    if (allCurrentGradeSelected) {
      // Deselect all from current grade
      const gradeIds = new Set(currentGradeActivities.map(a => a.id));
      setSequence(prev => prev.filter(s => !gradeIds.has(s.originalId || s.id)));
      showToast(`Actividades de ${selectedGrade} desmarcadas`, 'info');
    } else {
      // Select all unselected from current grade
      const existingIds = new Set(sequence.map(s => s.originalId || s.id));
      const toAdd = currentGradeActivities.filter(a => !existingIds.has(a.id));
      const newItems: Activity[] = toAdd.map(act => ({
        ...act,
        id: `seq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalId: act.id
      }));
      setSequence(prev => [...prev, ...newItems]);
      showToast(
        toAdd.length === 1
          ? `1 actividad añadida a la sesión`
          : `¡${toAdd.length} actividades añadidas a la sesión!`,
        'success'
      );
    }
  };

  const removeActivityFromSequence = (index: number) => {
    const itemToRemove = sequence[index];
    const newSeq = [...sequence];
    newSeq.splice(index, 1);
    setSequence(newSeq);
    if (itemToRemove) {
      showToast(`"${itemToRemove.name}" quitada de la sesión`, 'info');
    }
  };

  // Save / Update an activity in Bank
  const saveActivity = (activity: Activity) => {
    const currentList = activitiesByGrade[selectedGrade] || [];
    if (activity.id) {
      // Edit existing
      const updated = currentList.map(a => a.id === activity.id ? activity : a);
      setActivitiesByGrade(prev => ({
        ...prev,
        [selectedGrade]: updated
      }));
      // Update in sequence if present
      setSequence(prev => prev.map(s => s.originalId === activity.id || s.id === activity.id ? { ...activity, id: s.id, originalId: activity.id } : s));
      showToast(`Actividad "${activity.name}" actualizada`, 'success');
    } else {
      // Create new
      const newActivity: Activity = {
        ...activity,
        id: `${selectedGrade.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
      };
      setActivitiesByGrade(prev => ({
        ...prev,
        [selectedGrade]: [newActivity, ...currentList]
      }));
      showToast(`Actividad "${activity.name}" guardada en ${selectedGrade}`, 'success');
    }
    setIsActivityModalOpen(false);
    setEditingActivity(null);
  };

  // Inline update handler directly from the Card
  const updateActivityInBank = (updatedActivity: Activity) => {
    const currentList = activitiesByGrade[selectedGrade] || [];
    const updatedList = currentList.map(a => a.id === updatedActivity.id ? updatedActivity : a);
    setActivitiesByGrade(prev => ({
      ...prev,
      [selectedGrade]: updatedList
    }));
    // Also update in today's sequence if it exists there
    setSequence(prev => prev.map(s => s.originalId === updatedActivity.id || s.id === updatedActivity.id ? { ...updatedActivity, id: s.id, originalId: updatedActivity.id } : s));
    showToast(`"${updatedActivity.name}" actualizada`, 'success');
  };

  // Duplicate activity in bank
  const handleDuplicateActivity = (activity: Activity) => {
    const currentList = activitiesByGrade[selectedGrade] || [];
    const originalIndex = currentList.findIndex(a => a.id === activity.id);
    const duplicated: Activity = {
      ...activity,
      id: `${selectedGrade.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: `${activity.name} (Copia)`,
    };
    
    const newList = [...currentList];
    if (originalIndex !== -1) {
      newList.splice(originalIndex + 1, 0, duplicated);
    } else {
      newList.unshift(duplicated);
    }

    setActivitiesByGrade(prev => ({
      ...prev,
      [selectedGrade]: newList
    }));
    showToast(`Actividad duplicada en ${selectedGrade}`, 'success');
  };

  // Delete from bank
  const deleteFromLibrary = (id: string) => {
    const currentList = activitiesByGrade[selectedGrade] || [];
    const itemToDelete = currentList.find(a => a.id === id);
    const updated = currentList.filter(a => a.id !== id);
    
    setActivitiesByGrade(prev => ({
      ...prev,
      [selectedGrade]: updated
    }));

    // If it was in sequence, remove it too
    setSequence(prev => prev.filter(s => s.originalId !== id && s.id !== id));
    setIsActivityModalOpen(false);
    setEditingActivity(null);

    if (itemToDelete) {
      showToast(
        `Actividad "${itemToDelete.name}" eliminada de ${selectedGrade}`,
        'info',
        'Deshacer',
        () => {
          setActivitiesByGrade(prev => ({
            ...prev,
            [selectedGrade]: [itemToDelete, ...(prev[selectedGrade] || [])]
          }));
        }
      );
    }
  };

  // Activity Types Manager handlers
  const handleSaveType = (typeToSave: ActivityType) => {
    setActivityTypes(prev => {
      const exists = prev.some(t => t.id === typeToSave.id);
      if (exists) {
        return prev.map(t => t.id === typeToSave.id ? typeToSave : t);
      }
      return [...prev, typeToSave];
    });
    showToast(`Tipo "${typeToSave.name}" guardado`, 'success');
  };

  const handleDeleteType = (typeId: string) => {
    setActivityTypes(prev => prev.filter(t => t.id !== typeId));
    showToast('Tipo de actividad eliminado', 'info');
  };

  // Save / Load Sessions Handlers
  const handleSaveSession = () => {
    if (sequence.length === 0) {
      showToast('Añade al menos una actividad a la secuencia antes de guardar', 'error');
      return;
    }

    const now = new Date().toISOString();
    
    if (currentSessionId) {
      // Update existing session
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            plannedDate,
            grade: selectedGrade,
            name: title,
            ls,
            greeting,
            activities: sequence,
            completedActivityIds: Array.from(completedIds),
            status: completedIds.size === sequence.length && sequence.length > 0 ? 'completed' : 'planned',
            updatedAt: now
          };
        }
        return s;
      }));
      showToast(`Sesión "${title}" actualizada`, 'success');
    } else {
      // Create new session
      const newSession: ClassSession = {
        id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        plannedDate,
        grade: selectedGrade,
        name: title || `Clase de ${selectedGrade} - ${formatSpanishDate(plannedDate)}`,
        ls,
        greeting,
        activities: sequence,
        completedActivityIds: Array.from(completedIds),
        status: 'planned',
        createdAt: now,
        updatedAt: now
      };
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      showToast(`Sesión guardada en el gestor`, 'success');
    }
  };

  const handleLoadSession = (session: ClassSession) => {
    setSelectedGrade(session.grade);
    setPlannedDate(session.plannedDate);
    setTitle(session.name);
    setLs(session.ls || 'LS 1');
    setGreeting(session.greeting || 'GOOD MORNING CLASS!');
    setSequence(session.activities);
    setCompletedIds(new Set(session.completedActivityIds || []));
    setCurrentSessionId(session.id);
    setIsSessionsModalOpen(false);
    showToast(`Sesión "${session.name}" cargada con éxito`, 'success');
  };

  const handleContinuePending = (session: ClassSession) => {
    handleLoadSession(session);
    // Find the first uncompleted activity index
    const firstUncompletedIndex = session.activities.findIndex(
      act => !session.completedActivityIds?.includes(act.id)
    );
    setCurrentIndex(firstUncompletedIndex !== -1 ? firstUncompletedIndex : 0);
    setView('class');
  };

  const handleDuplicateSession = (session: ClassSession) => {
    const duplicated: ClassSession = {
      ...session,
      id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: `${session.name} (Copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSessions(prev => [duplicated, ...prev]);
    showToast(`Sesión duplicada`, 'success');
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
    showToast('Sesión eliminada', 'info');
  };

  const handleNewSessionReset = () => {
    setCurrentSessionId(null);
    setSequence([]);
    setCompletedIds(new Set());
    setTitle('English Lesson Routine & Activities');
    setPlannedDate(getTodayDateString());
    showToast('Nueva sesión en blanco lista', 'info');
  };

  // Class Presentation actions
  const startClass = () => {
    if (sequence.length === 0) {
      showToast('Selecciona al menos una actividad antes de iniciar clase', 'error');
      return;
    }
    setCurrentIndex(0);
    setView('class');
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      const isNowCompleted = !next.has(id);
      if (isNowCompleted) {
        next.add(id);
        // Play celebratory chime via Web Audio API
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        } catch (e) {
          // audio fallback
        }
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  // Backup JSON Export/Import
  const handleExportJSON = () => {
    const data: VisualAgendaV4Data = {
      schemaVersion: 4,
      selectedGrade,
      activitiesByGrade,
      sequence,
      title,
      plannedDate,
      ls,
      greeting,
      currentSessionId,
      sessions,
      themeId: theme.id,
      activityTypes
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agenda-visual-${selectedGrade.replace(/[^a-zA-Z0-9]/g, '')}-${plannedDate || getTodayDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Datos de la agenda exportados en JSON', 'success');
  };

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data && data.activitiesByGrade) {
          setActivitiesByGrade(data.activitiesByGrade);
          if (data.selectedGrade) setSelectedGrade(normalizeGrade(data.selectedGrade));
          if (Array.isArray(data.sequence)) setSequence(data.sequence);
          if (data.title) setTitle(data.title);
          if (data.plannedDate) setPlannedDate(data.plannedDate);
          if (data.ls) setLs(data.ls);
          if (data.greeting) setGreeting(data.greeting);
          if (Array.isArray(data.sessions)) setSessions(data.sessions);
          if (Array.isArray(data.activityTypes)) setActivityTypes(data.activityTypes);
          if (data.themeId) {
            const matched = THEMES.find(t => t.id === data.themeId);
            if (matched) setTheme(matched);
          }
          showToast('Datos cargados correctamente', 'success');
        } else {
          showToast('Archivo JSON no válido para esta agenda', 'error');
        }
      } catch (err) {
        showToast('Error al leer el archivo JSON', 'error');
      }
    };
    reader.readAsText(file);
  };

  const dateBadge = formatVisualDateBadge(plannedDate);

  return (
    <div className="min-h-screen bg-[#edf9f2] font-sans text-slate-900 selection:bg-purple-200">
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md text-sm font-bold",
                toast.type === 'success' && "bg-emerald-500/95 border-emerald-400 text-white",
                toast.type === 'error' && "bg-rose-500/95 border-rose-400 text-white",
                toast.type === 'info' && "bg-slate-900/95 border-slate-700 text-white"
              )}
            >
              {toast.type === 'success' && <CheckCircle2 size={20} className="shrink-0 text-emerald-100" />}
              {toast.type === 'error' && <AlertCircle size={20} className="shrink-0 text-rose-100" />}
              {toast.type === 'info' && <Info size={20} className="shrink-0 text-blue-200" />}
              
              <span className="flex-1 min-w-0 break-words">{toast.message}</span>
              
              {toast.actionLabel && toast.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    toast.onAction?.();
                    removeToast(toast.id);
                  }}
                  className="px-2.5 py-1 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-black transition-all shrink-0 shadow-xs active:scale-95"
                >
                  {toast.actionLabel}
                </button>
              )}

              <button 
                type="button"
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white/80 shrink-0"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {view === 'setup' ? (
          <motion.div 
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-between"
          >
            {/* ========================================================================= */}
            {/* 1. TOP NAVBAR HEADER (Exact clean layout from user's image)                */}
            {/* ========================================================================= */}
            <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 shadow-2xs sticky top-0 z-30">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Left: App Logo Icon & Title */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md text-xl">
                      📓
                    </div>
                    <div>
                      <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight tracking-tight">
                        English Class Agenda
                      </h1>
                      <p className="text-xs text-slate-500 font-semibold">
                        CEIP Antonio Gala
                      </p>
                    </div>
                  </div>

                  {/* Mobile Quick Action Tools */}
                  <div className="flex items-center gap-1.5 md:hidden">
                    <button
                      type="button"
                      onClick={() => setIsThemeModalOpen(true)}
                      className="p-2 rounded-xl text-slate-500 hover:bg-slate-100"
                      title="Temas"
                    >
                      <Palette size={18} />
                    </button>
                  </div>
                </div>

                {/* Center / Right: Cloud Status, Settings, and Horizontal Grade Pills */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-end w-full md:w-auto">
                  {/* Cloud Status Indicator & Quick Sync */}
                  <button
                    type="button"
                    onClick={handleForceSync}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs active:scale-95 cursor-pointer",
                      syncStatus === 'synced' && "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
                      syncStatus === 'saving' && "bg-amber-50 text-amber-700 border-amber-200",
                      syncStatus === 'offline' && "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    )}
                    title={
                      syncStatus === 'synced' 
                        ? `Sincronización automática activa con la nube. Última actualización: ${lastSyncedTime || 'ahora'}. Haz clic para forzar sincronización.` 
                        : syncStatus === 'saving' 
                        ? 'Guardando cambios en la nube...' 
                        : 'Modo local activo. Haz clic para reintentar conexión con la nube.'
                    }
                  >
                    {syncStatus === 'saving' ? (
                      <RefreshCw size={14} className="animate-spin text-amber-600" />
                    ) : syncStatus === 'synced' ? (
                      <Cloud size={14} className="text-emerald-600" />
                    ) : (
                      <CloudOff size={14} className="text-slate-500" />
                    )}
                    <span className="hidden sm:inline">
                      {syncStatus === 'saving' 
                        ? 'Guardando...' 
                        : syncStatus === 'synced' 
                        ? 'En la nube' 
                        : 'Local'}
                    </span>
                    {syncStatus === 'synced' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </button>

                  {/* Settings / Theme Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsThemeModalOpen(true)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all active:scale-95"
                    title="Personalizar Tema de Color"
                  >
                    <Settings size={20} />
                  </button>

                  {/* Backup Export Button */}
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all active:scale-95"
                    title="Exportar copia de seguridad (JSON)"
                  >
                    <Download size={19} />
                  </button>

                  {/* Import Backup Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.json';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleImportJSON(file);
                      };
                      input.click();
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all active:scale-95"
                    title="Restaurar copia de seguridad (JSON)"
                  >
                    <Upload size={19} />
                  </button>

                  {/* Grade Switcher Pills (1º EP a 6º EP) in clean horizontal row */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-full border border-slate-200/80">
                    {GRADES.map(g => {
                      const isCurrent = selectedGrade === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setSelectedGrade(g)}
                          className={cn(
                            "px-3.5 py-1.5 rounded-full font-black text-xs transition-all select-none active:scale-95",
                            isCurrent
                              ? "bg-purple-600 text-white shadow-sm scale-105 font-black"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/70 font-bold"
                          )}
                        >
                          {g.replace('.º EP', 'º EP')}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </header>

            {/* ========================================================================= */}
            {/* 2. SUB-HEADER / TOOLBAR ROW (Exact styling from user's image)              */}
            {/* ========================================================================= */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Grade Title & Count + "Seleccionar todo" Pill Button */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                    {selectedGrade.replace('.º EP', 'º EP')} · {currentGradeActivities.length} {currentGradeActivities.length === 1 ? 'actividad' : 'actividades'}
                  </h2>

                  {currentGradeActivities.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleToggleSelectAll}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs active:scale-95 flex items-center gap-1.5 cursor-pointer",
                          allCurrentGradeSelected
                            ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                            : "bg-purple-100/80 hover:bg-purple-200/90 text-purple-800 border-purple-200"
                        )}
                        title={allCurrentGradeSelected ? "Deseleccionar todas las actividades de este curso" : "Seleccionar todas las actividades de este curso para la sesión de hoy"}
                      >
                        <CheckCheck size={14} />
                        <span>{allCurrentGradeSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}</span>
                      </button>

                      {currentGradeActivities.length !== 3 && (
                        <button
                          type="button"
                          onClick={handleResetToDefaultThree}
                          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs active:scale-95 flex items-center gap-1 cursor-pointer"
                          title="Restablecer este curso a las 3 actividades iniciales estándar"
                        >
                          <RotateCcw size={12} />
                          <span>3 iniciales</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: Action Buttons Row (📋 Mis sesiones, 📅 Datos sesión, + Nueva actividad) */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Mis sesiones Button with Count Badge */}
                  <button
                    type="button"
                    onClick={() => setIsSessionsModalOpen(true)}
                    className="py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    <span>📋 Mis sesiones</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[11px] font-black">
                      {sessions.length}
                    </span>
                  </button>

                  {/* Toggle Session Details Button */}
                  <button
                    type="button"
                    onClick={() => setIsSessionDrawerOpen(!isSessionDrawerOpen)}
                    className={cn(
                      "py-2.5 px-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 whitespace-nowrap cursor-pointer",
                      isSessionDrawerOpen
                        ? "bg-indigo-100 text-indigo-900 border-indigo-300"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    )}
                    title="Editar fecha, LS, saludo y título de la sesión"
                  >
                    <Calendar size={15} className="text-indigo-600" />
                    <span>Datos sesión</span>
                    {isSessionDrawerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {/* Nueva actividad Primary Button */}
                  <button
                    type="button"
                    onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true); }}
                    className="py-2.5 px-4.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    <Plus size={16} strokeWidth={3} />
                    <span>Nueva actividad</span>
                  </button>
                </div>

              </div>

              {/* Instructional Helper Subtitle */}
              <div className="mt-3.5 space-y-1">
                <p className="text-xs sm:text-sm font-semibold text-purple-700/80 flex items-center gap-1.5">
                  <span className="text-purple-500 font-black">⋮</span> Arrastra las tarjetas para cambiar el orden
                </p>
                <p className="text-xs sm:text-sm font-semibold text-purple-700 flex items-center gap-1.5">
                  <span>👆</span> Marca las actividades que vas a usar hoy
                </p>
              </div>
            </div>

            {/* Optional Expandable Session Details Drawer */}
            <AnimatePresence>
              {isSessionDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="max-w-7xl mx-auto w-full px-4 sm:px-8 overflow-hidden mb-6"
                >
                  <SessionConfigCard
                    selectedGrade={selectedGrade}
                    onSelectGrade={setSelectedGrade}
                    plannedDate={plannedDate}
                    onChangePlannedDate={setPlannedDate}
                    title={title}
                    onChangeTitle={setTitle}
                    ls={ls}
                    onChangeLS={setLs}
                    greeting={greeting}
                    onChangeGreeting={setGreeting}
                    currentSessionId={currentSessionId}
                    onNewSession={handleNewSessionReset}
                    totalGradeActivities={currentGradeActivities.length}
                    theme={theme}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ========================================================================= */}
            {/* 3. ACTIVITY BANK CARDS BOARD (Exact layout & cards from user's image)      */}
            {/* ========================================================================= */}
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 pb-36 flex-1">
              {currentGradeActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-300 rounded-[2.5rem] bg-white/70 text-center p-8">
                  <div className="w-16 h-16 rounded-3xl bg-purple-50 border-2 border-purple-100 flex items-center justify-center text-purple-600 mb-4 text-2xl">
                    ✨
                  </div>
                  <h3 className="font-black text-lg text-slate-800">
                    No hay actividades guardadas en {selectedGrade}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
                    Crea tu primera tarjeta o importa las actividades predeterminadas para este curso.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true); }}
                    className="mt-5 px-6 py-3 bg-purple-600 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md hover:bg-purple-700 transition-all active:scale-95"
                  >
                    + Crear primera actividad
                  </button>
                </div>
              ) : (
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndLibrary}
                >
                  <SortableContext 
                    items={currentGradeActivities.map(a => a.id)}
                    strategy={rectSortingStrategy}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 items-start">
                      {currentGradeActivities.map(activity => (
                        <SortableActivityCard 
                          key={activity.id} 
                          activity={activity}
                          activityTypes={activityTypes}
                          isSelected={isActivitySelected(activity)}
                          onToggleSelect={handleToggleSelectActivity}
                          onEdit={(a) => { setEditingActivity(a); setIsActivityModalOpen(true); }}
                          onUpdate={updateActivityInBank}
                          onDuplicate={handleDuplicateActivity}
                          onDelete={deleteFromLibrary}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </main>

            {/* ========================================================================= */}
            {/* 4. SMART CLASSROOM SESSION DOCK & PROJECTION LAUNCHER                      */}
            {/* ========================================================================= */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl py-3.5 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                
                {/* Left: Summary of Today's Sequence */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm sm:text-base text-slate-800">
                          Sesión de Hoy:
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-black">
                          {sequence.length} {sequence.length === 1 ? 'actividad' : 'actividades'}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 truncate max-w-xs sm:max-w-md">
                        <span>{formatSpanishDate(plannedDate)}</span>
                        <span>•</span>
                        <span>{ls}</span>
                        <span>•</span>
                        <span className="truncate">{title}</span>
                      </p>
                    </div>
                  </div>

                  {/* Toggle Mini Sequence Drawer */}
                  {sequence.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsSessionDrawerOpen(!isSessionDrawerOpen)}
                      className="text-xs font-bold text-indigo-600 hover:underline md:hidden"
                    >
                      {isSessionDrawerOpen ? 'Ocultar datos' : 'Ver datos'}
                    </button>
                  )}
                </div>

                {/* Right: Sequence Mini Pills + Save & Start Class Projection Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap justify-end w-full md:w-auto">
                  {/* Sequence Mini Badges preview (up to 4) */}
                  <div className="hidden lg:flex items-center gap-1.5 pr-2">
                    {sequence.slice(0, 4).map((item, idx) => (
                      <span 
                        key={item.id}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-black truncate max-w-[110px]"
                        title={item.name}
                      >
                        {idx + 1}. {item.name}
                      </span>
                    ))}
                    {sequence.length > 4 && (
                      <span className="text-[11px] font-black text-slate-400">
                        +{sequence.length - 4} más
                      </span>
                    )}
                  </div>

                  {/* Save Session Button */}
                  <button
                    type="button"
                    onClick={handleSaveSession}
                    disabled={sequence.length === 0}
                    className={cn(
                      "py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 border active:scale-95",
                      sequence.length > 0
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-2xs"
                        : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                    )}
                  >
                    <Save size={15} />
                    <span className="hidden sm:inline">Guardar Sesión</span>
                  </button>

                  {/* Big Prominent Start Class Button (PDI / TV) */}
                  <button 
                    type="button"
                    onClick={startClass}
                    disabled={sequence.length === 0}
                    className={cn(
                      "py-3 px-6 sm:px-8 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95 text-white",
                      sequence.length > 0 
                        ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 cursor-pointer scale-102" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    )}
                  >
                    <Play size={18} className="fill-current" />
                    <span>Iniciar Clase (PDI / TV)</span>
                  </button>
                </div>

              </div>
            </div>

          </motion.div>
        ) : (
          /* ========================================================================= */
          /* 5. CLASSROOM / PDI / SMART TV PRESENTATION VIEW                           */
          /* ========================================================================= */
          <ClassroomProjectionView 
            sequence={sequence}
            activityTypes={activityTypes}
            selectedGrade={selectedGrade}
            ls={ls}
            greeting={greeting}
            completedIds={completedIds}
            onToggleCompleted={toggleCompleted}
            onResetCompleted={() => setCompletedIds(new Set())}
            onClose={() => setView('setup')}
            onNewSession={() => {
              handleNewSessionReset();
              setView('setup');
            }}
          />
        )}
      </AnimatePresence>

      {/* Activity Create / Edit Modal with Type Selector and Duplicate action */}
      <ActivityModal 
        isOpen={isActivityModalOpen} 
        onClose={() => { setIsActivityModalOpen(false); setEditingActivity(null); }}
        onSave={saveActivity}
        onDelete={deleteFromLibrary}
        onDuplicate={handleDuplicateActivity}
        initialActivity={editingActivity}
        activityTypes={activityTypes}
        currentGradeName={selectedGrade}
      />

      {/* Activity Types Manager Modal */}
      <ActivityTypesModal
        isOpen={isActivityTypesModalOpen}
        onClose={() => setIsActivityTypesModalOpen(false)}
        activityTypes={activityTypes}
        onSaveType={handleSaveType}
        onDeleteType={handleDeleteType}
      />

      {/* Theme Modal */}
      <ThemeModal 
        isOpen={isThemeModalOpen} 
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={theme}
        onSelect={setTheme}
      />

      {/* Sessions Management Modal */}
      <SessionsModal
        isOpen={isSessionsModalOpen}
        onClose={() => setIsSessionsModalOpen(false)}
        sessions={sessions}
        currentGrade={selectedGrade}
        onLoadSession={handleLoadSession}
        onContinuePending={handleContinuePending}
        onDuplicateSession={handleDuplicateSession}
        onDeleteSession={handleDeleteSession}
      />
    </div>
  );
}
