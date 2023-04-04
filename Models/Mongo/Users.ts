import mongoose, { Schema } from 'mongoose'
import { sessionObject } from './Session';
import { passwordObject } from './Password_reset';

export const User = 
new Schema(
    
    {
    'first_name': {
        'type': String,
        'required': true,
    },
    'userId': {
        'type': String,
        'required': true,
        //'ref': 'sessions'
    },
    'last_name': {
        'type': String,
        'required': true,
    },
    'email': {
        'type': String,
        'unique': true,
        'required': true,
     ///  'ref':'password_requests'
        
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
        'enum': ['Admin', 'Manager', 'Customer'],
        'default': 'Customer'
    },
    'gender': {
        'type': String,
        'enum': ['Male', 'Female'],
        'required' :true
    },
    'profile_img':{
        'type':String,
         //require:true,
        'default':"/public/images/avater/ava.png"
    },
    'created_at':{
        'type':Date,
        'default':Date.now
    },
    'updated_at':{
        'type':Date,
        'default':Date.now
    },

    session:sessionObject,
    passwoedReset:passwordObject
}
, { 'timestamps': true });

//const User = mongoose.model('users', schema)
