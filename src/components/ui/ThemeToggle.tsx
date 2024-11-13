// /src/components/ui/ThemeToggle.tsx

"use client"; // Diretiva para garantir que seja executado no cliente

import React from "react";
import { useTheme } from "../../context/themeContext";
import Button from "./Button";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use o tema do contexto

  return (
    <Button variant="theme" size="medium"
      onClick={toggleTheme} 
    >
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </Button>
  );
};

export default ThemeToggle;
