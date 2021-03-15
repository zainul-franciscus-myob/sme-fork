const TreatPlugin = require('treat/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = function (config) {

  config.plugins = [
    new TreatPlugin({
      outputLoaders: [MiniCssExtractPlugin.loader],
      hmr: process.env.NODE_ENV === 'development',
      localIdentName: '_[name]-[local]_[hash:base64:5]',
      themeIdentName: '__[name]-[local]_[hash:base64:4]',
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
      test: /\.(js|jsx)$/,
      exclude: [
        {
          test: path.resolve(__dirname, 'node_modules'),
          // Exclude the following from the exclusion
          exclude: path.resolve(__dirname, 'node_modules/@myob'),
        },
      ],
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/react',
        ],
        plugins: [
          [
            '@babel/plugin-proposal-class-properties',
            {
              loose: true,
            },
          ],
        ],
      },
    },
  ];

  return config;
};
