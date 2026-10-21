/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ApparatusType = 'beaker' | 'test_tube' | 'flask' | 'cylinder';

export type ChemicalCategory = 'acids' | 'bases' | 'salts' | 'metals' | 'indicators';

export type ChemicalId =
  | 'hcl'
  | 'h2so4'
  | 'ch3cooh'
  | 'naoh'
  | 'nh4oh'
  | 'caoh2'
  | 'nacl'
  | 'cuso4'
  | 'caco3'
  | 'zn'
  | 'mg'
  | 'fe'
  | 'phenolphthalein'
  | 'universal';

export interface ChemicalDefinition {
  id: ChemicalId;
  name: string;
  formula: string;
  category: ChemicalCategory;
  state: 'liquid' | 'solid';
  colorLabel: string;
  defaultVolumeMl?: number;
  defaultGrams?: number;
  description: string;
  hazards: string[];
  ecoBenefit: string;
  nativeHexColor?: string;
}

export const CHEMICAL_DEFINITIONS: Record<ChemicalId, ChemicalDefinition> = {
  // ACIDS
  hcl: {
    id: 'hcl',
    name: 'Hydrochloric Acid',
    formula: 'HCl (1.0 M)',
    category: 'acids',
    state: 'liquid',
    colorLabel: 'Clear liquid',
    defaultVolumeMl: 25,
    description: 'Strong inorganic acid used in industrial pickling and chemical synthesis.',
    hazards: ['Corrosive fumes', 'Skin burn risk', 'Acid waste hazard'],
    ecoBenefit: 'Eliminates hazardous corrosive runoff and acid waste neutralization cost.',
  },
  h2so4: {
    id: 'h2so4',
    name: 'Sulfuric Acid',
    formula: 'H2SO4 (0.5 M)',
    category: 'acids',
    state: 'liquid',
    colorLabel: 'Dense colorless liquid',
    defaultVolumeMl: 25,
    description: 'Diprotic mineral acid with strong dehydrating and oxidizing properties.',
    hazards: ['Severe skin burns', 'Exothermic hydration'],
    ecoBenefit: 'Prevents sulfate pollution and toxic sulfur runoff.',
  },
  ch3cooh: {
    id: 'ch3cooh',
    name: 'Acetic Acid',
    formula: 'CH3COOH (1.0 M)',
    category: 'acids',
    state: 'liquid',
    colorLabel: 'Pungent clear liquid',
    defaultVolumeMl: 25,
    description: 'Weak organic carboxylic acid, the main acid component in vinegar.',
    hazards: ['Pungent vapors', 'Eye irritation'],
    ecoBenefit: 'Safe organic acid simulation with zero VOC emissions.',
  },

  // BASES
  naoh: {
    id: 'naoh',
    name: 'Sodium Hydroxide',
    formula: 'NaOH (1.0 M)',
    category: 'bases',
    state: 'liquid',
    colorLabel: 'Clear liquid',
    defaultVolumeMl: 25,
    description: 'Strong caustic alkali used in titrations, soap making, and neutralizations.',
    hazards: ['Caustic burns', 'Eye injury hazard', 'Corrosive waste'],
    ecoBenefit: 'Avoids caustic chemical disposal and freshwater alkalization.',
  },
  nh4oh: {
    id: 'nh4oh',
    name: 'Ammonium Hydroxide',
    formula: 'NH4OH (1.0 M)',
    category: 'bases',
    state: 'liquid',
    colorLabel: 'Aqueous ammonia solution',
    defaultVolumeMl: 25,
    description: 'Weak alkaline solution with distinctive odor used as cleaner and reagent.',
    hazards: ['Ammonia vapors', 'Aquatic toxicity'],
    ecoBenefit: 'Zero toxic ammonia gas venting into the room atmosphere.',
  },
  caoh2: {
    id: 'caoh2',
    name: 'Calcium Hydroxide',
    formula: 'Ca(OH)2 (Limewater)',
    category: 'bases',
    state: 'liquid',
    colorLabel: 'Clear limewater solution',
    defaultVolumeMl: 25,
    description: 'Saturated aqueous solution used as a classic detector for carbon dioxide.',
    hazards: ['Alkaline irritant', 'Dust hazard'],
    ecoBenefit: 'Conserves natural limestone resources.',
  },

  // SALTS
  nacl: {
    id: 'nacl',
    name: 'Sodium Chloride',
    formula: 'NaCl (s)',
    category: 'salts',
    state: 'solid',
    colorLabel: 'Crystalline white salt',
    defaultGrams: 3,
    description: 'Neutral inorganic ionic salt providing sodium and chloride ions.',
    hazards: ['Non-hazardous'],
    ecoBenefit: 'Simulates mineral dissolution with zero salinity impact on water supplies.',
  },
  cuso4: {
    id: 'cuso4',
    name: 'Copper(II) Sulfate',
    formula: 'CuSO4 (0.5 M)',
    category: 'salts',
    state: 'liquid',
    colorLabel: 'Vibrant azure blue solution',
    defaultVolumeMl: 25,
    nativeHexColor: 'rgba(14, 165, 233, 0.75)',
    description: 'Classic blue transition-metal salt used in precipitation and displacement tests.',
    hazards: ['Aquatic toxin', 'Heavy metal pollution'],
    ecoBenefit: 'Prevents toxic copper bioaccumulation in aquatic flora and fauna.',
  },
  caco3: {
    id: 'caco3',
    name: 'Calcium Carbonate',
    formula: 'CaCO3 (Marble chips)',
    category: 'salts',
    state: 'solid',
    colorLabel: 'White mineral chips',
    defaultGrams: 3,
    description: 'Insoluble carbonate rock that reacts vigorously with acid releasing carbon dioxide.',
    hazards: ['Dust irritant'],
    ecoBenefit: 'Saves natural geological marble and limestone specimens.',
  },

  // METALS
  zn: {
    id: 'zn',
    name: 'Zinc Granules',
    formula: 'Zn (s)',
    category: 'metals',
    state: 'solid',
    colorLabel: 'Silver-grey metal pellets',
    defaultGrams: 2,
    description: 'Transition metal that reacts rapidly with aqueous acids to release hydrogen.',
    hazards: ['Heavy metal waste', 'Flammable gas release'],
    ecoBenefit: 'Preserves finite zinc metal reserves from landfill disposal.',
  },
  mg: {
    id: 'mg',
    name: 'Magnesium Ribbon',
    formula: 'Mg (Ribbon)',
    category: 'metals',
    state: 'solid',
    colorLabel: 'Silvery lightweight metal ribbon',
    defaultGrams: 1,
    description: 'Reactive alkaline earth metal that reacts violently with acids with rapid bubbling.',
    hazards: ['Flammable solid', 'Intense light on combustion'],
    ecoBenefit: 'Eliminates open flash fire hazard of burning magnesium.',
  },
  fe: {
    id: 'fe',
    name: 'Iron Filings',
    formula: 'Fe (Filings)',
    category: 'metals',
    state: 'solid',
    colorLabel: 'Fine dark grey iron powder',
    defaultGrams: 2,
    description: 'Ferrous metal filings that react slowly with warm acid releasing hydrogen.',
    hazards: ['Fine dust inhalation', 'Oxidation residue'],
    ecoBenefit: 'Virtual recycling of metallurgical iron materials.',
  },

  // INDICATORS
  phenolphthalein: {
    id: 'phenolphthalein',
    name: 'Phenolphthalein',
    formula: 'C20H14O4 (Indicator)',
    category: 'indicators',
    state: 'liquid',
    colorLabel: 'Clear in acid, Pink in base (pH > 8.2)',
    defaultVolumeMl: 2,
    description: 'Classic acid-base indicator that exhibits vivid magenta/pink in alkaline solutions.',
    hazards: ['Organic solvent hazard', 'Disposal regulation'],
    ecoBenefit: 'Zero organic solvent release into drainage systems.',
  },
  universal: {
    id: 'universal',
    name: 'Universal Indicator',
    formula: 'Full Range pH Indicator',
    category: 'indicators',
    state: 'liquid',
    colorLabel: 'Red (acid), Green (neutral), Purple (base)',
    defaultVolumeMl: 2,
    description: 'Multi-component indicator solution covering full spectrum pH 1 to 14.',
    hazards: ['Alcohol solvent', 'Staining agent'],
    ecoBenefit: 'Multi-dye synthetic mixture prevented from wastewater streams.',
  },
};

