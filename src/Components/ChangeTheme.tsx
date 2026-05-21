import React, { useContext } from "react";
import { IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ColorModeContext, tokens } from "../tema"; // Ajuste o caminho se necessário

export const ChangeTheme = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      sx={{ 
        color: colors.grey[100],
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.04)'
        }
      }}
      aria-label="Alternar tema claro/escuro"
    >
      {theme.palette.mode === "dark" ? (
        <LightModeOutlinedIcon />
      ) : (
        <DarkModeOutlinedIcon />
      )}
    </IconButton>
  );
};