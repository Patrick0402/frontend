"use client"; // Para garantir que a página será renderizada no lado do cliente

import React, { useState } from "react";
import axiosInstance from "../../services/api";  // Importe a instância do axios configurada
import { useRouter } from "next/navigation";  // Para redirecionar após o sucesso
import Button from "../../components/ui/Button";  // Botão reutilizável
import Input from "../../components/ui/Input";  // Importando o componente Input

const ProductForm: React.FC = () => {
    
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productAmount, setProductAmount] = useState<string>("");
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
          price: productPrice,
          quantity_in_stock: productAmount,
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
    
    return(
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Registrar Novo Produto</h2>
        
        {/* Exibição de erro */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Usando o componente Input para o Nome do Produto */}
          <Input
            label="Nome do Produto"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            error={error ? "Nome é obrigatório" : ""}
          />
          
          {/* Usando o componente Input para o Preço do Produto */}
          <Input
            label="Preço do Produto"
            type="number"
            value={productPrice}
            onChange={(e) => {
                const value = e.target.value;
                if (value === "" || !isNaN(Number(value))) {
                  setProductPrice(value);
                }
              }}
            required
            error={error ? "Preço é obrigatório e deve ser um número válido" : ""}
          />

         <Input
            label="Quantidade no estoque"
            type="number"
            value={productAmount}
            onChange={(e) => {
                const value = e.target.value;
                if (value === "" || !isNaN(Number(value))) {
                  setProductAmount(value);
                }
              }}
            required
            error={error ? "Preço é obrigatório e deve ser um número válido" : ""}
          />

          {/* Controle para o campo "Ativo" */}
          <div>
            <label className="block text-gray-800 dark:text-gray-100">Status</label>
            <div className="flex items-center space-x-4 mt-2">
              <label htmlFor="isActive" className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-100">Ativo</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="large"
              isLoading={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrar Produto"}
            </Button>
          </div>
        </form>
      </div>
    );
};

export default ProductForm;