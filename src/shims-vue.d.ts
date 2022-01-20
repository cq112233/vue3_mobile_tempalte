/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module '*.less' {
  import type { } from 'less'
  const component: DefineComponent<{}, {}, any>
  export default component
}
