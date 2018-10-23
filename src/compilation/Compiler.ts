
/**
 * all compilator should implement this class
 */
export default abstract class Compiler {
    //the document.toString()
    document: string;
    constructor(doc:string){
        this.document = doc;
    }
    abstract compile():string;
    
}