'use strict';
import fs from 'fs';
class lz78 {
    constructor(){

    }
    compress(stream){
        try {
            
            let dictionary = {};
            let offset = 0;
            let extra = 0;
            let result = [];
            
            dictionary['\0'] = 0;  // Inicializa el diccionario con el valor nulo
            
            while (true) {
                let buffer = "";
                let index = -1;
                
                for (let i = offset; i <= extra; i++) {
                    buffer += stream.charAt(i);
                    if (dictionary.hasOwnProperty(buffer)) {
                        extra++;
                    }
                }
                
                index = dictionary[buffer];
                
                if (index === undefined) {
                    // Agrega el nuevo prefijo al diccionario
                    dictionary[buffer] = Object.keys(dictionary).length;
                    if (buffer.length === 1) {
                        result.push(0 + ', ' + [buffer]);
                    } else {
                        result.push(dictionary[buffer.slice(0, -1)] + ', ' + [buffer.slice(-1)]);
                    }
                }
                
                offset = ++extra;
                
                if (extra === stream.length){
                    break;
                }
                else if(extra ===(stream.length - 1 )){
                    break;
                }
                 
            }
            
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    decompress(input){
        let
        result = "",
        dictionary = [];

    dictionary.push('\0');
    for (let i = 0; i < input.length; i++) {
        let 
            entryArray = input[i].split(', '),
            buffer = "";

        if (entryArray[0] !== '0') { // If it's a combination of characters.
            buffer += dictionary[parseInt(entryArray[0])] + entryArray[1];
            dictionary.push(buffer);
        } else { // If it's a single character.
            dictionary.push(entryArray[1]);
            buffer += entryArray[1];
        }

        result += buffer;
    }

    return result;
    }
}


export default lz78;


