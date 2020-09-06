const database=require('./db');
const {Sequelize,Model}=require('sequelize');

class VillagersModel extends Model{
  static async getDetail(query){
    const detail=await VillagersModel.findOne({
        where:{
            id:Number(query.id)
        }
    });
    return detail;
  }
}

VillagersModel.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:Sequelize.STRING(32),
  sex:Sequelize.STRING(4),
  race:Sequelize.STRING(32),
  character:Sequelize.STRING(64),
  birthday:Sequelize.STRING(16),
  imgUrl:Sequelize.STRING(128)
},{
  sequelize:database,
  tableName:'villagers'
});

module.exports=VillagersModel;