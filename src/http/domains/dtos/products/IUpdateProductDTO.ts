export interface IUpdateProductDTO {
  id: string; // ID DO PRODUTO
  storeId: string;
  name?: string;
  description?: string;
  categoriesIds: string[];

  productPrice: {
    currency?: string;
    amount?: number;
  }; // IUpdateProductsPrice
}
