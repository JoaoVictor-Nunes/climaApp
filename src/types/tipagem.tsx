export interface GeolocationResponse {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: City[];
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
  humidity?: number;
}

export interface WeatherForecastResponse {
  latitude: number;
  longitude: number;
  current_weather: CurrentWeather;
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

export interface WeatherState {
  city: City | null;
  weatherData: WeatherForecastResponse | null;
  isLoading: boolean;
  error: string | null;
  isDarkMode: boolean;
}

export interface WeatherContextType extends WeatherState {
  searchLocation: (query: string) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  toggleTheme: () => void;
  clearWeather: () => void;
}

export type Mode = "light" | "dark";

export interface ColorModeContextType {
  toggleColorMode: () => void;
  setColorMode: (mode: Mode) => void;
}