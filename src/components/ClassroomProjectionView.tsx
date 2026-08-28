import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  Maximize, 
  Minimize,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Trophy,
  Sparkles
} from 'lucide-react';
import { Activity, ActivityType, Grade } from '../types';
import { ActivityIconBadge } from './IconRenderer';
import { cn } from '../lib/utils';
import { 
  playActivityTransitionSound, 
  playActivityCompletedSound, 
  playCardTapSound, 
  playSessionVictorySound 
} from '../lib/soundEffects';

interface ClassroomProjectionViewProps {
  sequence: Activity[];
  activityTypes: ActivityType[];
  selectedGrade: Grade;
  ls: string;
  greeting: string;
  completedIds: Set<string>;
  onToggleCompleted: (id: string) => void;
  onResetCompleted: () => void;
  onClose: () => void;
  onNewSession: () => void;
}

export function ClassroomProjectionView({
  sequence,
  activityTypes,
  selectedGrade,
  ls,
  greeting,
  completedIds,
  onToggleCompleted,
  onResetCompleted,
  onClose,
  onNewSession,
}: ClassroomProjectionViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalActivities = sequence.length;
  const completedCount = sequence.filter(act => completedIds.has(act.id)).length;
  const isAllCompleted = totalActivities > 0 && completedCount === totalActivities;

  // Find index of the first uncompleted activity
  const firstUncompletedIndex = sequence.findIndex(act => !completedIds.has(act.id));
  const activeIndex = firstUncompletedIndex !== -1 ? firstUncompletedIndex : totalActivities - 1;
  const prevActiveIndexRef = useRef<number>(activeIndex);
  const isInitialMount = useRef(true);

  // Play transition sound when active activity changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevActiveIndexRef.current = activeIndex;
      return;
    }

    if (prevActiveIndexRef.current !== activeIndex) {
      prevActiveIndexRef.current = activeIndex;
      if (isAllCompleted) {
        playSessionVictorySound(isSoundEnabled);
      } else {
        playActivityTransitionSound(isSoundEnabled);
      }
    }
  }, [activeIndex, isAllCompleted, isSoundEnabled]);

  // Auto-scroll active card into view if overflowing
  useEffect(() => {
    if (scrollContainerRef.current && activeIndex >= 0) {
      const activeEl = scrollContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation (Space or Right Arrow = Next/Done, Esc = Close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [firstUncompletedIndex, sequence, completedIds, isSoundEnabled]);

  // Handle clicking "Siguiente ➔"
  const handleNext = () => {
    if (firstUncompletedIndex !== -1 && firstUncompletedIndex < sequence.length) {
      const nextAct = sequence[firstUncompletedIndex];
      onToggleCompleted(nextAct.id);

      const willBeAllCompleted = sequence.every(act => act.id === nextAct.id || completedIds.has(act.id));
      if (willBeAllCompleted) {
        playSessionVictorySound(isSoundEnabled);
      } else {
        playActivityCompletedSound(isSoundEnabled);
      }
    }
  };

  const scrollLeft = () => {
    playCardTapSound(isSoundEnabled);
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    playCardTapSound(isSoundEnabled);
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleCardClick = (activityId: string) => {
    const isCurrentlyDone = completedIds.has(activityId);
    onToggleCompleted(activityId);

    if (!isCurrentlyDone) {
      const willBeAllCompleted = sequence.every(act => act.id === activityId || completedIds.has(act.id));
      if (willBeAllCompleted) {
        playSessionVictorySound(isSoundEnabled);
      } else {
        playActivityCompletedSound(isSoundEnabled);
      }
    } else {
      playCardTapSound(isSoundEnabled);
    }
  };

  // Compute activity badge label and style
  const getActivityBadge = (activity: Activity, index: number, isDone: boolean) => {
    if (isDone) {
      return {
        label: '✓ DONE',
        className: 'bg-slate-100 text-slate-500 border-slate-200'
      };
    }

    // Check if activity has a custom type
    const matchedType = activityTypes.find(t => t.id === activity.typeId);
    if (matchedType) {
      return {
        label: matchedType.name.toUpperCase(),
        className: matchedType.color || 'bg-blue-100 text-blue-800 border-blue-200'
      };
    }

    // Default sequential badges matching screenshot style
    if (index === 0) {
      return {
        label: activity.name.toLowerCase().includes('challenge') ? 'CHALLENGE' : (activity.name.length <= 15 ? activity.name.toUpperCase() : 'CHALLENGE'),
        className: 'bg-rose-100 text-rose-800 border-rose-200'
      };
    }

    if (index === 1) {
      return {
        label: 'ACTIVITY 1',
        className: 'bg-sky-100 text-sky-800 border-sky-200'
      };
    }

    if (index === 2) {
      return {
        label: 'ACTIVITY 2',
        className: 'bg-emerald-100 text-emerald-800 border-emerald-200'
      };
    }

    return {
      label: `ACTIVITY ${index}`,
      className: 'bg-purple-100 text-purple-800 border-purple-200'
    };
  };

  // Grade subtitle display
  const gradeDigits = selectedGrade.replace(/[^0-9]/g, '');
  const gradeText = gradeDigits ? `${gradeDigits}º de Primaria` : selectedGrade;
  
  const lsDigits = ls.replace(/[^0-9]/g, '').trim();
  const lsText = lsDigits ? `LS ${lsDigits}` : (ls || 'LS 1');
  const lsCleanNumber = lsDigits || '1';
  const remainingCount = Math.max(0, totalActivities - completedCount);
  const progressPercent = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#edf9f2] flex flex-col justify-between p-3 sm:p-5 lg:p-6 font-sans">
      
      {/* Top Bar: Volver (Left), Progress Capsule (Center), Controls (Right) */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span>Volver</span>
        </button>

        {/* Top Central Progress Badge (Visible on medium+ screens) */}
        {totalActivities > 0 && (
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-black">
              {isAllCompleted ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Trophy size={15} className="fill-amber-400 text-amber-500" />
                  <span>¡100% Completado!</span>
                </span>
              ) : (
                <>
                  <span className="text-slate-500 font-bold hidden md:inline">Progreso:</span>
                  <span className="text-purple-700 font-black">{completedCount}/{totalActivities}</span>
                  <span className="text-slate-400 font-semibold text-[11px]">({progressPercent}%)</span>
                </>
              )}
            </div>
            <div className="w-20 sm:w-28 md:w-36 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
              <div 
                className={cn(
                  "h-full transition-all duration-500 rounded-full",
                  isAllCompleted 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400" 
                    : "bg-gradient-to-r from-purple-600 to-rose-400"
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextState = !isSoundEnabled;
              setIsSoundEnabled(nextState);
              if (nextState) {
                playActivityTransitionSound(true);
              }
            }}
            className={cn(
              "p-2 rounded-xl border shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 px-3 text-xs font-bold",
              isSoundEnabled 
                ? "bg-white hover:bg-slate-50 border-slate-200 text-purple-700"
                : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-400"
            )}
            title={isSoundEnabled ? "Efectos de sonido activados (pulsa para silenciar)" : "Sonido silenciado (pulsa para activar)"}
          >
            {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span className="hidden sm:inline">{isSoundEnabled ? "Sonido" : "Silencio"}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-xs transition-all active:scale-95 cursor-pointer"
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa (PDI / TV)"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      {/* Main Projection Board Card */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col bg-white rounded-3xl sm:rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden relative">
        
        {/* ========================================================================= */}
        {/* 1. HEADER BANNER (Purple in-progress / Emerald when all done)               */}
        {/* ========================================================================= */}
        <div 
          className={cn(
            "p-5 sm:p-7 lg:p-8 text-white transition-all duration-500 relative flex items-center justify-between",
            isAllCompleted
              ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500"
              : "bg-gradient-to-r from-purple-700 via-purple-600 to-rose-600"
          )}
        >
          {/* Header Texts */}
          <div className="pr-4">
            <div className="flex items-center gap-3">
              {isAllCompleted && (
                <span className="text-3xl sm:text-4xl animate-bounce">
                  🎉
                </span>
              )}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase drop-shadow-xs">
                {isAllCompleted 
                  ? 'GREAT JOB, CLASS!' 
                  : (greeting || 'GOOD MORNING CLASS!')
                }
              </h1>
            </div>
            <p className="text-xs sm:text-base lg:text-lg font-bold text-white/90 mt-1 tracking-wide">
              {gradeText} · {lsText}
            </p>
          </div>

          {/* Right LS Badge Box */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 px-4 sm:px-5 text-center border border-white/20 shadow-xs flex flex-col items-center justify-center shrink-0 min-w-[64px] sm:min-w-[80px]">
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-white/80 uppercase">
              LS
            </span>
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-none mt-0.5">
              {lsCleanNumber}
            </span>
          </div>
        </div>

        {/* Decorative Accent Underline */}
        <div className="h-1 w-full bg-gradient-to-r from-rose-400 via-purple-400 to-pink-400" />

        {/* ========================================================================= */}
        {/* 1.5. VISUAL PROGRESS BAR & STEP INDICATOR (Classroom Projection Avance)   */}
        {/* ========================================================================= */}
        {totalActivities > 0 && (
          <div className="bg-slate-50/95 border-b border-slate-200/80 px-4 sm:px-7 py-3 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  {isAllCompleted ? (
                    <span className="text-emerald-700 flex items-center gap-1.5 font-black">
                      <Trophy size={16} className="text-amber-500 fill-amber-400 animate-bounce" />
                      ¡Todas las actividades completadas con éxito!
                    </span>
                  ) : (
                    <>
                      <Sparkles size={15} className="text-purple-600 fill-purple-200" />
                      <span>Avance de la sesión:</span>
                      <span className="text-purple-700 font-extrabold">{completedCount} de {totalActivities} actividades</span>
                    </>
                  )}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-500">
                {isAllCompleted ? (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <Check size={14} strokeWidth={3} />
                    100% Completado
                  </span>
                ) : remainingCount === 1 ? (
                  <span className="text-amber-600 font-extrabold">
                    🔥 ¡Última actividad para terminar!
                  </span>
                ) : (
                  <span>
                    Quedan <strong className="text-slate-800 font-black">{remainingCount}</strong> por terminar
                  </span>
                )}
              </div>
            </div>

            {/* Smooth Fill Progress Track Bar */}
            <div className="relative w-full h-2.5 sm:h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out shadow-xs",
                  isAllCompleted 
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400" 
                    : "bg-gradient-to-r from-purple-600 via-rose-500 to-amber-400"
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step badges for each activity */}
            {totalActivities <= 12 && (
              <div 
                className="grid gap-1.5 mt-2.5" 
                style={{ gridTemplateColumns: `repeat(${totalActivities}, minmax(0, 1fr))` }}
              >
                {sequence.map((act, i) => {
                  const isDone = completedIds.has(act.id);
                  const isActive = i === activeIndex && !isAllCompleted;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => handleCardClick(act.id)}
                      className={cn(
                        "py-1 px-1.5 rounded-lg text-[10px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 truncate border cursor-pointer select-none",
                        isDone 
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                          : isActive
                          ? "bg-purple-600 text-white border-purple-700 shadow-xs ring-2 ring-purple-400/30 scale-[1.02]"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      )}
                      title={`${act.name} (${isDone ? 'Completada' : 'Pendiente'})`}
                    >
                      {isDone ? (
                        <Check size={11} strokeWidth={3} className="text-emerald-700 shrink-0" />
                      ) : (
                        <span className="shrink-0 font-bold">{i + 1}</span>
                      )}
                      <span className="hidden md:inline truncate">{act.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. ACTIVITY COLUMNS BOARD (Horizontal scrollable with comfortable widths)  */}
        {/* ========================================================================= */}
        {sequence.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <p className="text-lg font-bold text-slate-500">
              No hay actividades en esta sesión.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 transition-all cursor-pointer"
            >
              Añadir actividades
            </button>
          </div>
        ) : (
          <div className="flex-1 relative flex items-stretch overflow-hidden">
            
            {/* Left Scroll Arrow (Visible when multiple activities) */}
            {sequence.length > 3 && (
              <button
                type="button"
                onClick={scrollLeft}
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Desplazar a la izquierda"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Right Scroll Arrow (Visible when multiple activities) */}
            {sequence.length > 3 && (
              <button
                type="button"
                onClick={scrollRight}
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Desplazar a la derecha"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Scrollable Container with flexible cards */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 flex flex-row divide-x divide-slate-100 min-h-[360px] sm:min-h-[420px] overflow-x-auto scrollbar-thin snap-x snap-mandatory"
            >
              {sequence.map((activity, idx) => {
                const isDone = completedIds.has(activity.id);
                const isActive = idx === activeIndex && !isDone;
                const badge = getActivityBadge(activity, idx, isDone);

                return (
                  <div
                    key={activity.id}
                    onClick={() => handleCardClick(activity.id)}
                    className={cn(
                      "snap-center cursor-pointer group flex flex-col justify-between items-center py-7 sm:py-9 px-5 sm:px-8 relative select-none transition-all duration-300 shrink-0",
                      // When 1-3 activities, make them fill the space evenly; when 4+, enforce a min-width of 240px
                      sequence.length <= 3 ? "flex-1 min-w-[240px]" : "w-[260px] sm:w-[280px] lg:w-[300px]",
                      isActive ? "bg-rose-50/40" : "bg-white hover:bg-slate-50/60",
                      isDone && "bg-slate-50/40"
                    )}
                  >
                    {/* Active Column Top Highlight Line */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-400 z-10" />
                    )}

                    {/* Top Badge (CHALLENGE / ACTIVITY 1 / DONE) */}
                    <div className="w-full flex justify-center">
                      <span
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wider border shadow-2xs transition-all whitespace-nowrap",
                          badge.className
                        )}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {/* Center Large Polychromatic Pictogram / Icon / Emoji */}
                    <div className="my-auto py-5 sm:py-7 flex items-center justify-center w-full">
                      <div 
                        className={cn(
                          "transition-all duration-300 flex items-center justify-center transform group-hover:scale-105",
                          isDone 
                            ? "grayscale opacity-30 scale-90" 
                            : "opacity-100 scale-100 drop-shadow-md"
                        )}
                      >
                        <ActivityIconBadge 
                          icon={activity.icon || 'Sparkles'}
                          customImage={activity.customImage}
                          colorClass={activity.color || 'bg-blue-100 text-blue-800 border-blue-200'}
                          size="2xl"
                          className="shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Bottom Activity Name & Prompt */}
                    <div className="text-center w-full">
                      <h3 
                        className={cn(
                          "text-base sm:text-xl transition-all line-clamp-2 leading-tight",
                          isDone 
                            ? "line-through text-slate-400 font-semibold" 
                            : "font-black text-slate-800"
                        )}
                      >
                        {activity.name}
                      </h3>

                      {/* Active prompt text */}
                      {isActive && (
                        <p className="text-xs sm:text-sm font-bold text-purple-600 mt-2 flex items-center justify-center gap-1.5">
                          <span>Pulsa para marcar</span>
                          <span className="font-black">✓</span>
                        </p>
                      )}

                      {/* Optional description if provided */}
                      {activity.description && !isActive && !isDone && (
                        <p className="text-xs font-semibold text-slate-400 mt-1 line-clamp-1">
                          {activity.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. BOTTOM FOOTER TOOLBAR (Progress Dots & Action Buttons)                 */}
        {/* ========================================================================= */}
        <div className="p-3.5 sm:p-4 px-5 sm:px-7 bg-white border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          
          {/* Left: Dot Indicators & Progress Count */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap max-w-xs sm:max-w-md">
              {sequence.map((act, i) => {
                const isDone = completedIds.has(act.id);
                const isCurrent = i === activeIndex && !isDone;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleCardClick(act.id)}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer",
                      isDone 
                        ? "bg-purple-600 text-white shadow-2xs hover:scale-110" 
                        : isCurrent
                        ? "bg-purple-600 ring-2 ring-purple-300 shadow-2xs"
                        : "bg-slate-200 text-transparent hover:bg-slate-300"
                    )}
                    title={act.name}
                  >
                    {isDone && <Check size={12} strokeWidth={3.5} />}
                  </button>
                );
              })}
            </div>
            
            <span className="text-xs sm:text-sm font-black text-slate-600 ml-1 whitespace-nowrap">
              {completedCount}/{totalActivities} completadas
            </span>
          </div>

          {/* Right: Reiniciar & Siguiente / Nueva sesión */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Reiniciar Button */}
            <button
              type="button"
              onClick={() => {
                playCardTapSound(isSoundEnabled);
                onResetCompleted();
              }}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reiniciar</span>
            </button>

            {/* Next or New Session Button */}
            {isAllCompleted ? (
              <button
                type="button"
                onClick={() => {
                  playCardTapSound(isSoundEnabled);
                  onNewSession();
                }}
                className="px-5 sm:px-7 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Check size={15} strokeWidth={3} />
                <span>Nueva sesión</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={sequence.length === 0}
                className="px-5 sm:px-7 py-2 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight size={15} strokeWidth={3} />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Bottom spacer */}
      <div className="h-1" />
    </div>
  );
}
