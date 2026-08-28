import React, { useState, FormEvent } from 'react';
import { ActivityType } from '../types';
import { COLOR_PRESETS } from '../data/activityTypes';
import { ActivityIconBadge } from './IconRenderer';
import { IconPicker } from './IconPicker';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Edit2, Trash2, Check, Sparkles, Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActivityTypesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTypes: ActivityType[];
  onSaveType: (type: ActivityType) => void;
  onDeleteType: (id: string) => void;
}

export function ActivityTypesModal({
  isOpen,
  onClose,
  activityTypes,
  onSaveType,
  onDeleteType
}: ActivityTypesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingType, setEditingType] = useState<ActivityType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Sparkles');
  const [color, setColor] = useState(COLOR_PRESETS[0].class);

  const startCreate = () => {
    setEditingType(null);
    setName('');
    setDescription('');
    setIcon('Sparkles');
    setColor(COLOR_PRESETS[0].class);
    setIsCreating(true);
  };

  const startEdit = (type: ActivityType) => {
    setEditingType(type);
    setName(type.name);
    setDescription(type.description || '');
    setIcon(type.icon);
    setColor(type.color || COLOR_PRESETS[0].class);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveType({
      id: editingType ? editingType.id : `type-custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || undefined,
      icon,
      color,
      isCustom: true
    });

    setIsCreating(false);
    setEditingType(null);
  };

  const filteredTypes = activityTypes.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 10 }}
          className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden max-h-[92vh] flex flex-col border border-slate-100"
        >
          {/* Header */}
          <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                  Tipos de Actividad
                </h3>
                <p className="text-xs text-slate-400 font-bold">
                  {activityTypes.length} tipos configurados para la sesión
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {isCreating ? (
              <form onSubmit={handleSave} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-black text-base text-slate-800">
                    {editingType ? 'Editar Tipo de Actividad' : 'Crear Nuevo Tipo de Actividad'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    ← Volver a la lista
                  </button>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center gap-4">
                  <ActivityIconBadge 
                    icon={icon} 
                    colorClass={color} 
                    size="lg" 
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-black text-base text-slate-800 truncate">
                      {name || 'Nombre del Tipo'}
                    </h5>
                    <p className="text-xs text-slate-500 truncate">
                      {description || 'Sin descripción'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1.5">
                      Nombre del Tipo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Speaking Task, Reading..."
                      className="w-full p-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1.5">
                      Descripción sugerida
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ej. Actividad oral en parejas"
                      className="w-full p-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    Icono
                  </label>
                  <IconPicker selectedIcon={icon} onSelectIcon={setIcon} />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    Color representativo
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setColor(preset.class)}
                        className={cn(
                          "p-2.5 rounded-xl border-2 font-bold text-xs flex items-center gap-2 transition-all text-left",
                          preset.class,
                          color === preset.class ? "ring-2 ring-blue-500 ring-offset-2 scale-102 font-black shadow-xs" : "opacity-80 hover:opacity-100"
                        )}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-current opacity-80 shrink-0" />
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-5 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white shadow-md flex items-center gap-2"
                  >
                    <Check size={16} /> Guardar Tipo
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Search and Add Top Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar tipos de actividad..."
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none font-bold text-sm bg-slate-50/50"
                    />
                  </div>
                  <button
                    onClick={startCreate}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all"
                  >
                    <Plus size={18} /> Nuevo Tipo
                  </button>
                </div>

                {/* Types Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[52vh] overflow-y-auto p-1">
                  {filteredTypes.map((type) => (
                    <div
                      key={type.id}
                      className="p-3.5 rounded-2xl border-2 border-slate-100 hover:border-blue-200 bg-white flex items-start gap-3 group transition-all"
                    >
                      <ActivityIconBadge 
                        icon={type.icon}
                        customImage={type.customImage}
                        colorClass={type.color}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {type.name}
                        </p>
                        {type.description && (
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {type.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(type)}
                          className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                          title="Editar tipo"
                        >
                          <Edit2 size={14} />
                        </button>
                        {type.isCustom && (
                          <button
                            onClick={() => onDeleteType(type.id)}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Eliminar tipo"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-900 transition-all"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
