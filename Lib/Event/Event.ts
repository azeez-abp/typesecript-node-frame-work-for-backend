const EventEmitter  = require('events')
const LogEvent  = new EventEmitter()
import Logs from './../../Log/Log'

LogEvent.on('error_log',(message:string)=>{
    let log :Logs  = new Logs();
    log.error(message)
})

LogEvent.on('access_log',(message:string)=>{
    let log :Logs  = new Logs();
    log.accesss(message)
})

export const LogEvents = LogEvent