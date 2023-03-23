let fs   = require('fs');
let fsPromise  = fs.promises;
let path   = require('path');
const root_folder  = require('../../Lib/Config/keys/Key').ROOT_FOLDER
let re   = new RegExp(`.+${root_folder}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 

let fsObj  = {
    readFile:($path,writeToFile=false)=>{
           if(fs.existsSync($path)){
               let rf  = fs.createReadStream($path,{encoding:'utf-8'})
                let  ma  = $path.match(/.+(?=\.)/) 
                let  ext  = $path.match(/(?<=\.).+/) 
              //  console.log(ext) 
               let wf  = fs.createWriteStream(ma[0]+'_new.'+ext )
               rf.on('data',(data)=>{
                 console.log(writeToFile)

                  //do something
               })
                if(writeToFile){
                   rf.pipe(wf)
                }
       
            
           }else{
            console.log($path +' does not find')
             return false
           };
    },
}


let addToData  = async ($path,$data)=>{
  
      if(fs.existsSync($path)){
       // console.log($path);
          try {
              await fsPromise.appendFile($path,$data);
               return true;
          } catch (error) {
             console.log('error is :'+error);
             return false;
          }
          
      }else{
        console.log("path not found")
        return false;
      }

}

let getData = async ($path)=>{
 
  if(fs.existsSync($path)){
    ///console.log($path);
      try {
          await fsPromise.readFile($path , {encoding:'utf-8'});
           return true;
      } catch (error) {
         console.log('error is :'+error);
         return false;
      }
      
  }else{
    console.log("path not found")
    return false;
  }

}
let add_Data = async ($path,$data)=>{
  if(fs.existsSync($path)){
     try {
       await fs.writeFile($path,$data,(err)=>{
         if(err){
           console.log(err)
           return false;
         }
       }) 
     } catch (error) {
       console.log(error)
     }
    
  }
} 
 
//addToData(path.join(root,'Model','file.txt'),'\n d ddNS is faking people too muh in ')

//fsObj.readFile(path.join(root,'Model','file.txt'),true)

module.exports = {addTo:addToData,add:add_Data}