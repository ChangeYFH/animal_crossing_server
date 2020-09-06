function translateTime(time){
  let result='';
  if(time==='all'){
      result= '全天';
  }else{
      time=time.split(',');
      for(let item of time){
          const segment=item.split('-');
          result=`${result}${segment[0]}点到${segment[1]}点，`;
      }
      result=result.slice(0,-1);
  }
  return result;
}

module.exports=translateTime;