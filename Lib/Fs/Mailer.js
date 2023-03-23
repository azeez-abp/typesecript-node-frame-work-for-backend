const nodemailer = require('nodemailer');

const keys  = require('./Config/keys/Key')
    module.exports  = (from,to,subject,messge_content)=>{

 
      let transporter = nodemailer.createTransport({

             host: keys.MAIL_URL.h,
             port: 465,
             auth: {
                 user:keys.MAIL_URL.u,
                 pass: keys.MAIL_URL.p
             }
     })


     message = {
        from: from,
        to: to.join(','),
        subject: subject,
        html: messge_content
    }

     transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info,'done');
        }
    } 
     )

}  