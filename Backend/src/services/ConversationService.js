import fs from "fs";
import path from "path";
import encrypter from "../util/encrypter.js";
import nodeforge from "node-forge";

const forge = nodeforge;
export default class Conversation {
  constructor() {
    this.encrypter = new encrypter();
    this.contenidoCifrado = [];
    this.contenidoDescifrado = [];
    this.nombresArchivos = [];
  }

  clearLists() {
    this.contenidoCifrado = [];
    this.contenidoDescifrado = [];
    this.nombresArchivos = [];
  }
  getNombresArchivos() {  
    return this.nombresArchivos;
  }

  getConversationContent(dpi) {
    try {
      const carpeta = "./src/data/RSA/inputs";
      const archivos = fs.readdirSync(carpeta);

      const contenidoArchivos = [];

      archivos.forEach((archivo) => {
        const match = /^CONV-(\d+)-(\d+)\.txt$/.exec(archivo);
        if (match) {
          const archivoDPI = match[1];
          const numeroCarta = match[2];

          if (archivoDPI === dpi) {
            const nombreArchivo = `CONV-${dpi}-${numeroCarta}.txt`;
            this.nombresArchivos.push(nombreArchivo);
            const rutaArchivo = path.join(carpeta, archivo);
            let contenido = fs.readFileSync(rutaArchivo, "utf-8");
            contenidoArchivos.push(contenido);

            contenido = this.encrypter.simpleColumnCypher(contenido);

            this.contenidoCifrado.push(contenido);
          }
        }
      });

      return contenidoArchivos;
    } catch (error) {
      console.error("Error al leer la carpeta:", error);
      return null;
    }
  }

  saveConversationOnTxt(dpi) {
    try {
      if (this.contenidoCifrado) {
        this.contenidoCifrado.forEach((contenido, index) => {
          const numeroCarta = index + 1;
          const nombreArchivo = `CONV-${dpi}-${numeroCarta}-cypher.txt`;
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

  getConversationContentCypher(dpi) {
    try {
      const carpeta = "./src/data/RSA/cyphers";
      const archivos = fs.readdirSync(carpeta);

      const contenidoArchivos = [];

      archivos.forEach((archivo) => {
        const match = /^CONV-(\d+)-(\d+)-cypher\.txt$/.exec(archivo);
        if (match) {
          const archivoDPI = match[1];
          const numeroCarta = match[2];

          if (archivoDPI === dpi) {
            const rutaArchivo = path.join(carpeta, archivo);
            let contenido = fs.readFileSync(rutaArchivo, "utf-8");

            contenidoArchivos.push(contenido);
            contenido = this.encrypter.simpleColumnDecipher(contenido);

            this.contenidoDescifrado.push(contenido);
          }
        }
      });

      return contenidoArchivos;
    } catch (error) {
      console.error("Error al leer la carpeta:", error);
      return null;
    }
  }

  getConversationContentDecipher(dpi) {
    try {
      const carpeta = "./src/data/RSA/cyphers";
      const archivos = fs.readdirSync(carpeta);

      const contenidoArchivos = [];

      archivos.forEach((archivo) => {
        const match = /^CONV-(\d+)-(\d+)-cypher\.txt$/.exec(archivo);
        if (match) {
          const archivoDPI = match[1];
          const numeroCarta = match[2];

          if (archivoDPI === dpi) {
            const rutaArchivo = path.join(carpeta, archivo);
            let contenido = fs.readFileSync(rutaArchivo, "utf-8");
            contenido = this.encrypter.simpleColumnDecipher(contenido);
            contenidoArchivos.push(contenido);
            

            this.contenidoDescifrado.push(contenido);
          }
        }
      });

      return contenidoArchivos;
    } catch (error) {
      console.error("Error al leer la carpeta:", error);
      return null;
    }
  }


  saveConversationDecipherOnTxt(dpi) {
    try {
      if (this.contenidoDescifrado) {
        this.contenidoDescifrado.forEach((contenido, index) => {
          const numeroCarta = index + 1;
          const nombreArchivo = `CONV-${dpi}-${numeroCarta}-decipher.txt`;
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
