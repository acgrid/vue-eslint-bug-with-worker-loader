module.exports = {
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.(j|t)s$/,
          use: { loader: 'worker-loader' }
        }
      ]
    }
  }
}
