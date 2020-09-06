const {HttpException}=require('../utils/exception');

const catchError=async (ctx,next)=>{
  try{
    await next()
  }catch(error){
    if(error instanceof HttpException){
      ctx.status=error.status || 400;
      ctx.response.body={
        message:error.message,
        errorCode:error.errorCode || 10000
      };
    }else{
      throw error;
    }
  }
}

module.exports=catchError;