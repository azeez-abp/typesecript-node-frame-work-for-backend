const nodemailer = require('nodemailer');
const fs = require("fs")

import path, { dirname } from "path";
import { configVar } from "../Config/keys/Key";
import DKIM from "nodemailer/lib/dkim";
let keys:any  = configVar().MAIL_URL

export const Mailer  = (from:string,to:string[],subject:string,messge_content:string,cb:Function)=>{

  

    //   let transporter = nodemailer.createTransport({
    //          host: keys.h,
    //          port: 465,
    //        //  port: 587,
    //          auth: {
    //              user:keys.u,
    //              pass: keys.p
    //          }

    //  })

// //console.log(fs.readFileSync(path.join(__dirname,'dkim.pem'),'utf-8'))
//      transporter.use('stream', require('nodemailer-dkim').signer({
//       domainName: 'abp.com.ng',
//       keySelector: '2017',
//       privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'),'utf-8')
//     //  privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'))
//   }));

  let transporter = nodemailer.createTransport({
    host: keys.h,
    port: 465,
    auth: {
            user:keys.u,
            pass: keys.p
    },

    secure: true,
    dkim: {
        keys: [
            {
                domainName: 'abp.com.ng',
                keySelector: '2017',
                privateKey: fs.readFileSync(path.join(__dirname,'dkim.pem'),'utf-8') 
            
            },
            // {
            //     domainName: 'example.com',
            //     keySelector: '2016',
            //     privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...'
            // }
        ],
        cacheDir: false
    }
});
    
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