/*
 * @Author: Wells
 * @Date: 2020-01-08 09:42:12
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-08 10:53:34
 * @Description: 模板
 */
export default [
  {
    path: 'template',
    name: 'template',
    component: { render: f => f('router-view') },
    redirect: 'template/table-page', // 默认
    children: [
      {
        // 表格页
        path: 'table-page',
        name: 'tablePage',
        component: loadView('tablePage/TablePage.vue')
      },
      {
        // 表格页-添加
        path: 'add-page',
        name: 'addPage',
        component: loadView('editPage/EditPage.vue')
      },
      {
        // 表格页-编辑
        path: 'edit-page/:id',
        name: 'editPage',
        component: loadView('editPage/EditPage.vue')
      },
      {
        // 表格页-详情
        path: 'details-page/:id',
        name: 'detailsPage',
        component: loadView('detailsPage/DetailsPage.vue')
      }
    ]
  }
];

function loadView(path) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/template/${path || ''}`);
}
