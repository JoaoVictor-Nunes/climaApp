import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWeather } from '../Context/climaContext';
import { Box, Typography, Paper, useTheme } from '@mui/material';

export const GraficoClima = () => {
  const { weatherData, isLoading } = useWeather();
  const theme = useTheme();
  
  const isDarkMode = theme.palette.mode === 'dark';

  const chartData = useMemo(() => {
    if (!weatherData || !weatherData.daily) return [];

    const { daily } = weatherData;
    return daily.time.map((time: string, index: number) => {
      const dateParts = time.split('-');
      const formattedDate = `${dateParts[2]}/${dateParts[1]}`;

      return {
        date: formattedDate,
        max: daily.temperature_2m_max[index],
        min: daily.temperature_2m_min[index],
      };
    });
  }, [weatherData]);

  if (isLoading || !weatherData) return null;

  const textColor = isDarkMode ? '#94a3b8' : '#64748b'; 
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 4,
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography 
        variant="h6" 
        color="text.primary" 
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Previsão de 7 Dias
      </Typography>

      <Box sx={{ height: 288, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis
              dataKey="date"
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val: any) => `${val}°`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                color: isDarkMode ? '#f8fafc' : '#0f172a',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
              formatter={(value: any) => [`${value}°C`, '']}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="max"
              name="Máxima"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMax)"
            />
            <Area
              type="monotone"
              dataKey="min"
              name="Mínima"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMin)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};