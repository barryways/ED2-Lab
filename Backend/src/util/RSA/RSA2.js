// Función para calcular el máximo común divisor (MCD)
function gcd(a, b) {
    if (b === 0n) return a;
    return gcd(b, a % b);
  }
  
  // Función para calcular un número primo aleatorio
  function generateRandomPrime(bits) {
    let min = 2n ** (bits - 1n);
    let max = 2n ** bits - 1n;
  
    while (true) {
      const num = min + BigInt(Math.floor(Math.random() * (Number(max - min) + 1)));
      if (isPrime(num)) {
        return num;
      }
    }
  }
  
  // Función para verificar si un número es primo
  function isPrime(num) {
    if (num <= 1n) return false;
    if (num <= 3n) return true;
    if (num % 2n === 0n || num % 3n === 0n) return false;
  
    let i = 5n;
    while (i * i <= num) {
      if (num % i === 0n || num % (i + 2n) === 0n) return false;
      i += 6n;
    }
  
    return true;
  }
  
  class SimpleRSA {
    constructor(bits) {
      const p = generateRandomPrime(bits);
      const q = generateRandomPrime(bits);
      this.p = p;
      this.q = q;
      this.n = p * q;
      this.phi = (p - 1n) * (q - 1n);
      this.e = 65537n; // Usar un valor común para e (65537) para eficiencia
      this.d = this.computeDecryptionExponent(this.e, this.phi);
      this.publicKey = { e: this.e, n: this.n };
      this.secretKey = { d: this.d, n: this.n };
    }
  
    computeDecryptionExponent(e, phi) {
      let d = extendedGcd(e, phi).s;
  
      while (d < 1n) {
        d += phi;
      }
  
      return d;
    }
  
    encrypt(m) {
      if (m < 0n || m >= this.n) {
        throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
      }
  
      if (gcd(m, this.n) !== 1n) {
        throw new Error("Condition gcd(m, n) = 1 not met.");
      }
  
      const c = m ** this.e % this.n;
  
      return c;
    }
  
    decrypt(c) {
      const m = c ** this.d % this.n;
  
      return m;
    }
  }
  
  export default SimpleRSA;
  