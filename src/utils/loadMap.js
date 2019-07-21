// 高德地图-异步加载
let GDMap = (key, plugins, v = '1.4.15') => { // key, 插件, 版本
    return new Promise((resolve, reject) => {
        if (typeof AMap !== 'undefined') {
            resolve(AMap);
            return true;
        }

        window.onLoad = () => {
            resolve(AMap);
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://webapi.amap.com/maps?v=${v}&key=${key}&plugin=${plugins}&callback=onLoad`;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export {
    GDMap
}
