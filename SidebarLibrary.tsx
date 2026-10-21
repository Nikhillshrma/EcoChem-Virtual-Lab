/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ApparatusType,
  ChemicalCategory,
  ChemicalId,
  CHEMICAL_DEFINITIONS,
} from '../utils/chemistry';
import {
  FlaskConical,
  TestTube,
  Beaker,
  Cylinder,
  Sparkles,
  Plus,
  ArrowRight,
  Flame,
  Search,
  Filter,
} from 'lucide-react';

interface SidebarLibraryProps {
  onAddApparatus: (type: ApparatusType) => void;
  onAddChemical: (chemicalId: ChemicalId) => void;
  selectedContainerName: string | null;
  onRunPresetReaction1: () => void;
  onRunPresetReaction2: () => void;
  onRunPresetPrecipitation: () => void;
  onRunPresetThermal: () => void;
  isDark: boolean;
}

export const SidebarLibrary: React.FC<SidebarLibraryProps> = ({
  onAddApparatus,
  onAddChemical,
  selectedContainerName,
  onRunPresetReaction1,
  onRunPresetReaction2,
  onRunPresetPrecipitation,
  onRunPresetThermal,
  isDark,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | ChemicalCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDragStart = (e: React.DragEvent, chemId: ChemicalId) => {
    e.dataTransfer.setData('text/plain', chemId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const chemicals = Object.values(CHEMICAL_DEFINITIONS).filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.formula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: Array<{ id: 'all' | ChemicalCategory; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'acids', label: 'Acids' },
    { id: 'bases', label: 'Bases' },
    { id: 'salts', label: 'Salts' },
    { id: 'metals', label: 'Metals' },
    { id: 'indicators', label: 'Indicators' },
  ];

  return (
    <aside
      className={`w-full lg:w-80 flex flex-col gap-5 p-4 border-r overflow-y-auto transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-200'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Guided Reaction Presets */}
      <div
        className={`p-3.5 rounded-xl border ${
          isDark
            ? 'bg-emerald-950/30 border-emerald-800/60'
            : 'bg-emerald-50/80 border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-sans">
            Guided Reactions
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-left">
          <button
            onClick={onRunPresetReaction1}
            className={`p-2 rounded-lg border text-left text-[11px] transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 text-slate-200'
                : 'bg-white border-emerald-200 hover:bg-emerald-50 text-slate-800'
            }`}
          >
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">1. Acid + Metal</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">Zn + 2HCl → H2 ↑</div>
          </button>

          <button
            onClick={onRunPresetReaction2}
            className={`p-2 rounded-lg border text-left text-[11px] transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 text-slate-200'
                : 'bg-white border-emerald-200 hover:bg-emerald-50 text-slate-800'
            }`}
          >
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">2. Neutralization</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">NaOH + Ind. + HCl</div>
          </button>

          <button
            onClick={onRunPresetPrecipitation}
            className={`p-2 rounded-lg border text-left text-[11px] transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 text-slate-200'
                : 'bg-white border-emerald-200 hover:bg-emerald-50 text-slate-800'
            }`}
          >
            <div className="font-semibold text-sky-500">3. Precipitation</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">CuSO4 + NaOH ppt</div>
          </button>

          <button
            onClick={onRunPresetThermal}
            className={`p-2 rounded-lg border text-left text-[11px] transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 text-slate-200'
                : 'bg-white border-emerald-200 hover:bg-emerald-50 text-slate-800'
            }`}
          >
            <div className="font-semibold text-amber-500">4. Burner Boil</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">Heat to 100°C Steam</div>
          </button>
        </div>
      </div>

      {/* Apparatus Library */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
            Apparatus Library
          </h2>
          <span className="text-[10px] text-slate-400">Click to place</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Beaker */}
          <button
            onClick={() => onAddApparatus('beaker')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/50 border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
            title="Place 250mL Beaker"
          >
            <Beaker className="w-5 h-5 mb-1 text-slate-400 group-hover:text-emerald-500" />
            <span className="text-xs font-semibold">Beaker</span>
            <span className="text-[10px] text-slate-400 font-mono">250 mL</span>
          </button>

          {/* Flask */}
          <button
            onClick={() => onAddApparatus('flask')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/50 border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
            title="Place 250mL Erlenmeyer Flask"
          >
            <FlaskConical className="w-5 h-5 mb-1 text-slate-400 group-hover:text-emerald-500" />
            <span className="text-xs font-semibold">Flask</span>
            <span className="text-[10px] text-slate-400 font-mono">250 mL</span>
          </button>

          {/* Cylinder */}
          <button
            onClick={() => onAddApparatus('cylinder')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/50 border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
            title="Place 100mL Graduated Cylinder"
          >
            <div className="w-5 h-5 mb-1 border-2 border-slate-400 group-hover:border-emerald-500 rounded-sm flex items-center justify-center text-[8px] font-mono">
              cyl
            </div>
            <span className="text-xs font-semibold">Cylinder</span>
            <span className="text-[10px] text-slate-400 font-mono">100 mL</span>
          </button>

          {/* Test Tube */}
          <button
            onClick={() => onAddApparatus('test_tube')}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-colors cursor-pointer group ${
              isDark
                ? 'bg-slate-800/50 border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
            title="Place 50mL Test Tube"
          >
            <TestTube className="w-5 h-5 mb-1 text-slate-400 group-hover:text-emerald-500" />
            <span className="text-xs font-semibold">Test Tube</span>
            <span className="text-[10px] text-slate-400 font-mono">50 mL</span>
          </button>
        </div>
      </div>

      {/* Chemicals Library */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
            Chemicals Library
          </h2>
          <span className="text-[10px] text-slate-400">Click or Drag</span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reagents (e.g. HCl, Zn)..."
            className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-colors ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500'
            }`}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Target Callout */}
        <div
          className={`mb-2 px-2.5 py-1.5 rounded-lg text-[11px] flex items-center justify-between border ${
            isDark
              ? 'bg-slate-800/80 border-slate-700 text-emerald-400'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span>Target: <strong>{selectedContainerName || 'None selected'}</strong></span>
          <span className="text-[10px] opacity-75">Click to pour</span>
        </div>

        {/* Scrollable Chemicals List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
          {chemicals.map((chem) => (
            <div
              key={chem.id}
              draggable
              onDragStart={(e) => handleDragStart(e, chem.id)}
              onClick={() => onAddChemical(chem.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer group ${
                isDark
                  ? 'bg-slate-800/40 border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800/80'
                  : 'bg-slate-50 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{chem.name}</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {chem.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    {chem.formula}
                  </div>
                </div>
                <div className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  {chem.state === 'liquid' ? `+${chem.defaultVolumeMl}mL` : `+${chem.defaultGrams}g`}
                </div>
              </div>
              <div className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                {chem.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
