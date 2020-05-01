export default [
  {
    path: '/main',
    component: { render: f => f('router-view') },
    children: [
      {
        path: 'home',
        name: 'home',
        component: loadView('Home')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path || ''}`);
}