export interface ObservationLog {
  id: string;
  timestamp: string;
  apparatusName: string;
  action: string;
  details?: string;
  equation?: string;
  type: 'info' | 'reaction' | 'neutralization' | 'reset' | 'thermal';
  ecoNote?: string;
}

export interface ContainerContent {
  id: string;
  type: ApparatusType;
  name: string;
  maxCapacityMl: number;
  totalVolumeMl: number;
  solidGrams: number;
  chemicalsAdded: ChemicalId[];
  
  // Chemical quantities
  molesAcid: number;
  molesBase: number;
  molesCuSO4: number;
  hasPhenolphthalein: boolean;
  hasUniversalIndicator: boolean;
  hasZinc: boolean;
  hasMagnesium: boolean;
  hasIron: boolean;
  hasCaCO3: boolean;
  hasPrecipitateCuOH2: boolean;

  // Temperature & Burner state
  temperatureC: number;
  burnerLevel: 0 | 1 | 2 | 3; // 0 = off, 1 = low, 2 = medium, 3 = high
  isBoiling: boolean;
  hasEvaporatedCrystals: boolean;

  // Visual states
  ph: number;
  liquidColor: string;
  colorState: 'clear' | 'pink' | 'blue' | 'precipitate_blue' | 'universal_red' | 'universal_green' | 'universal_purple';
  isEffervescing: boolean;
  gasLabel: string | null;
  effervescenceIntensity: 'gentle' | 'vigorous';

