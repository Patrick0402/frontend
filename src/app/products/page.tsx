// src/app/products/page.tsx
import React from "react";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import ProductList from "../../components/product/ProductList";

const ProductsPage: React.FC = () => {

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6 bg-white dark:bg-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Produtos</h2>
          <ProductList />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;
