
import { MongoDB } from "../../Database/Mongo/Mongo"
import { Mailer } from "../../Lib/Functions/Mailer"
import { randomStr } from "../../Lib/Functions/RandonString"
import { passwordFunction } from "../../Lib/Functions/Password"

export class PassWord{
    public static async requestReset(req:any,res:any,next:any){
      
      let {email,url}  = req.body

      if(!email){
        res.json({err:"Email is requires"})
        //process.exit(1)
        return
      }

      if(!url){
        res.json({err:"Redirect url is required, this is the frontedn url that will be included in the email"})
        //process.exit(1)
        return
      }
      let db = await MongoDB()   
      const user  =await  db.tables.users.findOne({email})  
      if(!user){
        res.status(400).json({err:"Unknown user"})
        return // process.exit(1)
      }
      const token  = randomStr(62)
      const front_url  = `${url}?email=$${email}&token=$${token} to reset`
      let reset_token = await db.tables.password_requests.findOneAndUpdate(
        {email},
     {     email:email,
           token:token, 
           updated_at :new Date(),
           user:user._id
         //  rememeber:session.remember
     
     },{
        new: true,
        upsert: true
     } )
 //  res.json({reset_token,user})
 if(reset_token){
                Mailer(
                    "Biyawa",
                    [email],
                    "Request email reset by "+user.first_name,
                    `This is to inform you ${user.first_name} has requested for password reset on your account , if this is you go to ${front_url} `,
                    (err:any,suc:any)=>{
                    if(suc){
                       return res.json({suc:"DONE"})
                       // console.log("MAIL SEND")
                    }
                    if(err){
                      return   res.json({err:err})
                    }
                    })
    }
      
    
    //next()
    }


    public static async resetPassword(req:any,res:any,next:any){
        const {password,repeat_password,email,token}   = req.body
         if(!password || !repeat_password){
            return res.json({err:"Password and repeat password are required"})
         }

         if(password !== repeat_password){
            return res.json({err:"Password and repeat password are not equall"})
         }
         if(!email){
            return res.json({err:"Email is required"})
         }
         if(!token){
            return res.json({err:"Token is required"})
         }
      
         let hashPassword:string = await passwordFunction.genPass(password) 

         let db = await MongoDB() 
  
       
         let password_table  = await db.tables.password_requests
         let qp =  {token:token}
         let has_request  = await password_table.findOne(qp).populate('user')
         .exec()
         ///console.log(has_request);
         if(!has_request){
            return res.json({err:"Invalid token"})
         }     
        let user_table  = await db.tables.users
        // user_table.password  = hashPassword
          let user  = await  user_table.findOne({email}).select('password')
          user.password  = hashPassword
          console.log(user ,hashPassword)
          if(user.save()){
            return res.status(200).json({suc:"Password reset done"})
          }  
        

         



    }


}