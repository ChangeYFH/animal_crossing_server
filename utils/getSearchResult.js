const translateTime=require('./translateTime');
const OwnedModel=require('../app/model/ownedModel');
const categorys=require('../config/config').categorys;
const database=require('../app/model/db');
const {QueryTypes}=require('sequelize');
const {HttpException}=require('../utils/exception');

async function getSearchResult(params,attributes,uid,category){
  let sql='';

  //生成查询字段，即WHERE及之后的内容   where `appearPlace` in ('河流') and `sizeShadow` in ('M')
  for(let key of Object.keys(params)){
      if(key==='owned'){
        continue;
      }else if(key!=='southMonth' && key!=='northMonth'){
          sql+='`'+key+"` in ('"
          for(let item of params[key]){
              sql+=item+"','";
          }
          sql=sql.substr(0,sql.length-2);
          sql+=') and ';
      }else{
          sql+='('
          for(let item of params[key]){
              sql+=key+" REGEXP '-"+item+"-' or ";
          }
          sql=sql.substr(0,sql.length-3);
          sql+=') and ';
      }
  }
  sql=sql.substr(0,sql.length-4);

  //生成要查询的所有字段组成的字符串  `id`, `zhName`, `appearTime`, `appearPlace`
  sqlAttributes='';
  for(let item of attributes){
      sqlAttributes+='`'+item+'`, ';
  }
  sqlAttributes=sqlAttributes.substr(0,sqlAttributes.length-2);
  
  //拼接出最终的sql语句
  if(sql.length===0){
    sql=`SELECT ${sqlAttributes} FROM ${category} `+sql;
  }else{
    sql=`SELECT ${sqlAttributes} FROM ${category} WHERE `+sql;
  }
  

  let result=await database.query(sql,{type:QueryTypes.SELECT});

  if(result.length!==0){
    //对 apperTime 进行处理
    if(result[0].appearTime){
      for(let item of result){
          item.appearTime=translateTime(item.appearTime);
      };
    };

    //获取数据库中关于是否拥有的信息
    result=await OwnedModel.bindOwned(result,uid,categorys[category]);

    //在之前获得的结果的基础上根据是否拥有进行过滤
    switch(params.owned){
      case true:
        result=result.filter(value=>{
            return value.owned===true;
        });
        break;
      case false:
        result=result.filter(value=>{
            return value.owned===false;
        });
        break;
      default:
        throw new HttpException("The value of owned is incorrect.");
    }
  }
  return result;
}

module.exports=getSearchResult;