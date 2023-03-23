const express = require('express');
import { Request } from 'express';
//import { Express,Request,Response} from 'express';
import multer = require('multer');
import path = require('path');
import sharp = require('sharp');
import { randomStr } from '../../Functions/RandonString';


export class MulterSetting  {

public getStoragePath($path:string):{upload:multer.Multer,resizer:typeof sharp}{

        const storage = multer.diskStorage(
            {  
        
            destination: function(req, file, cb) {
                cb(null, $path);
                return;
              
            },
        
            filename: function(req, file, cb) {
                 let fn :string = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
                 let fn2:string = randomStr(32)+path.extname(file.originalname)
                 console.log(fn,fn2)
                cb(null, fn2);
            },
           
         

        } as multer.DiskStorageOptions);   
     
      var upload = multer({
         storage: storage,
    //     fileFilter: function(req:Request,file:object,cb:Function){
    //    // console.log(req.files,'file')
    //     return cb(null, true)
    //    } 
   }
   )
        
  return {upload,resizer:sharp}
}

}

 

  
