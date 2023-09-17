import fs from "fs";

// Función para agregar un arreglo a un archivo en formato JSON
export default function array_log_writer(arreglo) {
  // Intenta cargar el contenido actual del archivo si existe
      arreglo += '\n';
      fs.appendFileSync('./src/data/codeLogs.txt', arreglo);
}
