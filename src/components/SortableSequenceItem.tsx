import { Activity } from '../types';
import { ActivityIconBadge } from './IconRenderer';
import { GripVertical, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../lib/utils';

interface SortableSequenceItemProps {
  key?: string | number;
  activity: Activity;
  index: number;
  onRemove: (index: number) => void;
}

export function SortableSequenceItem({
  activity,
  index,
  onRemove
}: SortableSequenceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border-2 transition-all shadow-xs group",
        isDragging ? "shadow-xl border-blue-400 rotate-1 scale-102" : "border-slate-100 hover:border-slate-200"
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {/* Step Index number */}
        <span className="w-8 h-8 rounded-xl bg-slate-100 font-black text-xs text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
          {index + 1}
        </span>

        {/* Chunky Icon */}
        <ActivityIconBadge 
          icon={activity.icon}
          customImage={activity.customImage}
          colorClass={activity.color}
          size="sm"
        />

        {/* Title & Description */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-800 text-sm truncate">
            {activity.name}
          </h4>
          {activity.description && (
            <p className="text-xs text-slate-400 truncate">
              {activity.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-2">
        <button
          onClick={() => onRemove(index)}
          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Eliminar de la sesión"
        >
          <Trash2 size={18} />
        </button>
        <div 
          {...attributes} 
          {...listeners} 
          className="cursor-grab active:cursor-grabbing p-2 text-slate-300 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all touch-none"
          title="Arrastrar para reordenar"
        >
          <GripVertical size={18} />
        </div>
      </div>
    </div>
  );
}
