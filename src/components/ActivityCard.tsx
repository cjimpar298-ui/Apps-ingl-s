import React, { useState } from 'react';
import { Activity, ActivityType } from '../types';
import { ActivityIconBadge } from './IconRenderer';
import { 
  GripVertical, 
  Edit3, 
  Check, 
  Copy, 
  Trash2, 
  Sparkles, 
  Zap, 
  CheckCheck,
  ChevronDown,
  Palette
} from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../lib/utils';
import { COLOR_PRESETS } from '../data/activityTypes';

interface ActivityCardProps {
  key?: string | number;
  activity: Activity;
  activityTypes?: ActivityType[];
  isSelected?: boolean;
  onToggleSelect?: (activity: Activity, selected: boolean) => void;
  onEdit?: (activity: Activity) => void;
  onUpdate?: (activity: Activity) => void;
  onDuplicate?: (activity: Activity) => void;
  onDelete?: (id: string) => void;
}

// Helper to map color classes to pastel banner backgrounds & dots
const COLOR_SWATCHES = [
  { id: 'rose', name: 'Coral', bgClass: 'bg-[#ffad9f]', borderClass: 'border-[#f87171]', dotClass: 'bg-[#ff9e99]', colorClass: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'orange', name: 'Naranja', bgClass: 'bg-[#ffcc99]', borderClass: 'border-[#fb923c]', dotClass: 'bg-[#fb923c]', colorClass: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'amber', name: 'Amarillo', bgClass: 'bg-[#fef08a]', borderClass: 'border-[#facc15]', dotClass: 'bg-[#fde047]', colorClass: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'emerald', name: 'Verde Menta', bgClass: 'bg-[#a1f3b8]', borderClass: 'border-[#4ade80]', dotClass: 'bg-[#86efac]', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'teal', name: 'Turquesa', bgClass: 'bg-[#99f6e4]', borderClass: 'border-[#2dd4bf]', dotClass: 'bg-[#5eead4]', colorClass: 'bg-teal-100 text-teal-800 border-teal-300' },
  { id: 'sky', name: 'Azul Cielo', bgClass: 'bg-[#9ecaff]', borderClass: 'border-[#60a5fa]', dotClass: 'bg-[#93c5fd]', colorClass: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'indigo', name: 'Índigo', bgClass: 'bg-[#c7d2fe]', borderClass: 'border-[#818cf8]', dotClass: 'bg-[#a5b4fc]', colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { id: 'purple', name: 'Lila / Púrpura', bgClass: 'bg-[#e9d5ff]', borderClass: 'border-[#c084fc]', dotClass: 'bg-[#d8b4fe]', colorClass: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'pink', name: 'Rosa Pastel', bgClass: 'bg-[#fbcfe8]', borderClass: 'border-[#f472b6]', dotClass: 'bg-[#f472b6]', colorClass: 'bg-pink-100 text-pink-800 border-pink-300' },
  { id: 'cyan', name: 'Cian Claro', bgClass: 'bg-[#a5f3fc]', borderClass: 'border-[#38bdf8]', dotClass: 'bg-[#67e8f9]', colorClass: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
];

function getBannerColor(colorClass: string = ''): { bannerBg: string; borderAccent: string } {
  const match = COLOR_SWATCHES.find(s => colorClass.includes(s.id) || colorClass === s.colorClass);
  if (match) {
    return { bannerBg: match.bgClass, borderAccent: match.borderClass };
  }
  // Fallbacks
  if (colorClass.includes('rose') || colorClass.includes('red')) return { bannerBg: 'bg-[#ffad9f]', borderAccent: 'border-rose-300' };
  if (colorClass.includes('emerald') || colorClass.includes('green')) return { bannerBg: 'bg-[#a1f3b8]', borderAccent: 'border-emerald-300' };
  if (colorClass.includes('blue') || colorClass.includes('sky')) return { bannerBg: 'bg-[#9ecaff]', borderAccent: 'border-blue-300' };
  if (colorClass.includes('amber') || colorClass.includes('yellow')) return { bannerBg: 'bg-[#fef08a]', borderAccent: 'border-amber-300' };
  if (colorClass.includes('purple')) return { bannerBg: 'bg-[#e9d5ff]', borderAccent: 'border-purple-300' };
  if (colorClass.includes('pink')) return { bannerBg: 'bg-[#fbcfe8]', borderAccent: 'border-pink-300' };
  return { bannerBg: 'bg-slate-200', borderAccent: 'border-slate-300' };
}

export function SortableActivityCard({
  activity,
  activityTypes = [],
  isSelected = false,
  onToggleSelect,
  onEdit,
  onUpdate,
  onDuplicate,
  onDelete
}: ActivityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [name, setName] = useState(activity.name);
  const [description, setDescription] = useState(activity.description || '');
  const [color, setColor] = useState(activity.color);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  const bannerTheme = getBannerColor(isInlineEditing ? color : activity.color);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelect?.(activity, !isSelected);
  };

  const handleSaveInline = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!name.trim()) return;
    onUpdate?.({
      ...activity,
      name: name.trim(),
      description: description.trim() || undefined,
      color
    });
    setIsInlineEditing(false);
    setShowTypeSelector(false);
  };

  const handleSelectType = (type: ActivityType) => {
    setName(type.name);
    if (type.description) setDescription(type.description);
    if (type.color) setColor(type.color);
    setShowTypeSelector(false);
    onUpdate?.({
      ...activity,
      name: type.name,
      icon: type.icon,
      typeId: type.id,
      color: type.color || color,
      description: type.description || description || undefined
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-[2rem] border-2 transition-all flex flex-col justify-between select-none overflow-hidden bg-white w-full max-w-full shadow-xs hover:shadow-md",
        isSelected 
          ? "border-purple-500 shadow-md ring-4 ring-purple-400/25 scale-[1.01]" 
          : "border-slate-200/90 hover:border-slate-300",
        isDragging ? "shadow-2xl border-purple-500 rotate-2 scale-105 z-50 bg-white" : ""
      )}
    >
      {/* 1. TOP HEADER BANNER (Pastel Strip with Icon, Drag, Title & Checkbox) */}
      <div className={cn(
        "px-3.5 py-3.5 flex items-center justify-between gap-2.5 transition-colors relative border-b border-black/5",
        bannerTheme.bannerBg
      )}>
        {/* Left: Drag Handle */}
        <div 
          {...attributes} 
          {...listeners}
          className="w-7 h-7 -ml-1 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-black/10 text-slate-700/60 hover:text-slate-900 transition-all touch-none shrink-0"
          title="Arrastrar para reordenar"
        >
          <GripVertical size={17} />
        </div>

        {/* Center-Left: Icon Badge */}
        <div 
          onClick={() => {
            if (isInlineEditing && onEdit) {
              onEdit(activity);
            }
          }}
          className={cn(
            "shrink-0 cursor-pointer",
            isInlineEditing && "hover:scale-110 transition-transform"
          )}
          title={isInlineEditing ? "Haz clic para cambiar icono o imagen personalizada" : undefined}
        >
          <ActivityIconBadge 
            icon={activity.icon}
            customImage={activity.customImage}
            colorClass={isInlineEditing ? color : activity.color}
            size="md"
            className="shadow-2xs rounded-2xl border-2 border-white/80 bg-white"
          />
        </div>

        {/* Center: Title / Editable Input */}
        <div className="flex-1 min-w-0 px-1">
          {isInlineEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre..."
              autoFocus
              className="w-full px-2.5 py-1.5 rounded-xl bg-white/95 border border-black/15 font-black text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-inner"
            />
          ) : (
            <h3 className="font-black text-sm text-slate-900 truncate leading-tight">
              {activity.name}
            </h3>
          )}
        </div>

        {/* Right: Tactile Big Checkbox (min 44x44 tap target) */}
        <button
          type="button"
          onClick={handleCheckboxClick}
          aria-label={isSelected ? `Desmarcar ${activity.name}` : `Seleccionar ${activity.name} para hoy`}
          className="w-10 h-10 -mr-1 rounded-2xl flex items-center justify-center hover:bg-black/10 active:scale-90 transition-transform shrink-0"
          title={isSelected ? "Quitar de la sesión de hoy" : "Marcar para la sesión de hoy"}
        >
          <div className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center transition-all border-2 shadow-xs",
            isSelected 
              ? "bg-purple-600 border-purple-600 text-white scale-105" 
              : "border-slate-400/80 bg-white/90 hover:border-purple-500"
          )}>
            {isSelected && <Check size={18} strokeWidth={3.5} />}
          </div>
        </button>
      </div>

      {/* 2. CARD BODY (Description, Inline-Edit Controls, Quick Action Buttons) */}
      <div className="p-4 bg-white flex flex-col justify-between flex-1 space-y-3">
        {isInlineEditing ? (
          /* INLINE EDIT VIEW (as in left card of user's image) */
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Description input */}
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción / páginas (ej: Classbook page 30)..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Type selector toggle button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTypeSelector(!showTypeSelector)}
                className="w-full py-2 px-3 rounded-xl border border-dashed border-purple-300 bg-purple-50/60 hover:bg-purple-100/70 text-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Zap size={14} className="fill-purple-600 text-purple-600" />
                <span>Elegir tipo de actividad</span>
                <ChevronDown size={13} className={cn("transition-transform", showTypeSelector && "rotate-180")} />
              </button>

              {/* Type dropdown / popover */}
              {showTypeSelector && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-30 max-h-48 overflow-y-auto space-y-1">
                  {activityTypes.slice(0, 10).map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleSelectType(type)}
                      className="w-full p-1.5 rounded-lg text-left hover:bg-purple-50 text-xs font-bold text-slate-700 flex items-center gap-2 transition-all"
                    >
                      <ActivityIconBadge icon={type.icon} size="sm" colorClass={type.color} />
                      <span className="truncate">{type.name}</span>
                    </button>
                  ))}
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowTypeSelector(false);
                        onEdit(activity);
                      }}
                      className="w-full p-2 text-center text-[11px] font-bold text-purple-600 hover:underline border-t border-slate-100 mt-1"
                    >
                      Ver todos los tipos & iconos...
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Color Swatch Picker Circles */}
            <div>
              <div className="flex items-center gap-1.5 flex-wrap justify-center py-1">
                {COLOR_SWATCHES.map((swatch) => {
                  const isCur = color.includes(swatch.id) || color === swatch.colorClass;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setColor(swatch.colorClass)}
                      className={cn(
                        "w-6 h-6 rounded-full transition-transform active:scale-90 border-2",
                        swatch.dotClass,
                        isCur ? "ring-2 ring-purple-600 ring-offset-1 scale-110 border-white shadow-xs" : "border-black/10 hover:scale-105"
                      )}
                      title={swatch.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Save, Duplicate, Delete Toolbar */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleSaveInline}
                className="flex-1 py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <Check size={15} strokeWidth={3} />
                <span>Guardar</span>
              </button>

              {onDuplicate && (
                <button
                  type="button"
                  onClick={() => {
                    onDuplicate(activity);
                    setIsInlineEditing(false);
                  }}
                  className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-all shrink-0"
                  title="Duplicar actividad"
                >
                  <Copy size={14} />
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(activity.id)}
                  className="w-9 h-9 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 flex items-center justify-center transition-all shrink-0"
                  title="Eliminar actividad"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* REGULAR VIEW (as in Cards 2 & 3 in user's image) */
          <>
            {/* Description text */}
            <div className="min-h-[32px] flex items-center">
              {activity.description ? (
                <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>
              ) : (
                <p className="text-[11px] font-medium text-slate-300 italic">
                  Sin descripción adicional
                </p>
              )}
            </div>

            {/* Bottom Action Buttons (Editar, Duplicar, Eliminar) */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              {/* Editar Button */}
              <button
                type="button"
                onClick={() => {
                  setName(activity.name);
                  setDescription(activity.description || '');
                  setColor(activity.color);
                  setIsInlineEditing(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-slate-200/70"
              >
                <span>✏️</span>
                <span>Editar</span>
              </button>

              {/* Duplicar Button */}
              {onDuplicate && (
                <button
                  type="button"
                  onClick={() => onDuplicate(activity)}
                  className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all shrink-0"
                  title="Duplicar tarjeta"
                >
                  <Copy size={13} />
                </button>
              )}

              {/* Eliminar Button */}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(activity.id)}
                  className="w-8 h-8 rounded-xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-100 text-rose-500 hover:text-rose-700 flex items-center justify-center transition-all shrink-0"
                  title="Eliminar tarjeta del banco"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
