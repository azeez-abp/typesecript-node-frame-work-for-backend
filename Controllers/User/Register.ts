import { MongoDB as MongooseConnection } from "../../Database/Mongo/Mongo";
import { passwordFunction } from "../../Lib/Functions/Password";
import { randomStr } from "../../Lib/Functions/RandonString";

export class UserRegister{

  static async done(data:any):Promise<any>{
  
   //  console.log(pass,data)

     
        try {
         // console.log(data)
            let cryptEncode:{hashPass:string,salt:string} = passwordFunction.genPasswordCryptoBase(data.pa)
          
           // let pass:string = await passwordFunction.genPass(data.pa)
            let userId  = randomStr(20);
            data.pa  = cryptEncode.hashPass
            data.userId  = userId
            data.salt = cryptEncode.salt

              if(Object.keys(data).length===0){
                return {err:"all feld are required"}
                }


              let db = await MongooseConnection()     
            const user  =  db.tables.users(data);
            await  user.save();///return user  data
           if(user){
               return {suc:`${user.fn}, your registration is completed`}
           }
           return {err:"Registration failed, try again"}
        } catch (error) {
           // console.log(error, 'useR reG')
            return{err:error} 
        }
      

  }
}