import React, { useState, useMemo } from 'react';
import { ClassSession, Grade, GRADES } from '../types';
import { ActivityIconBadge } from './IconRenderer';
import { formatSpanishDate, formatVisualDateBadge, compareWithToday } from '../lib/dateUtils';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Calendar,
  Layers,
  Clock,
  CheckCircle2,
  Play,
  RotateCcw,
  Copy,
  Trash2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  AlertTriangle,
  History,
  Archive
} from 'lucide-react';
import { cn } from '../lib/utils';

type SessionTab = 'upcoming' | 'recent' | 'archive';

interface SessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ClassSession[];
  currentGrade: Grade;
  onLoadSession: (session: ClassSession) => void;
  onContinuePending: (session: ClassSession) => void;
  onDuplicateSession: (session: ClassSession) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function SessionsModal({
  isOpen,
  onClose,
  sessions,
  currentGrade,
  onLoadSession,
  onContinuePending,
  onDuplicateSession,
  onDeleteSession
}: SessionsModalProps) {
  const [activeTab, setActiveTab] = useState<SessionTab>('upcoming');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>(currentGrade);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionToDeleteId, setSessionToDeleteId] = useState<string | null>(null);

  // Classify sessions into Upcoming, Recent, Archive
  const categorizedSessions = useMemo(() => {
    const upcoming: ClassSession[] = [];
    const recent: ClassSession[] = [];
    const archive: ClassSession[] = [];

    // Sort all sessions by plannedDate descending (most recent first)
    const sorted = [...sessions].sort((a, b) => {
      if (a.plannedDate === b.plannedDate) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.plannedDate.localeCompare(a.plannedDate);
    });

    sorted.forEach(session => {
      const dateComparison = compareWithToday(session.plannedDate);

      if (session.status === 'in_progress') {
        recent.push(session);
      } else if (session.status === 'completed') {
        if (dateComparison === 'today' || dateComparison === 'future') {
          recent.push(session);
        } else {
          // If completed within last 3 days, show in recent, otherwise archive
          archive.push(session);
        }
      } else {
        // Status is 'planned'
        if (dateComparison === 'future' || dateComparison === 'today') {
          upcoming.push(session);
        } else {
          archive.push(session);
        }
      }
    });

    // Sort upcoming ascending by date (nearest first)
    upcoming.sort((a, b) => a.plannedDate.localeCompare(b.plannedDate));

    return { upcoming, recent, archive };
  }, [sessions]);

  // Apply Tab, Grade, and Search filters
  const displayedSessions = useMemo(() => {
    let list: ClassSession[] = [];
    if (activeTab === 'upcoming') list = categorizedSessions.upcoming;
    else if (activeTab === 'recent') list = categorizedSessions.recent;
    else list = categorizedSessions.archive;

    return list.filter(session => {
      // 1. Grade filter
      if (selectedGradeFilter !== 'all') {
        if (session.grade !== selectedGradeFilter) return false;
      }

      // 2. Search query (title, LS, date, activities)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = session.name?.toLowerCase().includes(q);
        const matchesLS = session.ls?.toLowerCase().includes(q);
        const matchesDate = session.plannedDate?.includes(q) || formatSpanishDate(session.plannedDate).includes(q);
        const matchesGreeting = session.greeting?.toLowerCase().includes(q);
        const matchesActivity = session.activities?.some(a => a.name.toLowerCase().includes(q));

        return matchesName || matchesLS || matchesDate || matchesGreeting || matchesActivity;
      }

      return true;
    });
  }, [categorizedSessions, activeTab, selectedGradeFilter, searchQuery]);

  // Counts per tab (overall)
  const tabCounts = {
    upcoming: categorizedSessions.upcoming.length,
    recent: categorizedSessions.recent.length,
    archive: categorizedSessions.archive.length
  };

  const handleDeleteConfirm = (sessionId: string) => {
    onDeleteSession(sessionId);
    setSessionToDeleteId(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-5xl sm:rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col border border-slate-100"
        >
          {/* Header */}
          <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-blue-50/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-200 shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    Planificación & Gestión
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {sessions.length} sesiones registradas
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
                  Sesiones de Clase Fechadas
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 rounded-full transition-colors active:scale-95"
              title="Cerrar ventana"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Controls: 3 Tabs (Próximas, Recientes, Archivo) & Search */}
          <div className="px-5 py-3.5 sm:px-8 sm:py-4 bg-slate-50/80 border-b border-slate-100 shrink-0 space-y-3.5">
            {/* View Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('upcoming')}
                  className={cn(
                    "flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 select-none",
                    activeTab === 'upcoming'
                      ? "bg-white text-indigo-700 shadow-sm scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Calendar size={16} />
                  <span>Próximas</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black",
                    activeTab === 'upcoming' ? "bg-indigo-100 text-indigo-700" : "bg-slate-300/60 text-slate-600"
                  )}>
                    {tabCounts.upcoming}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('recent')}
                  className={cn(
                    "flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 select-none",
                    activeTab === 'recent'
                      ? "bg-white text-amber-700 shadow-sm scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <History size={16} />
                  <span>Recientes</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black",
                    activeTab === 'recent' ? "bg-amber-100 text-amber-700" : "bg-slate-300/60 text-slate-600"
                  )}>
                    {tabCounts.recent}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('archive')}
                  className={cn(
                    "flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 select-none",
                    activeTab === 'archive'
                      ? "bg-white text-slate-800 shadow-sm scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Archive size={16} />
                  <span>Archivo</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black",
                    activeTab === 'archive' ? "bg-slate-200 text-slate-800" : "bg-slate-300/60 text-slate-600"
                  )}>
                    {tabCounts.archive}
                  </span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por título, LS, fecha..."
                  className="w-full pl-9.5 pr-8 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none font-bold text-slate-800 text-xs sm:text-sm bg-white shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Course Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[11px] font-black uppercase text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Filter size={13} /> Curso:
              </span>
              
              <button
                type="button"
                onClick={() => setSelectedGradeFilter('all')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all select-none",
                  selectedGradeFilter === 'all'
                    ? "bg-slate-900 text-white shadow-xs scale-102"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                )}
              >
                Todos los cursos
              </button>

              {GRADES.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGradeFilter(g)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all select-none",
                    selectedGradeFilter === g
                      ? "bg-indigo-600 text-white shadow-xs scale-102"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Sessions List Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/40">
            {displayedSessions.length === 0 ? (
              <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                  <Calendar size={32} />
                </div>
                <h4 className="font-black text-lg text-slate-800 mb-1">
                  {searchQuery 
                    ? 'No hay sesiones que coincidan con la búsqueda' 
                    : activeTab === 'upcoming' 
                      ? 'No hay sesiones próximas preparadas' 
                      : activeTab === 'recent' 
                        ? 'No hay sesiones recientes' 
                        : 'No hay sesiones en el archivo'}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  {selectedGradeFilter !== 'all' 
                    ? `Filtro actual: ${selectedGradeFilter}. Puedes cambiar el filtro o preparar una nueva sesión en el constructor.` 
                    : 'Prepara tu próxima clase fechada desde el panel principal de Today\'s Sequence.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {displayedSessions.map(session => {
                  const dateBadge = formatVisualDateBadge(session.plannedDate);
                  const totalActivities = session.activities?.length || 0;
                  const completedCount = session.completedActivityIds?.length || 0;
                  const pendingCount = Math.max(0, totalActivities - completedCount);
                  const hasPartialProgress = completedCount > 0 && pendingCount > 0;
                  const isConfirmingDelete = sessionToDeleteId === session.id;

                  // Status badge styling
                  const statusConfig = {
                    planned: {
                      label: 'Preparada',
                      bg: 'bg-blue-100 text-blue-800 border-blue-200',
                      dot: 'bg-blue-500'
                    },
                    in_progress: {
                      label: 'En curso',
                      bg: 'bg-amber-100 text-amber-800 border-amber-200',
                      dot: 'bg-amber-500 animate-pulse'
                    },
                    completed: {
                      label: 'Finalizada',
                      bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                      dot: 'bg-emerald-500'
                    }
                  }[session.status] || {
                    label: 'Preparada',
                    bg: 'bg-blue-100 text-blue-800 border-blue-200',
                    dot: 'bg-blue-500'
                  };

                  return (
                    <div
                      key={session.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-100 hover:border-indigo-100 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      {/* Left: Date + Grade + Title + LS + Status */}
                      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                        {/* High Visual Priority: FECHA Badge + CURSO */}
                        <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-indigo-50 to-indigo-100/70 border-2 border-indigo-200 text-indigo-950 shrink-0 min-w-[76px] sm:min-w-[84px] shadow-xs text-center">
                          <span className="text-xl sm:text-2xl font-black leading-none tracking-tight">
                            {dateBadge.day}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-indigo-700 mt-0.5">
                            {dateBadge.monthShort}
                          </span>
                          <div className="w-full border-t border-indigo-200/80 my-1" />
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-indigo-600 text-white leading-tight">
                            {session.grade}
                          </span>
                        </div>

                        {/* Title, LS, Greeting, Metrics & Mini Preview */}
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Status Badge */}
                            <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider border flex items-center gap-1.5", statusConfig.bg)}>
                              <span className={cn("w-2 h-2 rounded-full", statusConfig.dot)} />
                              {statusConfig.label}
                            </span>

                            {/* LS tag */}
                            {session.ls && (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                                {session.ls}
                              </span>
                            )}

                            {/* Activity Count & Progress */}
                            <span className="text-xs font-bold text-slate-500">
                              {totalActivities} {totalActivities === 1 ? 'actividad' : 'actividades'}
                              {completedCount > 0 && (
                                <span className="ml-1 text-emerald-700 font-extrabold">
                                  ({completedCount} comp. {pendingCount > 0 ? `· ${pendingCount} pend.` : '✓'})
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Session Title */}
                          <h4 className="text-base sm:text-lg font-black text-slate-800 leading-snug line-clamp-1">
                            {session.name || 'Sesión sin título'}
                          </h4>

                          {/* Greeting info */}
                          {session.greeting && (
                            <p className="text-xs font-bold text-indigo-600 truncate">
                              "{session.greeting}"
                            </p>
                          )}

                          {/* Mini Activity Icons Preview */}
                          {session.activities && session.activities.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-0.5 max-w-full">
                              {session.activities.slice(0, 7).map((act, idx) => {
                                const isDone = session.completedActivityIds?.includes(act.id);
                                return (
                                  <div
                                    key={`${act.id}-${idx}`}
                                    className={cn(
                                      "relative shrink-0 rounded-xl p-0.5 transition-transform",
                                      isDone ? "opacity-90 ring-2 ring-emerald-400" : "opacity-100"
                                    )}
                                    title={`${idx + 1}. ${act.name}${isDone ? ' (Completada)' : ''}`}
                                  >
                                    <ActivityIconBadge
                                      icon={act.icon}
                                      customImage={act.customImage}
                                      colorClass={act.color}
                                      size="xs"
                                      className="shadow-2xs"
                                    />
                                    {isDone && (
                                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold">
                                        ✓
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              {session.activities.length > 7 && (
                                <span className="text-[10px] font-black text-slate-400 px-1">
                                  +{session.activities.length - 7} más
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end shrink-0">
                        {/* Delete confirmation inline */}
                        {isConfirmingDelete ? (
                          <div className="flex items-center gap-1.5 bg-rose-50 p-1 rounded-2xl border border-rose-200">
                            <span className="text-[11px] font-black text-rose-700 px-2">¿Eliminar?</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteConfirm(session.id)}
                              className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all"
                            >
                              Sí
                            </button>
                            <button
                              type="button"
                              onClick={() => setSessionToDeleteId(null)}
                              className="px-2.5 py-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <>
                            {/* Continuar pendientes (if session has pending activities) */}
                            {(hasPartialProgress || (session.status === 'in_progress' && pendingCount > 0)) && (
                              <button
                                type="button"
                                onClick={() => {
                                  onContinuePending(session);
                                  onClose();
                                }}
                                className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                                title="Crear nueva preparación con las actividades pendientes"
                              >
                                <RotateCcw size={14} strokeWidth={2.5} />
                                <span>Continuar pendientes</span>
                              </button>
                            )}

                            {/* Duplicar */}
                            <button
                              type="button"
                              onClick={() => onDuplicateSession(session)}
                              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all active:scale-95"
                              title="Duplicar esta sesión"
                            >
                              <Copy size={16} />
                            </button>

                            {/* Eliminar trigger */}
                            <button
                              type="button"
                              onClick={() => setSessionToDeleteId(session.id)}
                              className="p-2.5 rounded-xl border border-rose-100 hover:bg-rose-50 text-rose-500 hover:text-rose-700 text-xs font-bold transition-all active:scale-95"
                              title="Eliminar sesión"
                            >
                              <Trash2 size={16} />
                            </button>

                            {/* Cargar */}
                            <button
                              type="button"
                              onClick={() => {
                                onLoadSession(session);
                                onClose();
                              }}
                              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5 active:scale-95"
                            >
                              <Play size={14} className="fill-current" />
                              <span>Cargar</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 sm:px-8 sm:py-4 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500 font-bold shrink-0">
            <span>
              Mostrando {displayedSessions.length} de {sessions.length} sesiones
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
