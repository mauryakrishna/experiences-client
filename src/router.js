/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// https://www.kriasoft.com/universal-router/redirects
import UniversalRouter from 'universal-router';
import localStorage from 'local-storage';
import routes from './routes';

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    const loggedin = localStorage.get('loggedin');
    if (context.route.protected && loggedin === false) {
      return { redirect: '/login', from: context.pathname };
    }
    if (typeof context.route.load === 'function') {
      return context.route
        .load()
        .then(action => action.default(context, params));
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }
    return undefined;
  },
});
