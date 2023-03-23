import IAuth from "./IAuth";
import { MongoDB as MongooseConnection } from "../../Database/Mongo/Mongo";
import { passwordFunction } from "../../Lib/Functions/Password";
import * as jsonwebtoken from 'jsonwebtoken'
import * as key from '../../Lib/Config/keys/Key'
import { Cookie } from "../../Lib/Functions/Cookie";
import { SessionWorker } from "../../Lib/SessionWorker/Session";
const keys:any   = key.configVar()
const { Op } = require("sequelize");
 export class MongoAuth implements IAuth{
    username:string  =''
    password:string =''
    sessionName:string =''
    DB:any  = MongooseConnection;
    req:any;
    res:any;
    cookie_name:any
   constructor(req:any,res:any,cookieName:string){
     this.username  =req.body.email;
     this.password = req.body.password
     this.req  = req  
     this.res  = res;
     this.cookie_name=cookieName

   }
    public async authInto(tableNamme:string){
      try {
        let db = await MongooseConnection()     
          let user  =  await db.tables[tableNamme].findOne({
        //  where:{
            $or:
                  [
                      {email:this.username},
                      {userId:this.username}
                  ]
              
         // }
           
          })
       
          if(!user || user === null){
             
              return this.res.status(404).json ({err:this.username+" is not found"})
          }
    
          if(user.salt){
           let verify:boolean  =  this.comparePassword(this.password,user.pa,user.salt);  
           if(verify){
              let sesion  =   await this.generateSession(user)
              if(sesion){
                // user.lastLogin  =new Date()
                // await user.save()
                return this.res.status(200).json ({suc:" Login successful", data :sesion})
              }else{
                return this.res.status(500).json ( {err:" Failed to gen"})
              }
           
           }else{
            return this.res.status(500).json ( {err:" Inavlid login credentials"})
           }
          }
          
  
  
      } catch (error:any) {
     
        this.res.status(500).json({err:error.message+". Please check the table name, and the field should be email and password"})
        //return 
      }
    
    }
  
   
    public comparePassword(password:string,hash:string,salt?:string):boolean{
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
       { expiresIn:   '15d' })

       this.res.cookie(this.cookie_name,refreshToken, Cookie)//7 days this create cookie in user browser
      // user.sessionToken  = accessToken
       this.req.session.user_details  = {id:user._id, user_id:user.userId,session_id:accessToken}
       const session   = new SessionWorker()
         let sesion = await session.createMongo(accessToken,refreshToken,this.req.session.cookie,user.userId)
         if(sesion){
          return accessToken 
         }else{
          return false
         }

       

}

}