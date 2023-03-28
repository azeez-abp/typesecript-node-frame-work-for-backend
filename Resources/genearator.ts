
/**
 * ALthogh this function ise generator, we havn't know the limit it can reach, 
 * but acccording to genearator theory, this loop never stop;
 * @param json of the database onject. this objects is register in Resource folder and imported to the file
 * where this class is call
 * @param object that contains the key value pair of the replacement {name: "First name"} this will 
 * return json with name replace with first name in the database result
 * @returns return json that conatin the replacement
 * @useage import KeyValueReplacer from this file, on the file where data object is located
 *   console.log(KeyValueReplacer.replace($json,$map))
*/
class keyValueReplace{

   private * keyReplacer($json:any,map:any){
        // if(Object.keys($json).length>0){
        //     $json  = [$json]
        // }
        let len  = $json.length
        let num  = 0
         while (num < len){
         
          let ks  = Object.keys( map)
          let v:any = Object.values( map)
          let newobj:any  = {}
          let new_obj_arr:object[]  = []///arrayofobject 
          ks.forEach( (k,i) => {
              if( $json[num][k]){
                 newobj[v[i]]  = $json[num][k]
              }
          });
         // console.log(newobj)
         new_obj_arr  = [...new_obj_arr,newobj]
           
          num++
          yield new_obj_arr
         
         }

        }


     public replace($json:object[],$map:object){
       
        for(let n of  this.keyReplacer($json,$map)){
            return n
        }
     }   
}

export const KeyValueReplacer   = new keyValueReplace()