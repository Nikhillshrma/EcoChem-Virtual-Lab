/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ApparatusType,
  ChemicalId,
  ContainerContent,
  ObservationLog,
  createEmptyApparatus,
  addChemicalToContainer,
  rinseApparatus,
  setContainerBurner,
  tickThermalStep,
} from './utils/chemistry';
import { labSound } from './utils/sound';
import { Header } from './components/Header';
import { SidebarLibrary } from './components/SidebarLibrary';
import { WorkbenchCanvas } from './components/WorkbenchCanvas';
import { ObservationPanel } from './components/ObservationPanel';
import { ReactionGuideModal } from './components/ReactionGuideModal';
import { FlaskConical, Beaker as BeakerIcon, ClipboardList } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true); // User requested dark theme

  const [containers, setContainers] = useState<ContainerContent[]>(() => [
    createEmptyApparatus('beaker', 1),
  ]);
  const [activeContainerId, setActiveContainerId] = useState<string | null>(
    () => containers[0]?.id || null
  );

  const [logs, setLogs] = useState<ObservationLog[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      apparatusName: 'EcoChem Lab',
      action: 'Virtual Lab Initialized (Dark Mode)',
      details: 'Sterile 250mL Beaker with immersion thermometer and regulated Bunsen Burner placed on bench.',
      type: 'info',
      ecoNote: 'Zero hazardous chemical disposal. Science for Sustainability.',
    },
  ]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideInitialTab, setGuideInitialTab] = useState<'reactions' | 'sustainability'>('reactions');
  const [pouringChemical, setPouringChemical] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'workbench' | 'library' | 'observations'>('workbench');

  // Thermal ticker loop for dynamic temperature simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setContainers((prev) =>
        prev.map((c) => {
          if (c.burnerLevel > 0 || c.temperatureC > 22.0) {
            const next = tickThermalStep(c);
            if (next.isBoiling && !c.isBoiling) {
              labSound.playBoiling();
              const boilLog: ObservationLog = {
                id: `obs-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                apparatusName: c.name,
                action: `Solution Reached Boiling Point (100°C) in ${c.name}`,
                details: 'Thermal agitation generates vigorous steam bubble nucleation and evaporation.',
                equation: 'H2O (liquid) + Thermal Energy → H2O (gas/steam) ↑',
                type: 'thermal',
                ecoNote: 'Zero electricity or gas grid waste in virtual thermal experiment.',
              };
              setLogs((l) => [boilLog, ...l]);
            }
            return next;
          }
          return c;
        })
      );
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    labSound.enabled = next;
  };

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleAddApparatus = (type: ApparatusType) => {
    labSound.playGlassClink();
    const count = containers.filter((c) => c.type === type).length + 1;
    const newVessel = createEmptyApparatus(type, count);
    setContainers((prev) => [...prev, newVessel]);
    setActiveContainerId(newVessel.id);

    const logEntry: ObservationLog = {
      id: `obs-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      apparatusName: newVessel.name,
      action: `Placed empty ${newVessel.name} on the workbench`,
      details: 'Clean apparatus with immersion temperature probe ready for reagent addition.',
      type: 'info',
      ecoNote: 'Reusable virtual glassware eliminates lab equipment washing footprint.',
    };
    setLogs((prev) => [logEntry, ...prev]);
    setMobileTab('workbench');
  };

  const handleRinseContainer = (containerId: string) => {
    labSound.playPour();
    setContainers((prev) =>
      prev.map((c) => {
        if (c.id === containerId) {
          const { updatedContainer, observation } = rinseApparatus(c);
          setLogs((l) => [observation, ...l]);
          return updatedContainer;
        }
        return c;
      })
    );
  };

  const handleRemoveContainer = (containerId: string) => {
    setContainers((prev) => {
      const next = prev.filter((c) => c.id !== containerId);
      if (activeContainerId === containerId) {
        setActiveContainerId(next[0]?.id || null);
      }
      return next;
    });
  };

  const handleSetBurnerLevel = (containerId: string, level: 0 | 1 | 2 | 3) => {
    labSound.playBurner(level);
    setContainers((prev) =>
      prev.map((c) => {
        if (c.id === containerId) {
          const { updatedContainer, observation } = setContainerBurner(c, level);
          if (observation) {
            setLogs((l) => [observation, ...l]);
          }
          return updatedContainer;
        }
        return c;
      })
    );
  };

  const handleResetAll = () => {
    labSound.playGlassClink();
    const freshBeaker = createEmptyApparatus('beaker', 1);
    setContainers([freshBeaker]);
    setActiveContainerId(freshBeaker.id);
    const resetLog: ObservationLog = {
      id: `obs-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      apparatusName: 'EcoChem Lab',
      action: 'Workbench Reset',
      details: 'All apparatus cleared and replaced with a clean 250mL Beaker and reset thermometer.',
      type: 'reset',
      ecoNote: '100% waste prevention achieved.',
    };
    setLogs((prev) => [resetLog, ...prev]);
  };

  const handleAddChemical = (chemicalId: ChemicalId, targetContainerId?: string) => {
    const targetId = targetContainerId || activeContainerId;
    if (!targetId) return;

    setPouringChemical(chemicalId);
    setTimeout(() => setPouringChemical(null), 700);

    if (chemicalId === 'zn' || chemicalId === 'mg' || chemicalId === 'fe' || chemicalId === 'nacl' || chemicalId === 'caco3') {
      labSound.playGlassClink();
    } else {
      labSound.playPour();
    }

    setContainers((prev) =>
      prev.map((c) => {
        if (c.id === targetId) {
          const { updatedContainer, observation } = addChemicalToContainer(c, chemicalId);

          if (updatedContainer.isEffervescing) {
            setTimeout(() => labSound.playFizz(), 200);
          } else if (observation.type === 'neutralization') {
            setTimeout(() => labSound.playChime(), 200);
          }

          setLogs((prevLogs) => [observation, ...prevLogs]);
          return updatedContainer;
        }
        return c;
      })
    );
  };

  const handleChemicalDrop = (containerId: string, chemicalId: ChemicalId) => {
    setActiveContainerId(containerId);
    handleAddChemical(chemicalId, containerId);
  };

  // Preset 1: Reaction 1 (HCl + Zn)
  const handleRunPresetReaction1 = () => {
    let targetId = activeContainerId;
    if (!targetId || containers.length === 0) {
      const freshBeaker = createEmptyApparatus('beaker', 1);
      setContainers([freshBeaker]);
      targetId = freshBeaker.id;
      setActiveContainerId(targetId);
    }
    handleAddChemical('hcl', targetId);
    setTimeout(() => handleAddChemical('zn', targetId!), 400);
    setMobileTab('workbench');
  };

  // Preset 2: Reaction 2 (Neutralization with Indicator)
  const handleRunPresetReaction2 = () => {
    let targetId = activeContainerId;
    if (!targetId || containers.length === 0) {
      const freshBeaker = createEmptyApparatus('beaker', 1);
      setContainers([freshBeaker]);
      targetId = freshBeaker.id;
      setActiveContainerId(targetId);
    }
    handleAddChemical('naoh', targetId);
    setTimeout(() => handleAddChemical('phenolphthalein', targetId!), 400);
    setTimeout(() => handleAddChemical('hcl', targetId!), 1100);
    setMobileTab('workbench');
  };

  // Preset 3: Precipitation (CuSO4 + NaOH)
  const handleRunPresetPrecipitation = () => {
    let targetId = activeContainerId;
    if (!targetId || containers.length === 0) {
      const freshFlask = createEmptyApparatus('flask', 1);
      setContainers([freshFlask]);
      targetId = freshFlask.id;
      setActiveContainerId(targetId);
    }
    handleAddChemical('cuso4', targetId);
    setTimeout(() => handleAddChemical('naoh', targetId!), 500);
    setMobileTab('workbench');
  };

  // Preset 4: Thermal Boiling
  const handleRunPresetThermal = () => {
    let targetId = activeContainerId;
    if (!targetId || containers.length === 0) {
      const freshBeaker = createEmptyApparatus('beaker', 1);
      setContainers([freshBeaker]);
      targetId = freshBeaker.id;
      setActiveContainerId(targetId);
    }
    handleAddChemical('hcl', targetId);
    setTimeout(() => {
      handleSetBurnerLevel(targetId!, 3);
    }, 400);
    setMobileTab('workbench');
  };

  const totalWastePreventedMl = containers.reduce((acc, c) => acc + c.wastePreventedMl, 0);
  const totalWastePreventedGrams = containers.reduce((acc, c) => acc + c.wastePreventedGrams, 0);
  const activeContainer = containers.find((c) => c.id === activeContainerId) || null;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Top Navigation */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetAll={handleResetAll}
        onOpenGuide={() => {
          setGuideInitialTab('reactions');
          setIsGuideOpen(true);
        }}
        onOpenSustainability={() => {
          setGuideInitialTab('sustainability');
          setIsGuideOpen(true);
        }}
        isDark={isDark}
        onToggleDark={handleToggleDark}
      />

      {/* Mobile Tab Control Strip (< lg) */}
      <div
        className={`lg:hidden flex items-center p-1.5 gap-1 border-b ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          onClick={() => setMobileTab('library')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            mobileTab === 'library'
              ? 'bg-emerald-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 bg-slate-800 hover:text-white'
              : 'text-slate-600 bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>

        <button
          onClick={() => setMobileTab('workbench')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            mobileTab === 'workbench'
              ? 'bg-emerald-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 bg-slate-800 hover:text-white'
              : 'text-slate-600 bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BeakerIcon className="w-3.5 h-3.5" />
          <span>Workbench</span>
        </button>

        <button
          onClick={() => setMobileTab('observations')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            mobileTab === 'observations'
              ? 'bg-emerald-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 bg-slate-800 hover:text-white'
              : 'text-slate-600 bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Observations</span>
        </button>
      </div>

      {/* Main Studio 3-Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar: Reagents & Apparatus */}
        <div className={`lg:block ${mobileTab === 'library' ? 'block' : 'hidden'}`}>
          <SidebarLibrary
            onAddApparatus={handleAddApparatus}
            onAddChemical={(id) => handleAddChemical(id)}
            selectedContainerName={activeContainer ? activeContainer.name : null}
            onRunPresetReaction1={handleRunPresetReaction1}
            onRunPresetReaction2={handleRunPresetReaction2}
            onRunPresetPrecipitation={handleRunPresetPrecipitation}
            onRunPresetThermal={handleRunPresetThermal}
            isDark={isDark}
          />
        </div>

        {/* Center Canvas: Workbench & Reaction Micro-Scope */}
        <div className={`flex-1 flex flex-col ${mobileTab === 'workbench' ? 'flex' : 'hidden lg:flex'}`}>
          <WorkbenchCanvas
            containers={containers}
            activeContainerId={activeContainerId}
            onSelectContainer={setActiveContainerId}
            onRinseContainer={handleRinseContainer}
            onRemoveContainer={handleRemoveContainer}
            onAddApparatus={handleAddApparatus}
            onChemicalDrop={handleChemicalDrop}
            isPouringChemical={pouringChemical}
            onSetBurnerLevel={handleSetBurnerLevel}
            isDark={isDark}
          />
        </div>

        {/* Right Sidebar: Observation Panel */}
        <div className={`lg:block ${mobileTab === 'observations' ? 'block' : 'hidden'}`}>
          <ObservationPanel
            logs={logs}
            activeContainer={activeContainer}
            onClearLogs={() => setLogs([])}
            totalWastePreventedMl={totalWastePreventedMl}
            totalWastePreventedGrams={totalWastePreventedGrams}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`px-6 py-2.5 border-t flex flex-col sm:flex-row items-center justify-between text-xs transition-colors gap-2 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-300 dark:text-slate-200">EcoChem Virtual Lab</span>
          <span>—</span>
          <span>Zero-Waste Chemistry Simulator for Science for Sustainability</span>
        </div>
        <div className="text-slate-400 font-medium">
          Developed for National Chemistry Week - Sustainability Concept
        </div>
      </footer>

      {/* Guide Modal */}
      <ReactionGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        initialTab={guideInitialTab}
      />
    </div>
  );
}
