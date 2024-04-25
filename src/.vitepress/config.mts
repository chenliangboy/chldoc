import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/chldoc/',
  title: "Chl-Doc",
  description: "A doc web!",
  themeConfig: {
    logo:'/mario.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Guide', link: '/markdown-examples' },
      { text: 'API', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Guide', link: '/markdown-examples' },
          { text: 'API', link: '/api-examples' },
          { text: 'Nginx', link: '/nginx' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SepterChen/' }
    ],
    search:{provider:'local'}
  }
})
