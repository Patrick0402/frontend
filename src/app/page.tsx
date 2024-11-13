// frontend/src/app/page.tsx
import React from "react";
import Link from "next/link";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 space-y-6 bg-white dark:bg-gray-600">
          <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Bem-vindo ao Gerenciador de Produtos
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Gerencie seus produtos com facilidade, cadastre novos itens e visualize os já cadastrados.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            <Link href="/products/register" passHref>
              <Button variant="primary" size="large" aria-label="Registrar novo produto">
                Registrar Produto
              </Button>
            </Link>

            <Link href="/products" passHref>
              <Button variant="primary" size="large" aria-label="Ver lista de produtos">
                Listar Produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
