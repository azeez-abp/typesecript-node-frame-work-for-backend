import {describe, expect, test} from '@jest/globals';
import MysqlDB from "./Database/Mysql/SequenlizeDB";
import { MongoDB } from './Database/Mongo/Mongo';
import { da } from 'date-fns/locale';
import assert from 'assert';
//const MysqlDB  = require("./Database/Mysql/SequenlizeDB")

test('Should return data object',async () => { 
 //const data = await MysqlDB.getInstance().table('users').findAll()
 const data  = await MongoDB()
  const out = await data.tables.users .length > 0;
 expect(out).toBeTruthy()
 //assert(1)
 },2000*1000)

//  test('be 2',async () => { 
   
//     expect(1+1).toBe(2)
//     })
