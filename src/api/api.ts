import axios from 'axios';
import type { Localizacao, resultadosCidades, Temperatura, Cidade } from '../types/clima';

export const getIpLocation = async (): Promise<Localizacao> => {
  const response = await axios.get<Localizacao>('https://ipapi.co/json/');
  if ((response.data as any).error) {
    throw new Error('Failed to get IP location');
  }
  return response.data;
};

export const searchCity = async (query: string): Promise<Cidade[]> => {
  const response = await axios.get<resultadosCidades>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`
  );
  return response.data.results || [];
};

export const getWeather = async (lat: number, lon: number): Promise<Temperatura> => {
  const response = await axios.get<Temperatura>(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  return response.data;
};
