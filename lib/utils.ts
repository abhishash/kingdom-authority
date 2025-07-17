import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReadonlyURLSearchParams } from 'next/navigation';
import { isArray, isObject } from './type-guards';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['ODOO_STORE_DOMAIN', 'ODOO_STOREFRONT_ACCESS_TOKEN'];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n'
      )}\n`
    );
  }

  if (
    process.env.FOLJ_SONG_DOMAIN?.includes('[') ||
    process.env.FOLJ_SONG_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `FOLJ_SONG_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
    );
  }
};

export const getLocalStorage = (key: string | any, needParsedData = false) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    if (!data || typeof data === 'undefined') return null;
    if (needParsedData) return JSON.parse(data);
    return data;
  }
};

/**
 * Remove data from local storage
 *
 * @param {string} storageKey - Key for the storage
 * @returns void
 */
export const removeFromLocalStorage = (storageKey: string | any) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(storageKey);
  }
};

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    if (isArray(data) || isObject(data)) {
      data = JSON.stringify(data);
    }
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    }
  }
};

export type T = {
  error: [];
};

export const formErrorResolver = (error: Array<T>) => {
  if (isArray(error)) {
    return error;
  }
  return [];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts an ISO date string to "June-2025" format
export function formatToMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
  // Example output: "June 2025"
  const formatted = date.toLocaleDateString("en-US", options);
  // Replace space with dash for "June-2025"
  return formatted.replace(" ", "-");
}

