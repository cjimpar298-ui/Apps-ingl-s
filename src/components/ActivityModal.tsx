import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Activity, ActivityType } from '../types';
import { COLOR_PRESETS } from '../data/activityTypes';
import { IconPicker } from './IconPicker';
import { ActivityIconBadge } from './IconRenderer';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Trash2, Sparkles, Check, Info, Copy } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (activity: Activity) => void;
  initialActivity: Activity | null;
  activityTypes: ActivityType[];
  currentGradeName: string;
}

export function ActivityModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  onDuplicate,
  initialActivity,
  activityTypes,
  currentGradeName
}: ActivityModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Sparkles');
  const [color, setColor] = useState(COLOR_PRESETS[0].class);
  const [customImage, setCustomImage] = useState<string | undefined>(undefined);
  const [typeId, setTypeId] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'type' | 'custom'>('type');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialActivity) {
      setName(initialActivity.name);
      setDescription(initialActivity.description || '');
      setIcon(initialActivity.icon || 'Sparkles');
      setColor(initialActivity.color || COLOR_PRESETS[0].class);
      setCustomImage(initialActivity.customImage);
      setTypeId(initialActivity.typeId);
      setActiveTab('custom');
    } else {
      setName('');
      setDescription('');
      setIcon('Sparkles');
      setColor(COLOR_PRESETS[0].class);
      setCustomImage(undefined);
      setTypeId(undefined);
      setActiveTab('type');
    }
  }, [initialActivity, isOpen]);

  const handleSelectType = (selectedType: ActivityType) => {
    setTypeId(selectedType.id);
    setName(selectedType.name);
    setIcon(selectedType.icon);
    if (selectedType.color) {
      setColor(selectedType.color);
    }
    if (selectedType.description) {
      setDescription(selectedType.description);
    }
    setActiveTab('custom');
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialActivity ? initialActivity.id : '',
      name: name.trim(),
      description: description.trim() || undefined,
      icon,
      color,
      customImage,
      typeId
    });
  };

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
          className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden max-h-[92vh] flex flex-col border border-slate-100"
        >
          {/* Header */}
          <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-700">
                  {currentGradeName}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {initialActivity ? 'Editar actividad' : 'Nueva actividad'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                {initialActivity ? 'Configurar Actividad' : 'Añadir al Banco'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 px-6 sm:px-8 pt-3 gap-3 bg-white">
            <button
              type="button"
              onClick={() => setActiveTab('type')}
              className={cn(
                "pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all",
                activeTab === 'type'
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              <Sparkles size={16} />
              1. Elegir Tipo Predefinido
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={cn(
                "pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all",
                activeTab === 'custom'
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              2. Personalizar Actividad
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'type' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Selecciona un tipo para auto-completar los datos:
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('custom')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Crear desde cero →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[50vh] overflow-y-auto p-1">
                  {activityTypes.map((type) => {
                    const isSelected = typeId === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleSelectType(type)}
                        className={cn(
                          "p-3 rounded-2xl border-2 text-left flex items-start gap-3 transition-all group",
                          isSelected
                            ? "border-blue-500 bg-blue-50/50 shadow-sm"
                            : "border-slate-100 hover:border-blue-200 bg-white hover:bg-slate-50"
                        )}
                      >
                        <ActivityIconBadge 
                          icon={type.icon}
                          customImage={type.customImage}
                          colorClass={type.color}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                            {type.name}
                          </p>
                          {type.description && (
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">
                              {type.description}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <form id="activity-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Live Preview Card */}
                <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center gap-4">
                  <ActivityIconBadge 
                    icon={icon}
                    customImage={customImage}
                    colorClass={color}
                    size="xl"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vista previa de tarjeta
                    </span>
                    <h4 className="font-black text-lg text-slate-800 truncate">
                      {name || 'Nombre de la actividad'}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {description || 'Sin descripción adicional'}
                    </p>
                  </div>
                </div>

                {/* Name & Description Inputs */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1.5">
                      Nombre de la actividad *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Challenge, Dictado, Genially..."
                      className="w-full p-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none font-bold text-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1.5">
                      Descripción o instrucción (opcional)
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ej. Realizar en parejas en el cuaderno"
                      className="w-full p-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none font-medium text-slate-700 text-sm"
                    />
                  </div>
                </div>

                {/* Custom Image Upload */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    Imagen o Foto personalizada (opcional)
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 font-bold text-xs text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-all bg-white"
                    >
                      <Upload size={16} />
                      {customImage ? 'Cambiar imagen...' : 'Subir imagen desde el dispositivo'}
                    </button>
                    {customImage && (
                      <button
                        type="button"
                        onClick={() => setCustomImage(undefined)}
                        className="px-3 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Trash2 size={15} /> Quitar imagen
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Icon Selection with Category Picker */}
                {!customImage && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                      Icono de la actividad
                    </label>
                    <IconPicker 
                      selectedIcon={icon}
                      onSelectIcon={setIcon}
                    />
                  </div>
                )}

                {/* Color Palette Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    Color de fondo e icono
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {COLOR_PRESETS.map((preset) => {
                      const isSelected = color === preset.class;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setColor(preset.class)}
                          className={cn(
                            "p-2.5 rounded-xl border-2 font-bold text-xs flex items-center gap-2 transition-all text-left",
                            preset.class,
                            isSelected 
                              ? "ring-2 ring-blue-500 ring-offset-2 scale-102 font-black shadow-xs" 
                              : "opacity-80 hover:opacity-100"
                          )}
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-current opacity-80 shrink-0" />
                          <span className="truncate">{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
            {initialActivity ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDelete(initialActivity.id)}
                  className="px-4 py-3.5 rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center gap-2 transition-all"
                  title="Eliminar actividad del banco"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
                {onDuplicate && (
                  <button
                    type="button"
                    onClick={() => {
                      onDuplicate({
                        id: initialActivity.id,
                        name: name.trim() || initialActivity.name,
                        description: description.trim() || undefined,
                        icon,
                        color,
                        customImage,
                        typeId
                      });
                      onClose();
                    }}
                    className="px-4 py-3.5 rounded-2xl border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold text-sm flex items-center gap-2 transition-all"
                    title="Crear una copia en este curso"
                  >
                    <Copy size={16} /> Duplicar
                  </button>
                )}
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 rounded-2xl text-slate-500 hover:bg-slate-200 font-bold text-sm transition-all"
              >
                Cancelar
              </button>
              {activeTab === 'type' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('custom')}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm shadow-md transition-all"
                >
                  Continuar →
                </button>
              ) : (
                <button
                  type="submit"
                  form="activity-form"
                  disabled={!name.trim()}
                  className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Check size={18} />
                  {initialActivity ? 'Guardar Cambios' : 'Añadir al Banco'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
