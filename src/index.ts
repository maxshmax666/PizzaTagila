export { componentAreas } from './data/componentAreas';
export { designTokens } from './design/tokens';
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
} from './core/componentMap';
export {
  getSafeArea,
  getSpacingScale,
  getWebContainer,
  isTouchTargetCompliant,
  usesEightPointSpacing,
} from './core/layout';
