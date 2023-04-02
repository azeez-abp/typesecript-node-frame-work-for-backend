import { MongoDB } from "../../Database/Mongo/Mongo"
import { base64encode,base64decode } from "nodejs-base64";
export const invalidateUser  =async (req:any,res:any)=>{
    try {
        let authValue   = req.headers.authorization  || req.headers.Authorization
    
        if(!authValue) return res.sendStatus(401)
        let token = authValue.split(" ")[1];
        let auth = JSON.parse( base64decode(token.split('.')[1])) 
       let db = await MongoDB()     
      const user  =await  db.tables.users.findOneAndDelete({user_id:auth.user})  
      if(user){
        req.session.destroy()
        res.status(200).json({suc:user.first_name +" logout successfully" })
      }
    } catch (error:any) {
        res.status(500).json({err:error,nature:"Internal error form "+error.fielName})
    }
   

}