const HtmlWebpackPlugin = require("html-webpack-plugin");
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const paths = {
  src: path.resolve(__dirname, './src'), // Source directory.
  dist: path.resolve(__dirname, './dist'), // Destination build directory.
  public: path.resolve(__dirname, './public'), // Public directory
};

export const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.public,
      to: paths.dist,
      globOptions: {
        dot: true,
        ignore: ['**/.DS_Store', '**/.gitkeep', '**/index.html'],
      },
    },
  ],
});

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'App',
        template: 'src/custom.html',
        filename: './index.html',
        output: path.resolve(__dirname, 'dist'),
      })
   ],

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
  stats: {
    errorDetails: true,
    children: true
  },
};