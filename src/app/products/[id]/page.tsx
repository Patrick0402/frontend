"use client"; // Garante que o código será executado no lado do cliente

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Importação do useParams para pegar o id diretamente da URL
import axiosInstance from "../../../services/api"; // Instância do axios configurada
import Button from "../../../components/ui/Button"; // Componente de botão
import Notification from "../../../components/ui/Notification"; // Componente de notificação

// Interface para o tipo de produto
interface ProductDetail {
  id: number;
  name: string;
  price: number | string; // Aceita tanto números quanto strings
  description: string;
  quantity_in_stock: number;
  category: string;
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro

  // Usando useParams para capturar o id diretamente da URL
  const { id } = useParams();

  // Função para buscar os detalhes do produto
  useEffect(() => {
    if (!id) return; // Verifica se o id está disponível

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null); // Resetar erro anterior

      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error); // Log de erro para depuração
        setError("Erro ao carregar os detalhes do produto. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Recarrega sempre que o id mudar

  // Função para garantir que o preço é um número válido antes de usar toFixed()
  const formatPrice = (price: string | number | undefined): string => {
    if (price == null) return "R$ 0,00"; // Handle undefined or null
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "R$ 0,00"; // If invalid, return a default price
    return `R$ ${numericPrice.toFixed(2).replace(".", ",")}`;
  };

  // Função para voltar à página anterior
  const handleBackClick = () => {
    window.history.back(); // Navega de volta para a página anterior
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-700 p-5">
      {/* Conteúdo principal, ocupa o restante da largura */}
      <main className="flex-1 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg transition-all duration-300 ease-in-out space-y-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
          Detalhes do Produto
        </h2>

        {/* Exibe a notificação, se houver */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            duration={3000}
          />
        )}

        {/* Exibe o estado de carregamento */}
        {isLoading && <div className="text-center text-xl text-gray-700 dark:text-gray-300">Carregando...</div>}

        {/* Exibe erro se houver */}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Exibição de detalhes do produto */}
        {product ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{product.name}</h3>
              <p className="text-2xl text-gray-800 dark:text-gray-200">{formatPrice(product.price)}</p>
            </div>

            <div>
              <h4 className="text-xl text-gray-800 dark:text-gray-100">Descrição</h4>
              <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>

            <div>
              <h4 className="text-xl text-gray-800 dark:text-gray-100">Categoria</h4>
              <p className="text-lg text-gray-700 dark:text-gray-300">{product.category}</p>
            </div>

            <div>
              <h4 className="text-xl text-gray-800 dark:text-gray-100">Quantidade em Estoque</h4>
              <p className="text-lg text-gray-700 dark:text-gray-300">{product.quantity_in_stock}</p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Button onClick={handleBackClick} variant="secondary" size="medium">
                Voltar para a lista
              </Button>
              <Button variant="primary" size="medium">
                Editar Produto
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700 dark:text-gray-300">Nenhum dado de produto disponível.</div>
        )}
      </main>
    </div>
  );
};

export default ProductDetailPage;
