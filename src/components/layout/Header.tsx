import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle"; // Import the theme toggle component

const Header: React.FC = () => {
  return (
    <header className="p-4 flex items-center justify-between 
                       bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Gerenciador de Produtos
      </div>
      <div className="space-x-4 flex items-center">
        <ThemeToggle /> {/* Toggle button for theme */}
        <Link href="/login" passHref>
          <Button variant="secondary" size="medium">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
