import{_ as a,c as i,a2 as e,o as n}from"./chunks/framework.BODqLb-n.js";const c=JSON.parse('{"title":"Maven","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/maven.md","filePath":"guide/maven.md"}'),t={name:"guide/maven.md"};function h(p,s,l,k,d,r){return n(),i("div",null,s[0]||(s[0]=[e(`<h1 id="maven" tabindex="-1">Maven <a class="header-anchor" href="#maven" aria-label="Permalink to &quot;Maven&quot;">​</a></h1><h3 id="推送仓库" tabindex="-1">推送仓库 <a class="header-anchor" href="#推送仓库" aria-label="Permalink to &quot;推送仓库&quot;">​</a></h3><p><code><em>mvn deploy</em></code></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deploy:deploy-file</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DgroupId=com.xxx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DartifactId=xxx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Dversion=0.0.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Dpackaging=jar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-Dfile</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">D:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xx.jar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -Durl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http://xxx/repository/maven-snapshots/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -DrepositoryId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nexus-snapshots</span></span></code></pre></div><h3 id="导出使用的第三方jar" tabindex="-1">导出使用的第三方jar <a class="header-anchor" href="#导出使用的第三方jar" aria-label="Permalink to &quot;导出使用的第三方jar&quot;">​</a></h3><p><code><em>mvn dependency:copy-dependencies</em></code></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dependency:copy-dependencies</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DoutputDirectory=E:\\xxx\\lib</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -DincludeScope=runtime</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Dload.path=/lib</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx.jar</span></span></code></pre></div>`,7)]))}const F=a(t,[["render",h]]);export{c as __pageData,F as default};