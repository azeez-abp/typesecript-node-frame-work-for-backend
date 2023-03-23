const nodemailer = require('nodemailer');
const fs = require("fs")

import path, { dirname } from "path";
import { configVar } from "../Config/keys/Key";
let keys:any  = configVar().MAIL_URL

export const Mailer  = (from:string,to:string[],subject:string,messge_content:string,cb:Function)=>{

  

      let transporter = nodemailer.createTransport({

             host: keys.h,
             port: 465,
             auth: {
                 user:keys.u,
                 pass: keys.p
             }
     })
//console.log(path.join(__dirname,'dkim.pem'))
     transporter.use('stream', require('nodemailer-dkim').signer({
      domainName: 'kreata.ee',
      keySelector: 'test',
      privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'))
  }));
     let message:object = {
        from: from,
        to: to.join(','),
        subject: subject,
        html: messge_content
    }

     transporter.sendMail(message, function(err:any, info:any) {
        if (err) {
          console.log(err)
          cb(err,null)
          return 
        } else {
          cb(null,{suc:info})
         // console.log(info,'done');
        }
    } 
     )

}  