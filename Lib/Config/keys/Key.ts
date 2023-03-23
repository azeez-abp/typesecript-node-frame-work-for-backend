import { CONFIG_PROD } from "./prod/ProdKey"
import { CONFIG_DEV } from "./dev/KeyDev";

export const  configVar:Function  = ()=>{
if(process.env.NODE_ENV==="production"){
 //  module.exports = require("./prod/ProdKey")
 //console.log("LIV")
    return CONFIG_PROD;
}else{
  // console.log("LOCAL",CONFIG_DEV )
   return CONFIG_DEV 
}    
}