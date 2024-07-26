export interface IUpdateProductDTO {
  id: string;
  storeId: string;
  name?: string;
  description?: string;
  categoriesIds: string[];

  productPrice: {
    currency?: string;
    amount?: number;
  };
}
