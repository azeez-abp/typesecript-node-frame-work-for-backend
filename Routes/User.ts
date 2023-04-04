import { invalidateUser } from "../Controllers/User/Logout"
import { PassWord } from "../Controllers/User/Password"
import { UserRegister } from "../Controllers/User/Register"
import { SessionWorker } from "../Lib/SessionWorker/Session"
import { MongoAuth } from "../Middlewares/Auth/AuthMongo"
import { PassportAuthWithJsonChecker } from "../Middlewares/PassportAuthWithJwtStrategyAuthChecker"
//import * as passport from 'passport'
//import  { passportjwtMongo } from "../Middlewares/PassportJWT"
import passport from 'passport'

let UserRoute= (app:any)=>{
 


 app.get('/',(req:any,res:any)=>{

   const d:any ={done:req.session}
   res.json(d)
 })

     
 app.post('/api/v1/user/login',async(req:any,res:any)=>{
   let auth:any   =  await (new MongoAuth(req,res,"app_user_cookie")).authInto('users')
   
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



 /////////////////////////////////////////////////////request with required auth below here
 // app.use(SessionWorker.checksessionMongo) ////this function will come first to regenerate token if expire the new token will be
  //in req.user_regenetate
  
  app.use((req:any,res:any,next:any)=>{
  PassportAuthWithJsonChecker.MongoPassportAutheChecker('users',req,res)  
  next()
  })
  app.post('/api/v1/user/request_password_reset', PassWord.requestReset)
  app.put('/api/v1/user/password_reset', PassWord.resetPassword)
  app.post('/api/v1/user/profile',SessionWorker.checksessionMongo , 
    //passportjwtMongo('users').authenticate('jwt', { session: false }) ,
    passport.authenticate('jwt', { session: false }) ,
  (req:any,res:any)=>{
    console.log( req.isAuthenticated(), req.session_regenerate,"yesv2")
   
   return res.status(200).json({suc:req.user, regenerate_tonen:req.session_regenerate})
   })




  app.delete('/api/v1/user/logout', invalidateUser)

}  

export default UserRoute
//module.exports = User;