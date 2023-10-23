import forge from "node-forge";
export default class GeneratorKey {
  generateRSAKeys() {
    const bits = 512;
    const keyPair = forge.pki.rsa.generateKeyPair({ bits, e: 0x10001 });
    const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
    return {
      privateKey:privateKeyPem,
      publicKey: publicKeyPem,
    };
  }

  extractKey(pemKey) {
    const lines = pemKey.split("\n");
    const keyData = lines.slice(1, lines.length - 2).join("");
    return keyData;
  }
}
