import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Tools Directory',
  description: '全品类数字工具导航平台，收录 AI、开发、设计、办公、营销等领域的优质工具。',
  cleanUrls: true,
  // 从每个文件最后一次 git 提交提取更新时间，供页面「文档更新时间」展示
  lastUpdated: true,
  sitemap: {
    hostname: 'https://tools-directory.example.com',
  },
  ignoreDeadLinks: true,
  srcExclude: ['README.md', 'writing-block.md'],
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['meta', { property: 'og:site_name', content: 'Tools Directory' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  themeConfig: {
    socialLink: {
      icon: 'github',
      link: 'https://github.com/example/tools-directory',
    },
  },
  transformHead({ pageData, siteData }) {
    const siteUrl = 'https://tools-directory.example.com'
    const route = pageData.relativePath
      .replace(/^index\.md$/, '')
      .replace(/\.md$/, '')
    const canonical = `${siteUrl}/${route}`
    const title = pageData.frontmatter.title ?? pageData.title
      ? `${pageData.title} | ${siteData.title}`
      : siteData.title
    const description = pageData.frontmatter.description ?? siteData.description

    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },
})
