import fs from "fs";
import path from "path";
import encrypter from "../util/encrypter.js";

export default class Conversation {
  constructor() {
    this.encrypter = new encrypter();
    this.contenidoCifrado = [];
    this.contenidoDescifrado = [];
  }

  encryptAllConversations() {
    try {
      const carpeta = "./src/data/RSA/inputs";
      const archivos = fs.readdirSync(carpeta);

      const contenidoArchivos = [];

      archivos.forEach((archivo) => {
        const match = /^CONV-(\d+)-(\d+)\.txt$/.exec(archivo);
        if (match) {
          const rutaArchivo = path.join(carpeta, archivo);
          let contenido = fs.readFileSync(rutaArchivo, "utf-8");
          contenidoArchivos.push(contenido);
          contenido = this.encrypter.simpleColumnCypher(contenido);
          this.contenidoCifrado.push(contenido);
        }
      });

      return contenidoArchivos;
    } catch (error) {
      console.error("Error al leer la carpeta:", error);
      return null;
    }
  }

  desencryptAllConversations() {
    try {
      const carpeta = "./src/data/RSA/cyphers";
      const archivos = fs.readdirSync(carpeta);

      const contenidoArchivos = [];

      archivos.forEach((archivo) => {
        const match = /^CONV-(\d+)-(\d+)\.txt$/.exec(archivo);
        if (match) {
          const rutaArchivo = path.join(carpeta, archivo);
          let contenido = fs.readFileSync(rutaArchivo, "utf-8");
          contenidoArchivos.push(contenido);
          contenido = this.encrypter.simpleColumnDecipher(contenido);
          console.log(contenido);
          this.contenidoDescifrado.push(contenido);
        }
      });

      return contenidoArchivos;
    } catch (error) {
      console.error("Error al leer la carpeta:", error);
      return null;
    }
  }

  saveConversationOnTxt() {
    try {
      if (this.contenidoCifrado) {
        this.contenidoCifrado.forEach((contenido, index) => {
          const numeroCarta = index + 1;
          const nombreArchivo = `CONV-cypher-${numeroCarta}.txt`;
          const rutaArchivo = path.join(
            "./src/data/RSA/cyphers",
            nombreArchivo
          );
          fs.writeFileSync(rutaArchivo, contenido, "utf-8");
        });
      } else {
        console.error("No se pudo obtener el contenido de los archivos.");
      }
    } catch (error) {
      console.error("Error al guardar el contenido en archivos:", error);
    }
  }

  saveConversationOnTxt_desencrypted() {
    try {
      if (this.contenidoCifrado) {
        this.contenidoCifrado.forEach((contenido, index) => {
          const numeroCarta = index + 1;
          const nombreArchivo = `CONV-cypher-${numeroCarta}.txt`;
          const rutaArchivo = path.join(
            "./src/data/RSA/outputs",
            nombreArchivo
          );
          fs.writeFileSync(rutaArchivo, contenido, "utf-8");
        });
      } else {
        console.error("No se pudo obtener el contenido de los archivos.");
      }
    } catch (error) {
      console.error("Error al guardar el contenido en archivos:", error);
    }
  }
}
