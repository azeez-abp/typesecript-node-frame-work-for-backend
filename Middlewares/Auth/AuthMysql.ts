import IAuth from "./IAuth";
import MysqlDB from "../../Database/Mysql/SequenlizeDB";
import { passwordFunction } from "../../Lib/Functions/Password";
import * as jsonwebtoken from 'jsonwebtoken'
import * as key from '../../Lib/Config/keys/Key'
import { Cookie } from "../../Lib/Functions/Cookie";
import { SessionWorker } from "../../Lib/SessionWorker/Session";
const keys:any   = key.configVar()
const { Op } = require("sequelize");
 class MysqlAuth implements IAuth{
    username:string  =''
    password:string =''
    sessionName:string =''
    DB:any  = MysqlDB;
    req:any;
    res:any;
    cookie_name:any
   constructor(req:any,res:any,private user_username:string,private user_password:string,cookieName:string){
     this.username  =user_username;
     this.password = user_password
     this.req  = req  
     this.res  = res;
     this.cookie_name=cookieName

   }
    public async authInto(tableNamme:string){
      
      try {
        const user:any  =  await this.DB.getInstance().table(tableNamme).findOne({
          where:{
              [Op.or]:
                  [
                      {email:this.username},
                      {userId:this.username}
                  ]
              
          }
           
          })
  
          if(!user||user.length ===0){
              return this.res.status(404).json ({err:this.username+" is not found"})
          }
          if(user.salt){
           let verify:boolean  =  this.comparePassword(user.pa,user.hash,user.salt);  
           if(verify){
            let sesion  =    this.generateSession(user)
            if(sesion){
              return this.res.status(200).json ({suc:" Login successful", data :sesion})
            }else{
              return this.res.status(500).json ( {err:" Failed to gen"})
            }
           }else{
            return this.res.status(500).json ( {err:" Inavlid login credentials"})
           }
           ////////////////////////////////////////////////////
  
          }
          
        } catch (error:any) {
          this.res.status(500).json({err:error.message+". Please check the table name, and the field should be email and password"})
        }
   





    }
  
   
    public comparePassword(password:string,hash:string,salt?:string){
       if(salt){
        return  passwordFunction.checkCryptoPassword(password,hash,salt)
       }else{
        return  passwordFunction.checkPass(password)
       }
    }
  
    public async generateSession(user:any){
      const accessToken :any  =  await  jsonwebtoken.sign( {user : user.userId},
        keys.ACCESS_TOKEN, /*save in memory Not file or database*/
       { expiresIn:   '60m' })


      const refreshToken :any  =  await  jsonwebtoken.sign( {user :user.userId},
        keys.ACCESS_TOKEN, /*save in memory Not file or database access by req.session*/
       { expiresIn:   '7d' })

       this.res.cookie(this.cookie_name,refreshToken, Cookie)//7 days this create cookie in user browser
       const session   = new SessionWorker()
       this.req.user_details  = {id:user._id, user_id:user.userId,session_id:accessToken}
       await session.createMysql(accessToken,refreshToken,this.req.session.cookie,user.userId)

       if(session){
        return accessToken 
       }else{
        return false
       }
       

}

}