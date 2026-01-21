import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const STRAPI_GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT ??
  "https://new-nolcha-strapi.onrender.com/graphql";

/**
 * Create a new Apollo Client instance.
 *
 * We intentionally create a fresh client per request so it is
 * safe for server-side rendering in the Next.js App Router.
 */
export default function client(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: STRAPI_GRAPHQL_ENDPOINT,
    // Ensure Next.js caching / ISR is respected for server-side queries
    fetch: (input, init) => {
      const nextInit: RequestInit & { next?: { revalidate?: number } } = {
        ...(init || {}),
        next: {
          // Revalidate experience pages every 60 seconds by default
          revalidate: 60,
          ...(init as any)?.next,
        },
      };

      return fetch(input, nextInit);
    },
  });

  const authLink = setContext((_, { headers }) => {
    const serverToken = process.env.STRAPI_SERVER_TOKEN;
    const clientToken = process.env.NEXT_PUBLIC_STRAPI_CLIENT_TOKEN;
    const token = serverToken || clientToken;

    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
      },
      query: {
        fetchPolicy: "cache-first",
      },
    },
  });
}

