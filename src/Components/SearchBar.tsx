import { Box, TextField } from "@mui/material";
import {useState, type FormEvent} from "react";
import { tokens } from "../tema";
import { useTheme } from "@mui/material/styles";

export const SearchBar = () => {

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const [searchCity, setSearchCity] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchCity.trim().length > 0) {
            console.log("cidade pesquisada: ", searchCity);
        }
    }
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
            <TextField id="barraPesquisa" 
            fullWidth
            value={searchCity}
            label="Pesquisar cidades..."
            variant="outlined"
        sx={{
          width: "100%",
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.primary[500],
            '& fieldset': {
              borderColor:colors.grey[300],
            },
            '&:hover fieldset': {
              borderColor:colors.blueAccent[500],
            },
            '&.Mui-focused fieldset': {
              borderColor:colors.blueAccent[500],
            },
          },
          '& .MuiInputLabel-root': {
            color:colors.grey[300],
            '&.Mui-focused': {
              color: colors.blueAccent[500],
            },
          },
          '& .MuiOutlinedInput-input': {
            color: colors.grey[100],
          },
        }}
            onChange={(e) => setSearchCity(e.target.value)}
            />
        </Box>
    )
}
