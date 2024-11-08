import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-2xl font-semibold mb-8">Menu</div>
      <ul className="space-y-4">
        <li>
          <Link href="/products/register" className="block px-4 py-2 rounded-md hover:bg-gray-700">
            Registrar Produto
          </Link>
        </li>
        <li>
          <Link href="/products" className="block px-4 py-2 rounded-md hover:bg-gray-700">
            Listar Produtos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
