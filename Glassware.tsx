/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContainerContent, ChemicalId } from '../utils/chemistry';
import { BunsenBurner } from './BunsenBurner';
import { Thermometer } from './Thermometer';
import { RotateCcw, Sparkles, CloudFog } from 'lucide-react';

interface GlasswareProps {
  container: ContainerContent;
  isActive: boolean;
  onSelect: () => void;
  onRinse: (id: string) => void;
  onChemicalDrop?: (containerId: string, chemicalId: ChemicalId) => void;
  isPouringChemical?: string | null;
  onSetBurnerLevel: (containerId: string, level: 0 | 1 | 2 | 3) => void;
  isDark: boolean;
}

export const Glassware: React.FC<GlasswareProps> = ({
  container,
  isActive,
  onSelect,
  onRinse,
  onChemicalDrop,
  isPouringChemical,
  onSetBurnerLevel,
  isDark,
}) => {
  const volumePercent = Math.min(100, Math.max(0, (container.totalVolumeMl / container.maxCapacityMl) * 100));
  const visualLiquidHeightPercent = volumePercent > 0 ? Math.max(8, volumePercent * 0.82) : 0;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const chemId = e.dataTransfer.getData('text/plain') as ChemicalId;
    if (chemId && onChemicalDrop) {
      onChemicalDrop(container.id, chemId);
    }
  };

  const bubbles = [
    { left: '22%', delay: '0.1s', duration: '1.4s', drift: '4px', size: 7 },
    { left: '38%', delay: '0.5s', duration: '1.2s', drift: '-6px', size: 9 },
    { left: '52%', delay: '0.2s', duration: '1.6s', drift: '8px', size: 6 },
    { left: '68%', delay: '0.7s', duration: '1.3s', drift: '-4px', size: 10 },
    { left: '80%', delay: '0.35s', duration: '1.5s', drift: '5px', size: 8 },
    { left: '30%', delay: '0.9s', duration: '1.1s', drift: '-8px', size: 5 },
    { left: '60%', delay: '1.1s', duration: '1.7s', drift: '3px', size: 7 },
  ];

  return (
    <div
      onClick={onSelect}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center p-5 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
        isActive
          ? isDark
            ? 'bg-slate-900/95 border-2 border-emerald-500 shadow-xl shadow-emerald-500/20'
            : 'bg-emerald-50/70 border-2 border-emerald-500 shadow-lg shadow-emerald-500/10'
          : isDark
          ? 'bg-slate-900/60 border border-slate-800 hover:border-emerald-600/70 shadow-sm'
          : 'bg-white/80 border border-slate-200 hover:border-emerald-300 shadow-sm'
      }`}
      style={{ minWidth: '240px' }}
      role="button"
      tabIndex={0}
      aria-label={`Select ${container.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect();
      }}
    >
      {/* Top Header Badge & Selection Pill */}
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <div className="flex flex-col">
          <span className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            {container.name}
          </span>
          <span className="text-[11px] text-slate-400">
            {container.totalVolumeMl > 0 ? `${container.totalVolumeMl} mL / ${container.maxCapacityMl} mL` : 'Empty vessel'}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRinse(container.id);
          }}
          title="Rinse and empty glassware"
          className={`p-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
            isDark
              ? 'text-slate-300 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700'
              : 'text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-100'
          }`}
          aria-label={`Rinse ${container.name}`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Rinse</span>
        </button>
      </div>

      {/* Gas Evolution / Boiling Callout */}
      {container.isBoiling ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-sky-600 text-white text-xs font-mono font-medium rounded-full shadow-md animate-pulse flex items-center gap-1.5 z-20 whitespace-nowrap">
          <CloudFog className="w-3.5 h-3.5" />
          <span>Boiling (100°C) · Steam evolving ↑</span>
        </div>
      ) : container.isEffervescing ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-600 text-white text-xs font-mono font-medium rounded-full shadow-md animate-bounce flex items-center gap-1 z-20 whitespace-nowrap">
          <Sparkles className="w-3 h-3" />
          <span>{container.gasLabel || 'Gas evolving'}</span>
        </div>
      ) : null}

      {/* Glassware Body Section */}
      <div className="relative flex items-end justify-center py-2 min-h-[220px]">
        {/* BEAKER (250mL) */}
        {container.type === 'beaker' && (
          <div className={`relative w-44 h-52 border-x-4 border-b-4 rounded-b-2xl backdrop-blur-[1px] shadow-inner overflow-hidden flex flex-col justify-end transition-colors ${
            isDark
              ? 'border-slate-600 bg-gradient-to-r from-slate-800/40 via-slate-800/20 to-slate-700/40'
              : 'border-slate-300 bg-gradient-to-r from-white/50 via-white/20 to-slate-100/50'
          }`}>
            <div className="absolute -top-1 -left-2 w-4 h-2 border-b-2 border-slate-400 -rotate-12 pointer-events-none" />
            <div className="absolute top-8 left-3 w-16 h-8 bg-white/10 border border-white/20 rounded flex items-center justify-center pointer-events-none">
              <span className="text-[10px] text-slate-400 font-mono">250mL</span>
            </div>
            {/* Graduations */}
            <div className="absolute inset-y-4 right-2 flex flex-col justify-between items-end text-[10px] font-mono text-slate-400 pointer-events-none pr-1">
              <div className="flex items-center gap-1"><span>250</span><div className="w-3 h-0.5 bg-slate-400/60" /></div>
              <div className="flex items-center gap-1"><span>200</span><div className="w-2.5 h-0.5 bg-slate-400/60" /></div>
              <div className="flex items-center gap-1"><span>150</span><div className="w-3 h-0.5 bg-slate-400/60" /></div>
              <div className="flex items-center gap-1"><span>100</span><div className="w-2.5 h-0.5 bg-slate-400/60" /></div>
              <div className="flex items-center gap-1"><span>50</span><div className="w-3 h-0.5 bg-slate-400/60" /></div>
            </div>
            {/* Liquid */}
            <div
              className="w-full relative overflow-hidden"
              style={{
                height: `${visualLiquidHeightPercent}%`,
                backgroundColor: container.liquidColor,
                transition: 'background-color 0.8s ease-in-out, height 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {visualLiquidHeightPercent > 0 && (
                <div className="absolute top-0 inset-x-0 h-2 bg-white/40 meniscus-top liquid-surface-wave" />
              )}
              {/* Effervescence Bubbles */}
              {container.isEffervescing &&
                bubbles.map((b, i) => (
                  <div
                    key={i}
                    className="absolute bottom-1 rounded-full bg-white/90 border border-white bubble-particle pointer-events-none shadow-sm"
                    style={{
                      left: b.left,
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      ['--delay' as string]: b.delay,
                      ['--duration' as string]: b.duration,
                      ['--drift-x' as string]: b.drift,
                    }}
                  />
                ))}
              {/* Solid Pellets (Zinc / Magnesium / CaCO3) */}
              {(container.hasZinc || container.hasMagnesium || container.hasCaCO3 || container.hasIron) && (
                <div className="absolute bottom-1 inset-x-3 flex items-end justify-center gap-1 flex-wrap z-10 pointer-events-none">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`relative w-3.5 h-2.5 rounded shadow-sm border ${
                        container.hasZinc
                          ? 'bg-gradient-to-b from-slate-400 to-slate-600 border-slate-500'
                          : container.hasMagnesium
                          ? 'bg-gradient-to-b from-slate-200 to-slate-400 border-slate-300'
                          : container.hasCaCO3
                          ? 'bg-white border-slate-300'
                          : 'bg-slate-700 border-slate-800'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ERLENMEYER FLASK (250mL) */}
        {container.type === 'flask' && (
          <div className="relative w-44 h-52 flex flex-col items-center justify-end overflow-hidden">
            {/* Neck */}
            <div className={`w-14 h-16 border-x-4 border-t-2 rounded-t-sm z-10 ${
              isDark ? 'border-slate-600 bg-slate-800/20' : 'border-slate-300 bg-white/30'
            }`} />
            {/* Conical Body */}
            <div
              className={`w-44 h-36 border-b-4 rounded-b-2xl relative flex flex-col justify-end overflow-hidden ${
                isDark ? 'border-slate-600 bg-slate-800/30' : 'border-slate-300 bg-white/40'
              }`}
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
              }}
            >
              {/* Liquid */}
              <div
                className="w-full relative overflow-hidden"
                style={{
                  height: `${visualLiquidHeightPercent}%`,
                  backgroundColor: container.liquidColor,
                  transition: 'background-color 0.8s ease-in-out, height 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {visualLiquidHeightPercent > 0 && (
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/40 meniscus-top liquid-surface-wave" />
                )}
                {container.isEffervescing &&
                  bubbles.map((b, i) => (
                    <div
                      key={i}
                      className="absolute bottom-1 rounded-full bg-white/90 border border-white bubble-particle pointer-events-none"
                      style={{
                        left: b.left,
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        ['--delay' as string]: b.delay,
                        ['--duration' as string]: b.duration,
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* GRADUATED CYLINDER (100mL) */}
        {container.type === 'cylinder' && (
          <div className="relative flex flex-col items-center justify-end">
            <div className={`relative w-20 h-56 border-x-4 border-b-4 rounded-b-sm backdrop-blur-[1px] flex flex-col justify-end overflow-hidden ${
              isDark ? 'border-slate-600 bg-slate-800/30' : 'border-slate-300 bg-white/40'
            }`}>
              <div className="absolute inset-y-4 right-1 flex flex-col justify-between items-end text-[9px] font-mono text-slate-400 pointer-events-none">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
              </div>
              <div
                className="w-full relative overflow-hidden"
                style={{
                  height: `${visualLiquidHeightPercent}%`,
                  backgroundColor: container.liquidColor,
                  transition: 'background-color 0.8s ease-in-out, height 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {container.isEffervescing &&
                  bubbles.slice(0, 4).map((b, i) => (
                    <div
                      key={i}
                      className="absolute bottom-1 rounded-full bg-white/90 border border-white bubble-particle pointer-events-none"
                      style={{
                        left: b.left,
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        ['--delay' as string]: b.delay,
                        ['--duration' as string]: b.duration,
                      }}
                    />
                  ))}
              </div>
            </div>
            {/* Hexagonal Base */}
            <div className={`w-28 h-3.5 rounded-sm border-t ${
              isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-300 border-slate-400'
            }`} />
          </div>
        )}

        {/* TEST TUBE (50mL) */}
        {container.type === 'test_tube' && (
          <div className={`relative w-24 h-56 border-x-4 border-b-4 rounded-b-full backdrop-blur-[1px] shadow-inner overflow-hidden flex flex-col justify-end ${
            isDark
              ? 'border-slate-600 bg-gradient-to-r from-slate-800/40 via-slate-800/20 to-slate-700/40'
              : 'border-slate-300 bg-gradient-to-r from-white/50 via-white/20 to-slate-100/50'
          }`}>
            <div
              className="w-full relative overflow-hidden"
              style={{
                height: `${visualLiquidHeightPercent}%`,
                backgroundColor: container.liquidColor,
                transition: 'background-color 0.8s ease-in-out, height 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {container.isEffervescing &&
                bubbles.slice(0, 4).map((b, i) => (
                  <div
                    key={i}
                    className="absolute bottom-1 rounded-full bg-white/90 border border-white bubble-particle pointer-events-none"
                    style={{
                      left: b.left,
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      ['--delay' as string]: b.delay,
                      ['--duration' as string]: b.duration,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Thermometer Probe & Readings */}
      <div className="w-full mt-2">
        <Thermometer
          temperatureC={container.temperatureC}
          isBoiling={container.isBoiling}
          isDark={isDark}
        />
      </div>

      {/* Burner Regulator underneath the apparatus */}
      <div className="w-full">
        <BunsenBurner
          level={container.burnerLevel}
          onChangeLevel={(lvl) => onSetBurnerLevel(container.id, lvl)}
          temperatureC={container.temperatureC}
          isDark={isDark}
        />
      </div>

      {/* Reagent Formula Strip */}
      <div className={`w-full mt-2 pt-2 border-t flex items-center justify-between text-[10px] ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
      }`}>
        <span className="font-sans uppercase text-[9px] text-slate-500">Contents:</span>
        <div className="flex flex-wrap gap-1 font-mono">
          {container.chemicalsAdded.length === 0 ? (
            <span className="italic opacity-60">Clean vessel</span>
          ) : (
            container.chemicalsAdded.map((c, i) => (
              <span key={i} className="px-1.5 py-0.2 rounded bg-slate-200/50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {c.toUpperCase()}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
