import { describe, expect, it } from 'vitest';

import {
  componentAreas,
  createComponentLookup,
  designTokens,
  getComponentsByState,
  getComponentsByTag,
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
});

describe('design tokens', () => {
  it('keeps spacing on the 8pt grid', () => {
    expect(usesEightPointSpacing(designTokens)).toBe(true);
  });
});
