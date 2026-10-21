/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContainerContent } from '../utils/chemistry';
import { Microscope, Atom } from 'lucide-react';

interface ReactionInspectorProps {
  container: ContainerContent | null;
  isDark: boolean;
}

export const ReactionInspector: React.FC<ReactionInspectorProps> = ({ container, isDark }) => {
  if (!container) {
    return (
      <div
        className={`p-4 rounded-2xl border text-center text-xs ${
          isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <Microscope className="w-6 h-6 mx-auto mb-2 text-slate-400 opacity-60" />
        <span>Select an apparatus to observe molecular-level reaction dynamics.</span>
      </div>
    );
  }

  const ions = container.activeIons || [{ name: 'H', sub: '2' }, { name: 'O' }];
  const hasLiquid = container.totalVolumeMl > 0;

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-xl'
          : 'bg-white border-slate-200 text-slate-800 shadow-xs'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Microscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans">
              Reaction Micro-Scope & Molecular View
            </h3>
            <span className="text-[10px] text-slate-400">
              Observing: {container.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              container.isEffervescing || container.isBoiling
                ? 'bg-emerald-500/20 text-emerald-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {container.reactionRate}
          </span>
        </div>
      </div>

      {/* Simulated Microscopic Chamber Viewport */}
      <div
        className={`relative w-full h-36 rounded-xl border overflow-hidden flex flex-col justify-between p-3 select-none transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-700/80'
            : 'bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 border-slate-300'
        }`}
      >
        {/* Microscopic Grid Optics Reticle */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, transparent 60px, rgba(16, 185, 129, 0.4) 61px, transparent 62px), linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            backgroundPosition: 'center',
          }}
        />

        {/* Ambient Liquid Tint in chamber */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-25"
          style={{ backgroundColor: container.liquidColor }}
        />

        {/* Floating Animated Ions / Particles (Rendered with native sup / sub to eliminate font tofu) */}
        <div className="relative z-10 flex-1 flex items-center justify-around flex-wrap gap-2 overflow-hidden py-1">
          {ions.map((ion, idx) => (
            <div
              key={idx}
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold shadow-xs border transition-all inline-flex items-baseline ${
                isDark
                  ? 'bg-slate-800/90 border-slate-600 text-emerald-400'
                  : 'bg-white/95 border-emerald-300 text-emerald-800'
              }`}
              style={{
                animation: `floatParticle ${2.5 + (idx % 3) * 0.7}s ease-in-out infinite alternate`,
                animationDelay: `${idx * 0.25}s`,
              }}
            >
              <span>{ion.name}</span>
              {ion.sub && <sub className="text-[9px] ml-0.5">{ion.sub}</sub>}
              {ion.sup && <sup className="text-[9px] ml-0.5 text-amber-500 dark:text-amber-400">{ion.sup}</sup>}
            </div>
          ))}

          {/* Effervescence Bubbles in Chamber */}
          {container.isEffervescing && (
            <>
              <div className="absolute bottom-2 left-1/4 w-4 h-4 rounded-full bg-white/80 border border-emerald-400 bubble-particle" style={{ ['--delay' as string]: '0.2s', ['--duration' as string]: '1.2s' }} />
              <div className="absolute bottom-1 left-2/4 w-5 h-5 rounded-full bg-white/80 border border-emerald-400 bubble-particle" style={{ ['--delay' as string]: '0.6s', ['--duration' as string]: '1.5s' }} />
              <div className="absolute bottom-3 left-3/4 w-3.5 h-3.5 rounded-full bg-white/80 border border-emerald-400 bubble-particle" style={{ ['--delay' as string]: '0.4s', ['--duration' as string]: '1.1s' }} />
            </>
          )}

          {/* Blue Precipitate Flakes if Cu(OH)2 present */}
          {container.hasPrecipitateCuOH2 && (
            <div className="absolute inset-x-2 bottom-1 flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3 rounded-xs bg-sky-400/90 shadow-sm border border-sky-300 animate-pulse"
                  title="Cu(OH)2 Gelatinous Precipitate"
                />
              ))}
            </div>
          )}
        </div>

        {/* Chamber Status Bar with distinct gap and formatting */}
        <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] font-mono px-2 py-1 border-t border-slate-700/40">
          <span className="text-slate-400 flex items-center gap-1 shrink-0">
            <Atom className="w-3 h-3 text-emerald-500" />
            <span>Aqueous Matrix</span>
          </span>
          <span className="text-emerald-500 font-semibold text-right truncate">
            {container.gasLabel ? `${container.gasLabel} evolving` : 'Stable Equilibrium'}
          </span>
        </div>
      </div>

      {/* Real-time Reaction Formula & Enthalpy */}
      <div className="mt-3 space-y-2 text-xs">
        {container.reactionTitle ? (
          <div className="p-2.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-semibold leading-relaxed">
            {container.reactionTitle}
          </div>
        ) : (
          <div className="p-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-[11px] text-center">
            Add reactants from the library to initiate a reaction equation.
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Thermodynamics</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{container.enthalpy}</span>
          </div>

          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Chemical Phase</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {container.hasPrecipitateCuOH2 ? 'Liquid + Solid Ppt' : hasLiquid ? 'Aqueous Solution' : 'Empty Vessel'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
