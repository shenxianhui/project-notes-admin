export default [
  {
    // 默认
    path: '/',
    redirect: '/login'
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
