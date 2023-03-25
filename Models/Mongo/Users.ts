import mongoose, { Schema } from 'mongoose'

export const User = 
//new Schema(
    
    {
    'first_name': {
        'type': String,
        'required': true,
    },
    'last_name': {
        'type': String,
        'required': true,
    },
    'email': {
        'type': String,
        'unique': true,
        'required': true,
    },
    'phone': {
        'type': String,
        'unique': true,
        'required': true,
    },
    'password': {
        'type': String,
        'required': true,
        'select': false
    },
    'address': {
        'type': String,
        'required': true,
        'select': false
    },
    'city': {
        'type': String,
        'required': true,
        'select': false
    },
    'state': {
        'type': String,
        'required': true,
        'select': false
    },
    'role': {
        'type': String,
        'enum': ['admin', 'manager', 'customer'],
        'default': 'customer'
    },
    'profile_img':{
        'type':String,
         //require:true,
        'default':"/public/images/avater/ava.png"
    },
}
//, { 'timestamps': true });

//const User = mongoose.model('users', schema)
