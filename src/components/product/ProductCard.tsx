// src/components/product/ProductCard.tsx
import React from "react";
import { Product } from "../../hooks/useProducts";
import Button from "../ui/Button";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">${product.price.toFixed(2)}</p>
      <p className={`text-sm ${product.isActive ? "text-green-600" : "text-red-600"}`}>
        {product.isActive ? "Ativo" : "Inativo"}
      </p>
      <Button variant="danger" size="small" onClick={() => onDelete(product.id)}>
        Deletar
      </Button>
    </div>
  );
};

export default ProductCard;
