export const randomStr =  (length:number,include_spacial_char:boolean=false,random_lenght:boolean=false):string=> {
   /**
    * Math.random()*length+length generate random str minimum value is +legth max is lenght+length
    * @return string
   */
   length  = random_lenght? Math.floor(Math.random()*length+length) :length;
    let result           = ''
    let spacials  = '@$&#*!%'
    let characters       = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${include_spacial_char?spacials:''}`;
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

