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
import readline from "readline";

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
    const listaConversaciones =
      conversation.getConversationContentDecipher(dpi);
    let contador = 1;
    console.log(listaValores);
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
        console.log("este es el dpi" + dpiABuscar);
        if (dpiABuscar === dpi) {
          dpiEncontrado = dpi;
          const hash = row["1"];
          console.log("este es el hash " + hash);
          const firma = row["2"];
          console.log("esta es la firma " + firma);
          const clave_publica = row["3"];
          console.log("esta es la clave publica " + clave_publica);
          const contador = row["4"];

          const valor = [dpi, hash, firma, clave_publica, contador];
          console.log(valor);
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

  añadirArchivo(dpi, contraseña, nombreReclutador) {
    const data = `${dpi};${contraseña};${nombreReclutador}\n`;
    fs.appendFile("./src/data/pass.csv", data, (err) => {
      if (err) {
        console.error("Error al escribir en el archivo CSV:", err);
      }
    });
  }

  crearPassword(dpi, nombreReclutador) {
    const password = dpi + nombreReclutador + "pass";
    this.añadirArchivo(dpi, password, nombreReclutador);
    return password;
  }
  eliminarPassword(dpi) {
    const reader = readline.createInterface({
      input: fs.createReadStream("./src/data/pass.csv"),
    });

    // Crear un arreglo para almacenar las líneas del archivo
    let líneas = [];

    // Iterar sobre las líneas del archivo
    reader.on("line", (línea) => {
      líneas.push(línea);
    });

    // Comparar el dpi de la línea actual con el dpi que se pasó
    reader.on("close", () => {
      for (let i = 0; i < líneas.length; i++) {
        if (líneas[i].split(";")[0] === dpi) {
          líneas.splice(i, 1);
        }
      }

      // Escribir el nuevo contenido del archivo
      fs.writeFile("./src/data/pass.csv", líneas.join("\n"), (err) => {
        if (err) {
          console.error("Error al escribir en el archivo CSV:", err);
        }
      });
    });

    reader.on("error", (err) => {
      console.error("Error al leer el archivo CSV:", err);
    });
  }

  login(usuario, contraseña, compañia, dpi) {
    try {
      const rsa = new RSA();
      const keys = rsa.generate(250);

      const message = `${usuario};${contraseña};${compañia}`;
      const encoded_message = rsa.encode(message);
      const encrypted_message = rsa.encrypt(encoded_message, keys.n, keys.e);
      const decrypted_message = rsa.decrypt(encrypted_message, keys.d, keys.n);
      const decoded_message = rsa.decode(decrypted_message);
      if (this.verification(dpi, contraseña, usuario, compañia)) {
        console.log("la operacion fue un exito padre con el DPI " + dpi);
        return "la operacion fue un exito padre con el DPI " + dpi; //aqui me quede, el clavo es que tengo que pasarle un dpi porque asi lo identifico en el archivo pero de donde saco ese dpi
        //lo puedo splitear de la contraseña pero no se si eso sea lo correcto
      }
      console.log("no se pudo completar esa onda ");
      return "no se pudo completar esa onda ";
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
    }
  }

  verification(dpi, contraseña, usuario, compañia) {
    // Abre el archivo CSV
    const contraseñas = fs.readFileSync("./src/data/pass.csv", "utf-8");

    // Lee el archivo CSV línea por línea
    const contraseñasArray = contraseñas.split("\n");

    // Busca la contraseña en el archivo CSV
    for (const contraseñaEnLinea of contraseñasArray) {
      const datos = contraseñaEnLinea.split(";");
      if (datos[0] === dpi && datos[1] === contraseña) {
        if (this.companyVerification(dpi, compañia, usuario)) {
          
          return true;
        }
        else{
          return false;
        }
      }
    }
    return false;
  }

  companyVerification(dpi, compañia, usuario) {
    const result = this.searchByDpi(dpi);
    const companies_decodificado = Coder.decodificadoEmpresas(result); // Almacena el resultado en una variable.
    result[4] = companies_decodificado;
    if (result[5] === usuario) {
      if(result[4].includes(compañia)){
        return true;
      }
    } else {
      return false;
    }
    // La contraseña no se encuentra
    return false;
  }
}

export default operations;
