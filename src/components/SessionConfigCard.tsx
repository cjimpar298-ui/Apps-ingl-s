import React from 'react';
import { Grade, GRADES, STANDARD_GREETINGS, Theme } from '../types';
import { formatVisualDateBadge, getTodayDateString } from '../lib/dateUtils';
import { Calendar, BookOpen, MessageSquare, Sparkles, Plus, RotateCcw, Check, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface SessionConfigCardProps {
  selectedGrade: Grade;
  onSelectGrade: (grade: Grade) => void;
  plannedDate: string;
  onChangePlannedDate: (date: string) => void;
  title: string;
  onChangeTitle: (title: string) => void;
  ls: string;
  onChangeLS: (ls: string) => void;
  greeting: string;
  onChangeGreeting: (greeting: string) => void;
  currentSessionId: string | null;
  onNewSession: () => void;
  totalGradeActivities: number;
  theme: Theme;
}

export function SessionConfigCard({
  selectedGrade,
  onSelectGrade,
  plannedDate,
  onChangePlannedDate,
  title,
  onChangeTitle,
  ls,
  onChangeLS,
  greeting,
  onChangeGreeting,
  currentSessionId,
  onNewSession,
  totalGradeActivities,
  theme
}: SessionConfigCardProps) {
  const dateBadge = formatVisualDateBadge(plannedDate);
  const isCustomGreeting = !STANDARD_GREETINGS.includes(greeting as any);

  return (
    <section className="bg-white p-5 sm:p-7 rounded-[2rem] shadow-xs border border-slate-100 space-y-5">
      {/* Top Meta Bar: Status / New Session reset button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
            1. Datos de la Sesión
          </h2>
          {currentSessionId ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
              Editando sesión guardada
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Nueva preparación
            </span>
          )}
        </div>

        {currentSessionId && (
          <button
            type="button"
            onClick={onNewSession}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all self-start sm:self-auto"
            title="Iniciar una nueva sesión en blanco"
          >
            <RotateCcw size={13} />
            <span>Nueva sesión en blanco</span>
          </button>
        )}
      </div>

      {/* Curso Selector (Tactile Large Buttons) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Curso
          </label>
          <span className="text-xs font-bold text-slate-500">
            Banco activo: <strong className="text-indigo-600 font-black">{selectedGrade}</strong> ({totalGradeActivities} actividades)
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {GRADES.map(g => {
            const isCurrent = selectedGrade === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => onSelectGrade(g)}
                className={cn(
                  "py-3.5 px-2 rounded-2xl font-black text-sm transition-all border-2 flex items-center justify-center text-center select-none active:scale-95",
                  isCurrent
                    ? cn(theme.primary, "border-transparent text-white shadow-md scale-102")
                    : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200"
                )}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Picker with High Visual Prominence */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Visual Date Badge + Input */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-50 to-indigo-50/50 p-3.5 rounded-2xl border-2 border-indigo-100 flex items-center gap-3.5">
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-white border-2 border-indigo-200 text-indigo-950 shadow-xs shrink-0 min-w-[68px] text-center">
            <span className="text-xl font-black leading-none tracking-tight">
              {dateBadge.day}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 mt-0.5">
              {dateBadge.monthShort}
            </span>
            <span className="text-[9px] font-bold text-slate-400 leading-none mt-0.5">
              {dateBadge.year}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-black uppercase tracking-wider text-indigo-900 block mb-1 flex items-center gap-1">
              <Calendar size={12} /> Fecha Prevista de Clase
            </label>
            <input
              type="date"
              value={plannedDate || getTodayDateString()}
              onChange={(e) => onChangePlannedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-2xs"
            />
          </div>
        </div>

        {/* LS (Situación de Aprendizaje) Input */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
            <BookOpen size={13} /> Situación de Aprendizaje (LS)
          </label>
          <input
            type="text"
            value={ls}
            onChange={(e) => onChangeLS(e.target.value)}
            placeholder="Ej. LS 2 · The Animal Kingdom o LS 3"
            className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white focus:outline-none font-bold text-slate-800 text-sm bg-slate-50/50 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Title / Name of the Session */}
      <div>
        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
          Título de la Sesión
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Ej. Unit 4: Daily Routines & Actions..."
          className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white focus:outline-none font-black text-slate-800 text-base sm:text-lg bg-slate-50/50 transition-all shadow-2xs"
        />
      </div>

      {/* Saludo / Greeting with Quick Presets + Custom Option */}
      <div>
        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
          <MessageSquare size={13} /> Saludo Inicial (Greeting)
        </label>
        
        <div className="flex flex-wrap gap-1.5 mb-2">
          {STANDARD_GREETINGS.map(preset => {
            const isSelected = greeting === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => onChangeGreeting(preset)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all select-none",
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs scale-102 font-black"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60"
                )}
              >
                {preset}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          value={greeting}
          onChange={(e) => onChangeGreeting(e.target.value)}
          placeholder="Escribe o personaliza el saludo de la clase..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none font-bold text-slate-800 text-xs sm:text-sm bg-white transition-all shadow-2xs"
        />
      </div>
    </section>
  );
}
