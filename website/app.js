let Koa = require('koa');
let Serve = require('koa-static');

const app = new Koa();
const port = 3003;

app.use(serve(__dirname + '/client'));

app.listen(port, ()=>{
    console.log(`${port} is listen`);
})
