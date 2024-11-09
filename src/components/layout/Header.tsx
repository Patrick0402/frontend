// frontend/src/components/layout/Header.tsx
import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle"; // Import the theme toggle component

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 p-4 bg-gray-100 shadow-md dark:bg-gray-800 dark:text-white transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Gerenciador de Produtos
        </div>
        <div className="space-x-6 flex items-center">
          {/* Theme Toggle Button */}
          <ThemeToggle />
          <Link href="/login" passHref>
            <Button variant="secondary" size="medium">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
