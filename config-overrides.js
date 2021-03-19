const TreatPlugin = require('treat/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = function (config) {

  config.optimization.minimizer= [new TerserPlugin()];

  config.plugins = [
    new TreatPlugin({
      outputLoaders: [MiniCssExtractPlugin.loader],
    }),
    new MiniCssExtractPlugin(),
  ].concat(config.plugins);

  config.module.rules = [
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    // extract css from feelix's treat files
    {
      test: /\.css$/i,
      exclude: /src/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    // this is used to load [xxx].module.css
    {
      test: /\.css$/i,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
    {
      oneOf: [
        {
          test: /\.*(?<!treat).(js|jsx)$/,
          include: /src/,
          loader: path.resolve(
            __dirname,
            'node_modules/babel-loader/lib/index.js'
          ),
          options: {
            customize: path.resolve(
              __dirname,
              'node_modules/babel-preset-react-app/webpack-overrides.js'
            ),
            babelrc: false,
            configFile: false,
            presets: [
              path.resolve(
                __dirname,
                'node_modules/babel-preset-react-app/index.js'
              ),
            ],
            cacheIdentifier:
              'production:babel-plugin-named-asset-import@0.3.6:babel-preset-react-app@9.1.2:react-dev-utils@10.2.1:react-scripts@3.4.3',
            plugins: [
              [
                path.resolve(
                  __dirname,
                  'node_modules/babel-plugin-named-asset-import/index.js'
                ),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent:
                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
            ],
            cacheDirectory: true,
            cacheCompression: false,
            compact: true,
          },
        },
        {
          test: /\.*(?<!treat).(js|jsx)$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/@myob/myob-widgets'),
          ],
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            compact: false,
            presets: [
              [
                path.resolve(
                  __dirname,
                  'node_modules/babel-preset-react-app/dependencies.js'
                ),
                {
                  helpers: true,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
            cacheDirectory: true,
            cacheCompression: false,
            cacheIdentifier:
              'production:babel-plugin-named-asset-import@0.3.6:babel-preset-react-app@9.1.2:react-dev-utils@10.2.1:react-scripts@3.4.3',
            sourceMaps: true,
            inputSourceMap: true,
          },
        },
      ],
    },
  ];
  return config;
};
