/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // base: "/abc",
    extendRoutes(routes, resolve) {
      routes.splice(0); // 删除默认生成的路由表
      routes.push(
        ...[
          {
            path: "/",
            name: "layout",
            component: resolve(__dirname, "pages/layout"),
            children: [
              {
                path: "",
                name: "home",
                component: resolve(__dirname, "pages/home"),
              },
            ],
          },
        ]
      );
    },
  },
};
