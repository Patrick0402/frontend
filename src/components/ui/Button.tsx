"use client";

import React from "react";
import { useTheme } from "../../context/themeContext"; // Importing the theme context hook

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "theme"; 
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

  const { theme, toggleTheme } = useTheme(); // Use the theme context

  // Map for the button variants
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    theme: theme === "dark"
      ? "bg-gray-800 text-white hover:bg-gray-700"  // Dark mode button
      : "bg-yellow-500 text-gray-800 hover:bg-yellow-400", // Light mode button
  };

  // Map for size variants
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  // Determine the classNames for the button
  const buttonClassNames = `flex items-center justify-center rounded-md font-medium transition ${variantClasses[variant]} ${sizeClasses[size]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full`;

  // Determine the correct icon based on the theme
  const getIcon = () => {
    if (variant === "theme") {
      return theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 3v1.05A8 8 0 0 1 18 12a8 8 0 0 1-6 13 8 8 0 0 1-6-13 8 8 0 0 1 6-8.95V3a10 10 0 1 0 0 20A10 10 0 1 0 12 3z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4z" />
        </svg>
      );
    }
    return null; // Return null if no theme icon is required
  };

  return (
    <button
      className={buttonClassNames}
      disabled={isLoading || props.disabled}
      onClick={variant === "theme" ? toggleTheme : undefined} // Only toggle theme for "theme" variant
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
      {getIcon() || children} {/* Show icon if it's the theme button, otherwise show the children */}
    </button>
  );
};

export default Button;
