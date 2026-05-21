import axios from 'axios';
import type { GeolocationResponse, GeocodingResponse, WeatherForecastResponse, City } from '../types/tipagem';

export const getIpLocation = async (): Promise<GeolocationResponse> => {
  const response = await axios.get<GeolocationResponse>('https://ipapi.co/json/');
  if ((response.data as any).error) {
    throw new Error('Failed to get IP location');
  }
  return response.data;
};

export const searchCity = async (query: string): Promise<City[]> => {
  const response = await axios.get<GeocodingResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`
  );
  return response.data.results || [];
};

export const getWeather = async (lat: number, lon: number): Promise<WeatherForecastResponse> => {
  const response = await axios.get<WeatherForecastResponse>(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  return response.data;
};
