const bcrypt  = require('bcrypt');
const passport = require('passport');
const Key = require('../Lib/Config/keys/Key');
const LocalStrategy = require('passport-local').Strategy;


let mongoPassportLocal   = function(passport,db) {
    let FieldMap  = {usernameField: 'email',  passwordField: 'pass' }; 

    let callbackVerify    = (username, password, done) => {
        if(!username || !passport){
                return done(null, false, { message: 'all fields are required' });
             }  // Match user
        db.findOne({email: username}).then(user => {
          
            
             //console.log(user,"rtyui")
       //   console.log(user.email,username,password);        //logged user name.
  
          if (!user) {
  
            return done(null, false, { message: 'That email is not registered' });
          }
  
          // Match password
          const isMatched = bcrypt.compareSync(password, user.pa);
  
            if (isMatched) {
                console.log('password matched.');         //logged when password matched.
              return done(null, user,{suc:'login done'});
            } else { console.log('password not matched.');    //logged when password not matched.
              return done(null, false, { err: 'Password incorrect' });
            } 
        });
      }
      


    passport.use(new LocalStrategy(FieldMap,callbackVerify) );

    passport.serializeUser(function(user, done) {
        console.log('serialized: ', user);       //logged when credentials matched.
      return done(null, user.userId);
    });
  
    passport.deserializeUser(function(id, done) {
      db.findOne(id, function(err, user) {
          console.log('deserialized');
  
        return done(null, user.userId);
      });
    });
  
  };



  let mysqlPassportLocal   = function(db) {
    let FieldMap  = {usernameField: 'email',  passwordField: 'pass' }; 

    let callbackVerify    = (username, password, done) => {
        if(!username || !passport){
                
                return done(null, false, { message: 'all fields are required' });
             }  
         //   console.log(username,'PPPP')  // Match user
        db.findOne({ where:{ email: username} }).then(user => {
           
            user = user?user.dataValues:null;
             //console.log(user,"rtyui")
       //   console.log(user.email,username,password);        //logged user name.
  
          if (!user) {
  
            return done(null, false, { message: 'That email is not registered' });
          }
  
          // Match password
          const isMatched = bcrypt.compareSync(password, user.pa);
  
            if (isMatched) {
                console.log('password matched.');         //logged when password matched.
              return done(null, user,{suc:'login done'});
            } else { console.log('password not matched.');    //logged when password not matched.
              return done(null, false, { err: 'Password incorrect' });
            } 
        });
      }
      


    passport.use(new LocalStrategy(FieldMap,callbackVerify) );

    passport.serializeUser(function(user, done) {
        console.log('serialized: ', user);       //logged when credentials matched.
      return done(null, user.userId);
    });
  
    passport.deserializeUser(function(id, done) {
      db.findOne(id, function(err, user) {
          console.log('deserialized');
  
        return done(null, user.userId);
      });
    });
  
  };


  module.exports  = Key.DB_TYPE==='mongo'?mongoPassportLocal:Key.DB_TYPE==='mysql'?mysqlPassportLocal:null;