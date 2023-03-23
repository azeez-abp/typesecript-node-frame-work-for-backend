import MysqlDB from '../Database/Mysql/SequenlizeDB';
import *  as keys from '../Lib/Config/keys/Key';
import { MongoDB as MongooseConnection } from '../Database/Mongo/Mongo';

let passport_local_check_login:Function  = (req:any,res:any, next:any)=>{
   if(req.isAuthenticated()){
       next()
   }else{
        res.sendStatus(401)
       //res.redirect("/student/login")//.json({err:"You are not logged in",s:req.isAuthenticated()})
    // return  res.json()
   }
}

let custome_is_auth_mysql:Function   =(req:any,res:any, session_db:string,user_db:string,login_redirect_url:string,cb:Function,cookie_name:string)=>{
let user_cookie  = req.cookies[cookie_name]
if(user_cookie){
  //////////////////////////  
  MysqlDB.getInstance().table(session_db).findOne({where: {session_id: user_cookie}},(err:any,user:any)=>{
    MysqlDB.getInstance().table(user_db).findOne( {where: {_id: user.user_id}},(err:any,user_:any)=>{
       // console.log(user)
       // return {user:user_};
        cb({user:user_})

       // res.status(201).send({suc:user_})
    })

})  
////////////////////
}else{
    //console.log("FAILED")
    res.redirect(login_redirect_url)
    //return({err:"You are not autheticated"})
   // res.status(301).send({err:"You are not autheticated"})
}
//next()
  //res.send({"checking":user_cookie}) 

}

let logOut:Function  = (res:any,cookieId:string,session_db:string)=>{
  MysqlDB.getInstance().table(session_db).deleteOne({cookie_id:cookieId},(err:any,suc:any)=>{
    if(err){
     
    }
  })
}
const mysqlLocalAuthChecker:any  = {
 passport_local_check_login ,
  //custome_is_auth :custome_is_auth ,
  log_out: logOut,
  sql_auth:custome_is_auth_mysql
};