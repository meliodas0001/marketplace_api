export interface IUpdateProductDTO {
  productId: string;
  storeId: string;
  name?: string;
  description?: string;
  categoriesIds: string[];

  productPrice: {
    currency?: string;
    amount?: number;
  };
}
