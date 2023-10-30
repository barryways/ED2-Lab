import { pow } from "math";

function generarClavesRSA(bits) {
  // Generamos dos números primos grandes
  const p = Math.floor(Math.random() * Math.pow(2, bits)) + 1;
  const q = Math.floor(Math.random() * Math.pow(2, bits)) + 1;

  // Calculamos el número n
  const n = p * q;

  // Calculamos el phi de n
  const phi = (p - 1) * (q - 1);

  // Generamos el exponente e
  const e = Math.floor(Math.random() * phi) + 1;

  // Calculamos el exponente d, el inverso de e módulo phi
  const d = math.modInverse(e, phi);

  // Devolvemos las claves
  return {
    n: n,
    e: e,
    d: d,
  };
}

function encriptarRSA(m, n, e) {
  // Convertimos el mensaje en un número entero
  const mn = parseInt(m);

  // Encriptamos el mensaje
  const c = math.pow(mn, e, n);

  // Devolvemos el mensaje encriptado
  return c;
}

function desencriptarRSA(c, n, d) {
  // Desencriptamos el mensaje
  const mn = math.pow(c, d, n);

  // Convertimos el mensaje desencriptado de un número entero a un string
  const m = String.fromCharCode(mn);

  // Devolvemos el mensaje desencriptado
  return m;
}

// Generamos las claves
const claves = generarClavesRSA(2048);

// Encriptamos un mensaje
const mensaje = "Hola, mundo!";
const mensajeEncriptado = encriptarRSA(mensaje, claves.n, claves.e);

// Desencriptamos el mensaje
const mensajeDesencriptado = desencriptarRSA(mensajeEncriptado, claves.n, claves.d);

// Imprimimos el mensaje original y el mensaje desencriptado
console.log("Mensaje original:", mensaje);
console.log("Mensaje desencriptado:", mensajeDesencriptado);