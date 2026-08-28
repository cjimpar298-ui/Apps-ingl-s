import { useState } from 'react';
import { ICON_CATEGORIES } from '../data/activityTypes';
import { IconRenderer } from './IconRenderer';
import { cn } from '../lib/utils';
import { Search } from 'lucide-react';

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

export function IconPicker({ selectedIcon, onSelectIcon }: IconPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allCategoryIcons = Array.from(new Set(
    ICON_CATEGORIES.flatMap(cat => cat.icons)
  ));

  const filteredIcons = (activeCategory === 'all' 
    ? allCategoryIcons 
    : (ICON_CATEGORIES.find(c => c.id === activeCategory)?.icons || [])
  ).filter(iconName => 
    iconName.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar icono por nombre..."
          className="w-full pl-10 pr-3.5 py-2.5 text-xs font-bold rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
        />
      </div>

      {/* Category Pills with smooth horizontal scroll */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={cn(
            "px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all select-none",
            activeCategory === 'all'
              ? "bg-slate-800 text-white shadow-xs scale-102"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          Todos ({allCategoryIcons.length})
        </button>
        {ICON_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all select-none",
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-xs scale-102"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of high-contrast icons */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-64 overflow-y-auto p-2 border-2 border-slate-100 rounded-3xl bg-slate-50/50">
        {filteredIcons.map(iconName => {
          const isSelected = selectedIcon === iconName;
          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onSelectIcon(iconName)}
              className={cn(
                "p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all group min-h-[82px] select-none",
                isSelected
                  ? "bg-white border-3 border-blue-500 shadow-lg scale-105 ring-4 ring-blue-100"
                  : "bg-white border-2 border-slate-100 hover:border-blue-200 hover:shadow-xs"
              )}
              title={iconName}
            >
              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110 p-0.5">
                <IconRenderer 
                  name={iconName} 
                  size="100%" 
                />
              </div>
              <span className={cn(
                "text-[10px] font-bold truncate max-w-full text-center leading-none px-1",
                isSelected ? "text-blue-700 font-black" : "text-slate-600"
              )}>
                {iconName}
              </span>
            </button>
          );
        })}
        {filteredIcons.length === 0 && (
          <div className="col-span-full py-8 text-center text-xs font-bold text-slate-400">
            No se encontraron iconos que coincidan con &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
