const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SpawnPlugin = require('webpack-spawn-plugin');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.hmr.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new SpawnPlugin('node', ['dist/server'], { persistent: true })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
