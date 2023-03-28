
import { ExtractJwt, Strategy as PassportStrategy, VerifiedCallback } from 'passport-jwt';    
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
      opts.secretOrKey = keys_.ACCESS_TOKEN;
      opts.ignoreExpiration  = false
      opts.passReqToCallback =false      
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      opts.algorithms =['HS256'] 
      
    // console.log(req.headers.authorization)
  const strategyCallback:VerifiedCallback  =  async(jwt_payload:any, done:any) =>{
    let db:any =   await MongooseConnection()
       db.tables[tableName].findOne(
        {
            where:{userId:jwt_payload.user}
        },
    
     { _id:0 }).exec( function(err:any, user:any
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

     

    }  
       return  passport.use(new PassportStrategy(opts, strategyCallback ))


        
        
}

//////////////////////////////////////////////////////////////////////////////////////////////////
 

const jsw_passport_auth_mysql_chekcer    = (tableName:string)=>{

       const getUser:VerifiedCallback =async (payload:any,done:any)=>{
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

