/**
 * cete classe récoit la liste des tokens du lda
 * et permet de savoir si un token est ouvrant (si, pour, tant,répéter)
 * ou fermant (fsi, ftant,..)
 */
export default class TokenUtil{
  //dictionnaire tokens ouvrant->fermant
  toks : {[idx:string]:string}
  constructor(tokens:string[][]){
    this.toks = {}
    for(let tok of tokens)
       { 
         this.toks[tok[0]]=tok[1];

        }
  }
  /**
   * permet de voir si un token est ouvrant; ex si, pour, etc..
   * @param token le token à tester
   * @returns -vrai si ouvrant
   */
  isOpening(token:string):boolean 
  {
        return token in this.toks;
  }
  /**
   * permet d'avoir le tocken fermant du token ouvrant
   * @param opening tocken ouvrant dont on veut le fermant 
   */
  getClosing(opening:string):string|null
  {
      return this.toks[opening];
  }
}