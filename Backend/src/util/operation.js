import Conversation from "../services/ConversationService.js";
import coder from "../util/decoder.js";
import crypto from "crypto";
import forge from "node-forge";
import FirmadorRSA from "./RSA/FirmadorRSA.js";
import GeneratorKey from "./RSA/Generator.js";
import path from "path";
import fs from "fs";
const conversation = new Conversation();
const Coder = new coder();
const firmador = new FirmadorRSA();
const generator = new GeneratorKey();

class operations {
  constructor(tree) {
    this.tree = tree;
  }

  InsertData(person) {
    try {
      person.companies = Coder.codificacion_persona(person);
      this.tree.insertNode(person);
      return this.tree;
    } catch (error) {
      return console.log("Dato no insertado por " + error);
    }
  }

  DeleteData(person) {
    try {
      this.tree.deleteNode(person);
      return this.tree;
    } catch (error) {
      return console.log("Dato no eliminado por " + error);
    }
  }

  PatchData(person) {
    try {
      if (this.tree.patch(person) !== null) {
        this.tree.patch(person);
        return this.tree;
      }
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }

  PreOrder() {
    try {
      this.tree.preOrder();
      return this.tree;
    } catch (error) {
      console.log("Error durante el preorder:", error);
    }
  }
  getJSONL(path) {
    try {
      if (this.tree.exportToJSONLFile(path)) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("Error durante la conversion del JSONL:", error);
    }
  }

  searchByName(name) {
    try {
      const result = this.tree.searchByName(name);
      return result;
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }
  searchByDpi(dpi) {
    try {
      const result = this.tree.searchByDpi(dpi);
      if (this.tree.searchByDpi(dpi) !== null) {
        return result;
      }
      return result;
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }
  searchByNameDpi(dpi, name) {
    try {
      const result = this.tree.searchByDpi(dpi);
      if (this.tree.searchByDpi(dpi) !== null) {
        if (result[0] != name) {
          return "No coincide el nombre con el DPI";
        }
        
        return result;
      }
      return result;
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }
  deleteByNameDpi(name, dpi) {
    try {
      const result = this.tree.searchByDpi(dpi);
      this.tree.deleteNode(result);
      return result;
    } catch (error) {
      console.log(`Se obtuvo este error ${error}`);
    }
  }

  getConversationInfo(messages) {
    try {
      const conversationObject = {};
      messages.forEach((element, index) => {
        conversationObject[`Conversacion${index + 1}`] = element;
      });
      return conversationObject;
    } catch (error) {
      return error;
    }
  }

  getConversation(dpi){
    const encriptacion = conversation.getConversationContent(dpi);
    conversation.saveConversationOnTxt(dpi);
    const desencriptada = conversation.getConversationContentCypher(dpi);
    conversation.saveConversationDecipherOnTxt(dpi);
    conversation.clearLists();
    const message = this.getConversationInfo(encriptacion);
    return message;
  }
  getConversationDecipher(dpi){
    const desencriptada = conversation.getConversationContentCypher(dpi);
    conversation.saveConversationDecipherOnTxt(dpi);
    conversation.clearLists();
    const message = this.getConversationInfo(desencriptada);
    return message;
  }

  compareHashes(mensajeOriginal, mensajeNuevo){
    const hashOriginal = crypto.createHash('sha256').update(mensajeOriginal).digest('hex');
    const hashNuevo = crypto.createHash('sha256').update(mensajeNuevo).digest('hex');
    if(hashOriginal === hashNuevo){
      return true
    }
    return false
  }


  async signProcess(message, dpi) {
    const bits = 512;
    const keys = generator.generateRSAKeys(bits);
    let contador = 1;
    for (const conversacion in message) {
      if (message.hasOwnProperty(conversacion)) {
        const mensaje = message[conversacion];
        console.log(`Conversación: ${mensaje}`);
        const { hash, signature } = firmador.firmar(keys.privateKey, mensaje);
        this.escribirCSV(dpi, hash, signature, contador);
      }
      contador++;
    }
  }
  escribirCSV(nombreArchivoOriginal, hash, firma, contador) {
    const data = `${nombreArchivoOriginal};${hash};${firma};${contador}\n`;
    fs.appendFile('./src/data/RSA/signatures.csv', data, (err) => {
      if (err) {
        console.error('Error al escribir en el archivo CSV:', err);
      } else {
        console.log('Datos escritos en signatures.csv');
      }
    });
  }
}

export default operations;
