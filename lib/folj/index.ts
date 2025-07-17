// import { LIMIT, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS, TOKEN } from 'lib/constants';
// import { isArray, isObject, isShopifyError } from 'lib/type-guards';
// import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import { getProductRecommendationsQuery } from './queries/product';
import {
  Cart,
  Collection,
  CreateCartType,
  FooterSubLinks,
  MegaMenu,
  Menu,
  OdooFetchVariables,
  OdooFooterMenuOperation,
  OdooHomeCollection,
  OdooHomepageCollection,
  OdooProduct,
  OdooProductsOperation,
  Page,
  Product,
  ProductVariant,
  OdooAddToCartOperation,
  OdooCart,
  OdooCartOperation,
  OdooCollection,
  OdooCollectionOperation,
  OdooCollectionsOperation,
  OdooCreateCartOperation,
  OdooMenuOperation,
  OdooPageOperation,
  OdooProductOperation,
  OdooRemoveFromCartOperation,
  OdooUpdateCartOperation,
  OdooCountriesOperation,
  ShippingArrayDataType,
  shippingAddressType,
  ShippingMethodType,
  PaymentMethodType,
  PlacerOrderInputType,
  RegisterInputType,
  RecoverLoginType,
  ShippingAddressInputType,
  ShippingMethodDataType,
  PaymentMethodDataType,
  PlacerOrderDataType,
  RegisterDataType,
  SongsTypes,
} from "./types";
import { isArray, isObject, isShopifyError } from "../type-guards";
import { ensureStartsWith } from "../utils";
import { LIMIT, TAGS, TOKEN, FOLJ_ENDPOINT } from "../constants";

const endpoint = `${process.env.FOLJ_SONG_DOMAIN}${FOLJ_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function foljFetch<T>({
  cache = "force-cache",
  headers,
  query,
  method = "GET",
  tags,
  variables,
  is_session,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  method?: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  is_session?: boolean;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`${endpoint}/${query}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // cartId: `${cartId ? `${cartId}` : ''}`,
        // Authenticate: key,
        // ...(session ? { Authorization: `bearer ${session}` } : {}),
        // ...headers
      },
      body:
        variables &&
        JSON.stringify({
          ...(variables && variables),
        }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

const removeEdgesAndNodes = (array: Array<any>) => {
  return array.map((edge) => edge);
};

const reshapeCart = (cart: OdooCart): any => {
  // if (!cart.prices?.totalTaxAmount) {
  //   cart.cost.totalTaxAmount = {
  //     amount: '0.0',
  //     currencyCode: 'USD'
  //   };
  // }
  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.items),
  };
};

