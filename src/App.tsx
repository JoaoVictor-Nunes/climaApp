import { ColorModeContext, useMode, tokens } from './tema'; // Importado 'tokens' para usarmos as cores do tema
import './App.css';
import { CssBaseline, ThemeProvider, Box, Typography, Container, Paper } from '@mui/material';
import { SearchBar } from './Components/SearchBar';
import { ChangeTheme } from './Components/ChangeTheme';
import { WeatherProvider } from './Context/climaContext';
import { ClimaAtual } from './Components/ClimaAtual';
import CloudIcon from '@mui/icons-material/Cloud'; 

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
              justifyContent: 'center', 
              alignItems: 'center',
              py: { xs: 2, sm: 4 },
              transition: 'background-color 0.3s ease'
            }}
          >
            <Container maxWidth="sm">
              
              <Paper
                elevation={3} 
                sx={{
                  p: { xs: 3, sm: 4 },
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
                    mb: 4 
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CloudIcon sx={{ fontSize: 32 }} />
                    <Typography 
                      variant="h5" 
                      sx={{ letterSpacing: '-0.05em', fontWeight: 900 }}
                    >
                      Previsão do Clima
                    </Typography>
                  </Box>
                  <ChangeTheme />
                </Box>

                <Box 
                  component="main" 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 3 
                  }}
                >
                  <SearchBar />
                  <ClimaAtual />
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