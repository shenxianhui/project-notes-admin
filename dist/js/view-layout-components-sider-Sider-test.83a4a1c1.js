(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-layout-components-sider-Sider-test","view-layout-components-sider-sider-menu-SiderMenu"],{2532:function(t,e,n){"use strict";var a=n("23e7"),r=n("e330"),u=n("5a34"),c=n("1d80"),o=n("577e"),i=n("ab13"),s=r("".indexOf);a({target:"String",proto:!0,forced:!i("includes")},{includes:function(t){return!!~s(o(c(this)),o(u(t)),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,n){var a=n("861d"),r=n("c6b6"),u=n("b622"),c=u("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==r(t))}},"523c":function(t,e,n){"use strict";n("7ebb")},"5a34":function(t,e,n){var a=n("44e7"),r=TypeError;t.exports=function(t){if(a(t))throw r("The method doesn't accept regular expressions");return t}},"7ebb":function(t,e,n){},9071:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"sider"},[e("el-menu",{attrs:{"default-active":t.$route.path,"unique-opened":"","text-color":"#000","active-text-color":"#1890ff"}},[e("xx-sider-menu",{attrs:{"menu-data":t.currentRoute}})],1)],1)},r=[],u=(n("d3b7"),n("159b"),n("caad"),n("2532"),n("6bae")),c=n("a216"),o={name:"menu",components:{XxSiderMenu:c["default"]},props:{},data:function(){return{}},computed:{currentRoute:function(){var t=this,e=[];return u["default"].forEach((function(n){t.$route.path.includes(n.path)&&(e=n)})),e}},watch:{},created:function(){},mounted:function(){},beforeDestroy:function(){},methods:{}},i=o,s=(n("523c"),n("2877")),d=Object(s["a"])(i,a,r,!1,null,"7daa4f2c",null);e["default"]=d.exports},a216:function(t,e,n){"use strict";n.r(e);n("99af");var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"xx-menu"},t._l(t.menuData.children,(function(n,a){return e("div",{key:a,staticClass:"menu-wrap"},[n.children?e("div",{staticClass:"menu-item"},[e("el-submenu",{attrs:{index:"".concat(t.menuData.path,"/").concat(n.path)}},[e("template",{slot:"title"},[e("span",[t._v(t._s(n.meta.label))])]),e("sider-menu",{attrs:{"menu-data":n}})],2)],1):e("div",{staticClass:"menu-item"},[e("el-menu-item",{attrs:{index:"".concat(t.menuData.path,"/").concat(n.path)},on:{click:function(e){return t.handleMenu(n)}}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(n.meta.label))])])],1)])})),0)},r=[],u={name:"sider-menu",components:{},props:{menuData:Object},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},beforeDestroy:function(){},methods:{handleMenu:function(t){console.log(t)}}},c=u,o=n("2877"),i=Object(o["a"])(c,a,r,!1,null,"69350cae",null);e["default"]=i.exports},ab13:function(t,e,n){var a=n("b622"),r=a("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,"/./"[t](e)}catch(a){}}return!1}},caad:function(t,e,n){"use strict";var a=n("23e7"),r=n("4d64").includes,u=n("d039"),c=n("44d2"),o=u((function(){return!Array(1).includes()}));a({target:"Array",proto:!0,forced:o},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),c("includes")}}]);