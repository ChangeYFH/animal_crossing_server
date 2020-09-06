const {Sequelize}=require('sequelize');
const {
    dbName,
    user,
    password,
    host,
    port
}=require('../../config/config').database;

const database=new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    timezone:'+08:00',
    logging:console.log,      //是否在终端显示 SQL 语句
    define:{            //define中的设置在所有表中都会应用
        // timestamps:false    //不自动生成 createdAt字段和 updateAt字段
    }
});

//自动创建表结构
// database.sync();

module.exports=database;