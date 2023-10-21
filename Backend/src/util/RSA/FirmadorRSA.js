// Importa la biblioteca 'crypto' para calcular el resumen (hash) del mensaje
const crypto = require('crypto');

export default class FirmadorRSA {
    constructor(generatorKey) {
        const keys = generatorKey.getKeys();
        this.publicKey = keys.getPublicKey();
        this.privateKey = keys.getPrivateKey();
    }

    async firmar(message) {
        // Calcular el resumen (hash) del mensaje
        const messageHash = crypto.createHash('sha256').update(message).digest('hex');

        // Firmar el resumen con la clave privada
        const j = this.privateKey.getJ();
        const n = this.privateKey.getN();
        const messageHashBigInt = BigInt('0x' + messageHash); // Convierte el hash a BigInt
        const digitalSignature = messageHashBigInt ** j % n;

        return digitalSignature.toString(16); // Convierte la firma a hexadecimal
    }

    async validar(message, digitalSignature) {
        const messageHash = crypto.createHash('sha256').update(message).digest('hex');
        const messageHashBigInt = BigInt('0x' + messageHash); // Convierte el hash a BigInt

        const signature = BigInt('0x' + digitalSignature); // Convierte la firma a BigInt

        // Desencriptar la firma digital con la clave pública
        const k = this.publicKey.getK();
        const n = this.publicKey.getN();
        const decryptedSignature = signature ** k % n;

        // Comparar el resumen del mensaje con la firma desencriptada
        return messageHashBigInt === decryptedSignature;
    }
}

// Asegúrate de que la clase PublicKey, PrivateKey y GeneratorKey estén definidas y funcionen según tus necesidades en JavaScript.
