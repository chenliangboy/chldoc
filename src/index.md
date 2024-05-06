---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Docs
  text: ⚡️🖖⚡️
  tagline: 工作学习记录！！！
  actions:
    - theme: alt
      text: 指南
      link: /guide/
    - theme: brand
      text: API
      link: /api/
  image:
    src: /basketball.svg
    alt: VitePress
features:
  - icon: ⚡️
    title: Spring Boot
    details: Makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
  - icon: 🖖
    title: Electron
    details: Build cross-platform desktop apps with JavaScript, HTML, and CSS.
  - icon: 🛠️
    title: Node JS
    details: Run JavaScript Everywhere.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>