class HttpException extends Error{
  constructor(message='',errorCode=10000,status=400){
    super();
    this.message=message;
    this.errorCode=errorCode;
    this.status=status;
  }
}

class Success extends HttpException{
  constructor(message,errorCode){
    super();
    this.message=message || 'ok';
    this.errorCode=errorCode || 10000;
    this.status=200;
  }
}

class AuthFailed extends HttpException{
  constructor(message,errorCode){
    super();
    this.message=message || '授权失败';
    this.errorCode=errorCode || 10000;
    this.status=401;
  }
}

module.exports={
  HttpException,
  Success,
  AuthFailed
}