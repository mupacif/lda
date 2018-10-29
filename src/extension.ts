'use strict';
import { TextIterator } from "./indentation/TextIterator";
import TokenIterator from "./indentation/TokenIterator";
import Tokens from "./indentation/Tokens";
import TokenUtil from "./indentation/TokenUtil";
import * as vscode from 'vscode';
import CompileToC from "./compilation/toC/CompilerToC";
import Compilator from "./compilation/Compilator";

export function activate(context: vscode.ExtensionContext) {

    //on ajoute la tabulation quand l'user appuye sur enter
    vscode.languages.setLanguageConfiguration('lda',
        {
            onEnterRules: [
                {
                    beforeText: /^.*(?:alors|faire|sinon|répéter)\s*$/,
                    action: { indentAction: vscode.IndentAction.Indent }
                }
            ]
        }
    );

    //commande de compilation en C
    let disposable = vscode.commands.registerCommand('extension.lda', () => {

        let docs = vscode.window.activeTextEditor;
 

        if(!docs){
            vscode.window.showWarningMessage('mettez vous dans le fichier "lda" que vous voulez convertir');
            return;
        }
        let compilator = new Compilator(new CompileToC(docs.document.getText()));
                
            // The code you place here will be executed every time your command is executed
            //créer un fichier avec du texte
            vscode.workspace.openTextDocument({ language: "c", content: compilator.getResult() }).then(doc => vscode.window.showTextDocument(doc));
            // Display a message box to the user

    });

    context.subscriptions.push(disposable);


    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('lda', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            //la ligne à lire
            let line: vscode.TextLine;
            //la classe qui examine les tokens su lda (si, sinon, pour,etc..)
            let tokenIterator: TokenIterator;
            //niveau d'imbrication du bloc
            let lvl = 0;
            //liste des token de fin (fsi, fpour,ftant) pour les retrouver facilement
            let stack: Array<string | null> = []
            //pour les tokens inhabituels comme sinon qui ne changent pas de lvl
            let offsetTok: number = 0;
            //classe permettant de savoir si un token est ouvrant ou fermant
            let tu = new TokenUtil(Tokens);
            //liste des éditions au document
            let edits: vscode.TextEdit[] = [];
            //classe permettant de parcourir le document
            let ti = new TextIterator(document);
            //si le document a une ligne à ligne
            while (ti.hasNext()) {
                //on lit la ligne
                line = ti.nextLine();
                //on compte les tokens dans la ligne
                tokenIterator = new TokenIterator(line);
                //initialisation des variables
                offsetTok = 0;
                //petit check
                // console.log(tokenIterator.size());
                //si la ligne contient des tokens
                while (tokenIterator.hasNext()) {
                    //petit checking
                    // console.log("faku")
                    //on recupère le tocken
                    let tok = tokenIterator.nextToken()[0];
                    //s'il est ouvrant
                    if (tu.isOpening(tok)) {
                        //on l'enregistre
                        stack.push(tu.getClosing(tok));
                        //la ligne du token ne doit pas changer de niveau
                        offsetTok = -1;
                        //on monte de niveau
                        lvl++;
                        console.log(`level up ${tok} : ${lvl}`);

                    } else {
                        // sinon il est férmant on descent de niveau
                        if (stack.length > 0 && stack[stack.length - 1]!.indexOf(tok) != -1) {
                            let dclosingTok = stack.pop();


                            //on descend de niveau
                            lvl--;
                            //le cas particulier du sinon qui doit descendre d'un niveau
                            //mais les ligne après doit rester au mement niveau
                            if (tok == "sinon" && dclosingTok!.indexOf("sinon") != -1) {
                                console.log(`same level ${tok}: ${lvl}`);
                                stack.push("fsi");
                                //on reminte le niveau jusqu'au fsi
                                lvl++;
                                //on doit redescendre de niveau
                                offsetTok = -1;
                            } else {
                                console.log(`level down ${dclosingTok}: ${lvl}`);
                            }
                        }
                    }
                }
                // on sauvegarde l'édition
                // edits.push(vscode.TextEdit.insert(line.range.start, "  ".repeat(lvl+offsetTok)));
                edits.push(vscode.TextEdit.replace(line.range, "\t".repeat(lvl + offsetTok).concat(line.text.trim())));



            }
            //on execute l'édition
            return edits;

        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}