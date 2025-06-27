export interface Country {
  name: string;
  capital: string;
  flag: string;
  region: string;
  population: number;
  area?: number;
  currency?: string;
  languages?: string[];
  timezone?: string;
  code: string; 
}