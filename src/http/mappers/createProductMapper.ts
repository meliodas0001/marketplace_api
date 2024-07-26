export const createProductMapper = (product) => {
  const { currency, name, price, description, categories } = product;

  return {
    productName: name,
    productDescription: description,
    productPrice: price,
    currency,
    productCategories: categories,
  };
};
