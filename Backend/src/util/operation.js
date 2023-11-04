import Conversation from "../services/ConversationService.js";
import coder from "../util/decoder.js";
import crypto from "crypto";
import forge from "node-forge";
import FirmadorRSA from "./RSA/FirmadorRSA.js";
import GeneratorKey from "./RSA/Generator.js";
import path from "path";
import fs from "fs";
import RSA from "../common/rsa.js";
import csv from "csv-parser";

const conversation = new Conversation();
const Coder = new coder();
const firmador = new FirmadorRSA();

class operations {
  constructor(tree) {
    this.tree = tree;
  }

  InsertData(person) {
    try {
      
      person.companies = Coder.codificacion_persona(person);
      if(person.dpi == "6789822289548"){
        console.log("Aqui llega sus comapnies son "+person.companies)
      }
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

  getConversation(dpi) {
    const encriptacion = conversation.getConversationContent(dpi);
    conversation.saveConversationOnTxt(dpi);
    const desencriptada = conversation.getConversationContentCypher(dpi);
    conversation.saveConversationDecipherOnTxt(dpi);
    conversation.clearLists();
    const message = this.getConversationInfo(encriptacion);
    return message;
  }
  getConversationDecipher(dpi) {
    const desencriptada = conversation.getConversationContentCypher(dpi);
    conversation.saveConversationDecipherOnTxt(dpi);
    conversation.clearLists();
    const message = this.getConversationInfo(desencriptada);
    return message;
  }

  compareHashes(mensajeOriginal, mensajeNuevo) {
    const hashOriginal = crypto
      .createHash("sha256")
      .update(mensajeOriginal)
      .digest("hex");
    const hashNuevo = crypto
      .createHash("sha256")
      .update(mensajeNuevo)
      .digest("hex");
    if (hashOriginal === hashNuevo) {
      return true;
    }
    return false;
  }

  async signProcess(message, dpi) {
    const rsa = new RSA();
    const keys = rsa.generate(250);

    const clave_publica = keys.n;
    const clave_privada = keys.d;

    let contador = 1;
    for (const conversacion in message) {
      if (message.hasOwnProperty(conversacion)) {
        const mensaje = message[conversacion];
        console.log(`Conversación: ${mensaje}`);
        const originalMessageHash = crypto
          .createHash("sha256")
          .update(mensaje)
          .digest("hex");
        const signature = rsa.sign(mensaje, clave_privada, clave_publica);
        this.escribirCSV(
          dpi,
          originalMessageHash,
          signature,
          clave_publica,
          contador
        );
      }
      contador++;
    }
  }
  escribirCSV(dpi, hash, firma, clave_publica, contador) {
    const data = `${dpi};${hash};${firma};${clave_publica};${contador}\n`;
    fs.appendFile("./src/data/RSA/signatures.csv", data, (err) => {
      if (err) {
        console.error("Error al escribir en el archivo CSV:", err);
      } else {
        console.log("Datos escritos en signatures.csv");
      }
    });
  }

  validar2(dpi, validaciones) {
    let listaValores = this.devolverValores(dpi);
    const rsa = new RSA();
    const listaConversaciones = conversation.getConversationContentDecipher(dpi);
    let contador = 1;
    console.log(listaValores)
    return rsa.verify(listaConversaciones[0], listaValores[2], listaValores[3]);
  }

  devolverValores(dpi) {
    let listaValores = [];
    const archivoCSV = "./src/data/RSA/signatures.csv";

    let dpiEncontrado = null;

    fs.createReadStream(archivoCSV)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        const dpiABuscar = row[0];
        console.log("este es el dpi" + dpiABuscar)
        if (dpiABuscar === dpi) {
          dpiEncontrado = dpi;
          const hash = row["1"];
          console.log("este es el hash "+hash);
          const firma = row["2"];
          console.log("esta es la firma "+firma);
          const clave_publica = row["3"];
          console.log("esta es la clave publica "+clave_publica)
          const contador = row["4"];
          
          const valor = [
            dpi,
            hash,
            firma,
            clave_publica,
            contador,
          ];
          console.log(valor)
          return listaValores.push(valor);
        }
      })
      .on("end", () => {
        if (dpiEncontrado !== null) {
          console.log(`Se encontró el DPI: ${dpiEncontrado}`);
        } else {
          console.log(`No se encontró el DPI: ${dpi}`);
        }
      });
    return listaValores;
  }
}

export default operations;
