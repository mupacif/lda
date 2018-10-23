import Compiler from "./Compiler";

export default class Compilator{
    //the compilator
    compiler:Compiler;

    constructor(compiler:Compiler){
        this.compiler = compiler;
    }
    //result of compilation
    getResult():string{
        return this.compiler.compile();
    }
}