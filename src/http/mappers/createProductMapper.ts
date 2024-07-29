export const createProductMapper = (product) => {
  const { currency, name, amount, description, categories, id } = product;

  return {
    productId: id,
    productName: name,
    productDescription: description,
    productPrice: amount,
    currency,
    productCategories: categories,
  };
};
