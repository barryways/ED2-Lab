import lz78 from "../common/lz78.js";

const lz = new lz78();

export default class encrypter {
  constructor() {
    this.clave = "clavesecreta";
  }
  // Función para cifrar un mensaje usando el cifrado de transposición por columna simple
  cifradoPorColumnaSimple(mensaje) {
    const mensajeLimpio = mensaje.replace(/\s/g, "_"); // Reemplaza espacios por guiones bajos

    const numColumnas = this.clave.length;
    const numFilas = Math.ceil(mensajeLimpio.length / numColumnas);

    const matriz = new Array(numFilas);

    for (let i = 0; i < numFilas; i++) {
      matriz[i] = new Array(numColumnas);
    }

    let index = 0;

    for (let i = 0; i < numFilas; i++) {
      for (let j = 0; j < numColumnas; j++) {
        if (index < mensajeLimpio.length) {
          matriz[i][j] = mensajeLimpio[index];
          index++;
        } else {
          matriz[i][j] = "_";
        }
      }
    }

    let mensajeCifrado = "";

    for (let j = 0; j < numColumnas; j++) {
      for (let i = 0; i < numFilas; i++) {
        mensajeCifrado += matriz[i][j];
      }
    }

    return mensajeCifrado;
  }

  // Función para descifrar un mensaje cifrado con el cifrado de transposición por columna simple
  descifradoPorColumnaSimple(mensajeCifrado) {
    const numColumnas = this.clave.length;
    const numFilas = Math.ceil(mensajeCifrado.length / numColumnas);

    const matriz = new Array(numFilas);

    for (let i = 0; i < numFilas; i++) {
      matriz[i] = new Array(numColumnas);
    }

    let index = 0;

    for (let j = 0; j < numColumnas; j++) {
      for (let i = 0; i < numFilas; i++) {
        matriz[i][j] = mensajeCifrado[index];
        index++;
      }
    }

    let mensajeOriginal = "";

    for (let i = 0; i < numFilas; i++) {
      for (let j = 0; j < numColumnas; j++) {
        mensajeOriginal += matriz[i][j];
      }
    }

    mensajeOriginal = mensajeOriginal.replace(/_/g, " "); // Reemplaza guiones bajos por espacios en blanco

    return mensajeOriginal.trim();
  }
}
