const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用html
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
// 压缩js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 分离css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包前清空输出目录

module.export = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    port: '8899',
    host: 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                ["@babel/plugin-preset-env", {"legacy": true}]
              ]
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'scss-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(gif|jpg|png|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
      // title: "title" // html的tilte
      // minify: true // 是否要压缩
      // filename: "index" // 生成的html的名字
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CleanWebpackPlugin()
  ]
}
