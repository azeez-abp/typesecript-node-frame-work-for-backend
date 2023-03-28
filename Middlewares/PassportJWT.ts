
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';    

import * as keys from '../Lib/Config/keys/Key'
import { MongoDB as MongooseConnection } from '../Database/Mongo/Mongo';
import MysqlDB from '../Database/Mysql/SequenlizeDB';
import { KeyValueReplacer } from '../Resources/genearator';
import { userResouece } from '../Resources/User/Resources';
import { SessionWorker } from '../Lib/SessionWorker/Session';

var opts:passportJWT.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
 const keys_:any  = keys.configVar()
opts.secretOrKey = keys_.ACCESS_TOKEN;
opts.ignoreExpiration  = false
opts.passReqToCallback =false      
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.algorithms =['HS256','RS256'] 


const verifier  = (tableName:string)=>{
  console.log("USR")
     return async(jwt_payload:any, done:any) => {
      console.log("Efefew",{userId: jwt_payload},opts)
      let db:any =   await MongooseConnection()
      db.tables[tableName].findOne({userId: jwt_payload.user}, function(err:any, user:any) {
     
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, KeyValueReplacer.replace([ user],userResouece));
          } else {
              return done(null, false);
              // or you could create a new account
          }
      })
    }
} 
const strategy   =  (tableName:string)=> new JwtStrategy(opts,  verifier(tableName))
export const passportjwtMongo = (tableName:string)=>{ 
  passport.use(strategy(tableName))

//   passport.serializeUser(function(user:any, done:any) {
//     console.log('serialized: ', user);       //logged when credentials matched.
//   return done(null, user.userId);
// });

// passport.deserializeUser( async function(id:any, done:any) {
//     let db:any =   await MongooseConnection()
//     db.tables[tableName].findOne(id, function(err:any, user:any) {
//       console.log('deserialized');

//     return done(null, user.userId);
//   });
// });

return passport

};

// import passport from 'passport';
// import passportJWT from 'passport-jwt';
// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

// const jwtSecret = keys_.ACCESS_TOKEN;

// // Here, we define our JWT options, including where to extract the token from
// const jwtOptions: passportJWT.StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: jwtSecret
// };

// // This is the actual JWT authentication strategy
// const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
//   // Here, we could validate the JWT payload against a database or other system
//   // For simplicity, we'll just return the user object as-is
//   const user = { id: jwtPayload };
//   return done(null, user);
// });

// // Finally, we initialize Passport and add our strategy
// passport.use(jwtStrategy);

// export default passport;
