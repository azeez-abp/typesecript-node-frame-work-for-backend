// let path   = require('path');
// let root  = __dirname.match(/.+web-app/)[0]
let option = { 
    httpOnly:true,   
    SameSite:'Strict',
    secure:true,
    maxAge:24*60*60*1000*7
}

let option2  = { 
  path: '/',
  httpOnly: true,
  secure: true,
  maxAge:24*60*60*1000*7,
  SameSite:'Lax'
}

module.exports  = option2;