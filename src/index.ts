import {
  buildAreaSummary,
  createComponentLookup,
  findComponentsWithoutMetadata,
  findDuplicateComponentIds,
  flattenComponentAreas,
  getAreaCoverage,
  getComponentsByState,
  getComponentsByTag,
  summarizeAreas,
  validateComponentMap,
} from './core/componentMap';
import {
  getSafeArea,
  getSpacingScale,
  getWebContainer,
  isTouchTargetCompliant,
  usesEightPointSpacing,
} from './core/layout';
import { componentAreas as defaultComponentAreas } from './data/componentAreas';
import { designTokens as defaultDesignTokens } from './design/tokens';
import type {
  AreaSummary,
  ComponentArea,
  ComponentDefinition,
  ComponentLookup,
  ComponentState,
  ComponentTag,
  DesignTokens,
  SafeAreaToken,
} from './types/design';

export interface PizzaTagilaConfig {
  areas?: ComponentArea[];
  tokens?: DesignTokens;
}

export interface ComponentMapApi {
  areas: ComponentArea[];
  lookup: ComponentLookup;
  flatten: () => ReturnType<typeof flattenComponentAreas>;
  summarize: () => ReturnType<typeof summarizeAreas>;
  validate: () => string[];
  findDuplicates: () => string[];
  findMissingMetadata: () => { id: string; missing: 'states' | 'tags' }[];
  getComponentsByTag: (tag: ComponentTag) => ComponentDefinition[];
  getComponentsByState: (state: ComponentState) => ComponentDefinition[];
  getAreaCoverage: (area: ComponentArea) => ReturnType<typeof getAreaCoverage>;
  buildAreaSummary: (area: ComponentArea) => AreaSummary;
}

export interface DesignTokenApi {
  getSafeArea: (platform: keyof DesignTokens['layout']['safeArea']) => SafeAreaToken;
  getWebContainer: () => ReturnType<typeof getWebContainer>;
  getSpacingScale: () => number[];
  usesEightPointSpacing: () => boolean;
  isTouchTargetCompliant: (height: number) => boolean;
}

export interface PizzaTagilaFacade extends ComponentMapApi, DesignTokenApi {
  tokens: DesignTokens;
}

export function createComponentMapApi(
  areas: ComponentArea[] = defaultComponentAreas,
): ComponentMapApi {
  const duplicates = findDuplicateComponentIds(areas);

  if (duplicates.length) {
    throw new Error(`Duplicate component ids found: ${duplicates.join(', ')}`);
  }

  return {
    areas,
    lookup: createComponentLookup(areas),
    flatten: () => flattenComponentAreas(areas),
    summarize: () => summarizeAreas(areas),
    validate: () => validateComponentMap(areas),
    findDuplicates: () => findDuplicateComponentIds(areas),
    findMissingMetadata: () => findComponentsWithoutMetadata(areas),
    getComponentsByTag: (tag) => getComponentsByTag(tag, areas),
    getComponentsByState: (state) => getComponentsByState(state, areas),
    getAreaCoverage: (area) => getAreaCoverage(area),
    buildAreaSummary: (area) => buildAreaSummary(area),
  };
}

export function createDesignTokenApi(
  tokens: DesignTokens = defaultDesignTokens,
): DesignTokenApi {
  return {
    getSafeArea: (platform) => getSafeArea(platform, tokens),
    getWebContainer: () => getWebContainer(tokens),
    getSpacingScale: () => getSpacingScale(tokens),
    usesEightPointSpacing: () => usesEightPointSpacing(tokens),
    isTouchTargetCompliant: (height) => isTouchTargetCompliant(height, tokens),
  };
}

export function createPizzaTagila(config: PizzaTagilaConfig = {}): PizzaTagilaFacade {
  const areas = config.areas ?? defaultComponentAreas;
  const tokens = config.tokens ?? defaultDesignTokens;

  const componentMapApi = createComponentMapApi(areas);
  const tokenApi = createDesignTokenApi(tokens);

  return {
    ...componentMapApi,
    ...tokenApi,
    tokens,
  };
}

export const pizzaTagila = createPizzaTagila();

export { defaultComponentAreas as componentAreas };
export { defaultDesignTokens as designTokens };
export {
  buildAreaSummary,
  createComponentLookup,
  findComponentsWithoutMetadata,
  findDuplicateComponentIds,
  flattenComponentAreas,
  getAreaCoverage,
  getComponentsByState,
  getComponentsByTag,
  summarizeAreas,
  validateComponentMap,
};
export {
  getSafeArea,
  getSpacingScale,
  getWebContainer,
  isTouchTargetCompliant,
  usesEightPointSpacing,
};
