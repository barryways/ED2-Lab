import fs from "fs";
import path from "path";
import encrypter from "../util/encrypter.js";

export default class letter {
  constructor() {
    this.encrypter = new encrypter();
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
            contenido = this.encrypter.cifradoPorColumnaSimple(contenido);
            console.log(contenido);
            contenido = this.encrypter.descifradoPorColumnaSimple(contenido);
            console.log(contenido);
            contenidoArchivos.push(contenido);
          }
        }
      });

      return contenidoArchivos;
    } catch (error) {
      console.error("Error al leer la carpeta:", error);
      return null;
    }
  }
}
