
import { MongoDB } from "../../Database/Mongo/Mongo"
import { Mailer } from "../../Lib/Functions/Mailer"
import { randomStr } from "../../Lib/Functions/RandonString"

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
        {token:token},
     {     email:email,
           token:token, 
           updated_at :new Date(),
         //  rememeber:session.remember
     
     },{
        new: true
     } )
   res.json({reset_token})
    Mailer(
        "Biyawa",
        [email],
        "Request email reset by "+user.first_name,
        `This is to inform you ${user.first_name} has requested for password reset on your account , if this is you go to ${front_url} `,
        (err:any,suc:any)=>{
         if(suc){
            res.json({suc:"DONE"})
            console.log("MAIL SEND")
         }
        })
   
      next()
    }
}