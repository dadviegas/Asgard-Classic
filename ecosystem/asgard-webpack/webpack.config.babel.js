const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootDir = process.cwd()

const resolvePath = (src) => path.resolve(rootDir, src)

const paths = {
  src: resolvePath('src'), // Source directory.
  dist: resolvePath('dist'), // Destination build directory.
  public: resolvePath('public'), // Public directory
}

const copyWebpackPlugin = new CopyWebpackPlugin({
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
})

const webpackConfig = {
  mode: 'production',
  entry: resolvePath('src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: require.resolve('ts-loader'),
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: resolvePath('dist'),
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'App',
        template: 'src/custom.html',
        filename: './index.html',
        output: resolvePath('dist'),
      })
   ],

  devServer: {
    static: resolvePath('dist'),
    compress: true,
    port: 4000,
  },
  stats: {
    errorDetails: true,
    children: true
  },
}

module.exports = {
  paths,
  webpackConfig,
}