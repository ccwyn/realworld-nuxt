// 不需要重新创建实例 nuxt 会加载并注册
// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突 务必要把state 定义成一个函数 返回数据对象
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null, // 当前用户登录状态
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxt 特殊的方法 会在服务端渲染期间自动调用
  // 作业：初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}