export default class TypesManager {
    types:any;
    //dico var:boolean(vrai si primitive-sinon false)
    var_type:any;
    constructor(text: string) {
        this.types = {};
        this.var_type={};
        let liste = [
            ["entier","%d"],
            ["réel","%lf"],
            ["booléen","%d"],
            ["caractère"," %c"]
        ];
        let regx="";
        //for each of all types
        for(var i=0;i<liste.length;i++)
        {   //get the type (entier-d)
            let item = liste[i];
 
            regx = "(?:var|tableau|tab)(.*?):\s*?"+item[0];
            var regexp = new RegExp(regx, 'gi');
            let match;
            //for each token scan all variables 
            while ((match = regexp.exec(text)) !== null){
                let tokens = match[1];
                //scan all sub variables
                
                this.setVars(item[1],tokens);
            }
            
        }
    }
    /**
     * scan the list of variables
     * @param type d,lf,..
     * @param text variables list
     */
    setVars(type:string,text:string){
        
        let tokens = text.split(",");
        tokens.forEach(e=>{
            let tok = e.trim();
            this.setTypes(type,tok);  
        });

    }
    /**
     * save the type
     * @param type d-lf-..
     * @param variable variable name
     */
    setTypes(type:string,variable:string){
        let outVariable = variable.replace(/\[.*\]/g,"");
        //DETERMINATION si on a à faire à un tableau ou non
        this.var_type[outVariable]=!variable.includes("[");
        //on supprime les [] des tableaux aussi
        this.types[outVariable]=type;
    }

    /**
     * return the type 
     * @param variable dont on veut le type de retour
     */
    getType(variable:string){
        // return this.types[variable];
        for(var key in this.types) {
            if(variable.includes(key))
                return this.types[key];
        }
        return undefined;
    }
    /**
     * determine si une variable est primitive ou non
     * @param variable dont on veut connaitre le type
     */
    isPrimitive(variable:string):boolean{
        return this.var_type[variable]||false
    }
}