  // Real-time molecular inspection state
  activeIons: Array<{ name: string; sup?: string; sub?: string }>;
  reactionTitle: string | null;
  reactionRate: 'Dormant' | 'Moderate' | 'Vigorous' | 'Rapid Dissolution';
  enthalpy: 'Exothermic (releases heat)' | 'Endothermic' | 'Neutral' | 'Thermal Boiling';

  // Sustainability counter
  wastePreventedMl: number;
  wastePreventedGrams: number;
}

/**
 * Calculates current pH based on moles of acid and base present.
 */
export function calculatePh(molesAcid: number, molesBase: number, totalVolumeMl: number): number {
  if (totalVolumeMl <= 0) return 7.0;
  const volumeL = totalVolumeMl / 1000;
  const netMoles = molesBase - molesAcid;

  if (Math.abs(netMoles) < 1e-5) {
    return 7.0;
  } else if (netMoles > 0) {
    const ohConcentration = netMoles / volumeL;
    const pOH = -Math.log10(Math.min(Math.max(ohConcentration, 1e-14), 14));
    return Math.min(14, Math.max(7, 14 - pOH));
  } else {
    const hConcentration = -netMoles / volumeL;
    const pH = -Math.log10(Math.min(Math.max(hConcentration, 1e-14), 14));
    return Math.max(0, Math.min(7, pH));
  }
}

/**
 * Determines liquid appearance color.
 */
export function determineLiquidColor(
  hasPhenolphthalein: boolean,
  hasUniversal: boolean,
  ph: number,
  molesCuSO4: number,
  hasPrecipitateCuOH2: boolean,
  hasAnyLiquid: boolean
): { color: string; state: ContainerContent['colorState'] } {
  if (!hasAnyLiquid) {
    return { color: 'rgba(240, 249, 255, 0)', state: 'clear' };
  }

  // Gelatinous blue precipitate Cu(OH)2
  if (hasPrecipitateCuOH2) {
    return { color: 'rgba(56, 189, 248, 0.88)', state: 'precipitate_blue' };
  }

  // Copper Sulfate solution has vivid sky-blue color
  if (molesCuSO4 > 0) {
    return { color: 'rgba(14, 165, 233, 0.72)', state: 'blue' };
  }

  // Universal indicator spectrum
  if (hasUniversal) {
    if (ph < 5.5) {
      return { color: 'rgba(239, 68, 68, 0.75)', state: 'universal_red' };
    } else if (ph > 8.5) {
      return { color: 'rgba(168, 85, 247, 0.8)', state: 'universal_purple' };
    } else {
      return { color: 'rgba(34, 197, 94, 0.75)', state: 'universal_green' };
    }
  }

  // Phenolphthalein indicator turns pink above pH 8.2
  if (hasPhenolphthalein && ph >= 8.2) {
    return { color: 'rgba(244, 63, 114, 0.82)', state: 'pink' };
  }

  // Default clean aqueous liquid
  return { color: 'rgba(224, 242, 254, 0.45)', state: 'clear' };
}

