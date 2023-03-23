
export const studentObject = {
    userId:{type:String,unique:true,require:true},
    fn: {type:String,required:true},
    mn: {type:String,required:true},
    ln: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    ge:{type:String},
    pa: {type:String,required:true},
    salt: {type:String,required:true},
    date:{type:String,default:Date.now},
    created_at:{type:String,default:Date.now},
    updated_at:{type:String,default:Date.now},
    lastLogin: {type:Date},
    profile_img:{
        type:String,
         //require:true,
        default:"/public/images/avater/ava.png"
             },
 //   ad: {type:Object},
     sessionToken:{type:String},
};




