import { productsRepositoryMock } from '@test/mocks/productsRepository.mock';
import { DeleteProductUseCase } from './deleteProduct.useCase';
import { productsPriceRepositoryMock } from '@test/mocks/productsPriceRepository.mock';

describe('Delete product use case', () => {
  let deleteProductUseCase: DeleteProductUseCase;

  beforeEach(() => {
    deleteProductUseCase = new DeleteProductUseCase(
      productsRepositoryMock,
      productsPriceRepositoryMock,
    );
  });

  it('should delete a product', async () => {
    const productId = '1';

    (
      productsRepositoryMock.deleteByProductId as jest.Mock
    ).mockResolvedValueOnce(undefined);

    (productsRepositoryMock.findProductById as jest.Mock).mockResolvedValueOnce(
      { id: '1' },
    );

    (
      productsPriceRepositoryMock.deleteByProductId as jest.Mock
    ).mockResolvedValueOnce(undefined);

    await expect(
      deleteProductUseCase.execute(productId),
    ).resolves.toBeUndefined();
  });

  it('should throw an error if product does not exist', async () => {
    const productId = '1';

    (productsRepositoryMock.findProductById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(deleteProductUseCase.execute(productId)).rejects.toThrow(
      'Product not found',
    );
  });
});
