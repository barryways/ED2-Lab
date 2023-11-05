import fs from "fs";
import path from "path";
import encrypter from "../util/encrypter.js";

export default class letter {
  constructor() {
    this.encrypter = new encrypter();
    this.contenidoCifrado = [];
  }
  getLetterContent(dpi) {
    try {
      const carpeta = "./src/data/Lab5/inputs";
      const archivos = fs.readdirSync(carpeta);

      const contenidoArchivos = [];

      archivos.forEach((archivo) => {
        const match = /^REC-(\d+)-(\d+)\.txt$/.exec(archivo);
        if (match) {
          const archivoDPI = match[1];
          const numeroCarta = match[2];

          if (archivoDPI === dpi) {
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

  saveCypherOnTxt(dpi) {
    try {
      if (this.contenidoCifrado) {
        this.contenidoCifrado.forEach((contenido, index) => {
          const numeroCarta = index + 1;
          const nombreArchivo = `REC-${dpi}-${numeroCarta}-cypher.txt`;
          const rutaArchivo = path.join("./src/data/cyphers", nombreArchivo);
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
