// src/app/products/register/page.tsx
"use client"; // Para garantir que a página será renderizada no lado do cliente

import React, { useState } from "react";
import axiosInstance from "../../../services/api";  // Importe a instância do axios configurada
import { useRouter } from "next/navigation";  // Para redirecionar após o sucesso
import Header from "../../../components/layout/Header";  // Importando o Header
import Sidebar from "../../../components/layout/Sidebar";  // Importando o Sidebar
import Footer from "../../../components/layout/Footer";  // Importando o Footer
import ProductForm from "@/components/product/ProductForm";

const RegisterProductPage: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");  // Para validar o preço como número
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  // Função para enviar os dados para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !productPrice || isNaN(Number(productPrice))) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await axiosInstance.post("/products", {
        name: productName,
        price: parseFloat(String(productPrice)),
        isActive,
      });
      // Redireciona para a página de lista de produtos ou exibe uma mensagem de sucesso
      router.push("/products");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao registrar o produto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1 p-6 space-y-6 bg-white dark:bg-gray-700">

          <ProductForm/>

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default RegisterProductPage;
