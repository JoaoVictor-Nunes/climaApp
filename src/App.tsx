import { ColorModeContext, useMode } from './tema'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SearchBar } from './Components/SearchBar';
import { ChangeTheme } from './Components/ChangeTheme'
import { WeatherProvider } from './Context/climaContext';

function App() {

  const [theme, colorMode] = useMode();
  
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WeatherProvider>
          <ChangeTheme />
          <main>
            <SearchBar />
          </main>
        </WeatherProvider>
     </ThemeProvider>
     </ColorModeContext.Provider>
    </>
  )
}

export default App
