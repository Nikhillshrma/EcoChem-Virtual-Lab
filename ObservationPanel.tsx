/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ObservationLog, ContainerContent } from '../utils/chemistry';
import { ClipboardList, Leaf, Trash2, Copy, Check, Download, Info, CheckCircle2 } from 'lucide-react';

interface ObservationPanelProps {
  logs: ObservationLog[];
  activeContainer: ContainerContent | null;
  onClearLogs: () => void;
  totalWastePreventedMl: number;
  totalWastePreventedGrams: number;
  isDark: boolean;
}

export const ObservationPanel: React.FC<ObservationPanelProps> = ({
  logs,
  activeContainer,
  onClearLogs,
  totalWastePreventedMl,
  totalWastePreventedGrams,
  isDark,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLogs = () => {
    if (logs.length === 0) return;
    const text = logs
      .map(
        (l) =>
          `[${l.timestamp}] ${l.apparatusName}: ${l.action}\n${l.details || ''}\n${
            l.equation ? `Equation: ${l.equation}\n` : ''
          }${l.ecoNote ? `Sustainability: ${l.ecoNote}\n` : ''}`
      )
      .join('\n---\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <aside
      className={`w-full lg:w-96 flex flex-col border-l overflow-hidden transition-colors ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Header */}
      <div
        className={`p-3.5 border-b flex items-center justify-between ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-emerald-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-sans">
            Observation Log
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyLogs}
            disabled={logs.length === 0}
            className={`p-1.5 text-xs rounded-lg border transition-colors flex items-center gap-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-emerald-400'
                : 'bg-white border-slate-200 text-slate-600 hover:text-emerald-700'
            }`}
            title="Copy log text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={onClearLogs}
            disabled={logs.length === 0}
            className={`p-1.5 text-xs rounded-lg border transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-rose-400'
                : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600'
            }`}
            title="Clear observation log"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sustainability Impact Card */}
      <div
        className={`p-3.5 border-b ${
          isDark
            ? 'bg-emerald-950/30 border-emerald-900/60'
            : 'bg-emerald-50/90 border-emerald-200/80'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-sans">
            Zero-Waste Impact Tracker
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            className={`p-2 rounded-lg border ${
              isDark
                ? 'bg-slate-800/80 border-slate-700'
                : 'bg-white/90 border-emerald-200'
            }`}
          >
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Hazardous Liquid Saved</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {totalWastePreventedMl} <span className="text-xs font-normal text-slate-400">mL</span>
            </span>
          </div>
          <div
            className={`p-2 rounded-lg border ${
              isDark
                ? 'bg-slate-800/80 border-slate-700'
                : 'bg-white/90 border-emerald-200'
            }`}
          >
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Heavy Metal Preserved</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {totalWastePreventedGrams} <span className="text-xs font-normal text-slate-400">g</span>
            </span>
          </div>
        </div>
        <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Zero toxic effluent discharged to water systems.</span>
        </div>
      </div>

      {/* Current Active Vessel Quick Inspector */}
      {activeContainer && (
        <div
          className={`px-4 py-2 border-b text-xs flex items-center justify-between ${
            isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <span className="text-slate-400">Active:</span>
          <span className="font-semibold">{activeContainer.name}</span>
          <span className="font-mono text-emerald-500 font-medium">
            pH {activeContainer.ph.toFixed(1)} · {activeContainer.temperatureC.toFixed(1)}°C
          </span>
        </div>
      )}

      {/* Observation Stream */}
      <div
        className={`flex-1 p-3 overflow-y-auto space-y-2.5 ${
          isDark ? 'bg-slate-900/60' : 'bg-white'
        }`}
      >
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <Info className="w-8 h-8 mb-2 stroke-1 text-slate-300" />
            <p className="text-xs font-medium text-slate-600 mb-1">No Observations Yet</p>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Actions and chemical reactions will appear here in real time as you add chemicals to your glassware.
            </p>
          </div>
        ) : (
          logs.map((log) => {
            const isReaction = log.type === 'reaction';
            const isNeutralization = log.type === 'neutralization';
            const isReset = log.type === 'reset';

            return (
              <div
                key={log.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isNeutralization
                    ? 'bg-fuchsia-50/70 border-fuchsia-200 text-fuchsia-950 shadow-xs'
                    : isReaction
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                    : isReset
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
                  <span>{log.apparatusName}</span>
                  <span>{log.timestamp}</span>
                </div>

                <div className="font-semibold text-slate-900 mb-1">{log.action}</div>

                {log.details && (
                  <div className="text-slate-600 text-[11px] mb-1.5 leading-relaxed">
                    {log.details}
                  </div>
                )}

                {/* Chemical Reaction Equation */}
                {log.equation && (
                  <div className="p-2 bg-white/90 border border-slate-200/90 rounded-lg font-mono text-[11px] text-emerald-900 font-semibold mb-1.5 shadow-xs">
                    {log.equation}
                  </div>
                )}

                {/* Sustainability Note */}
                {log.ecoNote && (
                  <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-sans">
                    <Leaf className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{log.ecoNote}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
