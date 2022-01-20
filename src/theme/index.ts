
import appConfig from '../../app.config.js'

if (appConfig.theme === 'mating1') {
// eslint-disable-next-line no-unused-expressions
  import('./mating1/vant/index.less')
} else if (appConfig.theme === 'mating2') {
  // eslint-disable-next-line no-unused-expressions
  import('./mating2/vant/index.less')
}
