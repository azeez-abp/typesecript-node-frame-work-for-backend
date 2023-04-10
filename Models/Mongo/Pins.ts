import mongoose, { Schema } from 'mongoose'
export const Pin = 
new Schema(
    
    {
    'pin': {
        'type': String,
        'required': true,
    },
    'salt': {
        'type': String,
        'required': true,
    },
    'userId': {
        'type': String,
        'required': true,
        //'ref': 'sessions'
    },
    'userObjectId': {
        'type':Schema.Types.ObjectId ,
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
