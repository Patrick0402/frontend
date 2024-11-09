// frontend/src/app/page.tsx
import React from "react";
import Link from "next/link";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900"> {/* Dark mode background on body */}
      <Sidebar /> 

      <div className="flex-1 flex flex-col">
        <Header /> 

        <main className="flex-1 p-6 space-y-6 bg-white dark:bg-gray-800"> {/* Ensure the main content area adjusts */}
          <div className="text-2xl font-semibold text-gray-800 dark:text-white">
            Bem-vindo ao Gerenciador de Produtos
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
