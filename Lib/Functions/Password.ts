//var bcrypt = require('bcryptjs');
import * as bcrypt from 'bcryptjs'
const  crypto  = require('crypto');


function genPasswordCryptoBase(password:string){
     let salt  = crypto.randomBytes(64).toString('hex')
     let hashPass  = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
   let res :any ={
             salt:salt,
             hashPass:hashPass
     }
     return res
}

function checkCryptoPassword(password:string,hashedPaswordFromDb:string,saltFromDb:string):boolean{
   
    let verify  = crypto.pbkdf2Sync(password,saltFromDb,1000,64,'sha512').toString('hex');

      if( verify === hashedPaswordFromDb){
        return  true 
      }else{
        return false
      }
}

async function generateHashPassword(password:string, saltLen:number=13){
   let salt  =  await bcrypt.genSalt(saltLen)
   let encodePass  = await  bcrypt.hash(password, salt)
   if(!encodePass){
    return false
   } 
   return encodePass;
//     let pa  = [];
   
//  bcrypt.genSalt(saltLen, function(err:any, salt:string):any {
//     bcrypt.hash(password, salt, function(err:any, hash:string) {
     
//         if(err){
//             return  cb(err,null); 
//         }else{
//             pa[0]=hash
//           return   cb(null,hash);  
//               //
//         }
//     });
// });   //
//return cb
}


function checkPassword(password:string,hash:string){
    // Load hash from your password DB.
    console.log(hash)
bcrypt.compare(password, hash, function(err:any, isMatch:boolean):boolean {
       if(err || !isMatch){
           return false;
       }else{
           return true;
       }
});

}


export const passwordFunction:{ 
    genPass:Function,
    checkPass:Function,
    genPasswordCryptoBase:Function,
    checkCryptoPassword:Function,
} =  {
   genPass :generateHashPassword,
   checkPass :checkPassword,
   genPasswordCryptoBase:genPasswordCryptoBase,
   checkCryptoPassword:checkCryptoPassword
}