
  generatePrime(bits) {
    const min = 1 << (bits - 1);
    const max = (1 << bits) - 1;

    let prime;
    do {
      prime = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!this.isPrime(prime));
    return prime;
  }


  calculateD(e, phi) {
    let x = 0;
    let y = 1;
    let lastX = 1;
    let lastY = 0;

    while (phi !== 0) {
      const quotient = e / phi;
      [e, phi] = [phi, e % phi];
      [x, lastX] = [lastX - quotient * x, x];
      [y, lastY] = [lastY - quotient * y, y];
    }

    return lastX;
  }


  generateRSAKeysOld(bits) {
    const e = 65537;
    const p = this.generatePrime(bits);
    const q = this.generatePrime(bits);
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    const d = this.calculateD(e, phi);

    return {
      publicKey: { e, n },
      privateKey: { d, n },
    };
  }