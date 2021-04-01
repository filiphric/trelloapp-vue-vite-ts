declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  import Vue, { DefineComponent } from 'vue';
  const svg: DefineComponent<{}, {}, any>
  export default svg
}