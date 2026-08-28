import { Theme } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const THEMES: Theme[] = [
  { id: 'blue', name: 'Ocean Blue', primary: 'bg-blue-600', secondary: 'bg-blue-50', accent: 'text-blue-600' },
  { id: 'purple', name: 'Royal Purple', primary: 'bg-purple-600', secondary: 'bg-purple-50', accent: 'text-purple-600' },
  { id: 'emerald', name: 'Emerald Green', primary: 'bg-emerald-600', secondary: 'bg-emerald-50', accent: 'text-emerald-600' },
  { id: 'rose', name: 'Rose Pink', primary: 'bg-rose-600', secondary: 'bg-rose-50', accent: 'text-rose-600' },
  { id: 'amber', name: 'Amber Gold', primary: 'bg-amber-600', secondary: 'bg-amber-50', accent: 'text-amber-600' },
];

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
}

export function ThemeModal({
  isOpen,
  onClose,
  currentTheme,
  onSelect
}: ThemeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 p-8 border border-slate-100"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-black text-slate-800">Elegir Tema</h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5">Personaliza los colores de la aplicación</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
            >
              <X size={22} />
            </button>
          </div>

          <div className="space-y-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onSelect(t);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group",
                  currentTheme.id === t.id
                    ? "border-blue-500 bg-blue-50/60 shadow-sm"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl shadow-xs shrink-0", t.primary)} />
                <span className="font-bold text-base text-slate-800">{t.name}</span>
                {currentTheme.id === t.id && (
                  <Check className="ml-auto text-blue-600" size={20} />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
