export default [
  {
    // 默认
    path: '/',
    redirect: '/echarts/chart'
  },
  {
    // 错误
    path: '*',
    name: 'error',
    component: loadView('views/common/Error')
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/${path || ''}`);
}
