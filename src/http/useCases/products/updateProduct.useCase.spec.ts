import { productsRepositoryMock } from '@test/mocks/productsRepository.mock';
import { UpdateProductUseCase } from './updateProduct.useCase';
import { productsPriceRepositoryMock } from '@test/mocks/productsPriceRepository.mock';
import { categoriesRepositoryMock } from '@test/mocks/categoriesRepository.mock';

describe('update product use case', () => {
  let updateProductUseCase: UpdateProductUseCase;

  beforeEach(() => {
    updateProductUseCase = new UpdateProductUseCase(
      productsRepositoryMock,
      productsPriceRepositoryMock,
      categoriesRepositoryMock,
    );
  });

  const product = {
    storeId: '1',
    productId: '1',
    name: 'sla novo nome',
    description: 'nova description sla',
    categoriesIds: ['1'],

    productPrice: {
      amount: 500,
      currency: 'USD',
    },
  };

  const updatedProduct = {
    id: '1',
    name: 'product',
    description: 'description',
    categories: ['category'],
  };

  const updatedPrice = {
    id: '1',
    amount: 10,
    currency: 'BRL',
  };

  it('should update a product', async () => {
    (productsRepositoryMock.findProductById as jest.Mock).mockResolvedValueOnce(
      product,
    );

    (
      categoriesRepositoryMock.findCategoriesByIds as jest.Mock
    ).mockResolvedValueOnce(['category']);

    (productsRepositoryMock.update as jest.Mock).mockResolvedValueOnce(
      updatedProduct,
    );

    (productsPriceRepositoryMock.update as jest.Mock).mockResolvedValueOnce(
      updatedPrice,
    );

    const response = await updateProductUseCase.execute(product);

    expect(response).toHaveProperty('productId');
    expect(response).toHaveProperty('productName');
    expect(response).toHaveProperty('productPrice');
    expect(response).toHaveProperty('storeId');
    expect(response).toHaveProperty('categories');
    expect(response).toHaveProperty('currency');
    expect(response).toHaveProperty('description');
  });

  it('should not update a product if it does not exist', async () => {
    (productsRepositoryMock.findProductById as jest.Mock).mockResolvedValueOnce(
      null,
    );

    await expect(updateProductUseCase.execute(product)).rejects.toThrow(
      'Product not found',
    );
  });

  it('should not update a product if category does not exist', async () => {
    (productsRepositoryMock.findProductById as jest.Mock).mockResolvedValueOnce(
      product,
    );

    (
      categoriesRepositoryMock.findCategoriesByIds as jest.Mock
    ).mockResolvedValueOnce(null);

    await expect(updateProductUseCase.execute(product)).rejects.toThrow(
      'Category not found',
    );
  });
});
