import { componentAreas } from './data/componentAreas';
import type {
  ComponentArea,
  ComponentDefinition,
  ComponentState,
  ComponentTag,
  DesignTokens,
} from './types/design';

export type ComponentLookup = Record<
  string,
  ComponentDefinition & { area: ComponentArea['id'] }
>;

export const designTokens: DesignTokens = {
  colors: {
    background: '#fff7ec',
    surface: '#ffffff',
    primary: '#f28c28',
    accent: '#1f8a4c',
    border: '#e1d5c2',
    muted: '#6b635a',
    text: '#1f1b2d',
    success: '#2f9e44',
    error: '#d7263d',
    info: '#1d70a2',
  },
  spacing: [8, 16, 24, 32, 40, 48],
  radii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadows: {
    card: '0 10px 30px rgba(0, 0, 0, 0.08)',
    soft: '0 4px 14px rgba(0, 0, 0, 0.06)',
  },
  typography: {
    h1: { size: 28, lineHeight: 36, weight: 700 },
    h2: { size: 22, lineHeight: 30, weight: 700 },
    body: { size: 16, lineHeight: 24, weight: 500 },
    caption: { size: 14, lineHeight: 20, weight: 500, letterSpacing: 0.1 },
  },
};

export function createComponentLookup(
  areas: ComponentArea[] = componentAreas,
): ComponentLookup {
  return areas.reduce<ComponentLookup>((acc, area) => {
    area.components.forEach((component) => {
      acc[component.id] = { ...component, area: area.id };
    });
    return acc;
  }, {});
}

export function getComponentsByTag(
  tag: ComponentTag,
  areas: ComponentArea[] = componentAreas,
): ComponentDefinition[] {
  return areas.flatMap((area) =>
    area.components.filter((component) => component.tags.includes(tag)),
  );
}

export function getComponentsByState(
  state: ComponentState,
  areas: ComponentArea[] = componentAreas,
): ComponentDefinition[] {
  return areas.flatMap((area) =>
    area.components.filter((component) => component.states.includes(state)),
  );
}

export function summarizeAreas(areas: ComponentArea[] = componentAreas) {
  return areas.map((area) => {
    const stateSet = new Set<ComponentState>();
    const tagSet = new Set<ComponentTag>();

    area.components.forEach((component) => {
      component.states.forEach((state) => stateSet.add(state));
      component.tags.forEach((tag) => tagSet.add(tag));
    });

    return {
      id: area.id,
      title: area.title,
      totalComponents: area.components.length,
      statesCovered: [...stateSet].sort(),
      tagsCovered: [...tagSet].sort(),
    };
  });
}

export function validateComponentMap(
  areas: ComponentArea[] = componentAreas,
): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  areas.forEach((area) => {
    if (!area.components.length) {
      errors.push(`Area "${area.id}" has no components.`);
    }

    area.components.forEach((component) => {
      if (seenIds.has(component.id)) {
        errors.push(`Duplicate component id "${component.id}".`);
      }
      seenIds.add(component.id);

      if (!component.states.length) {
        errors.push(`Component "${component.id}" has no states.`);
      }

      if (!component.tags.length) {
        errors.push(`Component "${component.id}" has no tags.`);
      }
    });
  });

  return errors;
}

export function usesEightPointSpacing(tokens: DesignTokens = designTokens) {
  return tokens.spacing.every((value) => value % 8 === 0);
}

export { componentAreas };
