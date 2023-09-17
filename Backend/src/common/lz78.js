'use strict';
import fs from 'fs';

var compress = function(stream) { 
    try {
        let 
        dictionary = [],
        offset = 0,
        extra = 0,
        compressed = false,
        result = [];

    dictionary.push('\0');

    while (true) {
        let 
            buffer = "",
            index = -1;

        for(var i = offset; i <= extra; i++) {
            buffer += stream.charAt(i);
            if(dictionary.indexOf(buffer) !== -1) {
                extra++;
            }
        }

        index = dictionary.indexOf(buffer);

        if(index === -1) {
            dictionary.push(buffer);
            if(buffer.length === 1) {
                result.push(0 + ', ' + [buffer.slice(-1)]);
            } else {
                result.push(dictionary.indexOf(buffer.slice(0, buffer.length-1)) + ', ' + [buffer.slice(-1)]);
            }
        }

        offset = ++extra;

        if(extra === stream.length) break;
    }
    return result;
    } catch (error) {
        
        console.log(error)
        return error;
    }  

}

var decompress = function(input) {
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



export {compress, decompress}


