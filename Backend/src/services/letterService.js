import fs from "fs";
import path from "path";
import encrypter from "../util/encrypter.js";
import lz78 from "../common/lz78.js";

const lz = new lz78();
export default class letter {
  constructor() {
    this.encrypter = new encrypter();
    this.contenidoCifrado = [];
  }
  obtenerContenidoArchivos(dpi) {
    try {
      const carpeta = "./src/data/inputs";
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
            contenido = this.encrypter.cifradoPorColumnaSimple(contenido);
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

  guardarContenidoEnJSON() {
    try {

      if (this.contenidoCifrado) {
        const jsonOutput = JSON.stringify(this.contenidoCifrado);
        fs.writeFileSync("./src/data/cypherLetters.json", jsonOutput, "utf-8");
        console.log(`Contenido de archivos guardado en \'./src/data/cypherLetters.json\'`);
      } else {
        console.error("No se pudo obtener el contenido de los archivos.");
      }
    } catch (error) {
      console.error("Error al guardar el contenido en JSON:", error);
    }
  }

}
