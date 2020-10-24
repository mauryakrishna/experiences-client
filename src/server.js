/* eslint-disable global-require */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import proxy from 'express-http-proxy';
import { LocalStorage } from 'node-localstorage';

// apollo setup
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from 'react-apollo-hooks';
import createApolloClient from './createApolloClient';

import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
// import passport from './auth/passport';
// import authrouter from './auth/routes';
import router from './router';

// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
global.localStorage = new LocalStorage('./scratch');
const app = express();

// requirement for createHttpLink
global.fetch = nodeFetch;
//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication -- This was particularly useful when using OAuth authentication
// -----------------------------------------------------------------------------
// app.use(
//   expressJwt({
//     secret: config.auth.jwt.secret,
//     credentialsRequired: false,
//     getToken: req => req.cookies.id_token,
//   }),
// );
// // Error handler for express-jwt
// app.use((err, req, res, next) => {
//   // eslint-disable-line no-unused-vars
//   if (err instanceof Jwt401Error) {
//     console.error('[express-jwt-error]', req.cookies.id_token);
//     // `clearCookie`, otherwise user can't use web-app until cookie expires
//     res.clearCookie('id_token');
//   }
//   next(err);
// });

// for integrating OAuth Authentication via FB
// app.use(passport.initialize());
// app.use(authrouter);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.post('/gql', proxy(config.api.serverUrl));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    const apolloClient = createApolloClient(req);

    getDataFromTree(App).then(() => {
      const stringApp = ReactDOM.renderToString(
        <ApolloProvider client={apolloClient}>
          <App context={context} insertCss={insertCss}>
            {route.component}
          </App>
        </ApolloProvider>,
      );

      const initialState = apolloClient.extract();

      data.children = stringApp;
      data.styles = [{ id: 'css', cssText: [...css].join('') }];

      const scripts = new Set();
      const addChunk = chunk => {
        if (chunks[chunk]) {
          chunks[chunk].forEach(asset => scripts.add(asset));
        } else if (__DEV__) {
          throw new Error(`Chunk with name '${chunk}' cannot be found`);
        }
      };
      addChunk('client');
      if (route.chunk) addChunk(route.chunk);
      if (route.chunks) route.chunks.forEach(addChunk);

      data.scripts = Array.from(scripts);
      data.app = {
        apiUrl: config.api.clientUrl,
      };

      const html = ReactDOM.renderToStaticMarkup(
        <Html {...data} state={initialState} />,
      );
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    });
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  if (process.env.NODE_ENV === 'production') {
    const https = require('https');
    const http = require('http');
    const fs = require('fs');

    const sslOpts = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };

    // https://gaboesquivel.com/blog/2014/nodejs-https-and-ssl-certificate-for-development/
    https.createServer(sslOpts, app).listen(443, () => {
      // eslint-disable-next-line no-console
      console.log(`App running in production on https.`);
    });

    // for redirecting http to https
    const httpApp = express();

    // eslint-disable-next-line consistent-return
    httpApp.use((req, res, next) => {
      if (!req.secure) {
        // FYI this should work for local development as well
        return res.redirect(302, `https://${req.get('host')}`);
      }
      next();
    });

    http.createServer(httpApp).listen(80);
  } else {
    app.listen(config.port, () => {
      console.info(`The server is running at ${config.appURL}:${config.port}`);
    });
  }
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
