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

export interface PizzaTagilaFacade {
  areas: ComponentArea[];
  tokens: DesignTokens;
  lookup: ComponentLookup;
  flatten: () => ReturnType<typeof flattenComponentAreas>;
  summarize: () => ReturnType<typeof summarizeAreas>;
  validate: () => string[];
  findDuplicates: () => string[];
  findMissingMetadata: () => { id: string; missing: 'states' | 'tags' }[];
  getComponentsByTag: (tag: ComponentTag) => ComponentDefinition[];
  getComponentsByState: (state: ComponentState) => ComponentDefinition[];
  getAreaCoverage: (area: ComponentArea) => ReturnType<typeof getAreaCoverage>;
  buildAreaSummary: (area: ComponentArea) => ReturnType<typeof buildAreaSummary>;
  getSafeArea: (platform: keyof DesignTokens['layout']['safeArea']) => SafeAreaToken;
  getWebContainer: () => ReturnType<typeof getWebContainer>;
  getSpacingScale: () => number[];
  usesEightPointSpacing: () => boolean;
  isTouchTargetCompliant: (height: number) => boolean;
}

export function createPizzaTagila(config: PizzaTagilaConfig = {}): PizzaTagilaFacade {
  const areas = config.areas ?? defaultComponentAreas;
  const tokens = config.tokens ?? defaultDesignTokens;

  return {
    areas,
    tokens,
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
    getSafeArea: (platform) => getSafeArea(platform, tokens),
    getWebContainer: () => getWebContainer(tokens),
    getSpacingScale: () => getSpacingScale(tokens),
    usesEightPointSpacing: () => usesEightPointSpacing(tokens),
    isTouchTargetCompliant: (height) => isTouchTargetCompliant(height, tokens),
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
