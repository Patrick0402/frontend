// src/components/utils/validateProductFields.ts

export interface FieldErrors {
    productName: string;
    productPrice: string;
    productAmount: string;
    productDescription: string;
    productCategory: string;
  }
  
  export const validateProductFields = ({
    productName,
    productPrice,
    productAmount,
  }: {
    productName: string;
    productPrice: string;
    productAmount: string;
  }): FieldErrors => {
    const errors: FieldErrors = {
      productName: "",
      productPrice: "",
      productAmount: "",
      productDescription: "",
      productCategory: "",
    };
  
    const MAX_PRICE = 999999.99;
    const MAX_QUANTITY = 1000000;
  
    if (!productName) {
      errors.productName = "Nome do produto é obrigatório.";
    }
  
    const normalizedPrice = productPrice.replace(",", ".");
    const priceValue = parseFloat(normalizedPrice);
    if (!normalizedPrice || isNaN(priceValue)) {
      errors.productPrice = "Preço deve ser um número válido (exemplo: 79.99).";
    } else if (priceValue > MAX_PRICE) {
      errors.productPrice = `Preço não pode ser maior que R$ ${MAX_PRICE.toFixed(2)}.`;
    }
  
    const quantityValue = Number(productAmount);
    if (!productAmount || isNaN(quantityValue) || !Number.isInteger(quantityValue)) {
      errors.productAmount = "Quantidade deve ser um número inteiro válido.";
    } else if (quantityValue > MAX_QUANTITY) {
      errors.productAmount = `Quantidade não pode ser maior que ${MAX_QUANTITY}.`;
    }
  
    return errors;
  };
  