const bigInt = require('big-integer');

class RSA {
   randomPrime(bits) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    
    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      } 
    }
  }

   generate(keysize) {
    const e = bigInt(65537);
    let p;
    let q;
    let totient;
  
    do {
      p = this.randomPrime(keysize / 2);
      q = this.randomPrime(keysize / 2);
      totient = bigInt.lcm(
        p.prev(),
        q.prev()
      );
    } while (bigInt.gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());

    return {
      e, 
      n: p.multiply(q),
      d: e.modInv(totient),
    };
  }

   encrypt(encodedMsg, n, e) {
    return bigInt(encodedMsg).modPow(e, n);
  }

   decrypt(encryptedMsg, d, n) {
    return bigInt(encryptedMsg).modPow(d, n); 
  }

   encode(str) {
    const codes = str
      .split('')
      .map(i => i.charCodeAt())
      .join('');

     return bigInt(codes);
  }

   decode(code) {
    const stringified = code.toString();
    let string = '';

    for (let i = 0; i < stringified.length; i += 2) {
      let num = Number(stringified.substr(i, 2));
      
      if (num <= 30) {
        string += String.fromCharCode(Number(stringified.substr(i, 3)));
        i++;
      } else {
        string += String.fromCharCode(num);
      }
    }

    return string;
  }
  sign(document, d, n) {
    const encodedDocument = this.encode(document);
    const signature = this.decrypt(encodedDocument, d, n);
    return signature;
  }
  verify(document, signature, senderPublicKey) {
    const encodedDocument = this.encode(document);
    const decryptedSignature = this.encrypt(signature, senderPublicKey.n, senderPublicKey.e);
    return encodedDocument.equals(decryptedSignature);
  }



}

module.exports = RSA;