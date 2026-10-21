/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContainerContent, ChemicalId } from '../utils/chemistry';
import { Glassware } from './Glassware';
import { ReactionInspector } from './ReactionInspector';
import { Plus, Trash2, Sparkles, ShieldCheck, Flame } from 'lucide-react';

interface WorkbenchCanvasProps {
  containers: ContainerContent[];
  activeContainerId: string | null;
  onSelectContainer: (id: string) => void;
  onRinseContainer: (id: string) => void;
  onRemoveContainer: (id: string) => void;
  onAddApparatus: (type: 'beaker' | 'test_tube' | 'flask' | 'cylinder') => void;
  onChemicalDrop: (containerId: string, chemicalId: ChemicalId) => void;
  isPouringChemical: string | null;
  onSetBurnerLevel: (containerId: string, level: 0 | 1 | 2 | 3) => void;
  isDark: boolean;
}

export const WorkbenchCanvas: React.FC<WorkbenchCanvasProps> = ({
  containers,
  activeContainerId,
  onSelectContainer,
  onRinseContainer,
  onRemoveContainer,
  onAddApparatus,
  onChemicalDrop,
  isPouringChemical,
  onSetBurnerLevel,
  isDark,
}) => {
  const activeContainer = containers.find((c) => c.id === activeContainerId) || null;

  return (
    <main
      className={`flex-1 flex flex-col relative overflow-hidden transition-colors ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Workbench Header Toolbar */}
      <div
        className={`flex items-center justify-between px-6 py-2.5 border-b transition-colors ${
          isDark
            ? 'bg-slate-900/80 backdrop-blur-md border-slate-800'
            : 'bg-white/80 backdrop-blur-md border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider font-sans">
            Simulation Stage & Thermal Bench
          </span>
          <span className="text-xs text-slate-400">
            {containers.length} active vessel{containers.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-medium">Zero Toxic Effluents</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Bench Area */}
      <div
        className="flex-1 p-6 flex flex-col xl:flex-row items-start justify-center gap-6 relative overflow-auto"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)'
            : 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%)',
        }}
      >
        {/* Bench Grid Guide */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)'
              : 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Center Glassware Stage */}
        <div className="relative z-10 flex flex-wrap items-start justify-center gap-6 max-w-3xl">
          {containers.length === 0 ? (
            <div
              className={`p-8 rounded-2xl border text-center max-w-sm ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
              <h3 className="font-bold text-sm mb-1">Workbench is Empty</h3>
              <p className="text-xs text-slate-400 mb-4">
                Place an apparatus from the library to begin.
              </p>
              <button
                onClick={() => onAddApparatus('beaker')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Place Beaker (250mL)
              </button>
            </div>
          ) : (
            containers.map((c) => (
              <div key={c.id} className="relative group">
                <Glassware
                  container={c}
                  isActive={c.id === activeContainerId}
                  onSelect={() => onSelectContainer(c.id)}
                  onRinse={onRinseContainer}
                  onChemicalDrop={onChemicalDrop}
                  isPouringChemical={c.id === activeContainerId ? isPouringChemical : null}
                  onSetBurnerLevel={onSetBurnerLevel}
                  isDark={isDark}
                />
                <button
                  onClick={() => onRemoveContainer(c.id)}
                  title="Remove glassware"
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-30 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-rose-400'
                      : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600'
                  }`}
                  aria-label={`Remove ${c.name}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Dedicated Reaction Close-Up Inspector Section */}
        <div className="relative z-10 w-full xl:w-96 max-w-md shrink-0">
          <ReactionInspector container={activeContainer} isDark={isDark} />
        </div>
      </div>

      {/* Bench Mat Footer Info */}
      <div
        className={`px-6 py-2 border-t flex items-center justify-between text-xs transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-400'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>Interaction:</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            Regulate Bunsen Burner to heat vessel up to 100°C boiling point.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddApparatus('beaker')}
            className="text-emerald-600 hover:text-emerald-500 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add vessel</span>
          </button>
        </div>
      </div>
    </main>
  );
};
