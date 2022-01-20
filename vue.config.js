// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./app.config.js')
console.log(appConfig.theme)
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('postcss-px2rem-exclude')({
            remUnit: 75, // 根据设计图
            // 375的图就给37.5，也就是1rem=37.5px
            // 如果不想px装rem  可以使用 "PX"或者"Px"
            exclude: /node_modules|init.css/i
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
  // 全局引入 less 变量配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, `./src/theme/${appConfig.theme}/variables.less`)]
    }
  },
  devServer: {
  // hot: true,
    proxy: {
      '/api': {
      // 这里最好有一个 /
        target: 'http://localhost:8080/', // 服务器端接口地址
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
