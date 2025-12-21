import { componentAreas } from './data/componentAreas';
import type {
  AreaCoverage,
  AreaSummary,
  ComponentArea,
  ComponentDefinition,
  ComponentLookup,
  ComponentState,
  ComponentTag,
  DesignTokens,
  SafeAreaToken,
} from './types/design';

export const designTokens: DesignTokens = {
  meta: {
    name: 'pizza-tagil-tokens',
    version: '1.0.0',
    grid: '8pt',
    platforms: ['ios', 'android', 'web'],
  },
  core: {
    color: {
      orange: {
        '50': '#FFF3E6',
        '100': '#FFE2C2',
        '200': '#FFC48A',
        '300': '#FFA154',
        '400': '#F48A2A',
        '500': '#E57E22',
        '600': '#CC6B17',
        '700': '#A85512',
        '800': '#7C3D0C',
        '900': '#4B2406',
      },
      green: {
        '50': '#EAF7EF',
        '100': '#CDEEDB',
        '200': '#9FDEB8',
        '300': '#6FCF95',
        '400': '#45BE77',
        '500': '#2FAE63',
        '600': '#249152',
        '700': '#1B7140',
        '800': '#135230',
        '900': '#0B3320',
      },
      neutral: {
        '0': '#FFFFFF',
        '50': '#FAF7F2',
        '100': '#F3EDE3',
        '200': '#E8DDCC',
        '300': '#D8C7AD',
        '400': '#B89E82',
        '500': '#8A6E56',
        '600': '#6A5442',
        '700': '#4F3E31',
        '800': '#362A21',
        '900': '#221A14',
        '1000': '#000000',
      },
      red: {
        '500': '#D94A3A',
        '600': '#B83A2E',
      },
      blue: {
        '500': '#2B6DEB',
      },
    },
    space: {
      '0': 0,
      '1': 8,
      '2': 16,
      '3': 24,
      '4': 32,
      '5': 40,
      '6': 48,
      '7': 56,
      '8': 64,
    },
    radius: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
      pill: 999,
    },
    stroke: {
      hairline: 1,
      thin: 2,
    },
    shadow: {
      none: { x: 0, y: 0, blur: 0, spread: 0, color: 'rgba(0,0,0,0)' },
      sm: { x: 0, y: 4, blur: 12, spread: 0, color: 'rgba(34,26,20,0.12)' },
      md: { x: 0, y: 8, blur: 20, spread: 0, color: 'rgba(34,26,20,0.14)' },
      lg: { x: 0, y: 12, blur: 28, spread: 0, color: 'rgba(34,26,20,0.16)' },
    },
    typography: {
      fontFamily: { base: 'system-ui' },
      weight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      size: {
        '10': 10,
        '12': 12,
        '14': 14,
        '16': 16,
        '18': 18,
        '20': 20,
        '24': 24,
        '28': 28,
        '32': 32,
      },
      lineHeight: {
        '12': 12,
        '16': 16,
        '20': 20,
        '24': 24,
        '28': 28,
        '32': 32,
        '36': 36,
        '40': 40,
      },
      letterSpacing: {
        tight: -0.2,
        normal: 0,
        wide: 0.2,
      },
    },
  },
  semantic: {
    bg: {
      app: '{core.color.orange.50}',
      grain: 'rgba(255,255,255,0.12)',
    },
    surface: {
      card: '{core.color.neutral.0}',
      cardWarm: '{core.color.neutral.50}',
    },
    text: {
      primary: '{core.color.neutral.900}',
      secondary: '{core.color.neutral.700}',
      muted: '{core.color.neutral.500}',
      inverse: '{core.color.neutral.0}',
      link: '{core.color.blue.500}',
    },
    border: {
      default: 'rgba(34,26,20,0.10)',
      focus: '{core.color.green.500}',
      error: '{core.color.red.500}',
    },
    brand: {
      primary: '{core.color.orange.500}',
      primaryHover: '{core.color.orange.600}',
      success: '{core.color.green.500}',
      successHover: '{core.color.green.600}',
      danger: '{core.color.red.500}',
    },
    state: {
      disabledBg: 'rgba(34,26,20,0.08)',
      disabledText: 'rgba(34,26,20,0.35)',
      overlay: 'rgba(34,26,20,0.35)',
    },
  },
  layout: {
    grid: {
      base: 8,
      touchTargetMin: 48,
    },
    safeArea: {
      ios: { topMin: 44, bottomMin: 34 },
      android: { topMin: 24, bottomMin: 16 },
      web: { topMin: 0, bottomMin: 0 },
    },
    container: {
      web: {
        maxWidth: 480,
        paddingX: 16,
      },
    },
    breakpoints: {
      web: {
        xs: 360,
        sm: 480,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
  },
  components: {
    card: {
      radius: '{core.radius.lg}',
      padding: '{core.space.3}',
      shadow: '{core.shadow.md}',
      borderColor: '{semantic.border.default}',
      borderWidth: '{core.stroke.hairline}',
    },
    button: {
      height: 56,
      radius: '{core.radius.md}',
      paddingX: '{core.space.3}',
      gap: '{core.space.1}',
      primary: {
        bg: '{semantic.brand.primary}',
        text: '{semantic.text.inverse}',
        shadow: '{core.shadow.sm}',
      },
      secondary: {
        bg: '{semantic.surface.card}',
        text: '{semantic.text.primary}',
        borderColor: '{semantic.border.default}',
        borderWidth: '{core.stroke.hairline}',
      },
      ghost: {
        bg: 'rgba(0,0,0,0)',
        text: '{semantic.text.primary}',
      },
      disabled: {
        bg: '{semantic.state.disabledBg}',
        text: '{semantic.state.disabledText}',
      },
    },
    iconButton: {
      size: 48,
      radius: '{core.radius.pill}',
      bg: '{semantic.brand.primary}',
      iconColor: '{semantic.text.inverse}',
      shadow: '{core.shadow.sm}',
      disabledBg: '{semantic.state.disabledBg}',
      disabledIcon: '{semantic.state.disabledText}',
    },
    input: {
      height: 56,
      radius: '{core.radius.md}',
      paddingX: '{core.space.2}',
      bg: '{semantic.surface.card}',
      text: '{semantic.text.primary}',
      placeholder: '{semantic.text.muted}',
      borderColor: '{semantic.border.default}',
      borderWidth: '{core.stroke.hairline}',
      focusBorderColor: '{semantic.border.focus}',
      errorBorderColor: '{semantic.border.error}',
      helperText: '{semantic.text.secondary}',
      errorText: '{semantic.brand.danger}',
    },
    chip: {
      height: 40,
      radius: '{core.radius.pill}',
      paddingX: '{core.space.2}',
      bg: 'rgba(34,26,20,0.06)',
      text: '{semantic.text.primary}',
      activeBg: '{semantic.brand.primary}',
      activeText: '{semantic.text.inverse}',
      disabledBg: '{semantic.state.disabledBg}',
      disabledText: '{semantic.state.disabledText}',
    },
    badge: {
      height: 24,
      radius: '{core.radius.pill}',
      paddingX: '{core.space.1}',
      textSize: '{core.typography.size.12}',
      orangeBg: '{semantic.brand.primary}',
      greenBg: '{semantic.brand.success}',
      text: '{semantic.text.inverse}',
    },
    listRow: {
      heightMin: 56,
      radius: '{core.radius.md}',
      paddingX: '{core.space.3}',
      paddingY: '{core.space.2}',
      gap: '{core.space.2}',
    },
    modalDialog: {
      radius: '{core.radius.lg}',
      padding: '{core.space.3}',
      shadow: '{core.shadow.lg}',
      overlay: '{semantic.state.overlay}',
    },
  },
  typographyStyles: {
    h1: { size: 28, lineHeight: 36, weight: 700, letterSpacing: -0.2 },
    h2: { size: 24, lineHeight: 32, weight: 700, letterSpacing: -0.2 },
    h3: { size: 20, lineHeight: 28, weight: 600, letterSpacing: -0.1 },
    body: { size: 16, lineHeight: 24, weight: 500, letterSpacing: 0 },
    body2: { size: 14, lineHeight: 20, weight: 500, letterSpacing: 0 },
    caption: { size: 12, lineHeight: 16, weight: 500, letterSpacing: 0.2 },
    micro: { size: 10, lineHeight: 12, weight: 500, letterSpacing: 0.2 },
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

export function getSpacingScale(tokens: DesignTokens = designTokens) {
  return Object.values(tokens.core.space).sort((a, b) => a - b);
}

export function usesEightPointSpacing(tokens: DesignTokens = designTokens) {
  return getSpacingScale(tokens).every((value) => value % tokens.layout.grid.base === 0);
}

export function isTouchTargetCompliant(
  height: number,
  tokens: DesignTokens = designTokens,
) {
  return height >= tokens.layout.grid.touchTargetMin && height % tokens.layout.grid.base === 0;
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

export { componentAreas };
