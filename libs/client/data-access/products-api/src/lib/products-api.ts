import type { Requests } from '@mr/shared/data-access/superagent';

interface ICreateProductDto {
    amountAvailable: number;
    productName: string;
    cost: number;
}
interface IUpdateProductDto {
    amountAvailable?: number;
    productName?: string;
    cost?: number;
}
export const createProductsApi = (requests: Requests) => ({
    all: () => requests.get('/products'),
    bySellerId: (sellerId: string) => requests.get(`/products${sellerId ? `?sellerId=${sellerId}` : ''}`),
    byId: (productId: string) => requests.get(`/products/${productId}`),
    update: (productId: string, updates: IUpdateProductDto) => requests.patch(`/products/${productId}`, updates),
    del: (productId: string) => requests.del(`/products/${productId}`),
    create: (product: ICreateProductDto) => requests.post('/products', product),
    buy: (payload: { productId: string; amount: number }) => requests.post('/buy', payload),
});
