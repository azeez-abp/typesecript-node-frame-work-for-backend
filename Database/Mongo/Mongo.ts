import mongoose,{ConnectOptions,Connection, MongooseError} from 'mongoose';
import { configVar } from '../../Lib/Config/keys/Key';
import { sessionObject } from '../../Models/Mongo/Session';
import { LogEvents } from '../../Lib/Event/Event';
import {User} from '../../Models/Mongo/Users';
import { passwordObject } from '../../Models/Mongo/Password_reset';
import { Token } from '../../Models/Mongo/Token';
import { Pin } from '../../Models/Mongo/Pins';
import { Account } from '../../Models/Mongo/Account';
const uri: string = <string> configVar().MONGO_URI
//console.log( configVar().MAIL_URL)

 class MongooseConnection {
  private static instance: MongooseConnection;
  private connection: Connection = mongoose.connection;
  private constructor() {

  }
  public static async getInstance(): Promise<MongooseConnection> {
   try {
      if (!MongooseConnection.instance) {
  
      MongooseConnection.instance = new MongooseConnection();
      await MongooseConnection.instance.connect();
    }
  
   } catch (error:any) {
    console.log(error.message,"BIG ERROR CONNECTION")
   }
  
   return MongooseConnection.instance;
  }

  private async connect(): Promise<void> {
    const options= {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    
    } as ConnectOptions ;
    mongoose.set('debug', false);
    mongoose.set('strictQuery', true)
    this.connection = await mongoose.createConnection(uri,options);
  }

  public getConnection(): Connection {
    return this.connection;
  }

//   public static async table() {
//   const connection = await MongooseConnection.getInstance();
//   const db = connection.getConnection();
//   const Schema  = mongoose.Schema;
//   const tablesObj:any = {
//       users: db.model('user',new Schema(studentObject),'user'),
//       session:db.model('session',new Schema(sessionObject),'session'),
// } 

// return tablesObj
//   }


}


export const MongoDB  = async()=>{
    
    const connection = await MongooseConnection.getInstance();
    const db = await connection.getConnection();
    const tablesObj:any = { tables:  {
           users:db.model('users', User,'users' ),
           sessions:db.model('sessions',sessionObject,'sessions'),
           password_requests:db.model('password_requests',passwordObject,'password_requests'),
           tokens:db.model('tokens',Token,'tokens'),
           pins:db.model('pins',Pin,'pins'),
           accounts:db.model('accounts',Account,'accounts'),
          
    }      
    }

    return tablesObj
} 

/*
Model
.where('age').gte(25)
.where('tags').in(['movie', 'music', 'art'])
.select('name', 'age', 'tags')
.skip(20)
.limit(10)
.asc('age')
.slaveOk()
.hint({ age: 1, name: 1 })
.exec(callback);


 where: [Function (anonymous)],
      equals: [Function: equals],
      eq: [Function: eq],
      or: [Function: or],
      nor: [Function: nor],
      and: [Function: and],
      gt: [Function (anonymous)],
      gte: [Function (anonymous)],
      lt: [Function (anonymous)],
      lte: [Function (anonymous)],
      ne: [Function (anonymous)],
      in: [Function (anonymous)],
      nin: [Function (anonymous)],
      all: [Function (anonymous)],
      regex: [Function (anonymous)],
      size: [Function (anonymous)],
      maxDistance: [Function (anonymous)],
      minDistance: [Function (anonymous)],
      mod: [Function (anonymous)],
      exists: [Function (anonymous)],
      elemMatch: [Function (anonymous)],
      within: [Function: within],
      box: [Function (anonymous)],
      polygon: [Function (anonymous)],
      circle: [Function (anonymous)],
      near: [Function: near],
      intersects: [Function: intersects],
      geometry: [Function: geometry],
      select: [Function: select],
      slice: [Function (anonymous)],
      sort: [Function (anonymous)],
      limit: [Function (anonymous)],
      skip: [Function (anonymous)],
      maxScan: [Function (anonymous)],
      batchSize: [Function (anonymous)],
      comment: [Function (anonymous)],
      maxTimeMS: [Function (anonymous)],
      maxTime: [Function (anonymous)],
      snapshot: [Function (anonymous)],
      hint: [Function (anonymous)],
 merge: [Function (anonymous)],
      find: [Function (anonymous)],
      cursor: [Function (anonymous)],
      findOne: [Function (anonymous)],
      count: [Function (anonymous)],
      distinct: [Function (anonymous)],
      update: [Function: update],
      updateMany: [Function: updateMany],
      updateOne: [Function: updateOne],
      replaceOne: [Function: replaceOne],
      remove: [Function (anonymous)],
      deleteOne: [Function (anonymous)],
      deleteMany: [Function (anonymous)],
      findOneAndUpdate: [Function (anonymous)],
      findOneAndDelete: [Function (anonymous)],
      findOneAndRemove: [Function (anonymous)],*/
// // Usage example
// (async () => {
//   const connection = await MongooseConnection.getInstance();
//   const db = connection.getConnection();

//   // Define a schema for the 'users' collection
//   const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number
//   });

//   // Create a model for the 'users' collection
//   const User = db.model('User', userSchema);

//   // Create a new user document and save it to the 'users' collection
//   const user = new User({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     age: 30
//   });
//   await user.save();

//   // Find all users in the 'users' collection and log their names
//   const users = await User.find();
//   users.forEach(user => {
//     console.log(user.name);
//   });
// })();
