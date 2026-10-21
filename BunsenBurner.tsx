/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Power, ThermometerSnowflake } from 'lucide-react';

interface BunsenBurnerProps {
  level: 0 | 1 | 2 | 3;
  onChangeLevel: (level: 0 | 1 | 2 | 3) => void;
  temperatureC: number;
  isDark: boolean;
}

export const BunsenBurner: React.FC<BunsenBurnerProps> = ({
  level,
  onChangeLevel,
  temperatureC,
  isDark,
}) => {
  return (
    <div className={`flex flex-col items-center mt-3 pt-3 border-t transition-colors ${
      isDark ? 'border-slate-800' : 'border-slate-200'
    }`}>
      {/* Wire Gauze & Tripod Top Plate */}
      <div className="relative w-36 h-3 flex items-center justify-center">
        {/* Wire mesh with heat glow if hot */}
        <div
          className={`w-32 h-1.5 rounded transition-all duration-500 ${
            temperatureC > 70
              ? 'bg-amber-500 shadow-md shadow-amber-500/50'
              : temperatureC > 40
              ? 'bg-amber-700/60'
              : isDark
              ? 'bg-slate-700'
              : 'bg-slate-400'
          }`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />
      </div>

      {/* Flame Container */}
      <div className="relative h-14 w-20 flex items-end justify-center overflow-visible">
        {level > 0 && (
          <div className="relative flex flex-col items-center">
            {/* Outer Flame Glow */}
            <div
              className={`absolute -bottom-1 w-12 rounded-full blur-md pointer-events-none transition-all duration-300 ${
                level === 1
                  ? 'h-8 bg-amber-400/40'
                  : level === 2
                  ? 'h-12 bg-sky-400/50'
                  : 'h-16 bg-blue-500/70 shadow-lg shadow-cyan-400/50'
              }`}
            />

            {/* Inner Flame SVG */}
            <svg
              className={`w-10 overflow-visible transition-all duration-300 ${
                level === 1
                  ? 'h-8 text-amber-500'
                  : level === 2
                  ? 'h-12 text-sky-400'
                  : 'h-14 text-cyan-300 animate-pulse'
              }`}
              viewBox="0 0 24 36"
              fill="currentColor"
            >
              {/* Outer flame tip */}
              <path
                d="M12 0 C16 8 22 18 20 28 C18 34 14 36 12 36 C10 36 6 34 4 28 C2 18 8 8 12 0 Z"
                className="opacity-90"
              />
              {/* Inner hot core */}
              {level >= 2 && (
                <path
                  d="M12 12 C14 17 18 24 16 30 C15 33 13 35 12 35 C11 35 9 33 8 30 C6 24 10 17 12 12 Z"
                  fill={level === 3 ? '#ffffff' : '#67e8f9'}
                  className="opacity-95"
                />
              )}
            </svg>
          </div>
        )}
      </div>

      {/* Burner Chimney & Base */}
      <div className="flex flex-col items-center pointer-events-none">
        {/* Metal barrel chimney */}
        <div className={`w-3.5 h-6 rounded-t-sm border-x ${
          isDark ? 'bg-slate-600 border-slate-500' : 'bg-slate-400 border-slate-500'
        }`} />
        {/* Air collar ring */}
        <div className={`w-5 h-2 rounded-xs border ${
          isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-500 border-slate-600'
        }`} />
        {/* Heavy metal cast base */}
        <div className={`w-14 h-3 rounded-b-md border-b-2 ${
          isDark ? 'bg-slate-800 border-slate-900' : 'bg-slate-700 border-slate-900'
        }`} />
      </div>

      {/* Burner Flame Regulation Controls */}
      <div className="w-full mt-3 flex items-center justify-between gap-1 text-[11px]">
        <span className={`text-[10px] uppercase font-semibold font-sans ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Burner
        </span>

        <div className={`flex items-center p-0.5 rounded-lg border ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => onChangeLevel(0)}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              level === 0
                ? isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Turn burner off"
            aria-label="Turn off burner"
          >
            Off
          </button>
          <button
            onClick={() => onChangeLevel(1)}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              level === 1
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-amber-500'
            }`}
            title="Low gentle flame"
            aria-label="Set burner to low"
          >
            Low
          </button>
          <button
            onClick={() => onChangeLevel(2)}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              level === 2
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-sky-500'
            }`}
            title="Medium flame"
            aria-label="Set burner to medium"
          >
            Med
          </button>
          <button
            onClick={() => onChangeLevel(3)}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              level === 3
                ? 'bg-cyan-500 text-white shadow-xs animate-pulse'
                : 'text-slate-400 hover:text-cyan-500'
            }`}
            title="Roaring hot blue flame (Boiling)"
            aria-label="Set burner to high flame"
          >
            High
          </button>
        </div>
      </div>
    </div>
  );
};
