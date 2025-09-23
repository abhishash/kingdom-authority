export type SortFilterItem = {
    name: string;
    slug: string | null;
    sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE' | 'name';
    reverse: boolean;
};

export const defaultSort: SortFilterItem = {
    name: 'Product A to Z',
    slug: null,
    sortKey: 'name',
    reverse: false
};

export const sorting: SortFilterItem[] = [
    defaultSort,
    { name: 'Product Z to A', slug: 'product-desc', sortKey: 'name', reverse: true }, // asc
    { name: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
    { name: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
    collections: 'collections',
    products: 'products',
    cart: 'cart',
    songs: 'songs'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const FOLJ_ENDPOINT = `/api/${process.env.FOLJ_API_VERSION}`;
export const LIMIT = 12;
export const TOKEN = 'token';
export const SAVED_LOCAL_STORAGE = 'shipping_address';
export const PLACEHOLDER_IMG='/placeholder.jpg';

export const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
