import { Box, Typography, Paper, CircularProgress, Alert, useTheme } from '@mui/material';
import { useWeather } from '../Context/climaContext';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import FoggyIcon from '@mui/icons-material/Foggy';
import GrainIcon from '@mui/icons-material/Grain'; 
import WaterDropIcon from '@mui/icons-material/WaterDrop'; 
import AcUnitIcon from '@mui/icons-material/AcUnit'; 
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import OpacityIcon from '@mui/icons-material/Opacity'; 
import AirIcon from '@mui/icons-material/Air'; 

const getWeatherIcon = (code: number) => {
  const iconProps = { sx: { fontSize: 80 } }; 

  if (code === 0) return <WbSunnyIcon sx={{ ...iconProps.sx, color: '#facc15' }} />; 
  if (code === 1 || code === 2 || code === 3) return <CloudIcon sx={{ ...iconProps.sx, color: '#9ca3af' }} />; 
  if (code >= 45 && code <= 48) return <FoggyIcon sx={{ ...iconProps.sx, color: '#6b7280' }} />; 
  if (code >= 51 && code <= 55) return <GrainIcon sx={{ ...iconProps.sx, color: '#93c5fd' }} />; 
  if (code >= 61 && code <= 65) return <WaterDropIcon sx={{ ...iconProps.sx, color: '#3b82f6' }} />; 
  if (code >= 71 && code <= 77) return <AcUnitIcon sx={{ ...iconProps.sx, color: '#dbeafe' }} />; 
  if (code >= 80 && code <= 82) return <WaterDropIcon sx={{ ...iconProps.sx, color: '#2563eb' }} />; 
  if (code >= 95 && code <= 99) return <ThunderstormIcon sx={{ ...iconProps.sx, color: '#ca8a04' }} />; 
  
  return <WbSunnyIcon sx={{ ...iconProps.sx, color: '#facc15' }} />;
};

const getWeatherDescription = (code: number) => {
  if (code === 0) return 'Céu limpo';
  if (code === 1 || code === 2 || code === 3) return 'Parcialmente nublado';
  if (code >= 45 && code <= 48) return 'Névoa ou nevoeiro';
  if (code >= 51 && code <= 55) return 'Chuvisco';
  if (code >= 61 && code <= 65) return 'Chuva';
  if (code >= 71 && code <= 77) return 'Neve';
  if (code >= 80 && code <= 82) return 'Pancadas de chuva';
  if (code >= 95 && code <= 99) return 'Tempestade';
  return 'Desconhecido';
};

export const ClimaAtual = () => {
  const { weatherData, city, isLoading, error } = useWeather();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256 }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!weatherData || !city) return null;

  const { current_weather } = weatherData;

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        mt: 4, 
        p: { xs: 3, sm: 5 }, 
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h4" color="text.primary" sx={{ fontWeight: 'bold' }}>
            {city.name}{city.admin1 ? `, ${city.admin1}` : ''}
          </Typography>
          
          {city.country && (
            <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
              {city.country}
            </Typography>
          )}
          
          <Typography 
            variant="h2" 
            color="primary" 
            sx={{ mt: 3, letterSpacing: '-0.05em', fontWeight: 800 }}
          >
            {current_weather.temperature}°C
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
            {getWeatherDescription(current_weather.weathercode)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box 
            sx={{ 
              mb: 2,
              filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.1)' }
            }}
          >
            {getWeatherIcon(current_weather.weathercode)}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            {current_weather.humidity !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <OpacityIcon sx={{ color: '#3b82f6', fontSize: 24 }} />
                <Typography sx={{ fontWeight: 500 }}>{current_weather.humidity}%</Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AirIcon sx={{ color: theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280', fontSize: 24 }} />
              <Typography sx={{ fontWeight: 500 }}>{current_weather.windspeed} km/h</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};