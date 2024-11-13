"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "../../../services/api";
import Button from "../../../components/ui/Button";
import Notification from "../../../components/ui/Notification";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";
import { FiTrash2 } from "react-icons/fi";

interface ProductDetail {
  id: number;
  name: string;
  price: number | string;
  description: string;
  quantity_in_stock: number;
  category: string;
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Erro ao carregar os detalhes do produto. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price: string | number | undefined): string => {
    if (price == null) return "R$ 0,00";
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numericPrice) ? "R$ 0,00" : `R$ ${numericPrice.toFixed(2).replace(".", ",")}`;
  };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/products/${id}`);
      setNotification({ message: "Produto deletado com sucesso!", type: "success" });
      router.push("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      setNotification({ message: "Erro ao deletar o produto.", type: "error" });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex  bg-gray-50 dark:bg-gray-800 p-6">
      <div className="flex-1 max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Detalhes do Produto</h2>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            duration={3000}
          />
        )}

        {isLoading ? (
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">Carregando...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : product ? (
          <ProductDetailContent
            product={product}
            formatPrice={formatPrice}
            onBackClick={handleBackClick}
            onDeleteClick={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="text-center text-gray-700 dark:text-gray-300">Nenhum dado de produto disponível.</div>
        )}

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteProduct}
          title="Confirmar Exclusão"
          message="Tem certeza de que deseja excluir este produto?"
          confirmText="Confirmar"
          cancelText="Cancelar"
          icon={<FiTrash2 className="text-red-600 dark:text-red-400" />}
        />
      </div>
    </div>
  );
};

interface ProductDetailContentProps {
  product: ProductDetail;
  formatPrice: (price: string | number | undefined) => string;
  onBackClick: () => void;
  onDeleteClick: () => void;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  product,
  formatPrice,
  onBackClick,
  onDeleteClick,
}) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductInfo label="Nome" value={product.name} />
      <ProductInfo label="Preço" value={formatPrice(product.price)} />
      <ProductInfo label="Categoria" value={product.category} />
      <ProductInfo label="Quantidade em Estoque" value={product.quantity_in_stock.toString()} />
    </div>
    
    <div className="mt-6">
      <ProductInfo label="Descrição" value={product.description} />
    </div>

    <div className="mt-8 flex justify-between items-center space-x-4">
      <Button onClick={onBackClick} variant="secondary" size="medium">
        Voltar para a lista
      </Button>
      <Button variant="primary" size="medium">
        Editar Produto
      </Button>
      <Button onClick={onDeleteClick} variant="danger" size="medium">
        Deletar Produto
      </Button>
    </div>
  </div>
);

interface ProductInfoProps {
  label: string;
  value: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ label, value }) => (
  <div>
    <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{label}</h4>
    <p className="text-lg text-gray-600 dark:text-gray-400">{value}</p>
  </div>
);

export default ProductDetailPage;
