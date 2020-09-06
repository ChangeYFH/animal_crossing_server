const {Sequelize,Model}=require('sequelize');
const database=require('./db');
const translateTime=require('../../utils/translateTime');
// const OwnedModel=require('./ownedModel');
// const categorys=require('../../config/config').categorys;


class FishModel extends Model{
    //获取某种鱼的详细信息
    static async getDetail(query){
        const detail=await FishModel.findOne({
            where:{
                id:Number(query.id)
            }
        });
        detail.appearTime=translateTime(detail.appearTime);     //将 appearTime 的格式进行转换
        return detail;
    }

    // static async getOwned(uid,category){
    //     const owned=await OwnedModel.findAll({
    //         where:{
    //             uid:uid,
    //             category:categorys[category]
    //         }
    //     });
    //     const ownedList=[];
    //     for(let item of owned){
    //         ownedList.push(item.dataValues.cid);
    //     }
    //     console.log(ownedList);
    // }
}


//用于创建 fish表
FishModel.init({        
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    enName:Sequelize.STRING(32),
    zhName:Sequelize.STRING(32),
    price:Sequelize.INTEGER,
    appearTime:Sequelize.STRING(32),
    appearPlace:Sequelize.STRING(32),
    sizeShadow:Sequelize.STRING(32),
    northMonth:Sequelize.STRING(32),
    southMonth:Sequelize.STRING(32),
    imgUrl:Sequelize.STRING(128)
},{
    sequelize:database,
    tableName:'fish'
});

module.exports=FishModel;