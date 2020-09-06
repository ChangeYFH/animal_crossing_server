const Koa=require('koa');
const bodyParser=require('koa-bodyparser');     //用来解析ctx.request.body中的内容
const cors = require("koa2-cors");      //用来设置 Access-Control-Allow-Headers CORS头部，从而实现跨域
const catchError=require('./middleware/catchError');    //用来捕获错误的中间件
const fishRouter=require('./app/router/fishRouter');
const userRouter=require('./app/router/userRouter');
const ownedRouter=require('./app/router/ownedRouter');
const insectsRouter=require('./app/router/insectsRouter');
const villagersRouter=require('./app/router/villagersRouter');

const app=new Koa();    //创建 Koa 实例

app.use(bodyParser());

app.use(catchError);    //将捕获错误的中间件注册到 app 上
app.use(cors({      //设置头部信息
    // origin: function(ctx) {
    //   if (allowOrigins.includes(ctx.header.origin)) {
    //     return ctx.header.origin;
    //   }
    //   return false;
    // },
    orign:"*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    withCredentials:true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


// require('./addData/fish');
// require('./addData/insects');
// require('./addData/villagers');

app.use(fishRouter.routes());
app.use(userRouter.routes());
app.use(ownedRouter.routes());
app.use(insectsRouter.routes());
app.use(villagersRouter.routes());

app.listen(3000);
console.log('server created...');