const session  = require('express-session');

const key   = require('../../../Lib/Config/keys/Key')
//const { connect } = require('ngrok');



/*configure session to be store inside the session table */
module.exports  = {
      
 session:()=>{

      let session_store = null;
      if(key.DB_TYPE==='mongo'){
      

 const MongoStore  = require('connect-mongo');

const dbOption   = {
    useNewUrlParser:true,
    useUnifiedTopology: true,

}

//const db  = mongoose.createConnection(process.env.MONGO_LOCAL,dbOption)
/*create session table */
 session_store  =  MongoStore.create({
    mongoUrl:key.MONGO_URI,
    mongoOptions: dbOption,
    autoRemove: 'interval',
    autoRemoveInterval: 10, // In minutes. Default,
    touchAfter: 24 * 3600, // time period in seconds
    collectionName:'sessions'

})
      }    

if(key.DB_TYPE==='mysql'){

    const mysql2    = require('mysql2/promise')
const MySQLStore = require('express-mysql-session')(session);
    delete key.MYSQL_URI.db
var connection = mysql2.createPool({...key.MYSQL_URI,database:'portal'});
 session_store = new MySQLStore({}, connection);


}


   return  session({
        secret: process.env.SESSION_KEY,
        resave:false,
        saveUninitialized:true,
        store:session_store,
        //store:db_type==='mysql'?sessionStore_mysql2 : db_type==='mongo'? session_store: null,
        cookie : require("../Cookie")
       
    })
  } 
}