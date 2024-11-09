// frontend/src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-white py-8 dark:bg-gray-800 dark:text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-8 text-sm">
            <p className="text-gray-800 dark:text-gray-100">Frontend: Bruno Patrick</p>
            <p className="text-gray-800 dark:text-gray-100">Backend: João Marcos</p>
          </div>
          <div className="border-t border-gray-600 w-full mt-4"></div>
          <p className="text-xs text-gray-800 mt-4 dark:text-gray-100">
            © 2024 Gerenciador de Produtos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
