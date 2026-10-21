/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReactionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'reactions' | 'sustainability';
}

export const ReactionGuideModal: React.FC<ReactionGuideModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'reactions',
}) => {
  const [activeTab, setActiveTab] = React.useState<'reactions' | 'sustainability'>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Reaction Principles and Green Chemistry Guide"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Scientific Reference & Learning Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('reactions')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reactions'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Core Reactions
          </button>
          <button
            onClick={() => setActiveTab('sustainability')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'sustainability'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Green Chemistry & Sustainability
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {activeTab === 'reactions' ? (
            <>
              {/* Reaction 1 Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm font-sans flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-mono">1</span>
                    Reaction 1: Acid + Metal Gas Evolution
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Single Displacement
                  </span>
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-900 font-semibold">
                  Zn (s) + 2HCl (aq) → ZnCl₂ (aq) + H₂ (g) ↑
                </div>
                <p className="text-slate-600 leading-relaxed">
                  When solid zinc pellets are introduced into hydrochloric acid, a rapid redox displacement occurs. Zinc is oxidized from metallic Zn⁰ to Zn²⁺, and hydrogen ions (H⁺) from the acid are reduced to molecular hydrogen gas (H₂).
                </p>
                <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded text-emerald-900 text-[11px]">
                  <strong>Visual Observation:</strong> Rapid stream of rising micro-bubbles (effervescence) and light thermal release.
                </div>
              </div>

              {/* Reaction 2 Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm font-sans flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-mono">2</span>
                    Reaction 2: Acid-Base Neutralization with Indicator
                  </h3>
                  <span className="text-[11px] font-mono text-fuchsia-700 bg-fuchsia-50 px-2 py-0.5 rounded border border-fuchsia-200">
                    Neutralization Titration
                  </span>
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-900 font-semibold">
                  NaOH (aq) + HCl (aq) → NaCl (aq) + H₂O (l)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Phenolphthalein acts as a chemical equilibrium indicator: in basic media (pH &gt; 8.2), the deprotonated dianion form absorbs blue-green light, reflecting a vibrant magenta/pink hue. When stoichiometric acid (HCl) is added, the solution neutralizes back below pH 8.2, converting the indicator into its colorless lactone form.
                </p>
                <div className="p-2 bg-fuchsia-50/70 border border-fuchsia-200 rounded text-fuchsia-950 text-[11px]">
                  <strong>Visual Observation:</strong> Liquid transitions instantaneously from clear to vivid pink upon base addition, then reverts smoothly back to transparent water upon neutralization.
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sustainability Principles */}
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h3 className="font-bold text-emerald-950 text-sm mb-1 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-700" />
                    Science for Sustainability Concept
                  </h3>
                  <p className="text-emerald-900 leading-relaxed text-xs">
                    Traditional chemistry classrooms generate millions of liters of contaminated aqueous waste and consume finite metallic elements annually. EcoChem Virtual Lab delivers interactive mastery with absolute zero toxic waste discharge.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Principle 1: Waste Prevention</h4>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        It is better to prevent chemical waste than to treat or clean up waste after it has been created.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Principle 3: Less Hazardous Chemical Syntheses</h4>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Whenever practicable, synthetic methods should be designed to use and generate substances that possess little or no toxicity to human health and the environment.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Principle 12: Inherently Safer Chemistry for Accident Prevention</h4>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Substances and the form of a substance used in a chemical process should be chosen to minimize the potential for chemical accidents, including releases, explosions, and fires.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
