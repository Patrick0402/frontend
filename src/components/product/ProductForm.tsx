// src/components/product/ProductForm.tsx


import React, { useState } from "react";
import axiosInstance from "../../services/api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Notification from "../../components/ui/Notification";
import { validateProductFields, FieldErrors } from "../../utils/validateProductFields";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  errors?: Record<string, string>;
}

const ProductForm: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productAmount, setProductAmount] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string | undefined>();
  const [productCategory, setProductCategory] = useState<string | undefined>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    productName: "",
    productPrice: "",
    productAmount: "",
    productDescription: "",
    productCategory: "",
  });

  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    // Validação dos campos antes de enviar
    const validationErrors = validateProductFields({
      productName,
      productPrice,
      productAmount,
    });
    setFieldErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    setIsLoading(true);

    try {
      // Normalizar o valor do preço antes do envio
      const normalizedPrice = parseFloat(productPrice.replace(",", "."));

      await axiosInstance.post("/products", {
        name: productName,
        price: normalizedPrice,
        quantity_in_stock: parseInt(productAmount),
        isActive,
        description: productDescription,
        category: productCategory,
      });

      setNotification({ message: "Produto cadastrado com sucesso!", type: "success" });

      // Limpar os campos após o sucesso
      setProductName("");
      setProductPrice("");
      setProductAmount("");
      setProductDescription("");
      setProductCategory("");
      setIsActive(true);
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (!axiosError.response) {
        setNotification({ message: "Erro de rede. Verifique sua conexão.", type: "error" });
      } else {
        const { status, data } = axiosError.response;

        if (status === 400 && data?.errors) {
          const serverFieldErrors: FieldErrors = { ...fieldErrors };
          Object.entries(data.errors).forEach(([field, message]) => {
            if (serverFieldErrors.hasOwnProperty(field)) {
              serverFieldErrors[field as keyof FieldErrors] = message;
            }
          });
          setFieldErrors(serverFieldErrors);
        } else {
          const message = status === 401 || status === 403
            ? "Acesso negado. Verifique sua autenticação."
            : status === 500
            ? "Erro no servidor. Tente novamente mais tarde."
            : "Erro desconhecido ao registrar o produto.";
          setNotification({ message, type: "error" });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">Registrar Novo Produto</h2>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={3000}
        />
      )}

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Nome do Produto"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={fieldErrors.productName}
            required
            disabled={isLoading}
          />

          <Input
            label="Preço do Produto"
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            error={fieldErrors.productPrice}
            required
            disabled={isLoading}
          />

          <Input
            label="Quantidade no Estoque"
            type="text"
            value={productAmount}
            onChange={(e) => setProductAmount(e.target.value)}
            error={fieldErrors.productAmount}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Descrição do Produto"
            type="text"
            value={productDescription || ""}
            onChange={(e) => setProductDescription(e.target.value)}
            error={fieldErrors.productDescription}
            disabled={isLoading}
          />

          <Input
            label="Categoria do Produto"
            type="text"
            value={productCategory || ""}
            onChange={(e) => setProductCategory(e.target.value)}
            error={fieldErrors.productCategory}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-gray-800 dark:text-gray-100">Status</label>
          <div className="flex items-center space-x-4 mt-2">
            <label htmlFor="isActive" className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <span className="ml-2 text-gray-800 dark:text-gray-100">Ativo</span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" variant="primary" size="large" isLoading={isLoading}>
            {isLoading ? "Registrando..." : "Registrar Produto"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
