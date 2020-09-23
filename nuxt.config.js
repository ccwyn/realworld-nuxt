/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // base: "/abc",
    linkActiveClass: "active",
    extendRoutes(routes, resolve) {
      routes.splice(0); // 删除默认生成的路由表
      routes.push(
        ...[
          {
            path: "/",
            name: "layout",
            component: resolve(__dirname, "pages/layout/"),
            children: [
              {
                path: "",
                name: "home",
                component: resolve(__dirname, "pages/home/"),
              },
              {
                path: "/login",
                name: "login",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/register",
                name: "register",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/profile/:username/",
                name: "profile",
                component: resolve(__dirname, "pages/profile/"),
              },
              {
                path: "/settings",
                name: "settings",
                component: resolve(__dirname, "pages/settings/"),
              },
              {
                path: "/editor",
                name: "editor",
                component: resolve(__dirname, "pages/editor/"),
              },
              {
                path: "/article/:slug/",
                name: "article",
                component: resolve(__dirname, "pages/article/"),
              },
            ],
          },
        ]
      );
    },
  },
  plugins:[
    '~/plugins/request.js'
  ]
};
