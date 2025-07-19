import {
  Collection,
  Page,
  OdooCollection,
  OdooCollectionOperation,
  OdooPageOperation,
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
  SingleDataTypes,
} from "./types";
import { isObject, isShopifyError } from "../type-guards";
import { TAGS, FOLJ_ENDPOINT } from "../constants";

const endpoint = `${process.env.FOLJ_SONG_DOMAIN}${FOLJ_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function foljFetch<T>({
  cache = "force-cache",
  query,
  method = "GET",
  tags,
  variables,
}: {
  cache?: RequestCache;
  query: string;
  method?: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
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
      ...(cache === "force-cache" && { next: { revalidate: 60 } }),
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

export async function getPage(handle: { identifier: string }): Promise<Page> {
  const res = await foljFetch<OdooPageOperation>({
    query: "cms",
    method: "POST",
    cache: "no-store",
    variables: { ...handle },
  });

  return res.body.cmsPage;
}

export async function getSong(songSlug: string): Promise<SingleDataTypes> {
  let url = "songs";
  if (songSlug) {
    url = `${url}/${songSlug}`;
  }

  const res = await foljFetch<SingleDataTypes>({
    query: url,
    method: "GET",
    cache: "force-cache",
  });
  if (!isObject(res?.body?.data)) {
    return {};
  }
  return res?.body;
}

export async function getSongs(): Promise<SongsTypes> {
  const url = "songs";

  const res = await foljFetch<SongsTypes>({
    query: url,
    method: "GET",
    cache: "force-cache",
  });
  if (!isObject(res?.body)) {
    return {
      songs: [],
    };
  }
  return res?.body;
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
