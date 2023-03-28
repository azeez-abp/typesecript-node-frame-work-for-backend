
import express, { Request, Response } from 'express';
const app    = express();
const cors  = require('cors');
const session = require('express-session')
import cookie_parser  =require('cookie-parser')  
import * as body_parser from 'body-parser'
import passport  =require('passport') 
 import { LogEvents } from "./Lib/Event/Event";
 import { Session } from './Lib/Functions/Session';
 const path  = require('path')
// import { configVar } from './Lib/Config/keys/Key';
// import MysqlDB from './Database/Mysql/SequenlizeDB';
 import { randomStr as random } from './Lib/Functions/RandonString';
// import { FileUploader } from './Lib/Fs/uploader/FileUploder';
import {MongoDB as MongooseConnection } from './Database/Mongo/Mongo';
 import { Mailer } from './Lib/Functions/Mailer';
 import { SessionWorker } from './Lib/SessionWorker/Session';
 import { KeyValueReplacer } from './Resources/genearator';
 import UserRoute from './Routes/User';

async function get(){

// Mailer('adioadeyoriazeez@gmail.com',
// ['adioadeyoriazeez@gmail.com','abppreversity@gmail.com','balop3e@gmail.com','princedaniel0997@mail.com'],
// 'testing node mailer',
// `<div style='background:#000;color:#fff;font-size:34px'>
//  Welcome Hello node Message System
//  this message is sent to test the app in dev anvironment
//  it is free from any code that can cuase system malfunction 

// </div>`,
// (err:any,data:any)=>{
//   if(data){
//     console.log(data)
//   }
// })
//console.dir(new FileUploader())
//const user  = await (await MongooseConnection.table())['users'].find()
//const user2  = await (await MongooseConnection.table()).users.find()
               //  new MongooseConnection()
//.table().users.find()
//console.log(user[0],user2[1])
//console.dir(MongooseConnection.getInstance())
//    const users  = await MongoDbFactory.users.find()
//    console.log(users)
 // const q =  await MysqlDB.getInstance().raw("SELECT * FROM user")  
 //const data = await MysqlDB.getInstance().table('users').findAll()
//  const s  = await MysqlDB.getInstance().table('users').create({
//     name: 'John Doe',
//     email: 'john@example.com',
//     password: 'password'
//   });
//   s.save()
//console.log(data)   
}
get()
/*
{
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
}*/


const PORT :Number | string   = process.env.PORT || 8001

const FgBlack : string = "\x1b[30m"
const FgRed : string = "\x1b[31m"
const FgGreen : string = "\x1b[32m"
const FgYellow : string = "\x1b[33m"
const FgBlue : string = "\x1b[34m"
const FgMagenta : string = "\x1b[35m"
const FgCyan : string = "\x1b[36m"
const FgWhite : string = "\x1b[37m"
const FgGray  : string = "\x1b[90m"

const BgBlack : string = "\x1b[40m"
const BgRed : string = "\x1b[41m"
const BgGreen : string = "\x1b[42m"
const BgYellow : string = "\x1b[43m"
const BgBlue : string = "\x1b[44m"
const BgMagenta : string = "\x1b[45m"
const BgCyan : string = "\x1b[46m"
const BgWhite : string = "\x1b[47m"
const BgGray : string = "\x1b[100m"

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookie_parser())
let whitelist :string[] = [
    'http://127.0.0.1:'+PORT,
    'https://127.0.0.1:'+PORT,
    '127.0.0.1:'+PORT,///this the the one
    'localhost:'+PORT
    //undefined
    ]
var corsOptions = {
    origin: function (origin:any, callback:any) {
      //  console.log(origin, "ORIGIN")
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS '+origin))
      }
    },
    optionSuccessStatus:200
  }
  
  let corsOptionsDelegate :object = function (req:any, callback:any) {
    var corsOptions;
   // console.log(req.headers['host'],"tyu")
   //req.hostname,127.0.0.1 
    
    if (whitelist.indexOf(req.headers.host) !== -1) {
    /// corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        //console.log(req.header('Origin'))

      //  console.log(req.headers )
      throw new Error("Rejection by cors")
      //corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  
  }

app.set('trust proxy', true)// use req.ip to get ip
app.use(body_parser.urlencoded({ extended: true }) )  
app.use(body_parser.json({ type: 'application/*+json' }))
app.use(body_parser.text())
app.use(cors(corsOptionsDelegate));
//app.use(cookie_parser());

app.use(passport.initialize() );
app.use(Session.session())///use your define session
app.use(express.static(path.join(__dirname,'/public')))
//app.use(passport.session());

//studentComponent(app)  

app.use((req:any,res:any,next:any)=>{
//  let s  = new   SessionWorker() 
 //console.log(req.session)
 //res.send(req.user_details)
// s.createMongo(req.session.id,req.session.id,req.session.cookie,random(12))
    ///work for browse loading
    
// console.log(req.session)
//    console.log(req.session.cookie)
//    console.log(req.session.id)
//console.log(req.session.id, " E")
//    req.session.regenerate(function(err:any) {
//     console.log(req.session.id, " A")
//   })
//LogEvents.emit("access_log",`Request to ${req.path} using ${req.method} method with ip ${req.socket.remoteAddress} `)
 
//console.log(req.ip,req.socket.remoteAddress,req.method,req.path)////passport-local user
    //console.log(req.logout)
    next()
  })





  UserRoute(app)

app.post('/fileloader2',(req:any,res:any)=>{
    res.send(req.body)
 //  console.log(req.body)
})
  app.get('/*',(req:any,res:any)=>{
    //LogEvents.emit('error_log', `${req.path} return 404 Error`)
    res.send(`<h1>404 File not file</h1>`)
})
// const upl  =  new FileUploader(app,'./public/images',1200000,500000,500000,['png','jpg','gif','webp'])
// upl.getFileAndUpload('/fileloader','img',true,[200,400])

// app.post('/fileloader',(req:Request,res:Response)=>{
//     console.log(res)
//     res.json({file:req.body,b:req.files})
    
//    // 
// //     .getFileAndUpload()
// })
  app.listen(PORT,()=>{
    console.log(FgBlue ,'server stated at','http://127.0.0.1:'+PORT );
})
