const Router=require('koa-router');
const FishModel=require('../model/fishModel');
const UserModel=require('../model/userModel');
const getSearchResult=require('../../utils/getSearchResult');
const getDataByPage=require('../../utils/getDataByPage');

const router=new Router();

router.get('/fish',async ctx=>{
    const uid=UserModel.verifyToken(ctx.request.headers.authorization).uid;     //根据请求头部获取uid
    const attributes=['id','zhName','appearTime','appearPlace','imgUrl'];
    const fishList=await getDataByPage(FishModel,ctx.request.query,attributes,uid,'fish')   //获取当前页的数据
    ctx.body=fishList;
});

router.get('/fish/detail',async ctx=>{
    const detail=await FishModel.getDetail(ctx.request.query);  //获取某个鱼的详细信息
    ctx.body=detail;
});

router.post('/fish/search',async ctx=>{
    const uid=UserModel.verifyToken(ctx.request.body.headers.Authorization).uid;    //根据请求头部获取uid
    const attributes=['id','zhName','appearTime','appearPlace','imgUrl'];
    const result=await getSearchResult(ctx.request.body.params,attributes,uid,'fish');  //根据查询条件获取结果
    ctx.response.body=result;
});

// router.get('/fish/owned',async ctx=>{
//     const uid=UserModel.verifyToken(ctx.request.body.headers.Authorization).uid;    //根据请求头部获取uid
//     const owned=await FishModel.getOwned(uid,'fish');   //
//     ctx.responce.body=owned;
// });

module.exports=router;