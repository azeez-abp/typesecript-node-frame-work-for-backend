import { invalidateUser } from "../Controllers/User/Logout"
import { PassWord } from "../Controllers/User/Password"
import { UserRegister } from "../Controllers/User/Register"
import { SessionWorker } from "../Lib/SessionWorker/Session"
import { MongoAuth } from "../Middlewares/Auth/AuthMongo"
import { PassportAuthWithJsonChecker } from "../Middlewares/PassportAuthWithJwtStrategyAuthChecker"
import { FileUploader } from "../Lib/Fs/uploader/FileUploder"
//import * as passport from 'passport'
//import  { passportjwtMongo } from "../Middlewares/PassportJWT"
import passport from 'passport'
import { unlink } from "fs"
import { Mailer } from "../Lib/Functions/Mailer"
import { UserAccount } from "../Controllers/User/UserAccount"

let UserRoute= (app:any)=>{
 


 app.get('/',(req:any,res:any)=>{

   const d:any ={done:req.session}
   res.json(d)
 })

     
 app.post('/api/v1/user/login',async(req:any,res:any)=>{
   let auth:any   =  await (new MongoAuth(req,res,"app_user_cookie")).authInto('users')
   
  })

  const upl  =  new FileUploader(app,'./public/images',1200000,500000,500000,['png','jpg','gif'])
upl.getFileAndUpload('/api/v1/user/register','img',true,[200,400],async(req:any,res:any)=>{
  
   
        try {
        req.body['profile_img'] = res.uploaded_img_[0].path
      //  console.log(res.uploaded_img_[0],req.body ,req.body.email )
      let user  = await UserRegister.done(req.body)
       if(user .err){
        unlink(res.uploaded_img_[0].path,()=>{
          
        })
       return  res.status(500).json( {err:user})
     }
    //  Mailer('adioadeyoriazeez@gmail.com0',req.body.email,"Registration completed for your online banling system" ,`${req.body.email} welcome to your online banking`,(err:any,suc:any)=>{

    //  })
     return  res.json( {suc:user .suc,img: res.uploaded_img_[0].path})
 
    } catch (error:any) {
    // console.log(error, 'useR reG2')
    unlink(res.uploaded_img_[0].path,()=>{

    })
     return res.status(501).json( {err:"Unknown error occur , contact admin"})
    }
   // return res.json({suc:res.uploaded_img_})

})

//   app.post('/api/v1/user/register',async(req:any,res:any)=>{
//     try {
//       let user  = await UserRegister.done(req.body)
//        if(user .err){
//        return  res.status(500).json( {err:user .err})
//      }
//      return  res.json( {suc:user .suc})
 
//     } catch (error) {
//     // console.log(error, 'useR reG2')
//      return res.status(501).json( {err:""})
//     }
  

//  })



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
    //console.log( req.isAuthenticated(), req.session_regenerate,"yesv2")
  // console.log(res.biyawa_user)
   return res.status(200).json({suc:req.user, regenerate_token:req.session_regenerate})
   })


  app.post('/api/v1/user/generate_token',SessionWorker.checksessionMongo, passport.authenticate('jwt', { session: false }), UserAccount.generateToken )
  
  app.post('/api/v1/user/create_pin',SessionWorker.checksessionMongo, passport.authenticate('jwt', { session: false }), UserAccount.createPinForSendingMoney )
   
  app.post('/api/v1/user/send_money',SessionWorker.checksessionMongo, passport.authenticate('jwt', { session: false }), UserAccount.sendMoney )
 

  app.delete('/api/v1/user/logout', invalidateUser)

}  

export default UserRoute
//module.exports = User;