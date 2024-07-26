import { productsRepositoryMock } from '@test/mocks/productsRepository.mock';
import { CreateProductsUseCase } from './createProduct.useCase';
import { productsPriceRepositoryMock } from '@test/mocks/productsPriceRepository.mock';
import { categoriesRepositoryMock } from '@test/mocks/categoriesRepository.mock';

describe('create product use case', () => {
  let createProductUseCase: CreateProductsUseCase;

  beforeEach(() => {
    createProductUseCase = new CreateProductsUseCase(
      productsRepositoryMock,
      productsPriceRepositoryMock,
      categoriesRepositoryMock,
    );
  });

  const createProduct = {
    name: 'product',
    description: 'description',
    category: 'category',
    storeId: 'store',
    currency: 'BRL',
    price: 10,
  };

  const categoriesReturn = {
    id: 'category',
    name: 'category',
    store: 'store',
  };

  const createProductReturn = {
    id: 'id',
    name: 'product',
    description: 'description',
    category: categoriesReturn,
  };

  const createProductsPriceReturn = {
    amount: 10,
    currency: 'BRL',
    id: 'id',
  };

  it('should create a product', async () => {
    (
      productsRepositoryMock.findProductByName as jest.Mock
    ).mockResolvedValueOnce(null);
    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValueOnce(categoriesReturn);

    (productsRepositoryMock.create as jest.Mock).mockResolvedValueOnce(
      createProductReturn,
    );

    (productsPriceRepositoryMock.create as jest.Mock).mockResolvedValueOnce(
      createProductsPriceReturn,
    );

    const createdProduct = await createProductUseCase.execute(createProduct);

    expect(createdProduct).toHaveProperty('productCategories');
    expect(createdProduct).toHaveProperty('productDescription');
    expect(createdProduct).toHaveProperty('productPrice');
    expect(createdProduct).toHaveProperty('productName');
    expect(createdProduct).toHaveProperty('currency');
  });

  it('should not create a product if it already exists', async () => {
    (
      productsRepositoryMock.findProductByName as jest.Mock
    ).mockResolvedValueOnce(createProductReturn);

    await expect(createProductUseCase.execute(createProduct)).rejects.toThrow(
      'Product already exists',
    );
  });

  it('should not create a product if category does not exist', async () => {
    (
      productsRepositoryMock.findProductByName as jest.Mock
    ).mockResolvedValueOnce(null);
    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValueOnce(null);

    await expect(createProductUseCase.execute(createProduct)).rejects.toThrow(
      'Category not found',
    );
  });
});
