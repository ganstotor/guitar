const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
  }
};
module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './styles/main.css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          miniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/styles')]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  ...devServer(develop),
});