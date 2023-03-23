import MysqlDB from "../../Database/Mysql/SequenlizeDB"
import { MongoDB as MongooseConnection } from "../../Database/Mongo/Mongo";
 
export class SessionWorker {
   SessionTable: any;

   async  createMysql(session_id:string,cookie_id:string,cookie:any,user_id:string){
        let sesstionSchema :any = {
             lastModified:(new Date()).getTime(),
             expires :cookie._expires,
             rememeber:false, 
             user_id:user_id,
             session_id:session_id,
             cookie_id:cookie_id,
             cookie: JSON.stringify(cookie),
          } 
         try {
             let  session =  await MysqlDB.getInstance().table('sessions').create( sesstionSchema); 
              await session.save()
              if(session){
               return {suc:"session created"}
            }
         } catch (error) {
            return {err: error}
         } 
    }


    async  createMongo(session_id:string,cookie_id:string,cookie:any,user_id:string){
        let sesstionSchema :any = {
             lastModified:(new Date()).getTime(),
             expires :cookie._expires,
             rememeber:false, 
             user_id:user_id,
             session_id:session_id,
             cookie_id:cookie_id,
             cookie: JSON.stringify(cookie),
          } 
         try {
             let  session = await MongooseConnection()
             session  = session.tables['session'](sesstionSchema)
             //.session(sesstionSchema)
              await session.save()
               if(session){
                  return {suc:"session created"}
               }
         } catch (error) {
            return {err: error}
         } 
    }


    

}