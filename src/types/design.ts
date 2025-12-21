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

export interface DesignTokens {
  colors: Record<string, string>;
  spacing: number[];
  radii: Record<string, number>;
  shadows: Record<string, string>;
  typography: Record<
    string,
    {
      size: number;
      lineHeight: number;
      weight: number;
      letterSpacing?: number;
    }
  >;
}
