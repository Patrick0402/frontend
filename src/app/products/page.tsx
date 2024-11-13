// src/app/products/page.tsx

import React from "react";
import ProductList from "../../components/product/ProductList";

const ProductsPage: React.FC = () => {

  return (
    <div className="min-h-screen flex">

      <div className="flex-1 flex flex-col">
      
        <div className="flex-1 p-6 space-y-6 bg-white dark:bg-gray-600">
          <ProductList />
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
