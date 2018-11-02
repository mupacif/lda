import regx = require("./lda2c.json")
import Compiler from "../Compiler.js";
import TypesManager from "../TypesManager.js";
export default class CompileToC extends Compiler {
    // gère les variables 
    tm : TypesManager;
    constructor(doc: string) {
        super(doc);
        this.tm = new TypesManager(doc);
    }
/**
 * "compile" le lda en c
 */
    compile(): string {
        //import des règles de conversion
        let rules = regx.rules;
        //le document à convertir
        let docTxt = this.document;
        if (this.document) {
            //on applique les règles de converstion sur le texte
            for (let { pattern, replace } of rules) {
                docTxt = docTxt.replace(new RegExp(pattern, "gm"), replace);
            }
        }
        //on met la conversion dans une fonction main
        let tmplt =
            `#include <stdio.h>

int main(int argc,char *argv[]) {
${docTxt}
return 0;
}
`;
        //on applique une correction concernant le scanf
        //on applique une correction concerant le printf
        return this.printfCorrection(this.scanfCorrection(tmplt));
        // return tmplt;
    }

    scanfCorrection(doc: string) {
        console.log("scanf");
        let rgx = /scanf\((.*?)\)/gm;
        let out = doc.replace(rgx,(match,p1)=>{
            console.log(p1);
            //Si le type n'existe pas => %?, si primitive & sinon rien
            let out = `scanf("${this.tm.getType(p1)||"%?"}",${this.tm.isPrimitive(p1)?"&":""}${p1})`;
            return out;
        })
       return out;
    }
    
    printfCorrection(doc: string) {
        console.log("scanf");
        let rgx = /printf\((.*?)\)/gm;
       
        let out = doc.replace(rgx,(match,p1)=>{
            //on récupère le coeur du printf
            let tmp = p1.trim();
            let out = "",trail=",";
            //on découpe ce que se trouve entre les ""
            tmp.split(",").forEach((elt:string)=>{
                //si cest du texte ""
                if(elt.includes('"'))
                    out+=elt.replace(/"/g,""); //on ajoute au string fe sorti
                else
                   {
                        //sinon on le remplace pour son type
                        out+=this.tm.getType(elt)||"%?";
                        //on ajoute la variable à la liste
                        trail+=elt+",";
                }
            });
            //on construit le string de sorti, en enleva le , de fin
            let o = `printf("${out}"${trail.slice(0, -1)})`;
            return o;
        })
       return out;
    }
}