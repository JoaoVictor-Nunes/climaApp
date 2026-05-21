import { Box, TextField } from "@mui/material";
import { useEffect, useState, type FormEvent } from "react";
import { tokens } from "../tema";
import { useTheme } from "@mui/material/styles";
import { useWeather } from '../Context/climaContext';

export const SearchBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchCity, setSearchCity] = useState('');
    const { searchLocation, clearWeather, weatherData } = useWeather();

    useEffect(() => {
        if (weatherData && weatherData.current_weather) {
            console.log(`Temperatura atual em ${searchCity}: ${weatherData.current_weather.temperature}°C`);
        }
    }, [weatherData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCity.trim().length > 0) {
                searchLocation(searchCity);
            } else if (searchCity.trim().length === 0) {
                clearWeather();
            }
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [searchCity, searchLocation, clearWeather]); 

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchCity.trim().length > 0) {
            searchLocation(searchCity);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                id="barraPesquisa" 
                fullWidth
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                label="Pesquisar cidades..."
                variant="outlined"
                sx={{
                    width: "100%",
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: colors.primary[500],
                        '& fieldset': {
                            borderColor: colors.grey[300],
                        },
                        '&:hover fieldset': {
                            borderColor: colors.blueAccent[500],
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.blueAccent[500],
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: colors.grey[300],
                        '&.Mui-focused': {
                            color: colors.blueAccent[500],
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: colors.grey[100],
                    },
                }}
            />
        </Box>
    );
};