import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/chldoc/',
  title: "Docs",
  description: "A doc web!",
  themeConfig: {
    logo:'/mario.png',
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
            text: '部署',
            collapsed: false,
            items: [
              { text: 'nginx', link: 'nginx' }
            ]
          },
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
              { text: 'mysql', link: 'mysql' }
            ]
          }
        ]
      },
      'api':{
        base:'/api/',
        items:[
          {
            text: 'Java',
            collapsed: false,
            items: [
              { text: 'Spring', link: 'spring' }
            ]
          },
          {
            text: 'Nodejs',
            collapsed: false,
            items: [
              { text: 'js', link: 'js' }
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
      { icon: 'github', link: 'https://github.com/SepterChen/' }
    ],
    search:{provider:'local'}
  }
})
