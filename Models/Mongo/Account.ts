import mongoose, { Schema } from 'mongoose'
export const Account = 
new Schema(
    
    {
    
    'balance': {
        'type': Number,
        'required': true,
    },
    'accountNumber': {
        'type': Number,
        'required': true,
        'length':10
    },
    'userId': {
        'type': String,
        'required': true,
        //'ref': 'sessions'
    },
    'userObjectId': {
        'type':Schema.Types.ObjectId ,
        'required': true,
        'ref': 'users'
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