/**
 * Factory for creating an empty container.
 */
export function createEmptyApparatus(type: ApparatusType, instanceNumber: number = 1): ContainerContent {
  const capacities: Record<ApparatusType, number> = {
    beaker: 250,
    test_tube: 50,
    flask: 250,
    cylinder: 100,
  };
  const labels: Record<ApparatusType, string> = {
    beaker: `Beaker #${instanceNumber} (250mL)`,
    test_tube: `Test Tube #${instanceNumber} (50mL)`,
    flask: `Erlenmeyer Flask #${instanceNumber} (250mL)`,
    cylinder: `Graduated Cylinder #${instanceNumber} (100mL)`,
  };

  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type,
    name: labels[type],
    maxCapacityMl: capacities[type],
    totalVolumeMl: 0,
    solidGrams: 0,
    chemicalsAdded: [],
    molesAcid: 0,
    molesBase: 0,
    molesCuSO4: 0,
    hasPhenolphthalein: false,
    hasUniversalIndicator: false,
    hasZinc: false,
    hasMagnesium: false,
    hasIron: false,
    hasCaCO3: false,
    hasPrecipitateCuOH2: false,
    temperatureC: 22.0,
    burnerLevel: 0,
    isBoiling: false,
    hasEvaporatedCrystals: false,
    ph: 7.0,
    liquidColor: 'rgba(240, 249, 255, 0)',
    colorState: 'clear',
    isEffervescing: false,
    gasLabel: null,
    effervescenceIntensity: 'gentle',
    activeIons: [{ name: 'H', sub: '2', sup: '' }, { name: 'O' }],
    reactionTitle: null,
    reactionRate: 'Dormant',
    enthalpy: 'Neutral',
    wastePreventedMl: 0,
    wastePreventedGrams: 0,
  };
}

export interface AddChemicalResult {
  updatedContainer: ContainerContent;
  observation: ObservationLog;
}

/**
 * Pure function to add a chemical to an apparatus and calculate reactions.
 */
