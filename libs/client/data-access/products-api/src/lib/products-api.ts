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
    all: <R>() => requests.get<R>('/products'),
    bySellerId: <R>(sellerId: string) => requests.get<R>(`/products${sellerId ? `?sellerId=${sellerId}` : ''}`),
    byId: <R>(productId: string) => requests.get<R>(`/products/${productId}`),
    update: <R, B extends IUpdateProductDto = IUpdateProductDto>(productId: string, updates: B) =>
        requests.patch<R, B>(`/products/${productId}`, updates),
    del: <R>(productId: string) => requests.del<R>(`/products/${productId}`),
    create: <R, B extends ICreateProductDto = ICreateProductDto>(product: B) =>
        requests.post<R, B>('/products', product),
    buy: <R, B extends { productId: string; amount: number } = { productId: string; amount: number }>(payload: B) =>
        requests.post<R, B>('/buy', payload),
});
