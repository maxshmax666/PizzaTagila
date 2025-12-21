import { describe, expect, it } from 'vitest';

import {
  componentAreas,
  createComponentLookup,
  designTokens,
  buildAreaSummary,
  findComponentsWithoutMetadata,
  findDuplicateComponentIds,
  getAreaCoverage,
  getSafeArea,
  getSpacingScale,
  getWebContainer,
  getComponentsByState,
  getComponentsByTag,
  isTouchTargetCompliant,
  summarizeAreas,
  usesEightPointSpacing,
  validateComponentMap,
} from './index';

describe('component map', () => {
  it('builds a complete lookup with unique ids', () => {
    const lookup = createComponentLookup(componentAreas);
    const ids = Object.keys(lookup);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(52);
    expect(uniqueIds.size).toBe(ids.length);
    expect(lookup['button-primary']?.area).toBe('buttons');
  });

  it('groups components by tag and state', () => {
    const actions = getComponentsByTag('action', componentAreas);
    const disabled = getComponentsByState('disabled', componentAreas);

    expect(actions.length).toBeGreaterThan(0);
    expect(disabled.some((component) => component.id === 'tab-row')).toBe(true);
  });

  it('summarizes areas with state and tag coverage', () => {
    const summaries = summarizeAreas(componentAreas);
    const navigation = summaries.find((entry) => entry.id === 'navigation');

    expect(navigation?.statesCovered).toContain('active');
    expect(navigation?.totalComponents).toBe(4);
  });

  it('validates that map has no structural errors', () => {
    const errors = validateComponentMap(componentAreas);
    expect(errors).toHaveLength(0);
  });

  it('extracts coverage and summaries for an area', () => {
    const coverage = getAreaCoverage(componentAreas[0]);
    const summary = buildAreaSummary(componentAreas[0]);

    expect(coverage.states.has('active')).toBe(true);
    expect(summary.totalComponents).toBe(componentAreas[0].components.length);
    expect(summary.tagsCovered).toContain('navigation');
  });

  it('detects duplicate ids and missing metadata', () => {
    const duplicateAreas = [
      {
        ...componentAreas[0],
        components: [
          ...componentAreas[0].components,
          { ...componentAreas[0].components[0], id: 'duplicate' },
          { ...componentAreas[0].components[0], id: 'duplicate', tags: [] },
        ],
      },
    ];

    expect(findDuplicateComponentIds(duplicateAreas)).toEqual(['duplicate']);
    expect(findComponentsWithoutMetadata(duplicateAreas)).toContainEqual({
      id: 'duplicate',
      missing: 'tags',
    });
  });
});

describe('design tokens', () => {
  it('keeps spacing on the 8pt grid', () => {
    const spacing = getSpacingScale(designTokens);

    expect(spacing).toEqual([0, 8, 16, 24, 32, 40, 48, 56, 64]);
    expect(usesEightPointSpacing(designTokens)).toBe(true);
  });

  it('exposes platform safe areas and container rules', () => {
    expect(getSafeArea('ios', designTokens).topMin).toBe(44);
    expect(getSafeArea('android', designTokens).bottomMin).toBe(16);
    expect(getWebContainer(designTokens)).toEqual({ maxWidth: 480, paddingX: 16 });
  });

  it('keeps touch targets compliant with the grid', () => {
    expect(isTouchTargetCompliant(56, designTokens)).toBe(true);
    expect(isTouchTargetCompliant(40, designTokens)).toBe(false);
  });
});
