import RSA from "../../common/rsa.js";
import crypto from "crypto";
import fs from "fs"; 
export default class Firmador2 {
  constructor() {
    this.rsa = new RSA();
    this.publicKey = "";
    this.privateKey = "";
  }

  setLlavePublica(LlavePublica) {
    this.publicKey = LlavePublica;
  }
  setLlavePrivada(LlavePrivada) {
    this.privateKey = LlavePrivada;
  }

  async signProcess(message, dpi) {
    try {
      const keys = this.rsa.generate(250);
      this.setLlavePrivada(keys.d);
      this.setLlavePublica(keys.n);
      
      let contador = 1;
      for (const conversacion in message) {
        if (message.hasOwnProperty(conversacion)) {
          const mensaje = message[conversacion];
          //console.log(`Conversación: ${mensaje}`);
          const originalMessageHash = crypto
            .createHash("sha256")
            .update(mensaje)
            .digest("hex");
            console.log(`Si llego a Firma 2`);
          const signature = this.rsa.sign(
            mensaje,
            this.privateKey,
            this.publicKey
          );
          
          this.escribirCSV(
            dpi,
            originalMessageHash,
            signature,
            this.publicKey,
            this.privateKey,
            contador
          );
        }
        contador++;
      }
      return "Firmado";
    } catch (error) {
      return error;
    }
  }

  escribirCSV(dpi, hash, firma, clave_publica, clave_privada, contador) {
    console.log("si llega a escribir ")
    const data = `${dpi};${hash};${firma};${clave_publica};${clave_privada};${contador}\n`;
    fs.appendFile("./src/data/RSA/signatures2.csv", data, (err) => {
      if (err) {
        console.error("Error al escribir en el archivo CSV:", err);
      } else {
        console.log("Datos escritos en signatures.csv");
      }
    });
  }
}
