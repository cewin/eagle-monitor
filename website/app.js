let Koa = require('koa');
let serve = require('koa-static');
const API = require('./middleware/api.js');

const app = new Koa();
const port = 3003;

app.use(API);
// app.use((c)=>{
//     c.body = 123
// });

app.use(serve(__dirname + '/client'));

app.listen(port, ()=>{
    console.log(`${port} is listen`);
})
