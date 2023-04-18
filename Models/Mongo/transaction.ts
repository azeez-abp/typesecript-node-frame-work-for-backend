import mongoose, { Schema } from 'mongoose'
export const Account = 
new Schema(
    
    {
    
    'amount': {
        'type': Number,
        'required': true,
    },
    'debited': {
        'type': Boolean,
        'required': false,
        'length':10
    },
    'sourceNumber': {
        'type': Number,
        'required': true,
        'length':10
    },
    'destinationNumber': {
        'type': Number,
        'required': true,
        'length':10
    },
    'card': {
        'type': Object,
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
        'ref': 'users'
    },
  

}
, { 'timestamps': true });

//const User = mongoose.model('users', schema)
