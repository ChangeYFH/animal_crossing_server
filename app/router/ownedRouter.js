const Router=require('koa-router');
const UserModel=require('../model/userModel');
const OwnedModel=require('../model/ownedModel');

const router=new Router();

router.post('/owned',async ctx=>{
  const uid=UserModel.verifyToken(ctx.request.body.headers.token).uid;  //通过请求头部获取uid
  const category=ctx.request.body.params.category;
  const cid=ctx.request.body.params.cid;
  const isOwned=await OwnedModel.update(uid,category,cid);    //查询 owned 表中是否存在符合条件的项，存在则删除该项并将isOwned置 false，否则创建该项并将 isOwned置true
  ctx.response.body=isOwned;
});

module.exports=router;