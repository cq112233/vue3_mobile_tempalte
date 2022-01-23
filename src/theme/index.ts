
// import appConfig from '../../app.config.js'
import store from '@/store'
if ((store.state as any).app.theme === 'mating1') {
  // eslint-disable-next-line no-unused-expressions
  import('./mating1/vant/index.less')
} else if ((store.state as any).app.theme === 'mating2') {
  console.log(2)
  // eslint-disable-next-line no-unused-expressions
  import('./mating2/vant/index.less')
}
