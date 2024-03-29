/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// Babel configuration
// https://babeljs.io/docs/usage/api/
//const LoadablePlugin = require('@loadable/webpack-plugin').default;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ["@loadable/babel-plugin", {
      "opts": {
        "filename": "loadable-stats.json",
        "outputAsset": true
      },
    }]
  ],
  ignore: ['node_modules', 'build'],
};
