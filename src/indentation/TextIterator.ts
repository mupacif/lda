import { TextDocument, TextLine } from 'vscode';
/***
 * class Iterateur de String
 */
export class TextIterator {
    text:TextDocument;
    cursor:number;
    constructor(text: TextDocument) {
      console.log(text.lineCount);
      this.text = text;
      this.cursor = -1;
    }
    nextLine():TextLine{
 
      return this.text.lineAt(++this.cursor);
    }
    hasNext():boolean
    {
      return this.cursor+1 < this.text.lineCount;
    }
  
  }