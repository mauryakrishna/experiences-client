/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
// import { createPath } from 'history';

// Apollo settings
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink, fromPromise } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import localStorage from 'local-storage';

import App from './components/App';
import history from './history';
import { updateMeta } from './DOMUtils';
import router from './router';
import resolvers from './resolvers';
import refreshUserToken from './refreshUserToken';

// Enables critical path CSS rendering
// https://github.com/kriasoft/isomorphic-style-loader
const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss());
  return () => {
    removeCss.forEach(f => f());
  };
};

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Universal HTTP client
  // fetch: createFetch(fetch, {
  //   baseUrl: window.App.apiUrl,
  // }),
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context);

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    // fragmentMatcher https://github.com/apollographql/apollo-client/issues/3397
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [], // no types provided
        },
      },
    });

    const cache = new InMemoryCache({
      addTypename: false,
      fragmentMatcher,
      // eslint-disable-next-line no-underscore-dangle
    }).restore(window.__APOLLO_STATE__);

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.get('token');
      
      return {
        headers: {
          'Accept-Encoding': 'gzip,deflate',
          ...headers,
          ...(token && { authorization: token }),
        },
      };
    });

    const httpLink = createHttpLink({
      uri: window.App.apiUrl,
      credentials: 'same-origin'
    });

    const stateLink = withClientState({
      cache,
      resolvers,
    });

    let isRefreshing = false;
    let pendingRequests = [];

    const resolvePendingRequests = () => {
      pendingRequests.map(callback => callback());
      pendingRequests = [];
    };

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch(err.StatusCode) {
            case 401:
              // refresh token - 
              // - https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8
              // - https://www.apollographql.com/docs/link/links/error/#retrying-failed-requests
              let forward$;

              if (!isRefreshing) {
                isRefreshing = true;
                forward$ = fromPromise(
                  refreshUserToken()
                    .then((newAccessToken)=> {
                        const oldHeaders = operation.getContext().headers;
                        operation.setContext({
                          headers: {
                            ...oldHeaders,
                            authorization: newAccessToken,
                          },
                        });
                      resolvePendingRequests();
                      return newAccessToken;
                    })
                    .catch((err)=> {
                      pendingRequests = [];
                      return;
                    })
                    .finally(() => {
                      isRefreshing = false;
                    })
                )
                .filter(value => Boolean(value))
                .flatMap(() => {
                  // retry the request, returning the new observable
                  return forward(operation);
                });
              }
              else {
                forward$ = fromPromise(
                  new Promise(resolve => {
                    pendingRequests.push(() => resolve());
                  })
                );
              }

              return forward$.flatMap(() => forward(operation));
              
            default:
              graphQLErrors.map(({ message }) => console.log(message));
          }
        }
      }
        
    });

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([errorLink, authLink, stateLink, httpLink]),
      resolvers: {},
      defaultOptions: {
        query: {
          errorPolicy: 'all',
        },
      },
    });

    // hydrate - should be only enable in prod, Need to figure out a way to differentiate when dev and prod
    // use render in dev even for ssr
    const renderReactApp =
      isInitialRender && !__DEV__ ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(
      <ApolloHooksProvider client={client}>
        <App context={context} insertCss={insertCss}>
          {route.component}
        </App>
      </ApolloHooksProvider>,
      container,
      () => {
        if (isInitialRender) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
          }

          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          return;
        }

        document.title = route.title;

        updateMeta('description', route.description);
        // Update necessary tags in <head> at runtime here, ie:
        // updateMeta('keywords', route.keywords);
        // updateCustomMeta('og:url', route.canonicalUrl);
        // updateCustomMeta('og:image', route.imageUrl);
        // updateLink('canonical', route.canonicalUrl);
        // etc.

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        // if (window.ga) {
        //   window.ga('send', 'pageview', createPath(location));
        // }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('RSK will reload your page after error');
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
