import { config } from "dotenv";
config();
export default class encrypter {
  constructor() {
    this.clave = process.env.LETTER_KEY;
  }
  simpleColumnCypher(mensaje) {
    const mensajeLimpio = mensaje.replace(/\s/g, "_");
    const noColumns = this.clave.length;
    const noRows = Math.ceil(mensajeLimpio.length / noColumns);

    const cypherMatrix = new Array(noRows);

    for (let i = 0; i < noRows; i++) {
      cypherMatrix[i] = new Array(noColumns);
    }

    let index = 0;

    for (let i = 0; i < noRows; i++) {
      for (let j = 0; j < noColumns; j++) {
        if (index < mensajeLimpio.length) {
          cypherMatrix[i][j] = mensajeLimpio[index];
          index++;
        } else {
          cypherMatrix[i][j] = "_";
        }
      }
    }

    let codedMessage = "";

    for (let j = 0; j < noColumns; j++) {
      for (let i = 0; i < noRows; i++) {
        codedMessage += cypherMatrix[i][j];
      }
    }

    return codedMessage;
  }

  simpleColumnDecipher(codedMessage) {
    const noColumns = this.clave.length;
    const noRows = Math.ceil(codedMessage.length / noColumns);

    const cypherMatrix = new Array(noRows);

    for (let i = 0; i < noRows; i++) {
      cypherMatrix[i] = new Array(noColumns);
    }

    let index = 0;

    for (let j = 0; j < noColumns; j++) {
      for (let i = 0; i < noRows; i++) {
        cypherMatrix[i][j] = codedMessage[index];
        index++;
      }
    }

    let originalMessage = "";
    for (let i = 0; i < noRows; i++) {
      for (let j = 0; j < noColumns; j++) {
        originalMessage += cypherMatrix[i][j];
      }
    }
    originalMessage = originalMessage.replace(/_/g, " ");

    return originalMessage.trim();
  }
}
