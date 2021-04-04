/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

/* eslint-disable react/no-danger */

export default function Html({
  title,
  description,
  styles,
  scripts,
  app,
  state,
  children,
}) {
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="google-site-verification" content="UZYrsB1BXHH_HQD8QpPlyJJZZYUCVPIOrkO4XLXhqII" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index/follow"/>
        {scripts.map(script => (
          <link key={script} rel="preload" href={script} as="script" />
        ))}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {styles.map(style => (
          <style
            key={style.id}
            id={style.id}
            dangerouslySetInnerHTML={{ __html: style.cssText }}
          />
        ))}
        {/* the below script added to resolve the issue of global not defined from the local-storage npmjs in client.js*/}
        <script>
          global = window.globalThis
        </script>
        <script async defer data-domain="experiences.guru" src="https://experiences.guru/js/plausible.js"></script>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${serialize(state)}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.App=${serialize(app)}`,
          }}
        />
        {scripts.map(script => (
          <script key={script} src={script} />
        ))}
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired,
  ),
  scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
  app: PropTypes.object, // eslint-disable-line
  state: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
};

Html.defaultProps = {
  styles: [],
  scripts: [],
};
