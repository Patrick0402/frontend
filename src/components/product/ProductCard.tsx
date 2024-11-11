// src/components/product/ProductCard.tsx
import React, { useState } from "react";
import { Product } from "../../hooks/useProducts";
import Button from "../ui/Button";
import Link from "next/link";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";  // Ícones para ativo e inativo
import ConfirmationModal from "../ui/ConfirmationModal"; // Importando o Modal de Confirmação

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void; // Função para alternar o status
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onToggleStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar o modal
  const [actionType, setActionType] = useState<'delete' | 'toggle' | null>(null);  // Tipo de ação (deletar ou alternar status)

  // Verifica se o price é um número, e se não, converte para número
  const price = typeof product.price === "number" ? product.price : parseFloat(String(product.price));

  // Função para abrir o modal com a ação correta
  const handleOpenModal = (action: 'delete' | 'toggle') => {
    setActionType(action);
    setIsModalOpen(true);
  };

  // Função de confirmação do modal
  const handleConfirmAction = () => {
    if (actionType === 'delete') {
      onDelete(product.id);  // Deletar o produto
    } else if (actionType === 'toggle') {
      onToggleStatus(product.id, !product.isActive);  // Alternar o status
    }
    setIsModalOpen(false);  // Fechar o modal após a confirmação
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg flex shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400">
      {/* Link para redirecionar ao detalhe do produto */}
      <Link href={`/products/${product.id}`} passHref>
        <div className="cursor-pointer flex-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">${price.toFixed(2)}</p>
          <div className="flex items-center space-x-2">
            {/* Exibe o status ativo/inativo com ícones */}
            {product.isActive ? (
              <span className="text-green-600 flex items-center">
                <FiCheckCircle className="mr-1" /> Ativo
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <FiXCircle className="mr-1" /> Inativo
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Botão Toggle para ativar/desativar */}
      <div className="ml-auto flex items-center space-x-2">
        <Button
          variant="secondary"
          size="small"
          onClick={() => handleOpenModal('toggle')}
        >
          {product.isActive ? "Desativar" : "Ativar"}
        </Button>

        {/* Botão de deletar */}
        <Button
          variant="danger"
          size="small"
          onClick={() => handleOpenModal('delete')}
        >
          Deletar
        </Button>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={actionType === 'delete' ? "Confirmar Exclusão" : "Confirmar Alteração de Status"}
        message={actionType === 'delete' ? "Tem certeza de que deseja excluir este produto?" : 
          `Tem certeza de que deseja ${product.isActive ? "desativar" : "ativar"} este produto?`}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default ProductCard;
