import { UserRegister } from "../Controllers/User/Register"
import { MongoAuth } from "../Middlewares/Auth/AuthMongo"
import { PassportAuthWithJsonChecker } from "../Middlewares/PassportAuthWithJwtStrategyAuthChecker"
//import * as passport from 'passport'
const passport  = require('passport')

let UserRoute= (app:any)=>{
PassportAuthWithJsonChecker.MongoPassportAutheChecker('users')
 app.get('/',(req:any,res:any)=>{
   const d:any ={done:req.session}
   res.json(d)
 })

     
 app.post('/api/v1/user/login',async(req:any,res:any)=>{
   let auth:any   =  await (new MongoAuth(req,res,"app_user_cookie")).authInto('users')
   
  })

  app.post('/api/v1/user/profile',passport.authenticate('jwt', { session: false }) ,(req:any,res:any)=>{
      
    return res.status(200).json({suc:req.user})
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