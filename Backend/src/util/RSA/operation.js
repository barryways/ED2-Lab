import BigNumber from "bignumber.js";

export default class Operation {
    stringToBigInteger(message) {
        let cipherString = "";
        for (let i = 0; i < message.length; i++) {
            let ch = message.charCodeAt(i);
            cipherString += ch.toString().padStart(3, '0');
        }

        return new BigNumber(cipherString);
    }

    bigIntegerToString(message) {
        let cipherString = message.toString();
        let output = "";
        for (let i = 0; i < cipherString.length; i += 3) {
            let temp = parseInt(cipherString.substr(i, 3));
            let ch = String.fromCharCode(temp);
            output += ch;
        }
        return output;
    }
}