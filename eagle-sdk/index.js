// import perf from './perf.js'
// import resource from './resource.js'
// import xhrHook from './xhrHook.js'
import errorCatch from './errorCatch.js'


// perf.init((perform)=>{
//     console.log('perf init', perform);
// })

// resource.init((resourceData) => {
//     console.log('resource init', resourceData);
// })

// xhrHook.init((xhrInfo) => {
//     console.log('xhrInfo init', xhrInfo);
// })

errorCatch.init((errObj) => {
  console.log('errorCatch init', errObj);
})