const publicPath = '/' + (process.env.APP_PATH ? `${process.env.APP_PATH}/` : '')
module.exports = {
  publicPath,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.(j|t)s$/,
          use: { loader: 'worker-loader', options: { publicPath } }
        }
      ]
    }
  }
}
