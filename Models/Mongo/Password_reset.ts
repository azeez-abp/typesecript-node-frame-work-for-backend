import mongoose from "mongoose";

export const passwordObject  = new mongoose.Schema ({
    'email':{
     'type': String,
      'required':true,
      'ref':'users'
    },
    'user':{  //the field create one to one relationship to users model 
        'type':mongoose.Schema.Types.ObjectId,/////to lock the relation when password_requests model save new document, users._id must be save as value of user key 
         'required':true, ////if this include many users, wrap the value of user key in array [{type:mongoose.Schema.Types.ObjectId}] this is one to many relation
         'ref':'users'
       },
    'token':{
        'type':String,
         'required':true,
       },
    'previous_passwords':{
        'type':Array,
         'default':true,
       },
    'created_at':{
        'type':Date,
        'default':Date.now
    },
    'updated_at':{
        'type':Date,
        'default':Date.now
    }
})
