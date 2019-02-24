(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var xhrHook = {
    init: (cb) => {
      let xhr = window.XMLHttpRequest;
      if (xhr._eagle_monitor_flag === true) {
        return void 0;
      }
      xhr._eagle_monitor_flag === true;
      let _originOpen = xhr.prototype.open;
      xhr.prototype.open = function (method, url, async, user, password) {
        this._eagle_xhr_info = {
          url,method,status: null
        };
        return _originOpen.apply(this, arguments);
      };

      let _originSend = xhr.prototype.send;

      xhr.prototype.send = function (value) {
        let _self= this;
        this._eagle_start_time = Date.now();
        let ajaxEnd = (eventType)=> ()=>{
          if(_self.response){
            let responseSize = null;
            switch (_self.responseType) {
              case 'json':
                // JSON兼容性问题
                responseSize = JSON.stringify(_self.response).length;
                break;
              case 'arraybuffer':
                responseSize = _self.response.byteLength;
              default:
                responseSize = _self.responseText.length;
            }
            _self._eagle_xhr_info.event = eventType;
            _self._eagle_xhr_info.status = _self.status;
            _self._eagle_xhr_info.success = _self.status === 200;
            _self._eagle_xhr_info.duration = Date.now() - _self._eagle_start_time;
            _self._eagle_xhr_info.responseSize
             = responseSize;
             _self._eagle_xhr_info.requestSize = value? value.length : 0; // value 一定有 length
            _self._eagle_xhr_info.type = 'xhr';
            cb(_self._eagle_xhr_info);
          }
        };

        // 这三种状态都代表这请求已经结束了 需要统计一些信息 并报上去
        this.addEventListener('load', ajaxEnd('load'), false);
        this.addEventListener('error', ajaxEnd('error'), false);
        this.addEventListener('abort', ajaxEnd('abort'), false);

        return _originSend.apply(this, arguments);
      };
    }
  };

  // import perf from './perf.js'


  // perf.init((perform)=>{
  //     console.log('perf init', perform);
  // })

  // resource.init((resourceData) => {
  //     console.log('resource init', resourceData);
  // })

  xhrHook.init((xhrInfo) => {
      console.log('xhrInfo init', xhrInfo);
  });

}));
//# sourceMappingURL=bundle.umd.js.map
