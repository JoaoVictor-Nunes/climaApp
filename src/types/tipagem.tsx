import type { PaletteMode } from "@mui/material";

export interface Localizacao {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export interface Cidade {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface resultadosCidades {
  results?: Cidade[];
}

export interface climaAtual{
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
  humidity?: number;
}

export interface Temperatura {
  latitude: number;
  longitude: number;
  current_weather: climaAtual;
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    windspeed_10m: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface ChartData {
  date: string;
  min: number;
  max: number;
}

export interface estadoClima {
  city: Cidade | null;
  weatherData: Temperatura | null;
  isLoading: boolean;
  error: string | null;
  isDarkMode: boolean;
}

export interface WeatherContextType extends estadoClima {
  searchLocation: (query: string) => Promise<void>;
  toggleTheme: () => void;
  clearWeather: () => void;
}

export type Mode = PaletteMode;

export interface ColorModeContextType {
  toggleColorMode: () => void;
  setColorMode: (m: Mode) => void;
}