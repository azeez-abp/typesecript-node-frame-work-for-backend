import {describe, expect, test} from '@jest/globals';
import MysqlDB from  "../Database/Mysql/SequenlizeDB";
import { MongoDB } from  "../Database/Mongo/Mongo";
import { da } from 'date-fns/locale';
import assert from 'assert';

//console.log(process.cwd)
//const MysqlDB  = require("./Database/Mysql/SequenlizeDB")

test('Should return data object',async() => { 
 //const data = await MysqlDB.getInstance().table('users').findAll()
 const timer = setTimeout(async() => {
    const data  = await MongoDB()
    const out = await data.tables.users .length > 0;
   expect(out).toBeTruthy()   // Perform some action
  }, 1000);

  // ...

  // Clear the timer to ensure it does not keep Jest from exiting
  clearTimeout(timer);


 })

//  test('be 2',async () => { 
   
//     expect(1+1).toBe(2)
//     })
