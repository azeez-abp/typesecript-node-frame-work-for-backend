import { UserRegister } from "../Controllers/User/Register"
import { SessionWorker } from "../Lib/SessionWorker/Session"
import { MongoAuth } from "../Middlewares/Auth/AuthMongo"
import { PassportAuthWithJsonChecker } from "../Middlewares/PassportAuthWithJwtStrategyAuthChecker"
import { applyPassportStrategyMongo  } from "../Middlewares/PassportJWT"
//import * as passport from 'passport'
const passport  = require('passport')

let UserRoute= (app:any)=>{
  //app.use(passport.initialize())
  applyPassportStrategyMongo ('users',passport)()
//app.use(  )
 // verifier()
  //PassportAuthWithJsonChecker.MongoPassportAutheChecker('users')  
// app.use((rq:any,rs:any,next:any)=>{

//   PassportAuthWithJsonChecker.MongoPassportAutheChecker('users',rq,rs)  
//   next()
// }  )

 app.get('/',(req:any,res:any)=>{

   const d:any ={done:req.session}
   res.json(d)
 })

     
 app.post('/api/v1/user/login',async(req:any,res:any)=>{
   let auth:any   =  await (new MongoAuth(req,res,"app_user_cookie")).authInto('users')
   
  })

  app.post('/api/v1/user/profile', 
 //SessionWorker.checksessionMongo,
  passport.authenticate('jwt', { session: false }) ,
  (req:any,res:any)=>{
    console.log( req.isAuthenticated())
   //  console.log(req.session,req.user_details) 
    return res.status(200).json({suc:req.user,"aze":req.azeez})
   })

  app.post('/api/v1/user/register',async(req:any,res:any)=>{
     try {
       let user  = await UserRegister.done(req.body)
        if(user .err){
        return  res.status(500).json( {err:user .err})
      }
      return  res.json( {suc:user .suc})
  
     } catch (error) {
     // console.log(error, 'useR reG2')
      return res.status(501).json( {err:""})
     }
   

  })



}  

export default UserRoute
//module.exports = User;