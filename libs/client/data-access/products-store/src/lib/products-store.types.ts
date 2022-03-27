export interface IProduct {
    _id: string;
    productName: string;
    cost: number;
    amountAvailable: number;
    sellerId: string;
}
export type INewProductFormValues = Omit<IProduct, '_id' | 'sellerId'>;
export type IUpdateProductFormValues = Omit<IProduct, '_id' | 'sellerId'>;
