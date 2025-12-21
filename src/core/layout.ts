import type { DesignTokens, SafeAreaToken } from '../types/design';
import { designTokens } from '../design/tokens';

function isOnGrid(value: number, step: number) {
  return value % step === 0;
}

export function getSpacingScale(tokens: DesignTokens = designTokens) {
  return Object.values(tokens.core.space).sort((a, b) => a - b);
}

export function usesEightPointSpacing(tokens: DesignTokens = designTokens) {
  const { base } = tokens.layout.grid;
  return base === 8 && getSpacingScale(tokens).every((value) => isOnGrid(value, base));
}

export function isTouchTargetCompliant(
  height: number,
  tokens: DesignTokens = designTokens,
) {
  const { base, touchTargetMin } = tokens.layout.grid;
  return height >= touchTargetMin && isOnGrid(height, base);
}

export function getSafeArea(
  platform: keyof DesignTokens['layout']['safeArea'],
  tokens: DesignTokens = designTokens,
): SafeAreaToken {
  return tokens.layout.safeArea[platform];
}

export function getWebContainer(tokens: DesignTokens = designTokens) {
  return tokens.layout.container.web;
}
