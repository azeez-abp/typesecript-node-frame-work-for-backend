export const passwordObject  = {
    'email':{
     'type':String,
      'required':true,
    },
    'token':{
        'type':String,
         'required':true,
       },
    'created_at':{
        'type':Date,
        'default':Date.now
    },
    'updated_at':{
        'type':Date,
        'default':Date.now
    }
}
