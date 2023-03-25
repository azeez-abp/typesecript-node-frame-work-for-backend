var PassportStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts:any = {}
import * as keys from '../Lib/Config/keys/Key'
import { MongoDB as MongooseConnection } from '../Database/Mongo/Mongo';
import MysqlDB from '../Database/Mysql/SequenlizeDB';
import { KeyValueReplacer } from '../Resources/genearator';
import { userResouece } from '../Resources/User/Resources';
import { SessionWorker } from '../Lib/SessionWorker/Session';

const keys_:any  = keys.configVar()
const passport = require('passport')



 /*option affect the functionality of jwt*/
// opts.issuer  = 'abp'
// opts.audience = 'user id'

// opts.jsonWebTokenOptions = {
// complete :false,
// clockTolerance: '',
// maxAge:'2h',
// clockTimestamp:'100',
// nonce:'OpenId String'
// }
//
//opts.algorithms ="HS256"
/////////Note: this is validator, JWt_payload is set by you in jwt.sign method
///call the function pass passport
//.passport-local for implementing local strategy, and passport-jwt for retrieving and verifying JWTs.



 //
/// require this on the page where you call passport.authenticate   
const MongoPassportAutheChecker:Function   = async (tableName:string,req:any,res:any)=>{

   
      // let authValue   = req.headers.authorization  || req.headers.Authorization
    
      // if(!authValue) return res.sendStatus(401)
      // let token = authValue.split(" ")[1];

      // let s_   =  new  SessionWorker()
      //  let check_session:any =  await s_.checksessionMongo(token)
      //  if(check_session. has_regenerate){
      //    if( req.headers.authorization ){
      //     req.headers.authorization  = "Bearer "+check_session.has_regenerate
      //    } else{
      //     req.headers.Authorization  = "Bearer "+check_session.has_regenerate
      //    }  
      //  }

      // if(check_session.logout){
      //   res.status(401).send({err:"Unauthorized"})
      // } 

      opts.secretOrKey = keys_.ACCESS_TOKEN;
      opts.ignoreExpiration  = false
      opts.passReqToCallback =false      
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      
    // console.log(req.headers.authorization)
       return  passport.use(new PassportStrategy(opts, async(jwt_payload:any, done:any) =>{
        let db:any =   await MongooseConnection()
            await db.tables[tableName].findOne(
            {
                where:{userId:jwt_payload.user}
            },

          // { 
          //  // $project: { pa: 0, salt: 0,_id:0,gender: }
          // },
         { pa: 0, salt: 0,_id:0 }).select({ fn: "Firstname" }).exec( function(err:any, user:any
             ) {
                 if (err) {
               
                     return done(err, false);
                 }
                 if (user) {
                  //  return done(null, user ) ;
                     return done(null, KeyValueReplacer.replace( [user], userResouece ) ) ;
                 } else {
              
                     return done(null, false);
                     // or you could create a new account
                 }
             });

         

        }))


        
        
}
 

const jsw_passport_auth_mysql_chekcer    = (tableName:string)=>{
       const getUser:Function  =async (payload:any,done:any)=>{
      try {
        const user:any  =   await MysqlDB.getInstance().table(tableName).findOne({
            where:{
                userId:payload.user
              }
        })
      if(!user||user.length===0){
        return {"err":"User not found"}
      }
      return {"suc":"User found"}
      } catch (error) {
        return {"err":"Internal error"}
      }


  

   }
               

        //////////////////////////////////////////////////////////////////////one
        /////////////////////////////////////////////////////////////////////two
        
   passport.use( new PassportStrategy( opts, getUser))
  
 }



const jsw_passport_auth_mongo_chekcer   = ()=>{
    return (passport:any,table:string)=>{
    const useMongoAuthChecker = async(jwt_payload:any,done:any)=>{
   
          try {
            let db = await MongooseConnection()
          const user:any =  db[table].find({userId: jwt_payload.user})
         
            if(!user||user.length===0){
                return {"err":"User not found"}
              }
              return {"suc":"User found"}
          } catch (error) {
            return {"err":"internal error"}
          }

     

}


   return passport.use(new PassportStrategy(opts,useMongoAuthChecker))
}

}



/////////////////////////////////////////////////

export const PassportAuthWithJsonChecker:any  = { 
    passportAuthCheckerMongo:jsw_passport_auth_mongo_chekcer, 
    passportAuthCheckerMysql:jsw_passport_auth_mysql_chekcer ,
    MongoPassportAutheChecker
}

