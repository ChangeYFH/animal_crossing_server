const {Op}=require('sequelize');
const OwnedModel=require('../app/model/ownedModel');
const translateTime=require('./translateTime');
const categorys=require('../config/config').categorys;

async function getDataByPage(model,params,attributes,uid,category){
    let pageId=Number(params.pageId);           //获取页数
    let recordNumInPage=Number(params.recordNumInPage);     //获取每页的项目数
    let start=(pageId-1)*recordNumInPage;       //获取数据库中的起始位置
    let data=await model.findAll({
        where:{
            id:{
                [Op.gt]:start
            },
        },
        limit:recordNumInPage,
        attributes:attributes
    });
    if(data.length!==0){
        if(data[0].appearTime){     //如果包含 appearTime 项，则需将时间的格式转化一下
            for(let item of data){
                item.appearTime=translateTime(item.appearTime);
            };
        }
        data=await OwnedModel.bindOwned(data,uid,categorys[category]);      //查询哪些项已经拥有，并将结果添加到 data 中
    }
    return data;
}


module.exports=getDataByPage;