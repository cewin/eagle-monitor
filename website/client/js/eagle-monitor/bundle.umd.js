(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    var perf = {
        init: (cb) => {
            cb();
            let isDOMReady = false;
            let Util = {
                getPerfData: (p) =>{
                    let data = {
                        // 网络建连
                        prevPage: p.fetchStart - p.navigationStart, // 上一个页面的时间
                        redirect: p.redirectEnd - p.redirectStart, // 重定向时间
                        dns: p.domainLookupEnd - p.domainLookupStart, // DNS查找时间
                        connect: p.connectEnd - p.connectStart, // TCP建连时间
                        network: p.connectEnd - p.navigationStart, // 网络总耗时

                        // 网络接受
                        send: p.responseStart - p.requestStart, // 前端从发送到接收的时间
                        receive: p.responseEnd - p.responseStart, // 接收数据用时
                        request: p.responseEnd - p.requestStart, // 请求页面的总耗时

                        // 前端渲染
                        dom: p.domComplete - p.domLoading, // dom解析时间
                        loadEvent: p.loadEventEnd - p.loadEventStart, // loadEvent时间
                        frontend: p.loadEventEnd - p.domLoading, // 前端总时间

                        // 关键阶段
                        load: p.loadEventEnd - p.navigationStart, // 页面完全加载的时间
                        domReady: p.domContentLoadedEventStart - p.navigationStart, // DOM准备时间
                        interactive: p.domInteractive - p.navigationStart, // 可操作时间
                        ttfb: p.responseStart - p.navigationStart, // 首字节时间
                    };
                    return data
                },
                // DOM解析完成
                domReady: (callback) => {
                    if (isDOMReady === true) { return void 0;}
                    let timer = null;
                    let runCheck = ()=>{
                        if(performance.timing.domComplete){
                            // 1.停止循环检测  2.运行callback
                            clearTimeout(timer);
                            callback();
                            isDOMReady = true;
                        } else {
                            // 再去循环检测
                            timer = setTimeout(runCheck, 100);
                        }
                    };
                    if(document.readyState === 'interactive'){
                        callback();
                        return void 0;
                    }
                    document.addEventListener('DOMContentLoaded', ()=>{
                        // 开始循环检测， 是否DOMContentLoaded已经完成。
                        runCheck();
                    });
                },
                // 页面加载完成
                onload: ()=>{

                }
            };

            let performance = window.performance;
            Util.domReady(()=>{
                let perfData = Util.getPerfData(performance.timing);
                // 获取到数据应该给sdk上层 去上传这个数据
                console.log(perfData);
                debugger
            });

        }
    };

    perf.init(()=>{
        console.log('perf init');
    });

}));
//# sourceMappingURL=bundle.umd.js.map
