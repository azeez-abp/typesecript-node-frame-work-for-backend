import mongoose from "mongoose";

export const sessionObject  = new mongoose.Schema( {
    lastModified:{type:String},
    expires :{type:String},
    rememeber:{type:Number,default:0}, 
    user_id:{type:String,unique:true},
    cookie_id:{type:String,unique:true},
    session_id:{type:String,unique:true},
    cookie:{type:Object},
    table:{type:String},
    user_agent:{type:String}
})