export function addChemicalToContainer(
  container: ContainerContent,
  chemicalId: ChemicalId
): AddChemicalResult {
  const chemDef = CHEMICAL_DEFINITIONS[chemicalId];
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const updated: ContainerContent = {
    ...container,
    chemicalsAdded: [...container.chemicalsAdded, chemicalId],
  };

  const wasPinkBefore = updated.colorState === 'pink';

  if (chemDef.state === 'solid') {
    const grams = chemDef.defaultGrams || 2;
    updated.solidGrams += grams;
    updated.wastePreventedGrams += grams;

    if (chemicalId === 'zn') updated.hasZinc = true;
    if (chemicalId === 'mg') updated.hasMagnesium = true;
    if (chemicalId === 'fe') updated.hasIron = true;
    if (chemicalId === 'caco3') updated.hasCaCO3 = true;
  } else {
    const addedMl = chemDef.defaultVolumeMl || 25;
    updated.totalVolumeMl = Math.min(updated.maxCapacityMl, updated.totalVolumeMl + addedMl);
    updated.wastePreventedMl += addedMl;

    if (chemicalId === 'hcl' || chemicalId === 'h2so4' || chemicalId === 'ch3cooh') {
      const molarity = chemicalId === 'h2so4' ? 1.0 : 1.0; // H2SO4 has 2 H+
      updated.molesAcid += (addedMl / 1000) * molarity;
    } else if (chemicalId === 'naoh' || chemicalId === 'nh4oh' || chemicalId === 'caoh2') {
      updated.molesBase += (addedMl / 1000) * 1.0;
    } else if (chemicalId === 'cuso4') {
      updated.molesCuSO4 += (addedMl / 1000) * 0.5;
    } else if (chemicalId === 'phenolphthalein') {
      updated.hasPhenolphthalein = true;
    } else if (chemicalId === 'universal') {
      updated.hasUniversalIndicator = true;
    }
  }

  // Recalculate pH
  const hasLiquid = updated.totalVolumeMl > 0;
  updated.ph = calculatePh(updated.molesAcid, updated.molesBase, updated.totalVolumeMl);

  // Check for Copper Hydroxide precipitation: CuSO4 + 2NaOH -> Cu(OH)2 (s) + Na2SO4
  if (updated.molesCuSO4 > 0 && updated.molesBase > 0) {
    updated.hasPrecipitateCuOH2 = true;
    updated.reactionTitle = 'Precipitation: CuSO4 (aq) + 2NaOH (aq) → Cu(OH)2 (s) ↓ + Na2SO4 (aq)';
    updated.reactionRate = 'Moderate';
    updated.enthalpy = 'Exothermic (releases heat)';
  }

  // Recalculate liquid color
  const colorInfo = determineLiquidColor(
    updated.hasPhenolphthalein,
    updated.hasUniversalIndicator,
    updated.ph,
    updated.molesCuSO4,
    updated.hasPrecipitateCuOH2,
    hasLiquid
  );
  updated.liquidColor = colorInfo.color;
  updated.colorState = colorInfo.state;

  // Check gas evolutions:
  // Reaction 1: Zn + 2HCl -> ZnCl2 + H2 ^
  const hasAcid = updated.molesAcid > 0;
  const isZnAcid = hasAcid && updated.hasZinc;
  const isMgAcid = hasAcid && updated.hasMagnesium;
  const isFeAcid = hasAcid && updated.hasIron;
  const isCaCO3Acid = hasAcid && updated.hasCaCO3;

  if (isZnAcid || isMgAcid || isFeAcid || isCaCO3Acid) {
    updated.isEffervescing = true;
    if (isCaCO3Acid) {
      updated.gasLabel = 'CO2 (g)';
      updated.effervescenceIntensity = 'vigorous';
      updated.reactionTitle = 'Carbonate Acidolysis: CaCO3 + 2HCl -> CaCl2 + CO2 ^ + H2O';
      updated.enthalpy = 'Exothermic (releases heat)';
      updated.reactionRate = 'Vigorous';
    } else if (isMgAcid) {
      updated.gasLabel = 'H2 (g)';
      updated.effervescenceIntensity = 'vigorous';
      updated.reactionTitle = 'Magnesium Oxidation: Mg + 2HCl -> MgCl2 + H2 ^';
      updated.enthalpy = 'Exothermic (releases heat)';
      updated.reactionRate = 'Vigorous';
      updated.temperatureC = Math.min(55, updated.temperatureC + 7);
    } else if (isZnAcid) {
      updated.gasLabel = 'H2 (g)';
      updated.effervescenceIntensity = 'gentle';
      updated.reactionTitle = 'Single Displacement: Zn + 2HCl -> ZnCl2 + H2 ^';
      updated.enthalpy = 'Exothermic (releases heat)';
      updated.reactionRate = 'Moderate';
      updated.temperatureC = Math.min(42, updated.temperatureC + 3.5);
    }
  }

  // Update molecular ions
  const ions: Array<{ name: string; sup?: string; sub?: string }> = [];
  if (updated.molesAcid > 0) {
    ions.push({ name: 'H', sup: '+' }, { name: 'Cl', sup: '-' });
  }
  if (updated.molesBase > 0) {
    ions.push({ name: 'Na', sup: '+' }, { name: 'OH', sup: '-' });
  }
  if (updated.molesCuSO4 > 0) {
    ions.push({ name: 'Cu', sup: '2+' }, { name: 'SO', sub: '4', sup: '2-' });
  }
  if (updated.hasZinc) ions.push({ name: 'Zn', sup: '2+' });
  if (updated.hasMagnesium) ions.push({ name: 'Mg', sup: '2+' });
  if (updated.isEffervescing) {
    ions.push({ name: updated.gasLabel?.replace(' ↑', '') || 'Gas' });
  }
  if (ions.length === 0) {
    ions.push({ name: 'H', sub: '2', sup: '' }, { name: 'O' });
  }
  updated.activeIons = ions;

  // Determine observation log according to prompt specifications
  const justTriggeredZnAcidReaction =
    (chemicalId === 'zn' && hasAcid) || (chemicalId === 'hcl' && updated.hasZinc);

  const justTurnedPink = !wasPinkBefore && updated.colorState === 'pink';
  const justNeutralizedBackToClear = wasPinkBefore && updated.colorState === 'clear' && chemicalId === 'hcl';

  let observation: ObservationLog;

  if (justTriggeredZnAcidReaction) {
    observation = {
      id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Added ${chemDef.name} (${chemDef.formula}) to ${updated.name}`,
      details: 'Effervescence observed - Hydrogen gas released.',
      equation: 'Reaction: Zn + 2HCl → ZnCl2 + H2 ↑. Observation: Bubbles of Hydrogen gas evolved.',
      type: 'reaction',
      ecoNote: 'Zero toxic heavy-metal run-off generated. 100% safe virtual reaction.',
    };
  } else if (justNeutralizedBackToClear) {
    observation = {
      id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Added ${chemDef.name} (${chemDef.formula}) to neutralise alkaline mixture`,
      details: 'Acid neutralized excess base. Solution returned to acidic/neutral pH.',
      equation: 'Reaction Neutralized. Indicator color changed from pink to colorless.',
      type: 'neutralization',
      ecoNote: 'Zero caustic waste disposed into city sewers. 100% green chemistry.',
    };
  } else if (justTurnedPink) {
    observation = {
      id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Added ${chemDef.name} (${chemDef.formula}) with indicator`,
      details: 'Solution turned vibrant pink in alkaline environment (pH ~ 13.0).',
      equation: 'Indicator (HIn) + OH⁻ <=> In⁻ (pink) + H2O',
      type: 'reaction',
      ecoNote: 'Phenolphthalein indicator endpoint verified visually without real reagent waste.',
    };
  } else if (chemicalId === 'mg' && hasAcid) {
    observation = {
      id: `obs-${Date.now()}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Added Magnesium Ribbon to acid in ${updated.name}`,
      details: 'Vigorous bubbling and exothermic heating observed as hydrogen gas evolves rapidly.',
      equation: 'Mg (s) + 2HCl (aq) → MgCl2 (aq) + H2 (g) ↑',
      type: 'reaction',
      ecoNote: 'Eliminates explosive hydrogen accumulation and open combustion risks.',
    };
  } else if (updated.hasPrecipitateCuOH2 && (chemicalId === 'cuso4' || chemicalId === 'naoh')) {
    observation = {
      id: `obs-${Date.now()}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Precipitation Reaction in ${updated.name}`,
      details: 'Light blue gelatinous precipitate of Copper(II) Hydroxide formed.',
      equation: 'CuSO4 (aq) + 2NaOH (aq) → Cu(OH)2 (s) ↓ + Na2SO4 (aq)',
      type: 'reaction',
      ecoNote: 'Zero copper sludge deposited into municipal waterways.',
    };
  } else if (isCaCO3Acid && (chemicalId === 'caco3' || chemicalId === 'hcl')) {
    observation = {
      id: `obs-${Date.now()}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Carbonate Dissolution in ${updated.name}`,
      details: 'Brisk effervescence as carbon dioxide gas bubbles vigorously out of solution.',
      equation: 'CaCO3 (s) + 2HCl (aq) → CaCl2 (aq) + CO2 (g) ↑ + H2O (l)',
      type: 'reaction',
      ecoNote: 'Preserves geological samples and eliminates acid gas venting.',
    };
  } else {
    const qty = chemDef.state === 'liquid' ? `${chemDef.defaultVolumeMl}mL` : `${chemDef.defaultGrams}g`;
    observation = {
      id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      apparatusName: updated.name,
      action: `Added ${qty} ${chemDef.formula} to ${updated.name}`,
      details:
        chemDef.state === 'liquid'
          ? `Total liquid volume: ${updated.totalVolumeMl} mL (pH ${updated.ph.toFixed(1)})`
          : `Solid ${chemDef.name} added to vessel`,
      type: 'info',
      ecoNote: chemDef.ecoBenefit,
    };
  }

  return { updatedContainer: updated, observation };
}

/**
 * Updates burner intensity level and temperature.
 */
export function setContainerBurner(
  container: ContainerContent,
  level: 0 | 1 | 2 | 3
): { updatedContainer: ContainerContent; observation?: ObservationLog } {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const updated = { ...container, burnerLevel: level };

  let observation: ObservationLog | undefined;

  if (level === 0) {
    observation = {
      id: `obs-${Date.now()}`,
      timestamp: timeStr,
      apparatusName: container.name,
      action: `Extinguished Bunsen Burner under ${container.name}`,
      details: 'Heating halted. Vessel allowed to cool toward room temperature (22°C).',
      type: 'thermal',
      ecoNote: 'Conserves virtual natural gas fuel.',
    };
  } else {
    const levelNames = ['Off', 'Low Gentle Flame', 'Medium Flame', 'Roaring Blue Flame'];
    observation = {
      id: `obs-${Date.now()}`,
      timestamp: timeStr,
      apparatusName: container.name,
      action: `Set Bunsen Burner to ${levelNames[level]} (${level * 33}% Power)`,
      details: 'Thermal energy transferred into the reaction vessel. Temperature rising.',
      type: 'thermal',
      ecoNote: 'Zero soot or greenhouse combustion emissions in virtual simulation.',
    };
  }

  return { updatedContainer: updated, observation };
}

/**
 * Steps temperature forward based on burner level.
 */
export function tickThermalStep(container: ContainerContent): ContainerContent {
  const updated = { ...container };
  const targetTemps = [22.0, 50.0, 80.0, 102.0];
  const target = targetTemps[container.burnerLevel];

  if (container.burnerLevel > 0) {
    if (updated.temperatureC < target) {
      updated.temperatureC = Math.min(target, updated.temperatureC + container.burnerLevel * 2.2);
    }
  } else {
    if (updated.temperatureC > 22.0) {
      updated.temperatureC = Math.max(22.0, updated.temperatureC - 1.2);
    }
  }

  // Check boiling at 100°C with liquid
  if (updated.temperatureC >= 99.5 && updated.totalVolumeMl > 0) {
    updated.isBoiling = true;
    updated.isEffervescing = true;
    updated.gasLabel = 'H2O (steam) ↑';
    updated.reactionTitle = 'Thermal Evaporation: Liquid H2O -> H2O (vapor) ↑';
    updated.enthalpy = 'Thermal Boiling';
  } else if (updated.burnerLevel === 0 && updated.isBoiling) {
    updated.isBoiling = false;
    if (!updated.hasZinc && !updated.hasMagnesium && !updated.hasCaCO3) {
      updated.isEffervescing = false;
      updated.gasLabel = null;
    }
  }

  return updated;
}

/**
 * Empties and rinses an apparatus.
 */
export function rinseApparatus(container: ContainerContent): { updatedContainer: ContainerContent; observation: ObservationLog } {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const cleared: ContainerContent = {
    ...container,
    totalVolumeMl: 0,
    solidGrams: 0,
    chemicalsAdded: [],
    molesAcid: 0,
    molesBase: 0,
    molesCuSO4: 0,
    hasPhenolphthalein: false,
    hasUniversalIndicator: false,
    hasZinc: false,
    hasMagnesium: false,
    hasIron: false,
    hasCaCO3: false,
    hasPrecipitateCuOH2: false,
    temperatureC: 22.0,
    burnerLevel: 0,
    isBoiling: false,
    hasEvaporatedCrystals: false,
    liquidColor: 'rgba(240, 249, 255, 0)',
    colorState: 'clear',
    isEffervescing: false,
    gasLabel: null,
    effervescenceIntensity: 'gentle',
    activeIons: [{ name: 'H', sub: '2', sup: '' }, { name: 'O' }],
    reactionTitle: null,
    reactionRate: 'Dormant',
    enthalpy: 'Neutral',
    ph: 7.0,
  };

  const observation: ObservationLog = {
    id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: timeStr,
    apparatusName: container.name,
    action: `Rinsed & Reset ${container.name}`,
    details: 'Apparatus cleaned and prepared for subsequent experiment. Zero chemical effluents discharged.',
    type: 'reset',
    ecoNote: 'Virtual rinse prevents tap water contamination and secondary wastewater treatment overhead.',
  };

  return { updatedContainer: cleared, observation };
}
