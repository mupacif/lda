# 

## Usage

### installation

  * ouvrir la palette de commande <kbd>Ctrl+P</kbd>.
  * Ecrire `ext install lda` dans la palette.
  * ou bien choisissez le dernier logo (extensions)
  * ![installation](https://user-images.githubusercontent.com/6844928/47269705-fb551000-d561-11e8-8699-3ebbcee6b608.gif)
### usage

## coloration syntaxique
* pour activer l'extention soit enregistrez vos fichier en .algo ou .lda
* ou bien choisissez le language dans les choix(comme sur le gif)
* ![coloration](https://user-images.githubusercontent.com/6844928/47269722-2b9cae80-d562-11e8-860d-582fda6c8e93.gif)

## identation
* <kbd>Shift+alt+f</kbd> (Windows)
* ![identation](https://user-images.githubusercontent.com/6844928/47269741-74546780-d562-11e8-9015-2e3b89822b35.gif)
## suggestions / snippets 
* <kbd>Ctrl+Space</kbd> (Windows)
* ![snippets](https://user-images.githubusercontent.com/6844928/47269763-ac5baa80-d562-11e8-97a2-95602783746b.gif)

## conversion en template C 
  * ouvrir la palette de commande <kbd>Ctrl+Shift+P</kbd>.
  * Ecrire `lda to c` dans la palette.
  * choisir 
  
  ![template C](https://user-images.githubusercontent.com/6844928/47269795-fe043500-d562-11e8-8659-171f8117890e.gif)

### remarques
 * en c , les conditions du do-while sont l'inverse du répéter-tantque, donc modifiez pour le pas rester coincé dans la boucle

 * tous les mots contenant mod et div sont bug


 ##LDA
### déclaration
*var varible,varible2,..:type
*tableau tab1[taille],tab2[taille]:type


#### types :
 *   entier 
 *   caractère
 *   réel
 *   booléen (n'existe pas en C)


### altérnatives 
 *   si condition alors
        quoi
    fsi

 *   si condition alors
        quoi
    sinon
        quoi?
    fsi

### boucles
*    répéter
        quoi
    jusqu'à-ce-que condition
*    tant-que condition faire
        quoi
    ftant
*    pour element de val_init à val_finale faire
        quoi
    fpour


### opérateurs arithmétiques 
* / * + - DIV MOD
### opérateurs de comparaison
* > < >= <= <> = 
### affectations 
* <- <>(pas dispo en C)

## types supportés

  * `.lda`
  * `.algo`


## License

This software is released under the terms of the MIT license.