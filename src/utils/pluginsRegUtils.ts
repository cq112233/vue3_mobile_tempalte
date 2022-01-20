
/**
@params app app实例
@params arr 数组<any>
@return void undefined
*/

import { App } from 'vue'

const pluginsRegFn = (app: App<Element>, arr: any[]) => {
  arr.forEach((element: any) => {
    app.use(element)
  })
}

export {
  pluginsRegFn
}
