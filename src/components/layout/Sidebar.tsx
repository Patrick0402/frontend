// frontend/src/components/layout/Sidebar.tsx
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="text-2xl font-semibold mb-8">Menu</div>
      <ul className="space-y-6">
        <li>
          <Link
            href="/products/register"
            className="block px-4 py-3 rounded-md text-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Registrar Produto
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="block px-4 py-3 rounded-md text-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Listar Produtos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
