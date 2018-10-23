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
let tmplt = 
`#include <stdio.h>

int main(int argc,char *argv[]) {
${docTxt}
return 0;
}
`;
         this.printfCorrection(tmplt);
         return tmplt;
     }

     printfCorrection(doc: string){
         console.log("printf??");

        // two matches: opening <h1> and closing </h1> tags
        let reg = /printf\((.*?)\)/gm;
        
        let match;
        
        while (match = reg.exec(doc)) {
          // first shows the match: <h1>,h1
          // then shows the match: </h1>,/h1
            console.log(match[1]);
            let reg = /[(,](.*?)[,)]/gm;
            let match2 ;
            while (match2 = reg.exec(match[1])) 
                   console.log(match2);  
            
        }
     }
}