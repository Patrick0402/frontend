// frontend/src/app/page.tsx
import React from "react";
import Link from "next/link";
import Button from "../components/ui/Button";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-600">
      <div className="max-w-xl w-full p-8 space-y-8 rounded-lg shadow-lg bg-white dark:bg-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Bem-vindo ao Gerenciador de Produtos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Gerencie seus produtos com facilidade. Cadastre novos itens ou visualize os já cadastrados.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
  );
};

export default HomePage;
