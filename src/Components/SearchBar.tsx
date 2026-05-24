import { Box, InputAdornment, TextField, IconButton, useTheme } from "@mui/material";
import { useEffect, useState, type SyntheticEvent } from "react";
import { tokens } from "../tema";
import { useWeather } from '../Context/climaContext';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchCity, setSearchCity] = useState('');
    
    const { searchLocation, clearWeather, error, setError } = useWeather(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCity.trim().length > 0) {
                searchLocation(searchCity);
            } else if (searchCity.trim().length === 0) {
                clearWeather();
                if (setError) setError(null);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [searchCity, searchLocation, clearWeather, setError]); 

    const handleSubmit = (e?: SyntheticEvent) => {
        if (e) e.preventDefault();
        if (searchCity.trim().length > 0) {
            searchLocation(searchCity);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCity(e.target.value);
        if (error && setError) setError(null); 
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                id="barraPesquisa" 
                fullWidth
                value={searchCity}
                onChange={handleChange}
                label="Pesquisar cidade..."
                variant="outlined"
                
                error={!!error} 
                helperText={error || " "} 
                
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={handleSubmit} 
                                    edge="end" 
                                    sx={{ color: error ? colors.redAccent[500] : colors.grey[100] }}
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
                    '& .MuiFormHelperText-root': {
                        fontSize: '0.875rem', 
                        fontWeight: 500,      
                        marginTop: '6px',     
                        marginLeft: '4px',   
                    },
                }}
            />
        </Box>
    );
};