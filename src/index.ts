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

export interface AreaServices {
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
  buildAreaSummary: (area: ComponentArea) => ReturnType<typeof buildAreaSummary>;
}

export interface LayoutServices {
  tokens: DesignTokens;
  getSafeArea: (platform: keyof DesignTokens['layout']['safeArea']) => SafeAreaToken;
  getWebContainer: () => ReturnType<typeof getWebContainer>;
  getSpacingScale: () => number[];
  usesEightPointSpacing: () => boolean;
  isTouchTargetCompliant: (height: number) => boolean;
}

export interface PizzaTagilaConfig {
  areas?: ComponentArea[];
  tokens?: DesignTokens;
}

export interface PizzaTagilaDependencies {
  areas: ComponentArea[];
  tokens: DesignTokens;
}

export interface PizzaTagilaFactories {
  createAreaServices?: (areas: ComponentArea[], lookup?: ComponentLookup) => AreaServices;
  createLayoutServices?: (tokens: DesignTokens) => LayoutServices;
}

export function resolveFacadeConfig(config: PizzaTagilaConfig = {}): PizzaTagilaDependencies {
  return {
    areas: config.areas ?? defaultComponentAreas,
    tokens: config.tokens ?? defaultDesignTokens,
  };
}

export interface PizzaTagilaFacade extends AreaServices, LayoutServices {}

export function createAreaServices(
  areas: ComponentArea[],
  lookup: ComponentLookup = createComponentLookup(areas),
): AreaServices {
  return {
    areas,
    lookup,
    flatten: () => flattenComponentAreas(areas),
    summarize: () => summarizeAreas(areas),
    validate: () => validateComponentMap(areas),
    findDuplicates: () => findDuplicateComponentIds(areas),
    findMissingMetadata: () => findComponentsWithoutMetadata(areas),
    getComponentsByTag: (tag: ComponentTag) => getComponentsByTag(tag, areas),
    getComponentsByState: (state: ComponentState) => getComponentsByState(state, areas),
    getAreaCoverage: (area: ComponentArea) => getAreaCoverage(area),
    buildAreaSummary: (area: ComponentArea) => buildAreaSummary(area),
  };
}

export function createLayoutServices(tokens: DesignTokens): LayoutServices {
  return {
    tokens,
    getSafeArea: (platform: keyof DesignTokens['layout']['safeArea']) =>
      getSafeArea(platform, tokens),
    getWebContainer: () => getWebContainer(tokens),
    getSpacingScale: () => getSpacingScale(tokens),
    usesEightPointSpacing: () => usesEightPointSpacing(tokens),
    isTouchTargetCompliant: (height: number) => isTouchTargetCompliant(height, tokens),
  };
}

export function composePizzaTagila(
  dependencies: PizzaTagilaDependencies,
  factories: PizzaTagilaFactories = {},
): PizzaTagilaFacade {
  const areaFactory = factories.createAreaServices ?? createAreaServices;
  const layoutFactory = factories.createLayoutServices ?? createLayoutServices;

  const areaServices = areaFactory(dependencies.areas);
  const layoutServices = layoutFactory(dependencies.tokens);

  return {
    areas: dependencies.areas,
    tokens: layoutServices.tokens,
    lookup: areaServices.lookup,
    ...areaServices,
    ...layoutServices,
  };
}

export function createPizzaTagila(
  config: PizzaTagilaConfig = {},
  factories: PizzaTagilaFactories = {},
): PizzaTagilaFacade {
  const dependencies = resolveFacadeConfig(config);
  return composePizzaTagila(dependencies, factories);
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
