import mongoose, { Schema } from 'mongoose'
export const Token = 
new Schema(
    
    {
    'token': {
        'type': String,
        'required': true,
    },
    'userId': {
        'type': String,
        'required': true,
        //'ref': 'sessions'
    },
  
    'created_at':{
        'type':Date,
        'default':Date.now
    },
    'updated_at':{
        'type':Date,
        'default':Date.now
    },


}
, { 'timestamps': true });

//const User = mongoose.model('users', schema)
