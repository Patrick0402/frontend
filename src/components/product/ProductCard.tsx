import React, { useState } from "react";
import { Product } from "../../hooks/useProducts";
import Button from "../ui/Button";
import { FiCheckCircle, FiXCircle, FiTrash2, FiRefreshCw } from "react-icons/fi";
import ConfirmationModal from "../ui/ConfirmationModal";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onToggleStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'toggle' | null>(null);

  // Função para formatar o preço
  const formatPrice = (price: number | string) =>
    `$${(typeof price === "number" ? price : parseFloat(price)).toFixed(2)}`;

  // Função para abrir o modal com o tipo de ação
  const openModal = (action: 'delete' | 'toggle') => {
    setActionType(action);
    setIsModalOpen(true);
  };

  // Função de confirmação baseada no tipo de ação
  const confirmAction = () => {
    if (actionType === 'delete') {
      onDelete(product.id);
    } else if (actionType === 'toggle') {
      onToggleStatus(product.id, !product.isActive);
    }
    setIsModalOpen(false);
  };

  const actionMessages = {
    delete: "Tem certeza de que deseja excluir este produto?",
    toggle: `Tem certeza de que deseja ${product.isActive ? "desativar" : "ativar"} este produto?`,
  };

  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-300 dark:border-gray-600">
      <div className="flex">
        <Link href={`/products/${product.id}`} className="flex-1 p-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{formatPrice(product.price)}</p>
            <div className="flex items-center space-x-2">
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

        <div className="ml-auto flex items-center space-x-2">
          <Button variant="secondary" size="small" onClick={(e) => {
            e.stopPropagation();
            openModal('toggle');
          }}>
            {product.isActive ? "Desativar" : "Ativar"}
          </Button>
          <Button variant="danger" size="small" onClick={(e) => {
            e.stopPropagation();
            openModal('delete');
          }}>
            Deletar
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmAction}
        title={actionType === 'delete' ? "Confirmar Exclusão" : "Confirmar Alteração de Status"}
        message={actionMessages[actionType || 'toggle']}
        confirmText="Confirmar"
        cancelText="Cancelar"
        icon={
          actionType === 'delete' ? (
            <FiTrash2 className="text-red-600 dark:text-red-400" />
          ) : (
            <FiRefreshCw className="text-yellow-500 dark:text-yellow-200" />
          )
        }
      />
    </div>
  );
};

export default ProductCard;
