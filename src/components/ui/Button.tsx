"use client";

import React from "react";
import { useTheme } from "../../context/themeContext"; // Importing the theme context hook
import { FaSun, FaMoon } from "react-icons/fa"; // Importing sun and moon icons from React Icons

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
      : "bg-gray-100 text-gray-800 hover:bg-gray-200", // Light mode button
  };

  // Map for size variants
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  // Determine the classNames for the button
  const buttonClassNames = `flex items-center justify-center rounded-md font-medium transition ${variantClasses[variant]} ${sizeClasses[size]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full`;

  // Universal dark mode icon (moon icon or other) for theme toggle
  const themeIcon = theme === "dark" ? (
    <FaMoon className="h-6 w-6" />
  ) : (
    <FaSun className="h-6 w-6" />
  );

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
      {variant === "theme" ? themeIcon : children} {/* Show the universal theme icon for "theme" variant, otherwise show children */}
    </button>
  );
};

export default Button;
