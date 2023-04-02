import * as fs from 'fs'
import * as fsPromise from 'fs/promises'
//let fsPromise  = fs.promises;
// const root_folder  = require('../../Lib/Config/keys/Key').ROOT_FOLDER
// let re   = new RegExp(`.+${root_folder}`)
// let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 

let fsStreamingObj  = ($path:string,writeToFile:boolean=false):boolean=>{
           if(fs.existsSync($path)){
                let rf  = fs.createReadStream($path,{encoding:'utf-8'})
                let  ma:any  = $path.match(/.+(?=\.)/)
                let  ext  = $path.match(/(?<=\.).+/) 
              //  console.log(ext) 
               let wf  = fs.createWriteStream(ma[0]+'_new.'+ext )
              //  rf.on('data',(data)=>{
              //   // console.log(writeToFile)
              //  })
                if(writeToFile){
                   rf.pipe(wf)
                  
                }
       
            
           }else{
            console.log($path +' does not find')
             return false
           };
    return true
}


let appendDataToFile  = async ($path:string,$data: string):Promise<any>=>{
  
      if(fs.existsSync($path)){
       // console.log($path);
          try {
            return await fsPromise.appendFile($path,$data);
          } catch (error) {
             console.log('error is :'+error);
             return false;
          }
          
      }else{
        console.log("path not found")
        return false;
      }
  //return false
}

let getData = async ($path:string):Promise<any>=>{
 
  if(fs.existsSync($path)) {
    ///console.log($path);
      try {
        return  await fsPromise.readFile($path , {encoding:'utf-8'});
         
      } catch (error) {
         console.log('error is :'+error);
         return false;
      }
      
  }else{
    console.log("path not found")
    return false;
  }

}
let addDataToFile = async ($path:string,$data:string)=>{
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

export const fileFunction:any= {
  appendDataToFile ,
  addDataToFile,
  getData,
  fsStreamingObj

}