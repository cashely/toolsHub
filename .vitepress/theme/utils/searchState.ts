import { reactive } from 'vue'

/** 跨组件控制全局搜索弹窗 */
export const searchState = reactive({
  open: false,
})

export function openSearch() {
  searchState.open = true
}

export function closeSearch() {
  searchState.open = false
}
