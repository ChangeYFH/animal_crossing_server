const Router=require('koa-router');
const VillagersModel=require('../model/villagersModel');
const UserModel=require('../model/userModel');
const getSearchResult=require('../../utils/getSearchResult');
const getDataByPage=require('../../utils/getDataByPage');

const router=new Router();

router.get('/villagers',async ctx=>{
    const uid=UserModel.verifyToken(ctx.request.headers.authorization).uid;
    const attributes=['id','name','race','sex','birthday','imgUrl','character'];
    const villagersList=await getDataByPage(VillagersModel,ctx.request.query,attributes,uid,'villagers');
    ctx.body=villagersList;
});

router.get('/villagers/detail',async ctx=>{
    const detail=await VillagersModel.getDetail(ctx.request.query);
    ctx.body=detail;
});

router.post('/villagers/search',async ctx=>{
    const uid=UserModel.verifyToken(ctx.request.body.headers.Authorization).uid;
    const attributes=['id','name','race','sex','birthday','imgUrl','character'];
    const result=await getSearchResult(ctx.request.body.params,attributes,uid,'villagers');
    ctx.response.body=result;
});

module.exports=router;