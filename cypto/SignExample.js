const crypto  = require("crypto");
const hash  = crypto.createHash("sha256")
const fs  = require("fs");
const encrytor  = require("./ContentEncrytor");
/////Identity
let message_  = {
    name:"Adion Azeez",
    legal:" This is the legal document agreement",
    message:"This crypto does not hide content of messages"
}


let cryptoSign   = (privateKey=null,message=message_)=>{
  let message__  = typeof message ==='object'?JSON.stringify(message):message;
   try {
    let hashFormMessage   = hash.update(message__)
    let hashFormMessageBuff  = hashFormMessage.digest('hex')
    console.log(hashFormMessageBuff )
    privateKey  = privateKey?privateKey:fs.readFileSync(__dirname+"/id_rsa_private.perm",'utf8') 
    const signMessage  = encrytor.encryptWithPrivateKey(privateKey,Buffer.from( hashFormMessageBuff) ) ;
     /////for receiver to check the integrity of the message, you will send them
     let packageToSend   = {
         /////////////////////////////////message to send
         algorithm :"sha256",
         originalData  :message,
         signedAndEncryptedData:signMessage,
         /////////////////////////////////////////////message to send
         hashFormMessage :hashFormMessage,
         hashFormMessageBuff:hashFormMessageBuff
   
   
   
   
     }
       return packageToSend
       
   } catch (error) {
    return {
        error: error.message
    }
   }


}


let verifyIdentity   = (publicKey, packageToSend)=>{
         hash    = hash.createHash(packageToSend.algorithm);
         publicKey  = publicKey?publicKey:fs.readFileSync(__dirname+"/id_rsa_public.perm",'utf8') ;
         const descriptedMess  = encrytor.decryptWithPublicKey(publicKey,packageToSend.signedAndEncryptedData)
         descriptedMess  = descriptedMess.toString();
         let hashOfOriginal   = hash.update(JSON.stringify(packageToSend.originalData))
         let hashOfOriginalHex  = hashOfOriginal.digest('hex')
         if(hashOfOriginalHex ==  descriptedMess ){
            ///original
         }else{
             ////alter
         }
}   
module.exports = cryptoSign 