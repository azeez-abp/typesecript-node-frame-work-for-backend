const {format}  = require("date-fns")
const {v4:uuid}  = require("uuid")
const fs = require("fs")
const fsPromisify  = require("fs").promises
const paths   = require("path")
class Logs{

 async accesss(message:string){
    const dateTime  = `${format(new Date(),'yyyy-mm-dd\tHH:mm:ss')}`
    const  logItem  = `\n${dateTime}\t${uuid()}\t${message}`
    console.log(logItem, `\nfrom ${__dirname}`)
      try {
        if(!fs.existsSync(paths.join(__dirname,'logs'))){
            await  fsPromisify.mkdir(paths.join(__dirname,'logs'))
        }
        await  fsPromisify.appendFile(paths.join(__dirname,'accessLog.text'),logItem)
      } catch (error) {
        console.log(error,'is error from',__dirname) 
      }
}

async error(message:string){
    const dateTime  = `${format(new Date(),'yyyy-mm-dd\t\tHH:mm:ss')}`
    const  logItem  = `\n${dateTime}\t${uuid()}\t${message}`
    console.log(logItem, `\nfrom ${__dirname}`)
      try {
        if(!fs.existsSync(paths.join(__dirname,'logs'))){
            await  fsPromisify.mkdir(paths.join(__dirname,'logs'))
        }
        await  fsPromisify.appendFile(paths.join(__dirname,'errorLog.text'),logItem)
      } catch (error) {
        console.log(error,'is error from',__dirname) 
      }
}

}

export default Logs;
