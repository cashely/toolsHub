import DefaultTheme from 'vitepress/theme'
import { defineComponent, h } from 'vue'
import { useData } from 'vitepress'
import './styles/tokens.css'
import './styles/base.css'

import SinglePageLayout from './layouts/SinglePageLayout.vue'
import ToolLayout from './layouts/ToolLayout.vue'
import CategoryLayout from './layouts/CategoryLayout.vue'
import CollectionLayout from './layouts/CollectionLayout.vue'
import DirectoryLayout from './layouts/DirectoryLayout.vue'
import CategoriesIndexLayout from './layouts/CategoriesIndexLayout.vue'
import CollectionsIndexLayout from './layouts/CollectionsIndexLayout.vue'
import AgentHubLayout from './layouts/AgentHubLayout.vue'
import AgentItemLayout from './layouts/AgentItemLayout.vue'
import PageLayout from './layouts/PageLayout.vue'
import ResourceGroupLayout from './layouts/ResourceGroupLayout.vue'

const layouts: Record<string, any> = {
  'single-page': SinglePageLayout,
  tool: ToolLayout,
  category: CategoryLayout,
  collection: CollectionLayout,
  directory: DirectoryLayout,
  'categories-index': CategoriesIndexLayout,
  'collections-index': CollectionsIndexLayout,
  'agent-hub': AgentHubLayout,
  'agent-item': AgentItemLayout,
  page: PageLayout,
  'resource-groups': ResourceGroupLayout,
}

/**
 * 根 Layout：根据 Markdown frontmatter 的 layout 字段切换页面结构。
 * 正文由各布局内的 <Content /> 渲染（VitePress 不向 Layout 传 slot）。
 * 默认回退 VitePress 文档布局。
 */
const Layout = defineComponent({
  name: 'ThemeLayout',
  setup() {
    const { frontmatter } = useData()
    return () => {
      const name = (frontmatter.value.layout as string) ?? 'doc'
      const comp = layouts[name]
      return comp ? h(comp) : h(DefaultTheme.Layout)
    }
  },
})

export default {
  Layout,
  enhanceApp({ app }: { app: import('vue').App }) {
    // 全局自定义在此注册
  },
}
