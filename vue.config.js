// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./app.config.js')
const themeVar = path.resolve(__dirname, `./src/theme/${appConfig.theme}/variables.less`)

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
    // 需要引入的公共文件
      patterns: [
        path.resolve(__dirname, `${themeVar}`)
      ]
    })
}

module.exports = {
  lintOnSave: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('postcss-px2rem-exclude')({
            remUnit: 75, // 根据设计图
            // 375的图就给37.5，也就是1rem=37.5px
            // 如果不想px装rem  可以使用 "PX"或者"Px"
            exclude: /node_modules|init.css|theme/i
          })
        ]
      }
      // less: {
      //   // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
      //   // lessOptions: {
      //   modifyVars: {
      //     // 直接覆盖变量
      //     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      //     hack: `true; @import "${path.join(
      //       __dirname,
      //       `./src/theme/${appConfig.theme}/vant/index.less`
      //     )}";`
      //   }
      // }
    }
  },
  devServer: {
  // hot: true,
    proxy: {
      '/api': {
      // 这里最好有一个 /
        target: 'http://localhost:8011/', // 服务器端接口地址
        ws: true, // 如果要代理 websockets，配置这个参数
        // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/gateway': {
        target: 'http://newapi.zhihuishitang.net',
        changeOrigin: true
      },
      '/report': {
      // target: 'http://192.168.1.181:8302',
        target: 'https://test-api-report.zhihuishitang.net',
        changeOrigin: true
      },
      '/attendance': {
        target: 'http://192.168.1.235:8500',
        changeOrigin: true
      }
    },
    // 静态资源目录
    contentBase: './public',
    // gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 热更新，不需要刷新浏览器 大大提高开发速度    hot 跟 hotOnly  hotOnly 热替换失败不会自动刷新便于找到问题
    hotOnly: true,
    // 开启
    open: false
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          '~': path.resolve(__dirname)
        },
        extensions: ['.ts', '.tsx', '.js', '.json', '.vue', '.css', '.less'],
        modules: [
          'node_modules',
          path.resolve(__dirname, 'src/components/common'),
          path.resolve(__dirname, 'src/components/project')
        ]
      }
    }
  }
}
