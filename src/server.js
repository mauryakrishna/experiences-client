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
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
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
import passport from './auth/passport';
import authrouter from './auth/routes';
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

// security headers
app.use((req, res, next) => {
  const randomNonce = randomString(5)
  // https://blog.vnaik.com/posts/web-attacks.html
  // https://securityheaders.com/
  res.append("Content-Security-Policy", "style-src 'self' 'unsafe-inline';");
  res.append("Access-Control-Allow-Origin", "self")
  res.append("X-Frame-Options", "SAMEORIGIN");
  res.append("X-Content-Type-Options", "nosniff");
  res.append("Referrer-Policy", "same-origin");
  res.append("Cache-Control", "public, max-age=31536000");
  next();
});

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var randomString = function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/***************Loadable components setup starts ************************/

const statsFile = path.resolve('./build/loadable-stats.json');
// extractor is used in renderToString below
const extractor = new ChunkExtractor({ statsFile });

/***************Loadable components setup ends ************************/

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

app.get('/processWordJSON', proxy(`localhost:8090`))
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
        <ChunkExtractorManager extractor={extractor}>
          <ApolloProvider client={apolloClient}>
            <App context={context} insertCss={insertCss}>
              {route.component}
            </App>
          </ApolloProvider>
        </ChunkExtractorManager>
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
  app.listen(config.port, () => {
    console.info(`The server is running at ${config.appURL}:${config.port}`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
