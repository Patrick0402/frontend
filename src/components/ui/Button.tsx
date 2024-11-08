// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"; 
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

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`flex items-center justify-center rounded-md font-medium transition 
                  ${variantClasses[variant]} ${sizeClasses[size]} 
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full`}  // Adiciona `w-full` para garantir largura total
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Loading spinner */}
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

      {children}
    </button>
  );
};

export default Button;
