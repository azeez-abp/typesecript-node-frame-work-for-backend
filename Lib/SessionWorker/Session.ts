import MysqlDB from "../../Database/Mysql/SequenlizeDB"
import { MongoDB as MongooseConnection } from "../../Database/Mongo/Mongo";
import * as jsonwebtoken from 'jsonwebtoken'
import * as key from '../../Lib/Config/keys/Key'
import { base64encode,base64decode } from "nodejs-base64";

const keys:any   = key.configVar()
export class SessionWorker {
   SessionTable: any;

   async  createMysql(session_id:string,cookie_id:string,cookie:any,user_id:string){
        let sesstionSchema :any = {
             lastModified:(new Date()).getTime(),
             expires :cookie._expires,
             rememeber:false, 
             user_id:user_id,
             session_id:session_id,
             cookie_id:cookie_id,
             cookie: JSON.stringify(cookie),
          } 
         try {
             let  session =  await MysqlDB.getInstance().table('sessions').create( sesstionSchema); 
              await session.save()
              if(session){
               return {suc:"session created"}
            }
         } catch (error) {
            return {err: error}
         } 
    }


    async  createMongo(session_id:string,cookie_id:string,cookie:any,user_id:string,session_max_age:number,remember:string|number|boolean,whichUserTable:string){
        if(remember===true || remember ==='true'){
             remember =1
        }
        let sesstionSchema :any = {
             lastModified:(new Date()).getTime(),
             expires :new Date((new Date().getTime())+(session_max_age*1000) ),
             rememeber:<number>remember, 
             user_id:user_id,
             session_id:session_id,
             cookie_id:cookie_id,
             cookie: JSON.stringify(cookie),
             table:whichUserTable
          } 
         try {
             let  session = await MongooseConnection()
             session  = await session.tables['session']
             await session.findOneAndDelete({user_id})
             //.session(sesstionSchema)
              await session(sesstionSchema).save()
               if(session){
                  return {suc:"session created"}
               }
         } catch (error) {
           // console.log(error)
            return {err: error}
         } 
    }


  static async  checksessionMongo(req:any,res:any,next:any){
    let authValue   = req.headers.authorization  || req.headers.Authorization
    
      if(!authValue) return res.sendStatus(401)
      let token = authValue.split(" ")[1];
      let auth = JSON.parse( base64decode(token.split('.')[1]))
      //{ user: 'qXBJplCUa19sobN9HD6h', iat: 1679715269, exp: 1679718869 }=auth 

     //console.log(auth)
   let  session_ = await MongooseConnection()
   let session_table  = await session_.tables['session']
    let session  =   await session_table.findOne({user_id:auth.user})
   // console.log( session,token)
    if(session){
   //    let  session_expire   = session.expires.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)[0].split("T")
      //let exp :number|Date = new Date( session.expires)
      let exp :number|Date = new Date( auth.exp*1000)
      let today:number|Date =  new Date()
     //console.log(exp ," ", today,"exp", new Date(exp), new Date(today) )
       if(exp < today ){
      
          if(!session.rememeber) return res.status(401).json({err:"Session expired and it is not remembe"}) 
         //\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}
         let user_cookie  = JSON.parse(session.cookie)
         let cookie_exp_date: number|Date  = new Date(  user_cookie.expires)
        if(cookie_exp_date <= today){
            return res.status(401).json({logout:"Login session expired",err:"unauthorized"})
          }else{
           
            let session_max_age  = keys.SESSION_TIME
            const accessToken :string  =  await  jsonwebtoken.sign( {user : session.user_id},
              keys.ACCESS_TOKEN, /*save in memory Not file or database*/
             
             { expiresIn:   session_max_age  })
             let session_regenerate =await session_table.findOneAndUpdate(
               {user_id:session.user_id},
            {     lastModified:(new Date()).getTime(),
                  session_id:accessToken, 
                  expires :new Date((new Date().getTime())+(session_max_age*1000) ),
                  rememeber:1
            
            },{
               new: true
            } )
          //  console.log(session_regenerate)
             // let $this  = new SessionWorker()
            // await $this.createMongo(accessToken,session.cookie_id,session.cookie,session.session_id, session_max_age)
             if(session_regenerate ) {
               if( req.headers.authorization ){
                  req.headers.authorization  = "Bearer "+accessToken
                 } else{
                  req.headers.Authorization  = "Bearer "+accessToken
                 }  
              //   req.azeez = {"name":"done"} this will be accessible in the next req
              // return {has_regenerate:accessToken}  
            //   return res.status(200).json({suc:"User reautheticated"})
               
             } 
            
          }
       
       }
    }

    next()
  }  

}