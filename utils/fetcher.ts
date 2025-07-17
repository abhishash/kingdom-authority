import { FOLJ_ENDPOINT } from "@/lib/constants";

interface FetchHandlerOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  queryKey?: string;
  headers?: Record<string, string>;
  isFormData?: boolean;
  auth?: boolean;
}
const endpoint = `${process.env.FOLJ_SONG_DOMAIN}${FOLJ_ENDPOINT}`;
const fetchHandler = async ({
  url,
  method = "GET",
  body,
  headers = {},
  isFormData = false,
}: FetchHandlerOptions) => {
  const requestUrl = `${endpoint}${url}`;

  const finalHeaders: Record<string, string> = {
    ...headers,
  };

  if (!isFormData) {
    finalHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(requestUrl, {
    method,
    headers: finalHeaders,
    credentials: "include", // Include cookies if needed
    body: isFormData ? body : JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type");

  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw data;
  }

  return data;
};

export default fetchHandler;
