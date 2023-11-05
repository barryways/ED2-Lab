
import forge from "node-forge";
export default class FirmadorRSA {


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
