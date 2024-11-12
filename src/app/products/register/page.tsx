"use client"; // Para garantir que a página será renderizada no lado do cliente

import React from "react";
import Header from "../../../components/layout/Header";  // Importando o Header
import Sidebar from "../../../components/layout/Sidebar";  // Importando o Sidebar
import Footer from "../../../components/layout/Footer";  // Importando o Footer
import ProductForm from "@/components/product/ProductForm";  // Importando o formulário de produto

const RegisterProductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1 p-6 space-y-6 bg-white dark:bg-gray-700">
          {/* Formulário para registrar um novo produto */}
          <ProductForm />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default RegisterProductPage;
