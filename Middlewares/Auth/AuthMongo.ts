import IAuth from "./IAuth";
import { MongoDB as MongooseConnection } from "../../Database/Mongo/Mongo";
import { passwordFunction } from "../../Lib/Functions/Password";
import * as jsonwebtoken from 'jsonwebtoken'
import * as key from '../../Lib/Config/keys/Key'
import { Cookie } from "../../Lib/Functions/Cookie";
import { SessionWorker } from "../../Lib/SessionWorker/Session";
import * as fs from 'fs';
import path from 'path';
//const passport = require('passport')
var PassportStrategy = require('passport-jwt').Strategy
const keys:any   = key.configVar()
const { Op } = require("sequelize");
 export class MongoAuth implements IAuth{
    username:string  =''
    password:string =''
    sessionName:string =''
    remember:string|number=0
    DB:any  = MongooseConnection;
    req:any;
    res:any;
    cookie_name:any
   constructor(req:any,res:any,cookieName:string){
     this.username  =req.body.email;
     this.password = req.body.password
     this.remember = req.body.remember
     this.req  = req  
     this.res  = res;
     this.cookie_name=cookieName

   }
    public async authInto(tableName:string){
      try {
        let db = await MongooseConnection()     
          let user  =  await db.tables[tableName].findOne({
        //  where:{
            $or:
                  [
                      {email:this.username},
                      {userId:this.username}
                  ]
              
         // }
           
          }).select('password userId')
       
          if(!user || user === null){
             
              return this.res.status(404).json ({err:this.username+" is not found"})
          }
    
         // console.log(user)
           let verify:boolean  = await this.comparePassword(this.password,user.password);  
           if(verify){
              let sesion  =   await this.generateSession(user,tableName)
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
       
  
  
      } catch (error:any) {
        console.log(error)
     
        //this.res.status(500).json({err:error.message+". Please check the table name, and the field should be email and password"})
        //return 
      }
    
    }
  
   
    private comparePassword(password:string,hash:string,salt?:string):boolean{
       if(salt){
        return  passwordFunction.checkCryptoPassword(password,hash,salt)
       }else{
        return  passwordFunction.checkPass(password,hash)
       }
    }
  
    private async generateSession(user:any,whichUserTable:string){
      let session_max_age  = 0
     // const rsarivatekey  = fs.readFileSync( path.join(process.cwd(),'cert','passport.perm'),'utf-8' )
       
     let d  = '3m'//keys.SESSION_TIME
     let n:RegExpMatchArray|null = d.match(/(\d+)/)
     let l:RegExpMatchArray|null = d.match(/(\D)/)
     if(n&&l){
    //  console.log(n[0],l[0])  
      const period_map :any = {
         ms:1000,
         s: 1,
         m:60,
         h:60*60,
         d:60*60*24,
         w: 60*60*24*7
      } 
      session_max_age = parseInt(n[0]) * period_map[l[0]]
     }

     console.log(session_max_age, "MAX AGE")

      const userObj  = {user : user.userId}
     // console.log(userObj)
      const accessToken :any  =  await  jsonwebtoken.sign(userObj ,
        keys.ACCESS_TOKEN,
      //rsarivatekey ,
       /*save in memory Not file or database
          if jsonwebtoken.sign conatains an error, PassportStrategy callback will not be called
          
         */
       
       { 
        expiresIn: session_max_age,
       // algorithm:'RS256' ,
        algorithm:'HS256' 
      
      })
  
 
      const refreshToken :any  =  await  jsonwebtoken.sign(userObj,
        keys.ACCESS_TOKEN
      // rsarivatekey
        , /*save in memory Not file or database access by req.session*/
       { expiresIn: '15d',algorithm:'HS256' })
       let max_age  = 24*60*60*1000*15
       Cookie.maxAge = max_age
       //console.log(Cookie)

       this.res.cookie(this.cookie_name,refreshToken, Cookie)//15 days this create cookie in user browser
      // user.sessionToken  = accessToken
        this.req.user_details  = {id:user._id, user_id:user.userId,session_id:accessToken}
        const session   = new SessionWorker()
   
         let sesion = await session.createMongo(accessToken
          ,refreshToken,
          this.req.session.cookie,
          user.userId, 
          session_max_age,
          this.remember,
           whichUserTable
          )
        
         if(sesion){
          return {accessToken,refreshToken} 
         }else{
          return false
         }

       

}

public async auth(tableName:string){
  // let db = await MongooseConnection()     
  // let user  =  await db.tables[tableName]
         ///////////////////////////////////////////////////////////////////////////////
      //    passport.use(new PassportStrategy({},()=>{this.authInto(tableName)} ))
      //    passport.serializeUser(function(user:any, done:any) {
      //     console.log('serialized: ', user);       //logged when credentials matched.
      //   done(null, user.userId);
      // });
    
      // passport.deserializeUser(async function(id:any, done:any) {
      //  await user.findOne(id, function(err:any, user:any) {
      //       console.log('deserialized');
    
      //     done(null, user.userId);
      //   });
      // });

        //////////////////////////////////////////////////////////////////////////////////
}

 public static async logout(){

 }
}