import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/chldoc/',
  title: "Docs",
  description: "A doc web!",
  themeConfig: {
    logo:'/basketball.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Help', link: '/help/markdown-examples' }
    ],
    sidebar:{
      'guide':{
        base:'/guide/',
        items:[
          {
            text: 'SpringBoot',
            collapsed: false,
            items: [
              { text: 'Event', link: 'event' }
            ]
          },
          {
            text: 'NodeJs',
            collapsed: false,
            items: [
              { text: 'electron', link: 'electron' },
              { text: 'electron-builder', link: 'electron-builder' }
            ]
          },
          {
            text: 'Java',
            collapsed: false,
            items: [
              { text: 'mysql', link: 'mysql' },
              { text: 'netty', link: 'netty' }
            ]
          },
          {
            text: '封装',
            collapsed: false,
            items: [
              { text: 'maven', link: 'maven' }
            ]
          },
          {
            text: '部署',
            collapsed: false,
            items: [
              { text: 'nginx', link: 'nginx' },
              { text: 'linux', link: 'linux' }
            ]
          }
        ]
      },
      'api':{
        base:'/api/',
        items:[
          {
            text: 'Nodejs',
            collapsed: false,
            items: [
              { text: 'js', link: 'js' },
              { text: 'node', link: 'node' },
              { text: 'crypto', link: 'crypto' },
              { text: 'promise', link: 'promise' },
              { text: 'cmd', link: 'cmd' }
            ]
          },
          {
            text: 'Java',
            collapsed: false,
            items: [
              { text: 'Spring', link: 'spring' },
              { text: 'Java', link: 'java' }
            ]
          }
          
        ]
      },
      'help':{
        base:'/help/',
        items:[
          {
            text: '帮助文档',
            collapsed: false,
            items: [
              { text: 'markdown-examples', link: 'markdown-examples' },
              { text: 'api-examples', link: 'api-examples' }
            ]
          }
        ]
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chl603/' }
    ],
    search:{provider:'local'}
  }
})
