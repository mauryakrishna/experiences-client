/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
import { WRITE_AN_EXPERIENCE_ROUTE } from "../ConfigConstants"
// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: `${WRITE_AN_EXPERIENCE_ROUTE}`,
      load: () => import(/* webpackChunkName: 'write-editor' */ './editor'),
    },
    // {
    //   path: '/contact',
    //   load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    // },
    // {
    //   path: '/login',
    //   load: () => import(/* webpackChunkName: 'login' */ './login'),
    // },
    // {
    //   path: '/register',
    //   load: () => import(/* webpackChunkName: 'register' */ './register'),
    // },
    // {
    //   path: '/about',
    //   load: () => import(/* webpackChunkName: 'about' */ './about'),
    // },
    // {
    //   path: '/privacy',
    //   load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    // },
    // {
    //   path: '/admin',
    //   load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    // },
    {
      path: '/author/:authoruid',
      load: () => import(/* webpackChunkName: 'allofauthor' */ './allofauthor'),
    },
    {
      path: '/edit/:slugkey',
      protected: true,
      load: () => import(/* webpackChunkName: 'write-editor' */ './editor'),
    },
    {
      path: '/reset-password/:requestkey',
      load: () =>
        import(/* webpackChunkName: 'reset-password' */ './reset-password'),
    },
    {
      path: '/verify/:verifykey',
      load: () =>
        import(/* webpackChunkName: 'verify-email' */ './verify-email'),
    },
    {
      path: '/:authoruid/:slug',
      load: () =>
        import(/* webpackChunkName: 'read-experience' */ './read-experience'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last), this will match just any route
    // be careful about this one and after
    {
      path: '(.*)',
      name: 'not-found',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'World of experiences'}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
