import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/Index/index' },
    {
      path: '/user',
      component: '@/pages/User/index',
    },
    {
      path: '/login',
      component: '@/pages/User/Login',
    },
    {
      path: '/register',
      component: '@/pages/User/Register',
    },
  ],
  fastRefresh: {},
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: '百度贴吧',
    // locale: false,
    layout: 'topmenu',
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  proxy: {
    '/api': {
      target: 'http://192.168.101.10:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
