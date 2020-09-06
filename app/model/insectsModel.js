const database=require('./db');
const {Sequelize,Model}=require('sequelize');
const translateTime=require('../../utils/translateTime');

class InsectsModel extends Model{
  static async getDetail(query){
    const detail=await InsectsModel.findOne({
      where:{
        id:Number(query.id)
      }
    });
    detail.appearTime=translateTime(detail.appearTime);
    return detail;
  }
};

InsectsModel.init({
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
  appearWeather:Sequelize.STRING(32),
  northMonth:Sequelize.STRING(48),
  southMonth:Sequelize.STRING(48),
  imgUrl:Sequelize.STRING(128)
},{
  sequelize:database,
  tableName:'insects'
});

module.exports=InsectsModel;