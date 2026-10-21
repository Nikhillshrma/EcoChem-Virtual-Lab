/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Leaf, FlaskConical } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetAll: () => void;
  onOpenGuide: () => void;
  onOpenSustainability: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onResetAll,
  onOpenGuide,
  onOpenSustainability,
  isDark,
  onToggleDark,
}) => {
  return (
    <header className={`flex items-center justify-between gap-8 px-6 py-3 border-b transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Zone 1: Brand title & subtitle */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold tracking-tight font-display whitespace-nowrap">
              EcoChem Virtual Lab
            </span>
          </div>
          <div className="text-[11px] font-medium text-emerald-500 whitespace-nowrap">
            Zero-Waste Chemistry Simulator
          </div>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={onOpenGuide}
          className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
          <span>Reaction Principles</span>
        </button>
        <button
          onClick={onOpenSustainability}
          className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-500" />
          <span>Green Chemistry 12 Principles</span>
        </button>
      </nav>

      {/* Zone 3: Primary Action & Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Dark/Light Theme Toggle */}
        <button
          onClick={onToggleDark}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? (
            <span className="text-xs flex items-center gap-1 font-sans">☀️ Light</span>
          ) : (
            <span className="text-xs flex items-center gap-1 font-sans">🌙 Dark</span>
          )}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-emerald-400'
              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-emerald-700'
          }`}
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Reset Lab Button */}
        <button
          onClick={onResetAll}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
          title="Reset entire virtual workbench"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Lab</span>
        </button>
      </div>
    </header>
  );
};
