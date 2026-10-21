/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createEmptyApparatus,
  addChemicalToContainer,
  rinseApparatus,
  setContainerBurner,
  tickThermalStep,
} from './chemistry';

test('createEmptyApparatus initializes clean beaker, flask, cylinder, test tube', () => {
  const beaker = createEmptyApparatus('beaker', 1);
  const flask = createEmptyApparatus('flask', 1);
  const cylinder = createEmptyApparatus('cylinder', 1);
  const testTube = createEmptyApparatus('test_tube', 1);

  assert.equal(beaker.type, 'beaker');
  assert.equal(beaker.maxCapacityMl, 250);
  assert.equal(flask.maxCapacityMl, 250);
  assert.equal(cylinder.maxCapacityMl, 100);
  assert.equal(testTube.maxCapacityMl, 50);
});

test('Reaction 1: HCl + Zinc Granules triggers effervescence and required log', () => {
  let beaker = createEmptyApparatus('beaker', 1);
  beaker = addChemicalToContainer(beaker, 'hcl').updatedContainer;
  const res2 = addChemicalToContainer(beaker, 'zn');
  beaker = res2.updatedContainer;

  assert.equal(beaker.isEffervescing, true);
  assert.equal(
    res2.observation.equation,
    'Reaction: Zn + 2HCl → ZnCl2 + H2 ↑. Observation: Bubbles of Hydrogen gas evolved.'
  );
});

test('Reaction 2: NaOH + Phenolphthalein turns pink, then HCl neutralizes to clear', () => {
  let beaker = createEmptyApparatus('beaker', 1);
  beaker = addChemicalToContainer(beaker, 'naoh').updatedContainer;
  const step2 = addChemicalToContainer(beaker, 'phenolphthalein');
  beaker = step2.updatedContainer;
  assert.equal(beaker.colorState, 'pink');

  const step3 = addChemicalToContainer(beaker, 'hcl');
  beaker = step3.updatedContainer;
  assert.equal(beaker.colorState, 'clear');
  assert.equal(
    step3.observation.equation,
    'Reaction Neutralized. Indicator color changed from pink to colorless.'
  );
});

test('Precipitation: CuSO4 + NaOH forms Cu(OH)2 blue precipitate', () => {
  let beaker = createEmptyApparatus('beaker', 1);
  beaker = addChemicalToContainer(beaker, 'cuso4').updatedContainer;
  assert.equal(beaker.colorState, 'blue');

  const step2 = addChemicalToContainer(beaker, 'naoh');
  beaker = step2.updatedContainer;
  assert.equal(beaker.hasPrecipitateCuOH2, true);
  assert.equal(beaker.colorState, 'precipitate_blue');
});

test('Bunsen Burner regulates temperature and triggers boiling step', () => {
  let beaker = createEmptyApparatus('beaker', 1);
  beaker = addChemicalToContainer(beaker, 'hcl').updatedContainer;

  const res = setContainerBurner(beaker, 3);
  beaker = res.updatedContainer;
  assert.equal(beaker.burnerLevel, 3);

  // Tick steps
  for (let i = 0; i < 40; i++) {
    beaker = tickThermalStep(beaker);
  }

  assert.equal(beaker.temperatureC >= 99, true);
  assert.equal(beaker.isBoiling, true);
});
