// 高德地图-异步加载
let GDMap = (key, plugins, v = '1.4.15') => {
  // key, 插件, 版本
  return new Promise((resolve, reject) => {
    /* eslint-disable */
        if (typeof AMap !== 'undefined') {
            resolve(AMap);
            return true;
        }

        window.init = () => {
            resolve(AMap);
        };
        /* eslint-enable */

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://webapi.amap.com/maps?v=${v}&key=${key}&plugin=${plugins}&callback=init`;
    script.onerror = reject;
    document.head.appendChild(script);

    let scriptUI = document.createElement('script');
    scriptUI.type = 'text/html';
    scriptUI.src = `https://webapi.amap.com/ui/1.0.11/main-async.js`;
    document.head.appendChild(scriptUI);
  });
};

export { GDMap };
