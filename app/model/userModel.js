const {Sequelize,Model}=require('sequelize');
const jwt = require('jsonwebtoken');
const database=require('./db');
const security=require('../../config/config').security;
const {
    Success,
    AuthFailed
}=require('../../utils/exception');

class UserModel extends Model{
    //注册用户
    static async register(email,password){
        const existence=await UserModel.findOne({
            where:{
                email:email
            }
        });
        if(existence===null){
            await UserModel.create({
                email:email,
                password:password
            });
            throw new Success('注册成功',10001);
        }else{
            throw new AuthFailed('该邮箱已经注册',10002);
        }
    }

    //用户登录
    static async login(email,password){
        const user=await UserModel.findOne({
            where:{
                email:email,
                password:password
            }
        });
        if(user===null){
            throw new AuthFailed('邮箱号或密码不正确',10003);
        }else{
            return generateToken(user.uid);     //验证成功后，返回token，下次用户访问时只需携带token，不需要再进行验证
        }

    }

    //从token中获取uid
    static verifyToken(token){
        try{
            const authenticity=jwt.verify(token,security.secretKey);
            return authenticity;
        }catch(error){
            if(error.name==='JsonWebTokenError'){
                throw new AuthFailed('无效的token',10004);
            }else if(error.name==='TokenExpiredError'){
                throw new AuthFailed('token已过期',10005);
            }else{
                throw error;
            }
        }
    }
}

//生成令牌
function generateToken(uid){
    const secretKey=security.secretKey;
    const expiresIn=security.expiresIn;
    const token=jwt.sign({
        uid
    },secretKey,{
        expiresIn
    });
    return token;
}

UserModel.init({
    uid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    password:Sequelize.STRING(32),
    email:Sequelize.STRING(64)
},{
    sequelize:database,
    tableName:'users'
});

module.exports=UserModel;