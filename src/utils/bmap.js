// 引入 cdn
// https://segmentfault.com/q/1010000012874963
export function MP() {  
    return new Promise(function (resolve, reject) {  
        window.onload = function () {  
            resolve(BMap)  
        }  
        let script = document.createElement('script');  
        script.type = 'text/javascript';  
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=ak&callback=init';  
        script.onerror = reject;  
        document.head.appendChild(script);  
    })  
}  