// src/components/product/ProductList.tsx
"use client"; // Garante que o componente seja renderizado no cliente

import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard"; // Importando o ProductCard

const ProductList: React.FC = () => {
  const { products, loading, deleteProduct, handleToggleStatus } = useProducts(); // Adicionando a função handleToggleStatus

  // Renderiza o carregamento, se necessário
  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="space-y-4">
      {/* Exibe a lista de produtos usando o componente ProductCard */}
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}          // Passa os dados do produto
          onDelete={deleteProduct}   // Passa a função de exclusão
          onToggleStatus={handleToggleStatus}  // Passa a função de alternância de status
        />
      ))}
    </div>
  );
};

export default ProductList;
