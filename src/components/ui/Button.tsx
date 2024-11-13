"use client";

import React from "react";
import { useTheme } from "../../context/themeContext"; // Importando o hook do contexto de tema
import { FaSun, FaMoon } from "react-icons/fa"; // Importando os ícones de sol e lua

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "theme" | "link"; // Adicionando a variante "link"
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  children,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme(); // Usando o contexto de tema

  // Definindo as classes de estilo para cada variante de botão
  const variantClasses = {
    primary: theme === "dark"
      ? "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      : "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",

    secondary: theme === "dark"
      ? "bg-transparent border-2 border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
      : "bg-transparent border-2 border-gray-500 text-gray-800 hover:bg-gray-500 hover:text-white",

    danger: "bg-red-500 text-white hover:bg-red-600",
    
    theme: theme === "dark"
      ? "bg-gray-800 text-white hover:bg-gray-700"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200",

    link: theme === "dark"
      ? "bg-transparent text-white hover:text-gray-100"
      : "bg-transparent text-gray-800 hover:text-blue-900 underline"
  };

  // Definindo as classes de estilo para os tamanhos de botão
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base", // Usando text-base para garantir uma boa leitura
    large: "px-6 py-3 text-lg",
  };

  // Tornando o botão responsivo
  const responsiveClasses = "w-full sm:w-auto"; // O botão terá 100% de largura em telas pequenas e ajustará em telas maiores

  // Combinando as classes em uma string
  const buttonClassNames = `flex items-center justify-center rounded-md font-medium transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${responsiveClasses} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`;

  // Definindo o ícone baseado no tema
  const themeIcon = theme === "dark" ? (
    <FaMoon className="h-6 w-6" />
  ) : (
    <FaSun className="h-6 w-6" />
  );

  return (
    <button
      className={buttonClassNames}
      disabled={isLoading || props.disabled}
      onClick={variant === "theme" ? toggleTheme : undefined} // Aciona o toggle de tema apenas se a variante for "theme"
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
          ></path>
        </svg>
      )}
      {variant === "theme" ? themeIcon : children} {/* Exibe o ícone de tema ou o conteúdo do botão */}
    </button>
  );
};

export default Button;
