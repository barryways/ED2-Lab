import Operation from './operation.js';

export default class RSA {
    constructor(generatorKey) {
        this.operation = new Operation();
        const keys = generatorKey.getKeys();
        this.publicKey = keys.getPublicKey();
        this.privateKey = keys.getPrivateKey();
    }

    cipher(message) {
        const cipherMessage = this.operation.stringToBigInteger(message);
        const k = this.publicKey.k;
        const n = this.publicKey.n;
        return cipherMessage.modPow(k, n);
    }

    decipher(message) {
        const j = this.privateKey.j;
        const n = this.privateKey.n;
        const decrypted = message.modPow(j, n);
        return this.operation.bigIntegerToString(decrypted);
    }
}
