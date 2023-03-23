//require('dotenv').config()///all in process.env
let jwt  = require('jsonwebtoken');
let  keys  = require('../Lib/Config/keys/Key')


export const jwtAuthChecker:Function  = (req:any,res:any ,next:any)=>{
    let authValue   = req.headers.authorization  || req.headers.Authorization
    
    if(!authValue) return res.sendStatus(401)
    let token = authValue.split(" ")[1];
    //console.log(token,'token')
    //header.payload.signature 
    //signsture is access by back end alone
    //header.payload access by both front and backend
    jwt.verify(token, keys.ACCESS_TOKEN/*take it from memory*/,(err:any,user:any)=>{
      if(err) {req.cookies.session_expires= true;next()}//forbiden session has expired
      if(user){ 
         req.cookies.session_expires= false;           
          console.log(user, 'is auth')
         next();
      }
      //console.log(user)
        
       
    }) 
  //next();
}

