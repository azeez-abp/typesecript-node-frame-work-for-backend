import { Sequelize,Model } from 'sequelize';
import { configVar } from '../../Lib/Config/keys/Key';
import { SessionDB } from '../../Models/Mysql/Session.model';
import { UserDB } from '../../Models/Mysql/Student.model';

export default  class MysqlDB {
  private static instance: MysqlDB;
  private sequelize: Sequelize;
  
  private constructor() {
   // console.log(configVar().MYSQL_URI.HOST_NAME)
    this.sequelize = new Sequelize(<string>configVar().MYSQL_URI.DB, <string>configVar().MYSQL_URI.USER, <string>configVar().MYSQL_URI.PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      //  sync: true, //create the table if it not exists
      //models: [__dirname + '/Models/Mysql/**/*.ts'],
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
  
      logging: false//stop loging sql query to console
    });

//this.sequelize
  }

  public static getInstance(): MysqlDB {
    if (!MysqlDB.instance) {
      MysqlDB.instance = new MysqlDB();
    }
    return MysqlDB.instance;
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();
    
    //  console.log('Connection has been established successfully.');

    } catch (error) {
     return console.error('Unable to connect to the database:', error);
    }

  }
  public  table(tableName:string) {
    if(tableName==='users'){
      return UserDB(this.sequelize); 
    }  

    if(tableName==='sessions'){
      return SessionDB(this.sequelize); 
    }
   
  }

  /////////////////////////////////////
  // public static async dbTable(){
  //   const db = await  MysqlDB.getInstance()
  //   await db.connect();
  //   const User = db.table('users')
  //   return User
  //   }
  /////////////////////////////////////
  
  public  raw (query:string) {
     return this.sequelize.query(query);
  }

}


// async function get(){
  //  const data =  await MysqlDB.getInstance().raw("SELECT * FROM user WHERE 1")  
//  const data = await MysqlDB.getInstance().table('users').findAll()
// //  const s  = await MysqlDB.getInstance().table('users').create({
// //     name: 'John Doe',
// //     email: 'john@example.com',
// //     password: 'password'
// //   });
// //   s.save()
// console.log(data)   
// }

// get()