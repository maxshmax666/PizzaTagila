export type ComponentTag =
  | 'layout'
  | 'navigation'
  | 'cta'
  | 'filter'
  | 'list'
  | 'form'
  | 'cart'
  | 'delivery'
  | 'account'
  | 'loyalty'
  | 'system'
  | 'legal'
  | 'notification'
  | 'info'
  | 'support'
  | 'status'
  | 'action'
  | 'auth'
  | 'visual'
  | 'pricing'
  | 'selection'
  | 'summary'
  | 'timer'
  | 'map'
  | 'history'
  | 'placeholder'
  | 'slots'
  | 'address'
  | 'faq'
  | 'consent'
  | 'update'
  | 'error'
  | 'empty'
  | 'loading'
  | 'text';

export type ComponentState =
  | 'default'
  | 'pressed'
  | 'disabled'
  | 'loading'
  | 'focused'
  | 'error'
  | 'muted'
  | 'success'
  | 'active'
  | 'selected'
  | 'unselected'
  | 'timer'
  | 'skeleton';

export interface ComponentDefinition {
  id: string;
  title: string;
  description: string;
  states: ComponentState[];
  tags: ComponentTag[];
  notes?: string;
  actions?: string[];
}

export interface ComponentArea {
  id:
    | 'navigation'
    | 'text'
    | 'buttons'
    | 'forms'
    | 'menu'
    | 'cart'
    | 'delivery'
    | 'account'
    | 'system'
    | 'legal';
  title: string;
  summary: string;
  components: ComponentDefinition[];
}

export interface ComponentWithArea extends ComponentDefinition {
  area: ComponentArea['id'];
}

export interface AreaCoverage {
  states: Set<ComponentState>;
  tags: Set<ComponentTag>;
}

export interface AreaSummary {
  id: ComponentArea['id'];
  title: string;
  totalComponents: number;
  statesCovered: ComponentState[];
  tagsCovered: ComponentTag[];
}

export type TokenPrimitive = string | number;
export type TokenValue = TokenPrimitive | TokenValue[] | { [key: string]: TokenValue };

export interface ShadowToken {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export interface SafeAreaToken {
  topMin: number;
  bottomMin: number;
}

export interface TypographyMeasure {
  size: number;
  lineHeight: number;
  weight: number;
  letterSpacing?: number;
}

export interface DesignTokens {
  meta: {
    name: string;
    version: string;
    grid: string;
    platforms: string[];
  };
  core: {
    color: {
      orange: Record<string, string>;
      green: Record<string, string>;
      neutral: Record<string, string>;
      red: Record<string, string>;
      blue: Record<string, string>;
    };
    space: Record<string, number>;
    radius: Record<string, number>;
    stroke: Record<string, number>;
    shadow: Record<string, ShadowToken>;
    typography: {
      fontFamily: { base: string };
      weight: Record<string, number>;
      size: Record<string, number>;
      lineHeight: Record<string, number>;
      letterSpacing: Record<string, number>;
    };
  };
  semantic: Record<string, TokenValue>;
  layout: {
    grid: {
      base: number;
      touchTargetMin: number;
    };
    safeArea: {
      ios: SafeAreaToken;
      android: SafeAreaToken;
      web: SafeAreaToken;
    };
    container: {
      web: {
        maxWidth: number;
        paddingX: number;
      };
    };
    breakpoints: {
      web: Record<string, number>;
    };
  };
  components: Record<string, TokenValue>;
  typographyStyles: Record<string, TypographyMeasure>;
}

export type ResolvedDesignTokens = DesignTokens;
export type ComponentLookup = Record<string, ComponentWithArea>;
