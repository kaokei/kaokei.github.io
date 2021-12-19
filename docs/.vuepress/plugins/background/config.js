const { config } = require("vuepress-theme-hope");

const pluginDynamicBg = require("./plugin-dynamic-bg");

module.exports = config({
  plugins: [pluginDynamicBg],
  dest: "./dist",

  title: "kaokei's blog",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" }
    ],
    [
      "script",
      {
        src:
          "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
      }
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" }
    ]
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "kaokei的博客",
      description: "开源项目文档，经验笔记，项目demo，游戏"
    },
    "/en/": {
      lang: "en-US",
      title: "kaokei's blog",
      description: "project document, note, demo, game"
    }
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://www.kaokei.com",

    author: "kaokei",
    repo: "https://github.com/kaokei/kaokei.github.io",

    nav: [
      {
        text: "开源项目",
        icon: "creative",
        prefix: "/project/",
        items: [
          {
            text: "di",
            link: "di/",
            icon: "markdown"
          },
          {
            text: "use-vue-service",
            link: "use-vue-service/",
            icon: "markdown"
          },
          {
            text: "use-react-service",
            link: "use-react-service/",
            icon: "creative"
          }
        ]
      },
      {
        text: "随笔",
        icon: "creative",
        prefix: "/note/",
        items: [
          {
            text: "git",
            link: "git/",
            icon: "markdown"
          },
          {
            text: "linux",
            link: "linux/",
            icon: "creative"
          },
          {
            text: "guide",
            link: "guide/",
            icon: "creative"
          }
        ]
      }
      // { text: "博客主页", link: "/", icon: "home" },
      // { text: "项目主页", link: "/home/", icon: "home" },
      // {
      //   text: "如何使用",
      //   icon: "creative",
      //   link: "/guide/"
      // }
      // {
      //   text: "主题文档",
      //   icon: "note",
      //   link: "https://vuepress-theme-hope.github.io/"
      // }
    ],

    sidebar: {
      "/project/di/": [
        "",
        {
          title: "使用指南",
          icon: "creative",
          prefix: "guide/",
          children: ["", "base", "advance", "component"]
        },
        {
          title: "API 文档",
          icon: "creative",
          prefix: "api/",
          children: [""]
        },
        {
          title: "参考文章",
          icon: "creative",
          prefix: "articles/",
          children: [
            "",
            "best-practices",
            "framework-comparison",
            "frontend-stage",
            "frame-analysis",
            "communication-between-components",
            "component-and-service",
            "dependency-injection",
            "reactive-analysis"
          ]
        }
      ],
      "/project/use-vue-service/": [
        "",
        {
          title: "使用指南",
          icon: "creative",
          prefix: "guide/",
          children: ["", "base", "advance", "component"]
        },
        {
          title: "API 文档",
          icon: "creative",
          prefix: "api/",
          children: [""]
        },
        {
          title: "参考文章",
          icon: "creative",
          prefix: "articles/",
          children: [
            "",
            "best-practices",
            "framework-comparison",
            "frontend-stage",
            "frame-analysis",
            "communication-between-components",
            "component-and-service",
            "dependency-injection",
            "reactive-analysis"
          ]
        }
      ],
      "/project/use-react-service/": [
        "",
        "note1",
        "note2",
        {
          title: "使用指南",
          icon: "creative",
          prefix: "guide/",
          children: ["", "note1", "note2", "base", "advance", "component"]
        },
        {
          title: "API 文档",
          icon: "creative",
          prefix: "api/",
          children: [""]
        },
        {
          title: "参考文章",
          icon: "creative",
          prefix: "articles/",
          children: [
            "",
            "note1",
            "note2",
            "best-practices",
            "framework-comparison",
            "frontend-stage",
            "frame-analysis",
            "communication-between-components",
            "component-and-service",
            "dependency-injection",
            "reactive-analysis"
          ]
        }
      ],
      "/note/git/": [
        "",
        "note1",
        "note2",
        {
          title: "如何使用",
          icon: "creative",
          prefix: "guide/",
          children: ["", "note1", "note2"]
        }
      ],
      "/note/linux/": [
        "",
        "note1",
        "note2",
        {
          title: "如何使用",
          icon: "creative",
          prefix: "guide/",
          children: ["", "note1", "note2"]
        }
      ],
      "/note/guide/": [
        "",
        "note1",
        "note2",
        {
          title: "如何使用",
          icon: "creative",
          prefix: "guide/",
          children: ["", "note1", "note2"]
        }
      ],
      "/": [
        "",
        "home",
        "slides",
        "layout",
        {
          title: "如何使用",
          icon: "creative",
          prefix: "guide/",
          children: ["", "page", "markdown", "disable", "encrypt"]
        }
      ]
    },

    locales: {
      "/en/": {
        nav: [
          // { text: "Blog Home", link: "/en/", icon: "home" },
          // { text: "Project Home", link: "/en/home/", icon: "home" },
          // {
          //   text: "Guide",
          //   icon: "creative",
          //   link: "/en/guide/"
          // },
          // {
          //   text: "Docs",
          //   link: "https://vuepress-theme-hope.github.io/en/",
          //   icon: "note"
          // },
          {
            text: "open source project",
            icon: "creative",
            prefix: "/en/project/",
            items: [
              {
                text: "use-vue-service",
                link: "use-vue-service/",
                icon: "markdown"
              },
              {
                text: "use-react-service",
                link: "use-react-service/",
                icon: "creative"
              }
            ]
          }
        ],
        sidebar: {
          "/en/project/use-vue-service/": [
            "",
            {
              title: "使用指南",
              icon: "creative",
              prefix: "guide/",
              children: ["", "base", "advance", "component"]
            },
            {
              title: "API 文档",
              icon: "creative",
              prefix: "api/",
              children: [""]
            },
            {
              title: "参考文章",
              icon: "creative",
              prefix: "articles/",
              children: [
                "",
                "best-practices",
                "framework-comparison",
                "frontend-stage",
                "frame-analysis",
                "communication-between-components",
                "component-and-service",
                "dependency-injection",
                "reactive-analysis"
              ]
            }
          ],
          "/en/project/use-react-service/": [
            "",
            "note1",
            "note2",
            {
              title: "使用指南",
              icon: "creative",
              prefix: "guide/",
              children: ["", "note1", "note2", "base", "advance", "component"]
            },
            {
              title: "API 文档",
              icon: "creative",
              prefix: "api/",
              children: [""]
            },
            {
              title: "参考文章",
              icon: "creative",
              prefix: "articles/",
              children: [
                "",
                "note1",
                "note2",
                "best-practices",
                "framework-comparison",
                "frontend-stage",
                "frame-analysis",
                "communication-between-components",
                "component-and-service",
                "dependency-injection",
                "reactive-analysis"
              ]
            }
          ],
          "/en/": [
            "",
            "home",
            "slides",
            "layout",
            {
              title: "Guide",
              icon: "creative",
              prefix: "guide/",
              children: ["", "page", "markdown", "disable", "encrypt"]
            }
          ]
        }
      }
    },

    blog: {
      intro: "/intro/",
      sidebarDisplay: "mobile",
      links: {
        Zhihu: "https://zhihu.com",
        Baidu: "https://baidu.com",
        Github: "https://github.com"
      }
    },

    footer: {
      display: true,
      content: "默认页脚"
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app"
    },

    copyright: {
      status: "global"
    },

    git: {
      timezone: "Asia/Shanghai"
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard"
        ]
      }
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black"
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff"
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png"
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png"
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png"
          }
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png"
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png"
              }
            ]
          }
        ]
      }
    }
  }
});
