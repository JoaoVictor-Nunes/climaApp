import { Box, InputAdornment, TextField, IconButton, useTheme } from "@mui/material";
// Importamos o useRef aqui
import { useEffect, useState, type SyntheticEvent } from "react"; 
import { tokens } from "../tema";
import { useWeather } from '../Context/climaContext';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchCity, setSearchCity] = useState('');
    
    const [hasTouched, setHasTouched] = useState(false);
    
    const { searchLocation, clearWeather, error, setError } = useWeather(); 

    useEffect(() => {
        // 2. Se o usuário NUNCA tocou na barra, abortamos qualquer ação automática!
        // Isso protege o erro inicial do IP de ser apagado.
        if (!hasTouched) return;

        const timer = setTimeout(() => {
            if (searchCity.trim().length > 0) {
                searchLocation(searchCity);
            } else if (searchCity.trim().length === 0) {
                clearWeather();
                if (setError) setError(null);
            }
        }, 0);

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
                
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={handleSubmit} 
                                    edge="end" 
                                    sx={{ color: colors.grey[100] }}
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