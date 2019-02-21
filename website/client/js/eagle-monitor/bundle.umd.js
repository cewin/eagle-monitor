(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    var perf = {
        init: (cb) => {
            cb();
            let performance = window.performance;
            console.log(performance.timing);
            debugger;
        }
    };

    perf.init(()=>{
        console.log('perf init');
    });

}));
//# sourceMappingURL=bundle.umd.js.map
