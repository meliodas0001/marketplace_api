export const createProductMapper = (product) => {
  const { currency, name, price, description, categories, id } = product;

  return {
    productId: id,
    productName: name,
    productDescription: description,
    productPrice: price,
    currency,
    productCategories: categories,
  };
};
