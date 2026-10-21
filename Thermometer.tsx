/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Thermometer as ThermometerIcon, Flame, Snowflake } from 'lucide-react';

interface ThermometerProps {
  temperatureC: number;
  isBoiling: boolean;
  isDark: boolean;
}

export const Thermometer: React.FC<ThermometerProps> = ({
  temperatureC,
  isBoiling,
  isDark,
}) => {
  // 0°C -> 0%, 100°C -> 90%, 110°C -> 100%
  const mercuryHeightPercent = Math.min(100, Math.max(5, (temperatureC / 110) * 100));

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-700 text-slate-200'
          : 'bg-white/90 border-slate-200 text-slate-800'
      } shadow-xs`}
    >
      {/* Physical Glass Thermometer Tube */}
      <div className="relative w-4 h-16 bg-slate-200/60 dark:bg-slate-800/80 rounded-full p-0.5 border border-slate-300 dark:border-slate-600 flex flex-col justify-end items-center overflow-hidden">
        {/* Scale markings */}
        <div className="absolute inset-y-1 left-0 flex flex-col justify-between pointer-events-none text-[6px] font-mono opacity-50">
          <div className="w-1.5 h-[1px] bg-slate-500" />
          <div className="w-1 h-[1px] bg-slate-500" />
          <div className="w-1.5 h-[1px] bg-slate-500" />
          <div className="w-1 h-[1px] bg-slate-500" />
          <div className="w-1.5 h-[1px] bg-slate-500" />
        </div>

        {/* Mercury Column */}
        <div
          className={`w-1.5 rounded-full transition-all duration-300 ${
            temperatureC > 80
              ? 'bg-rose-500 shadow-xs shadow-rose-500/50'
              : temperatureC > 40
              ? 'bg-amber-500'
              : 'bg-sky-500'
          }`}
          style={{ height: `${mercuryHeightPercent}%` }}
        />
        {/* Mercury Bulb at bottom */}
        <div
          className={`w-3 h-3 -mb-0.5 rounded-full z-10 ${
            temperatureC > 80
              ? 'bg-rose-600'
              : temperatureC > 40
              ? 'bg-amber-600'
              : 'bg-sky-600'
          }`}
        />
      </div>

      {/* Numerical Readout */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 font-sans">
            Temp Probe
          </span>
          {isBoiling && (
            <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-500 text-[9px] font-bold rounded animate-pulse">
              BOILING
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold font-mono tabular-nums">
            {temperatureC.toFixed(1)}
          </span>
          <span className="text-xs font-semibold text-slate-400">°C</span>
        </div>
        <div className="text-[10px] text-slate-500">
          {temperatureC < 30 ? 'Ambient Room Temp' : temperatureC < 70 ? 'Warm Exothermic' : 'High Heat'}
        </div>
      </div>
    </div>
  );
};
