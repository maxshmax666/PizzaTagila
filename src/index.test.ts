import { describe, expect, it } from 'vitest';

import {
  componentAreas,
  createComponentLookup,
  createComponentMapApi,
  createDesignTokenApi,
  designTokens,
  flattenComponentAreas,
  buildAreaSummary,
  createPizzaTagila,
  findComponentsWithoutMetadata,
  findDuplicateComponentIds,
  getAreaCoverage,
  getSafeArea,
  getSpacingScale,
  getWebContainer,
  getComponentsByState,
  getComponentsByTag,
  isTouchTargetCompliant,
  pizzaTagila,
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

    const validationErrors = validateComponentMap(duplicateAreas);
    expect(validationErrors).toContain('Duplicate component id "duplicate".');
    expect(validationErrors).toContain('Component "duplicate" has no tags.');
  });

  it('flattens areas and validates emptiness', () => {
    const flattened = flattenComponentAreas(componentAreas);
    expect(flattened[0]?.area).toBe(componentAreas[0].id);

    const emptyErrors = validateComponentMap([]);
    expect(emptyErrors).toContain('Component map is empty.');
  });

  it('reports empty areas and missing states in validation', () => {
    const faultyAreas = [
      { ...componentAreas[0], components: [] },
      {
        ...componentAreas[1],
        components: [
          { ...componentAreas[1].components[0], id: 'dup', states: [], tags: [] },
          { ...componentAreas[1].components[1], id: 'dup' },
        ],
      },
    ];

    const errors = validateComponentMap(faultyAreas);
    expect(errors).toContain('Area "navigation" has no components.');
    expect(errors).toContain('Duplicate component id "dup".');
    expect(errors).toContain('Component "dup" has no states.');
    expect(errors).toContain('Component "dup" has no tags.');
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

describe('facade helpers', () => {
  const minimalArea = {
    id: 'navigation',
    title: 'Custom navigation',
    summary: 'Only one component for testing.',
    components: [
      {
        id: 'nav-only',
        title: 'NavOnly',
        description: 'Single component to isolate facade state.',
        states: ['default', 'active'],
        tags: ['navigation', 'action'],
      },
    ],
  } as const;

  it('builds a component map API with injected areas', () => {
    const api = createComponentMapApi([minimalArea]);

    expect(api.lookup['nav-only']?.area).toBe('navigation');
    expect(api.flatten()).toEqual([
      expect.objectContaining({ id: 'nav-only', area: 'navigation' }),
    ]);
    expect(api.summarize()).toEqual([
      expect.objectContaining({ id: 'navigation', totalComponents: 1 }),
    ]);
    expect(api.validate()).toEqual([]);
    expect(api.findDuplicates()).toEqual([]);
    expect(api.buildAreaSummary(minimalArea).statesCovered).toContain('active');
  });

  it('throws when duplicate ids are provided', () => {
    const duplicateArea = {
      ...minimalArea,
      components: [
        ...minimalArea.components,
        { ...minimalArea.components[0], id: minimalArea.components[0].id },
      ],
    };

    expect(() => createComponentMapApi([duplicateArea])).toThrow(
      /duplicate component ids/i,
    );
  });

  it('creates token helpers with custom spacing and targets', () => {
    const offGridTokens: typeof designTokens = {
      ...designTokens,
      core: {
        ...designTokens.core,
        space: {
          '0': 0,
          '1': 8,
          '2': 16,
        },
      },
      layout: {
        ...designTokens.layout,
        grid: {
          ...designTokens.layout.grid,
          base: 10,
          touchTargetMin: 52,
        },
      },
    };

    const tokenApi = createDesignTokenApi(offGridTokens);

    expect(tokenApi.getSpacingScale()).toEqual([0, 8, 16]);
    expect(tokenApi.usesEightPointSpacing()).toBe(false);
    expect(tokenApi.isTouchTargetCompliant(60)).toBe(true);
    expect(tokenApi.isTouchTargetCompliant(50)).toBe(false);
    expect(tokenApi.getSafeArea('web').topMin).toBe(0);
  });
});

describe('facade configuration', () => {
  it('exposes a default, ready-to-use facade', () => {
    expect(pizzaTagila.lookup['button-primary']?.area).toBe('buttons');
    expect(pizzaTagila.flatten()).toHaveLength(52);
    expect(pizzaTagila.validate()).toHaveLength(0);
    expect(pizzaTagila.summarize().some((entry) => entry.id === 'navigation')).toBe(true);
    expect(pizzaTagila.getSpacingScale()).toEqual([0, 8, 16, 24, 32, 40, 48, 56, 64]);
    expect(pizzaTagila.usesEightPointSpacing()).toBe(true);
  });

  it('allows injecting custom areas and tokens for isolated testing', () => {
    const customArea = {
      id: 'navigation',
      title: 'Custom navigation',
      summary: 'Only one component for testing.',
      components: [
        {
          id: 'nav-only',
          title: 'NavOnly',
          description: 'Single component to isolate facade state.',
          states: ['default', 'active'],
          tags: ['navigation', 'action'],
        },
      ],
    } as const;

    const customTokens: typeof designTokens = {
      ...designTokens,
      layout: {
        ...designTokens.layout,
        grid: {
          ...designTokens.layout.grid,
          base: 10,
          touchTargetMin: designTokens.layout.grid.touchTargetMin + 2,
        },
      },
    };

    const facade = createPizzaTagila({
      areas: [customArea],
      tokens: customTokens,
    });

    expect(facade.lookup['nav-only']?.area).toBe('navigation');
    expect(facade.flatten()).toHaveLength(1);
    expect(facade.findDuplicates()).toEqual([]);
    expect(facade.findMissingMetadata()).toEqual([]);
    expect(facade.validate()).toEqual([]);
    expect(facade.getAreaCoverage(customArea).states.has('active')).toBe(true);
    expect(facade.usesEightPointSpacing()).toBe(false);
    expect(facade.isTouchTargetCompliant(customTokens.layout.grid.touchTargetMin - 1)).toBe(
      false,
    );
  });
});
