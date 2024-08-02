
// eslint-disable-next-line import/no-commonjs
const path = require('path');

const config = {
  projectName: 'myApp',
  date: '2024-07-04',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    webpackChain(chain) {
      chain.merge({
        cache: {
          type: 'filesystem',
          buildDependencies: {
            config: [path.join(__dirname, 'index.js')],
          },
          name: `${process.env.NODE_ENV}-${process.env.TARO_ENV}`,
        },
      });
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    webpackChain(chain) {
      chain.merge({
        cache: {
          type: 'filesystem',
          buildDependencies: {
            config: [path.join(__dirname, 'index.js')],
          },
          name: `${process.env.NODE_ENV}-${process.env.TARO_ENV}`,
        },
      });
    },
  },
};

module.exports = config;
