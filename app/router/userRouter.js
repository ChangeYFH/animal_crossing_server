const Router=require('koa-router');
const UserModel=require('../model/userModel');

const router=new Router();

router.post('/user/register',async ctx=>{
    await UserModel.register(ctx.request.body.params.email,ctx.request.body.params.password);
});

router.post('/user/login',async ctx=>{
    const token=await UserModel.login(ctx.request.body.params.email,ctx.request.body.params.password);
    ctx.response.body=token;
});

// router.post('/user/token',async ctx=>{
//     const authenticity =await UserModel.verifyToken(ctx.request.body.headers.token);
//     ctx.response.body=authenticity;
// });

module.exports=router;