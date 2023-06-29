export interface theme {
  id: string;
  default?: boolean;
  name: string;
  gradient: string[];
  primary: string;
  secondary: string;
  tertiary: string;
  bgOpacity: number;
  copyright?: { text: string; url: string };
  font?: string;
}
