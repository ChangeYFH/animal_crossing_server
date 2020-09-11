const Router=require('koa-router');
const InsectsModel=require('../model/insectsModel');
const UserModel=require('../model/userModel');
const getSearchResult=require('../../utils/getSearchResult');
const getDataByPage=require('../../utils/getDataByPage');

const router=new Router();

router.get('/insects',async ctx=>{
  const uid=UserModel.verifyToken(ctx.request.headers.authorization).uid;
  const attributes=['id','zhName','appearTime','appearPlace','imgUrl'];
  const insectsList=await getDataByPage(InsectsModel,ctx.request.query,attributes,uid,'insects')
  ctx.body=insectsList;
});

router.get('/insects/detail',async ctx=>{
  const detail=await InsectsModel.getDetail(ctx.request.query);
  ctx.body=detail;
});

router.get('/insects/search',async ctx=>{
  const uid=UserModel.verifyToken(ctx.request.headers.authorization).uid;
  const attributes=['id','zhName','appearTime','appearPlace','imgUrl'];
  const result=await getSearchResult(ctx.request.query,attributes,uid,'insects');
  ctx.response.body=result;
});

module.exports=router;