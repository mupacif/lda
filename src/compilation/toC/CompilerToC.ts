import regx = require("./lda2c.json")
import Compiler from "../Compiler.js";
export default class CompileToC extends Compiler {

    constructor(doc: string) {
        super(doc);
    }

    compile():string{
        let rules = regx.rules;
        let docTxt = this.document;
        if (this.document) {
            
            for(let {pattern,replace} of rules)
               {
                   docTxt = docTxt.replace(new RegExp(pattern,"gm"),replace);

                    
                }
         }
         let tmplt = `#include <stdio.h>


         int main(void) {
         \t${docTxt}
         return 0;
         }
         `;
         
         return tmplt;
     }
}