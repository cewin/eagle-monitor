
export default {
    init: (cb) => {
        cb()
        let performance = window.performance;
        console.log(performance.timing);
        debugger;
    }
}