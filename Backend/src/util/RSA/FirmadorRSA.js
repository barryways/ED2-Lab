import crypto from "crypto";
import forge from "node-forge";
import GeneratorKey from "./Generator.js";
export default class FirmadorRSA {
  constructor() {
    this.generator = new GeneratorKey();
  }

  firmar(privateKeyPem, message) {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const md = forge.md.sha256.create();
    md.update(message, "utf8");
    const messageHash = md.digest().getBytes();
    const signature = privateKey.sign(md);

    return {
      hash: messageHash,
      signature: signature,
    };
  }

  async validar(publicKeyPem, message, digitalSignature) {
    try {
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      const md = forge.md.sha256.create();
      md.update(message, "utf8");
      const messageHash = md.digest().getBytes();
      const verificationResult = publicKey.verify(messageHash, digitalSignature);
  
      return verificationResult;
    } catch (error) {
      console.error("Error al validar la firma:", error);
      return false; 
    }
  }
}

// Asegúrate de que la clase PublicKey, PrivateKey y GeneratorKey estén definidas y funcionen según tus necesidades en JavaScript.
