// src/hooks/useProducts.ts
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../services/api"; // Instância configurada do axios
import { AxiosError, isCancel } from "axios"; // Importa apenas AxiosError e isCancel

export interface Product {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => controller.abort(); // Cancela a requisição se o componente for desmontado
  }, []);

  const fetchProducts = async (signal: AbortSignal) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<Product[]>("/products", { signal });
      setProducts(response.data);
    } catch (error: unknown) {
      if (isAxiosError(error) && isCancel(error)) {
        console.log("Requisição cancelada:", error.message);
      } else {
        console.error("Failed to fetch products:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return { products, loading, fetchProducts, deleteProduct };
};

// Type guard para verificar se o erro é uma instância do AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export default useProducts;
