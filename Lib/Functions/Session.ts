const session  = require('express-session');
import { Cookie } from "./Cookie";
import * as key from '../Config/keys/Key'
//import { SessionDB } from "../../Models/Mysql/Session.model";
//const { connect } = require('ngrok');
//console.log(key.configVar().MAIL_URL)
const keys:any  = key.configVar()

/*configure session to be store inside the session table */
export const Session:any  = {
      
 session:()=>{

      let session_store = null;
      if(key.configVar().DB_TYPE==='mongo'){
      

 const MongoStore  = require('connect-mongo');

const dbOption   = {
    useNewUrlParser:true,
    useUnifiedTopology: true,

}

//const db  = mongoose.createConnection(process.env.MONGO_LOCAL,dbOption)
/*create session table */
 session_store  =  MongoStore.create({
    mongoUrl:key.configVar().MONGO_URI,
    mongoOptions: dbOption,
    autoRemove: 'interval',
    autoRemoveInterval: 10, // In minutes. Default,
    touchAfter: 24 * 3600, // time period in seconds
    collectionName:'sessions'

})
      }    

if(key.configVar().DB_TYPE==='mysql'){

    const mysql2    = require('mysql2/promise')
const MySQLStore = require('express-mysql-session')(session);

const k:any  =  key.configVar().MYSQL_URI
var connection = mysql2.createPool({
    host: k.HOST_NAME,
    user: k.USER,
    password: k.PASSWORD,
    database: k.DB,
  
   // port: DB.PROT,
   // waitForConnections: `120`
   // connectionLimit: 5 ///vm
   // queueLimit: 2000
});

 session_store = new MySQLStore({
      // Whether or not to automatically check for and clear expired sessions:
	clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
checkExpirationInterval: 120000000,
// Whether or not to create the sessions database table, if one does not already exist:
createDatabaseTable: true,
// Whether or not to disable touch:
disableTouch: false,
schema: {
    tableName: 'sessions',
    columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
    }
}
 }, connection);

 //console.dir (session_store)
}

//console.log(keys, keys.SESSION_KEY)
   return  session({
        secret: keys.SESSION_TOKEN,
        resave:false,///do not create 2 row at once
        saveUninitialized:false,////use memory /// if true if will use db
        store:session_store,
        //store:db_type==='mysql'?sessionStore_mysql2 : db_type==='mongo'? session_store: null,
        cookie : Cookie
       
    })
  } 
}