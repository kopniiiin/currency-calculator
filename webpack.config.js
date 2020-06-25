const path = require(`path`);
const sass = require(`sass`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
  entry: `./src/index.jsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: `Google Chrome`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [
              [`@babel/preset-env`, {targets: {node: `current`}}],
              `@babel/preset-react`
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: `css-loader`},
          {loader: `postcss-loader`},
          {loader: `sass-loader`, options: {implementation: sass}}
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({filename: `bundle.css`})],
  devtool: `source-map`,
  mode: `development`
}
