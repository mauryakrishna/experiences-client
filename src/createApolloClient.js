import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

import config from './config';

export default () => {
  const httpLink = createHttpLink({
    uri: config.api.serverUrl,
    credentials: 'include', // ' same-origin',
    // headers: {
    //   cookie: req.header('Cookie'),
    // },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    ssrMode: true,
    link: Array.from([errorLink, authLink, httpLink]),
    ssrForceFetchDelay: 100,
    cache: new InMemoryCache(),
    resolvers: {},
  });
};
