export default [
  // 默认
  {
    path: '/',
    redirect: '/e-charts/bar-line'
  },
  // 错误
  {
    path: '*',
    name: 'error',
    component: loadView('Error')
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/common/${path || ''}`);
}
