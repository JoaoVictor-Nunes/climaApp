import { ColorModeContext, useMode, tokens } from './tema';
import './App.css';
// Adicionado 'Alert' nas importações do MUI
import { CssBaseline, ThemeProvider, Box, Typography, Container, Paper, Grow, Alert } from '@mui/material';
import { SearchBar } from './Components/SearchBar';
import { ChangeTheme } from './Components/ChangeTheme';
import { GraficoClima } from './Components/GraficoClima';
import { WeatherProvider, useWeather } from './Context/climaContext';
import { ClimaAtual } from './Components/ClimaAtual';
import CloudIcon from '@mui/icons-material/Cloud'; 

const WeatherResults = () => {
  const { weatherData, error } = useWeather();
  
  if (error) {
    return (
      <Grow in={true} timeout={500}>
        <Alert 
          severity="error" 
          variant="filled" 
          sx={{ 
            width: '100%', 
            py: 2, 
            px: 3,
            fontSize: '1.1rem',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
          }}
        >
          {error}
        </Alert>
      </Grow>
    );
  }

  const showResults = !!weatherData;

  return (
    <Grow in={showResults} timeout={1000} unmountOnExit>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '350px 1fr' }, 
          gap: 4,
          alignItems: 'start'
        }}
      >
        <ClimaAtual />
        <GraficoClima />
      </Box>
    </Grow>
  );
};

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <WeatherProvider>
          <Box 
            sx={{ 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column',
              pt: { xs: 4, sm: 6 },
              pb: 8,
              bgcolor: 'background.default',
              transition: 'background-color 0.3s ease'
            }}
          >
            <Container maxWidth="lg">
              
              <Paper
                elevation={3} 
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4, 
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? colors.primary[400] : colors.grey[200],
                  bgcolor: theme.palette.mode === 'dark' ? colors.primary[200] : colors.primary[500], 
                  transition: 'all 0.3s ease',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0px 10px 30px rgba(0, 0, 0, 0.5)' 
                    : '0px 10px 30px rgba(0, 0, 0, 0.05)'
                }}
              >
                
                <Box 
                  component="header" 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 5
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CloudIcon sx={{ fontSize: 36 }}/>
                    <Typography 
                      variant="h4" 
                      sx={{ letterSpacing: '-0.05em', fontWeight: 900 }}
                    >
                      Previsão do Clima
                    </Typography>
                  </Box>
                  <ChangeTheme />
                </Box>

                <Box component="main">
                  
                  <Box sx={{ mb: 4 }}>
                    <SearchBar />
                  </Box>

                  <WeatherResults />

                </Box>

              </Paper>
            </Container>
          </Box>
        </WeatherProvider>
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;