export const updateProductMapper = (product) => {
  const { id, amount, currency, storeId, name, categories, description } =
    product;

  return {
    productId: id,
    productName: name,
    description: description,
    productPrice: amount,
    currency,
    storeId: storeId,
    categories,
  };
};
