const database=require('./db');
const {Model,Sequelize}=require('sequelize');
const categorys=require('../../config/config').categorys;


class OwnedModel extends Model{
  //查询 owned 表中是否存在符合条件的项，存在则删除该项并将isOwned置 false，否则创建该项并将 isOwned置true
  static async update(uid,category,cid){
    const result=await OwnedModel.findOne({
      where:{
        uid,
        category:categorys[category],
        cid
      }
    });
    if(result===null){
      await OwnedModel.create({uid,category:categorys[category],cid});    //创建该项
      return true;
    }else{
      await OwnedModel.destroy({      //删除该项
        where:{uid,category:categorys[category],cid}
      });
      return false;
    }
  };

  //向数据库查询某个用户某个分类在 owned表中是否存在，将该结果与给定的数组绑定在一起
  static async bindOwned(list,uid,category){
    const ownedList=await OwnedModel.findAll({    //向数据库查询某个用户某个分类在 owned表的所有数据
        where:{
            uid:uid,
            category:category
        }
    });
    if(list[0].dataValues===undefined){   //当 getSearchResult中调用该函数时
      for(let item of list){    //遍历 list，如果某一项的 id 存在于 ownedList 的结果中，则将该项的 owned 设为true
        for(let ownedItem of ownedList){
          if(ownedItem.dataValues.cid===item.id){
            item.owned=true;
            break;
          }else{
            item.owned=false;
          }
        }
      }
    }else{                              //除了 getSearchResult中调用该函数时
      for(let item of list){      //遍历 list，如果某一项的 id 存在于 ownedList 的结果中，则将该项的 dataValues.owned 设为true
        for(let ownedItem of ownedList){    
          if(ownedItem.dataValues.cid===item.id){   //item.id 与 item.dataValues.id 相等
            item.dataValues.owned=true;
            break;
          }else{
            item.dataValues.owned=false;
          }
        }
      }
    }
    return list;
  }
}

OwnedModel.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  uid:Sequelize.INTEGER,
  category:Sequelize.INTEGER,
  cid:Sequelize.INTEGER
},{
  sequelize:database,
  tableName:'owned'
});

module.exports=OwnedModel;