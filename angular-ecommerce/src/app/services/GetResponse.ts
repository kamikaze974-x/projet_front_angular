import { Product } from '../common/product';

export interface GetResponse {
    _embedded: {
        products: Product[];
    };
}
