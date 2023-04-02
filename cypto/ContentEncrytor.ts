//const crypto  = require("crypto");
import * as crypto from "crypto";
////////////////////////data encrytion
function publicEncrypt(publicKey:crypto.RsaPublicKey,message:string):object{
  const bufferMessage:Buffer  = Buffer.from(message,'utf-8');
 // console.log(bufferMessage)

  return {encrypted:crypto.publicEncrypt(publicKey,bufferMessage),bufferMessage:bufferMessage } 
}

function decryptWithPrivateKey(privateKey:crypto.RsaPrivateKey,encryptedMessage:NodeJS.ArrayBufferView):object{
    const decryptor  = crypto.privateDecrypt(privateKey,encryptedMessage);
    return {decryptor:decryptor}
    
}


///////////////////////////Identity

function decryptWithPublicKey(publicKey:crypto.RsaPrivateKey,message:string):object{
  const bufferMessage  = Buffer.from(message,'utf-8');
 // console.log(bufferMessage)
  return {encrypted:crypto.publicDecrypt(publicKey,bufferMessage),bufferMessage:bufferMessage } 
}

function encryptWithPrivateKey(privateKey:crypto.RsaPrivateKey,encryptedMessage:NodeJS.ArrayBufferView):object{
    const decryptor  = crypto.privateEncrypt(privateKey,encryptedMessage);
    return {decryptor:decryptor}
    
}
export const cryptoFunction:any= {
  enccryptWithPublicKey:publicEncrypt,
  decryptWithPrivateKey:decryptWithPrivateKey, 
  decryptWithPublicKey: decryptWithPublicKey,
  encryptWithPrivateKey:encryptWithPrivateKey
};