// src/components/product/ProductList.tsx
"use client"; // Adicione esta linha no topo

import React from "react";
import useProducts from "../../hooks/useProducts";
import Button from "../ui/Button";

const ProductList: React.FC = () => {
  const { products, loading, deleteProduct } = useProducts();

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Preço: R$ {product.price}</p>
          </div>
          <Button variant="danger" onClick={() => deleteProduct(product.id)}>
            Deletar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
