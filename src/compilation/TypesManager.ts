export default class TypesManager {
    types:any;
    constructor(text: string) {
        this.types = {};
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
 
            regx = "var(.*?):\s*?"+item[0];
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
            this.types[variable]=type;
    }

    /**
     * return the type 
     * @param variable dont on veut le type de retour
     */
    getType(variable:string):string{
        return this.types[variable];
    }
}