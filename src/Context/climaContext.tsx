import { createContext, type ReactNode, useContext, useState, useEffect, useCallback } from 'react';
import type { WeatherContextType, City, WeatherForecastResponse } from "../types/tipagem"
import { getIpLocation, searchCity, getWeather } from "../services/api";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {  const [city, setCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const loadWeatherForCoordinates = useCallback(async (lat: number, lon: number, cityName: string, country: string, admin1?: string, id: number = 0) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeather(lat, lon);

      const currentTime = data.current_weather.time;
      const currentHourIndex = data.hourly.time.findIndex((t: string) => t.startsWith(currentTime.substring(0, 13)));
      const humidity = currentHourIndex !== -1 ? data.hourly.relativehumidity_2m[currentHourIndex] : undefined;

      if (humidity !== undefined) {
        data.current_weather.humidity = humidity;
      }

      setWeatherData(data);
      setCity({ id, name: cityName, latitude: lat, longitude: lon, country, admin1 });
    } catch (err) {
      setError('Falha ao carregar os dados do clima. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initByIp = useCallback(async () => {
    try {
      const ipData = await getIpLocation();
      await loadWeatherForCoordinates(ipData.latitude, ipData.longitude, ipData.city, ipData.country_name, ipData.region);
    } catch (err) {
      setError('Não foi possível obter sua localização automaticamente.');
      setIsLoading(false);
    }
  }, [loadWeatherForCoordinates]);

  useEffect(() => {
    initByIp();
  }, [initByIp]);

  const handleSearchLocation = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchCity(query);
      if (results && results.length > 0) {
        const topResult = results[0];
        await loadWeatherForCoordinates(topResult.latitude, topResult.longitude, topResult.name, topResult.country, topResult.admin1, topResult.id);
      } else {
        setError('Cidade não encontrada. Verifique o nome e tente novamente.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Erro ao buscar a cidade. Tente novamente.');
      setIsLoading(false);
    }
  }, [loadWeatherForCoordinates]);

  const handleClearWeather = useCallback(() => {
    setCity(null);
    setWeatherData(null);
    setError(null);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        weatherData,
        isLoading,
        error,
        isDarkMode,
        searchLocation: handleSearchLocation,
        toggleTheme,
        clearWeather: handleClearWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather deve ser usado dentro de um WeatherProvider');
  }
  return context;
};
