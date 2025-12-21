import { componentAreas } from '../data/componentAreas';
import type {
  AreaCoverage,
  AreaSummary,
  ComponentArea,
  ComponentDefinition,
  ComponentLookup,
  ComponentState,
  ComponentTag,
  ComponentWithArea,
} from '../types/design';

export function flattenComponentAreas(
  areas: ComponentArea[] = componentAreas,
): ComponentWithArea[] {
  return areas.flatMap((area) =>
    area.components.map((component) => ({ ...component, area: area.id })),
  );
}

export function createComponentLookup(
  areas: ComponentArea[] = componentAreas,
): ComponentLookup {
  return flattenComponentAreas(areas).reduce<ComponentLookup>((acc, component) => {
    acc[component.id] = component;
    return acc;
  }, {});
}

export function getComponentsByTag(
  tag: ComponentTag,
  areas: ComponentArea[] = componentAreas,
): ComponentDefinition[] {
  return flattenComponentAreas(areas).filter((component) => component.tags.includes(tag));
}

export function getComponentsByState(
  state: ComponentState,
  areas: ComponentArea[] = componentAreas,
): ComponentDefinition[] {
  return flattenComponentAreas(areas).filter((component) =>
    component.states.includes(state),
  );
}

export function getAreaCoverage(area: ComponentArea): AreaCoverage {
  const states = new Set<ComponentState>();
  const tags = new Set<ComponentTag>();

  area.components.forEach((component) => {
    component.states.forEach((state) => states.add(state));
    component.tags.forEach((tag) => tags.add(tag));
  });

  return { states, tags };
}

export function buildAreaSummary(area: ComponentArea): AreaSummary {
  const coverage = getAreaCoverage(area);

  return {
    id: area.id,
    title: area.title,
    totalComponents: area.components.length,
    statesCovered: [...coverage.states].sort(),
    tagsCovered: [...coverage.tags].sort(),
  };
}

export function summarizeAreas(areas: ComponentArea[] = componentAreas) {
  return areas.map((area) => buildAreaSummary(area));
}

export function findDuplicateComponentIds(areas: ComponentArea[] = componentAreas) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  areas.forEach((area) => {
    area.components.forEach((component) => {
      if (seen.has(component.id)) {
        duplicates.add(component.id);
      }
      seen.add(component.id);
    });
  });

  return [...duplicates];
}

export function findComponentsWithoutMetadata(
  areas: ComponentArea[] = componentAreas,
): { id: string; missing: 'states' | 'tags' }[] {
  const missing: { id: string; missing: 'states' | 'tags' }[] = [];

  areas.forEach((area) => {
    area.components.forEach((component) => {
      if (!component.states.length) {
        missing.push({ id: component.id, missing: 'states' });
      }
      if (!component.tags.length) {
        missing.push({ id: component.id, missing: 'tags' });
      }
    });
  });

  return missing;
}

export function validateComponentMap(
  areas: ComponentArea[] = componentAreas,
): string[] {
  const errors: string[] = [];

  if (areas.length === 0) {
    errors.push('Component map is empty.');
    return errors;
  }

  areas.forEach((area) => {
    if (!area.components.length) {
      errors.push(`Area "${area.id}" has no components.`);
    }
  });

  findDuplicateComponentIds(areas).forEach((id) => {
    errors.push(`Duplicate component id "${id}".`);
  });

  findComponentsWithoutMetadata(areas).forEach((entry) => {
    if (entry.missing === 'states') {
      errors.push(`Component "${entry.id}" has no states.`);
    }
    if (entry.missing === 'tags') {
      errors.push(`Component "${entry.id}" has no tags.`);
    }
  });

  return errors;
}
