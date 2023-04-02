
import * as fs from 'fs'
import {cryptoFunction} from './ContentEncrytor'


///get the priavtge annd pblic key for the ecryption
let pk  = fs.readFileSync(__dirname+'/cypto/id_rsa_public.perm','utf8');
let pvk  = fs.readFileSync(__dirname+'/cypto/id_rsa_private.perm','utf8');
let encryMsg = cryptoFunction.enccryptWithPublicKey(pk,JSON.stringify ({name:"Azeez",amount:400000,message:"This cryptoo hide content of message"}) ).encrypted.toString()
//let encryMsg = enc.encryptWithPublicKey(pk,JSON.stringify ({name:"Azeez",amount:400000,message:"This cryptoo hide content of message"}) ).encrypted.toString()
let decryMsg  =cryptoFunction.decryptWithPrivateKey(pvk,  encryMsg).decryptor.toString()

