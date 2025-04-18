export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  UNDERLINED = 'underlined',
  DANGER = 'danger',
}

export type SelectOption = {
  value: string;
  label: string;
} | null;