const reshapeCollection = (
  collection?: OdooCollection
): Collection | undefined => {
  if (!isObject(collection)) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.url_key}`,
  };
};

const reshapeCollections = (collections: OdooCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);
      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: ProductVariant[], productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.thumbnail.name.match(/.*\/(.*)\..*/)[1];
    return {
      ...image.thumbnail,
      altText: image.thumbnail.name || `${productTitle} - ${filename}`,
    };
  });
};

const reshapeProduct = (
  product?: OdooProduct,
  filterHiddenProducts: boolean = true
) => {
  if (!product || filterHiddenProducts) {
    return undefined;
  }
  const { variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(variants, product.name),
    variants: removeEdgesAndNodes(variants),
  };
};

const reshapeProducts = (products: OdooProduct[]) => {
  const reshapedProducts = [];
  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product, false);
      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

const reshapeHomeProducts = (products: OdooHomeCollection): any[] => {
  const reshapedProducts = [];

  if (isObject(products)) {
    if (isObject(products?.promotionBanner)) {
      reshapedProducts.push(products?.promotionBanner);
    }

    if (isObject(products?.featuredProductCarousel)) {
      reshapedProducts.push(products?.featuredProductCarousel);
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<CreateCartType> {
  const res = await foljFetch<OdooCreateCartOperation>({
    query: "create-empty-cart",
    method: "POST",
    cache: "no-store",
    is_session: true,
  });

  return res.body?.data?.customerCart;
}

export async function addToCart(itemObject: {
  cartId: string;
  cartItems: {
    id: number;
    quantity: number;
  }[];
}): Promise<Cart> {
  const res = await foljFetch<OdooAddToCartOperation>({
    query: "addtocart",
    method: "POST",
    variables: {
      ...itemObject,
    },
    cache: "no-store",
    is_session: true,
  });

  return reshapeCart(res.body?.customerCart);
}

export async function removeFromCart(removeCartObj: {
  cartItemId: number;
  cartId: string;
}): Promise<Cart> {
  const res = await foljFetch<OdooRemoveFromCartOperation>({
    query: "remove-cart",
    method: "DELETE",
    variables: {
      ...removeCartObj,
    },
    cache: "no-store",
    is_session: true,
  });

  return reshapeCart(res.body.removeCart);
}

export async function updateCart(updateCartObj: {
  cartId: string;
  cartItems: {
    cart_item_id: number;
    quantity: number;
  }[];
}): Promise<Cart> {
  const res = await foljFetch<OdooUpdateCartOperation>({
    query: "updatecart",
    method: "POST",
    variables: {
      ...updateCartObj,
    },
    cache: "no-store",
    is_session: true,
  });

  return reshapeCart(res.body.updateCart);
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  const res = await foljFetch<OdooCollectionOperation>({
    query: "category-list",
    method: "POST",
    tags: [TAGS.collections],
    variables: {
      filter: {
        url_key: {
          eq: handle,
        },
      },
    },
  });

  return reshapeCollection(res.body.category?.[0]);
}

export async function getHomepageCollectionProducts(): Promise<
  OdooHomeCollection[] | any[]
> {
  const res = await foljFetch<OdooHomepageCollection>({
    query: "homepage",
    tags: [TAGS.collections, TAGS.products],
    cache: "no-cache",
  });

  if (!res.body.getHomePageData) {
    return [];
  }

  return reshapeHomeProducts(res.body.getHomePageData);
}

export async function getCollections(): Promise<Collection[]> {
  const res = await foljFetch<OdooCollectionsOperation>({
    query: "category-list",
    method: "POST",
    tags: [TAGS.collections],
  });

  const odooCollections = removeEdgesAndNodes(res?.body?.category);

  const collections = [
    {
      url_key: "",
      title: "",
      name: "All",
      description: "All products",
      meta_title: "All",
      meta_description: "All products",
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(odooCollections).filter(
      (collection) => !collection.url_key.startsWith("hidden")
    ),
  ];
  return collections;
}

export async function getFooterLinks(): Promise<Menu[]> {
  const res = await foljFetch<OdooFooterMenuOperation>({
    query: "footer",
    method: "GET",
    tags: [TAGS.collections],
  });

  return (
    res?.body?.footerLinks.map(
      (item: {
        updatedAt?: string;
        title: string;
        subLinks: FooterSubLinks[];
      }) => ({
        title: item.title,
        path: item.subLinks,
        updateAt: new Date(),
      })
    ) || []
  );
}

export async function getPage(handle: { identifier: string }): Promise<Page> {
  const res = await foljFetch<OdooPageOperation>({
    query: "cms",
    method: "POST",
    cache: "no-store",
    variables: { ...handle },
  });

  return res.body.cmsPage;
}

export async function getPages(): Promise<FooterSubLinks[]> {
  const res = await foljFetch<OdooFooterMenuOperation>({
    query: "footer",
    method: "GET",
    cache: "no-store",
  });
  const flattenedSubLinks: FooterSubLinks[] = res.body.footerLinks.flatMap(
    (item) => item.subLinks
  );

  return removeEdgesAndNodes(flattenedSubLinks);
}

export async function getSongs(): Promise<SongsTypes> {
  const res = await foljFetch<SongsTypes>({
    query: "/songs",
    method: "GET",
    cache: "no-store",
  });

  // if (!isObject(res?.body)) {
  //   return {
  //     songs: null,
  //   };
  // }
  return res?.body;
}

export async function getProduct(pathUrl: string): Promise<Product> {
  const handle = { filter: { url_key: { eq: pathUrl } } };

  const res = await foljFetch<OdooProductOperation>({
    query: "product-list",
    method: "POST",
    tags: [TAGS.products],
    variables: {
      ...handle,
    },
  });
  if (!isArray(res.body.products.items)) {
    return { products: [], total: 0 };
  }

  return {
    products: reshapeProducts(removeEdgesAndNodes(res.body.products.items)),
    total: res.body.total_count ?? 0,
  };
}

// export async function getProductRecommendations(productId: string): Promise<Product[]> {
//   const res = await foljFetch<OdooProductRecommendationsOperation>({
//     query: getProductRecommendationsQuery,
//     tags: [TAGS.products],
//     variables: {
//       productId
//     }
//   });

//   return reshapeProducts(res.body.data.productRecommendations);
// }

export async function getProducts({
  query,
  reverse,
  sortKey,
  page,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  page?: string;
}): Promise<any> {
  let handle: OdooFetchVariables = {
    pageSize: LIMIT,
    currentPage: page || "1",
    filter: {},
  };

  if (sortKey) {
    const direction = reverse ? "desc" : "asc";
    handle = { sort: { [sortKey.toLowerCase()]: direction }, ...handle };
  }
  if (query) {
    handle = { search: query, ...handle };
  }

  const res = await foljFetch<any>({
    query: "songs",
    method: "GET",
    tags: [TAGS.songs],
    // variables: {
    //   ...handle
    // }
  });
  if (!isObject(res?.body)) {
    return {
      songs: [],
      total: 0,
    };
  }

  return {
    songs: res?.body.songs,
    total: res.body.total_count ?? 0,
  };
}
/**
 * Return Country Array
 * @returns
 */
export async function getCountryList(): Promise<ShippingArrayDataType[]> {
  const res = await foljFetch<OdooCountriesOperation>({
    query: "country",
    method: "POST",
  });
  return res.body?.countries;
}

export async function addShippingAddress(
  shippingAddressInput: ShippingAddressInputType
): Promise<shippingAddressType> {
  const res = await foljFetch<shippingAddressType>({
    query: "add-shipping-address",
    method: "POST",
    variables: {
      ...shippingAddressInput,
    },
    cache: "no-store",
    is_session: true,
  });

  return res.body;
}

export async function addShippingMethod(
  input: ShippingMethodType
): Promise<ShippingMethodDataType> {
  const res = await foljFetch<ShippingMethodDataType>({
    query: "add-delivery-method",
    method: "POST",
    variables: {
      ...input,
    },
    cache: "no-store",
    is_session: true,
  });

  return res.body;
}

export async function addPaymentMethod(
  input: PaymentMethodType
): Promise<PaymentMethodDataType> {
  const res = await foljFetch<PaymentMethodDataType>({
    query: "add-payment-method",
    method: "POST",
    variables: {
      ...input,
    },
    cache: "no-store",
    is_session: true,
  });

  return res?.body;
}

export async function createPlaceOrder(
  input: PlacerOrderInputType
): Promise<PlacerOrderDataType> {
  const res = await foljFetch<PlacerOrderDataType>({
    query: "place-order",
    method: "POST",
    variables: {
      ...input,
    },
    cache: "no-store",
    is_session: true,
  });

  return res.body;
}

export async function createUserToLogin(
  input: RegisterInputType
): Promise<RegisterDataType> {
  const res = await foljFetch<RegisterDataType>({
    query: "signup",
    method: "POST",
    variables: {
      ...input,
    },
    cache: "no-store",
  });

  return res?.body;
}

export async function recoverUserLogin(input: {
  email: string;
}): Promise<RecoverLoginType> {
  const res = await foljFetch<RecoverLoginType>({
    query: "forgetPassword",
    method: "POST",
    variables: {
      ...input,
    },
    cache: "no-store",
  });
  return res.body;
}

// // This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
// export async function revalidate(req: NextRequest): Promise<NextResponse> {
//   // We always need to respond with a 200 status code to Shopify,
//   // otherwise it will continue to retry the request.
//   const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
//   const productWebhooks = ['products/create', 'products/delete', 'products/update'];
//   const topic = headers().get('x-shopify-topic') || 'unknown';
//   const secret = req.nextUrl.searchParams.get('secret');
//   const isCollectionUpdate = collectionWebhooks.includes(topic);
//   const isProductUpdate = productWebhooks.includes(topic);

//   if (!secret || secret !== process.env.ODOO_REVALIDATION_SECRET) {
//     return NextResponse.json({ status: 200 });
//   }

//   if (!isCollectionUpdate && !isProductUpdate) {
//     // We don't need to revalidate anything for any other topics.
//     return NextResponse.json({ status: 200 });
//   }

//   if (isCollectionUpdate) {
//     revalidateTag(TAGS.collections);
//   }

//   if (isProductUpdate) {
//     revalidateTag(TAGS.products);
//   }

//   return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
// }
