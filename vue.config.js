module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  // devServer: {
  //     proxy: {//解决跨域问题
  //         '/api': {
  //             target: 'http://localhost:8888',
  //             // target: 'http://m.kugou.com/',
  //             // target: 'http://mobilecdnbj.kugou.com/v3',
  //             // 允许跨域
  //             changeOrigin: true,
  //             ws: true,
  //             pathRewrite: {
  //                 '^/api': ''
  //             }
  //         }
  //     }
  // },
  lintOnSave: false
}
