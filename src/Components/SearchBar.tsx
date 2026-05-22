import { Box, InputAdornment, TextField, IconButton, useTheme } from "@mui/material";
import { useEffect, useState, type SyntheticEvent } from "react";
import { tokens } from "../tema";
import { useWeather } from '../Context/climaContext';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchCity, setSearchCity] = useState('');
    const { searchLocation, clearWeather } = useWeather();

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

    const handleSubmit = (e?: SyntheticEvent) => {
        if (e) e.preventDefault();
        if (searchCity.trim().length > 0) {
            searchLocation(searchCity);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', maxWidth: 500, margin: '0 auto', p: 1 }}
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
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={handleSubmit} 
                                    edge="end" 
                                    sx={{ color: colors.grey[100], paddingRight: 2}}
                                    aria-label="buscar cidade"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}  
                sx={{
                    width: "100%",
                    '& .MuiOutlinedInput-root': {
                        
                        borderRadius: 2,
                        paddingRight: 1,
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