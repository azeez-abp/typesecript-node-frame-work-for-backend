import * as crypto from "crypto";
import * as fs from "fs";
//const fs     = require('fs');

export const  genKeyPair = (path:string)=>{
    ////the private and public key will be created in the path specified
    const keyPair =  crypto.generateKeyPairSync('rsa',
      {  
          modulusLength:4096,
    
         publicKeyEncoding :{
             type :"pkcs1",
             format:"pem"
         },
         privateKeyEncoding :{
            type :"pkcs1",
            format:"pem"
        }
    })
    //__dirname current dir 
//console.log(keyPair.privateKey)
try {
    fs.writeFileSync(path+'_pub.perm' , keyPair.publicKey) 
    fs.writeFileSync(path+'.perm', keyPair.privateKey)   
} catch (error) {
    console.log("ERR:")
}
  


//__dirname+'/id_rsa_private.perm' 
}
