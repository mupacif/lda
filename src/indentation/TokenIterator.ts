import tokens from "./Tokens";
import { TextLine } from "vscode";
/**
 * Cette classe permet de detecter des tokens dans 
 * une ligne de texte du document
 */
export default class TokenIterator{
    //la ligne
    line : TextLine;
    //la place du curseur
    cursor: number;
    //la liste des tokens et leurs positions
    list: Array<[String,number]>;
    /**
     * recoit la ligne 
     * @param line la ligne
     */
    constructor(line:TextLine)
    {
        this.line = line;
        this.cursor = -1;
        this.list = [];
        this.tokenize();
    }
    /**
     * Analyse les tokens de la ligne
     */
    private tokenize(){
        // console.log("tokenizing");
        
        let reg = tokens.map(e => `${e[0]}|${e[1]}`).join('|'); 
        var regexp = new RegExp(reg, 'gi');
        let match;
        while ((match = regexp.exec(this.line.text)) !== null){
            // console.log(`tokenizing++:${match[0]}`);
            let foundToken = match[0];
            let position = regexp.lastIndex;
            // let position = match.index;
            this.list.push([foundToken,position]);
        }
    }
    /**
     * @returns le token trouvé
     */
    nextToken():[string,number]{
        if(this.cursor > this.list.length - 1 )
            return ["",0];
    
        return this.list[++this.cursor] as [string,number];
    }
    /**
     * @returns si le prochain token existe
     */
    hasNext():boolean
    {
    return this.cursor+1 < this.list.length;
    }
    /**
     * @returns si la lligne contient de tokens
     */
    hasTokens():boolean
    {
        return this.list.length>0;
    }
    /**
     * le nombre de tokens
     */
    size():number{
        return this.list.length;
    }


}