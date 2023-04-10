import { ICard } from "../Template/ICard";
import { Mailer } from "../../Lib/Functions/Mailer";
import { IBillType } from "../Template/IBillType";
import { randomStr } from "../../Lib/Functions/RandonString";
import { MongoDB } from "../../Database/Mongo/Mongo";
import { MailHTML } from "../../Lib/Functions/MailHtmil";
import { passwordFunction } from "../../Lib/Functions/Password";
export class UserAccount{

   public deposit(amount:number, card:ICard){
      //api for sending mony validate card take money into the account
   //Mailer('adioazeez@gmail.com')

   }
   

   public static async sendMoney(req:any,res:any){
         let authUser  = res.biyawa_user
         let amount:number  = req.body.amount
         let pin:string  = req.body.pin
         let destinationAccount:Number = req.destination_account
         let userAccountNumber:number = req.user_account
         let db  =  await  MongoDB()
      //   console.log(authUser)

         let qp  = {userId:authUser.userId}
         let userPin   = await  db.tables.pins.findOne(qp)
          
         if(!userPin){
            return res.json({err:"you dont have pin for transaction, you need to create one"})
         }
        console.log(pin,userPin.pin, userPin.salt)
        if(!req.body.pin){
         return res.json({err:"Pin is required"})
        }
      let checkPin  =     passwordFunction.checkCryptoPassword(pin,userPin.pin, userPin.salt)
         
     if(!checkPin){
      return res.json({err:"Invalid pin number"})
     } 



     let  userAccount  = await  db.tables.accounts.findOneAndUpdate(
      {  userId: authUser.userId,accountNumber:authUser.accountNumber},
  
   {    
         updated_at:new Date(),
         userId: authUser.userId, 
         balance:0,
         userObjectId:authUser._id,
         accountNumber:authUser.accountNumber

   
   } ,
   {  upsert: true,
      new: true,}
   
   )

     if(!userAccount){
      return res.json({err:"Invalid pin number"})
     }

     console.log(userAccount)

     if(amount > userAccount.balance){
      return res.json({err:"Insurficeint account balance"})
     }
    // call api to sent money


   }

   public accountDetails(){

   }

   public payBill(billType:IBillType){

   }

   public static async createPinForSendingMoney(req:any,res:any){
     let token:string  =   req.body.verifyToken
     let authUser  = res.biyawa_user
     let pin =  req.body.pin 
    // console.log(pin)
     if(pin.length !== 4 ) {
      return res.json({err:"Only four digit is required for the pin"})
     }
   
     let pass  = await passwordFunction.genPasswordCryptoBase(pin);

  let data  = {
      pin: pass.hashPass,
      salt:pass.salt,
      userId:authUser.userId,
      userObjectId:authUser._id
     }
     let db  =  await  MongoDB()
     let qp  = {token:token,userId:authUser.userId}
     let userToken   = await  db.tables.tokens.findOne(qp)
     //console.log(qp,userToken,authUser)
     if(userToken){
       let  userPin  = await  db.tables.pins(data).save();
       let emails  = [ authUser.email,'princedaniel0997@gmail.com']
       let message  = MailHTML(`Your pin is <h2 >${pin}</h2>`, emails.join(' , '))
       Mailer("adioadeyoriazeez@gmail.com",emails,"Token generated for action taken in your account",message,async(err:any,suc:any)=>{})

       let userToken   = await  db.tables.tokens.findOneAndUpdate(
         {  userId: authUser.userId},
     
      {    
            updated_at:new Date(),
            userId: authUser.userId, 
            token:""
      
      } ,
      {  upsert: true,
         new: true,}
      
      )

       return res.json({suc:'done',  regenerate_token:req.session_regenerate})

     }else{
   return res.json({err:"Invalid token"})
     }



   }

   public static generateToken(req:any,res:any){
     let token  =  randomStr(64,false,true)
     let authUser  = res.biyawa_user
     let emails  = [ authUser.email,'princedaniel0997@gmail.com']
     let message  = MailHTML(`Your token is <h2 >${token}</h2>`, emails.join(' , '))
     Mailer("adioadeyoriazeez@gmail.com",emails,"Token generated for action taken in your account",message,async(err:any,suc:any)=>{
      if(suc){
         let db  =  await  MongoDB()
         let userToken   = await  db.tables.tokens.findOneAndUpdate(
            {  userId: authUser.userId},
        
         {    
               updated_at:new Date(),
               userId: authUser.userId, 
               token:token
         
         } ,
         {  upsert: true,
            new: true,}
         
         )
         
         if(userToken){
            return res.json({suc:'done',  regenerate_token:req.session_regenerate})
         }

         //console.log(suc,userToken)
      }else{
         
      }
      
     })
   }

}