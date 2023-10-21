
import BigNumber from 'bignumber.js'

export default class GeneratorKey {
  constructor() {
    this.KEY_SIZE = 256; // Tamaño de clave más grande (en bits)
  }

  generatePrivateKey(k, z, n) {
    const j = this.extEuclid(k, z)[1];
    return new PrivateKey(n, j, z);
  }

  extEuclid(a, b) {
    if (b.isZero())
      return [a, new BigNumber(1), new BigNumber(0)];

    const vals = this.extEuclid(b, a.mod(b));
    const d = vals[0];
    const p = vals[2];
    const q = vals[1].minus(a.dividedToIntegerBy(b).times(vals[2]));
    return [d, p, q];
  }

  generatePublicKey() {
    const p = this.generarPrimo();
    const q = this.generarPrimo();
    const n = p.times(q);
    const z = p.minus(1).times(q.minus(1));
    const k = this.obtenerCoprimo(z);
    return new PublicKey(n, k, z);
  }

  getKeys() {
    const publicKey = this.generatePublicKey();
    const privateKey = this.generatePrivateKey(publicKey.getK(), publicKey.getZ(), publicKey.getN());
    return new Keys(privateKey, publicKey);
  }

  generarPrimo() {
    return new BigNumber(this.KEY_SIZE).prime(this.KEY_SIZE);
  }

  calcularMCD(a, b) {
    if (b.isZero()) {
      return a;
    } else {
      return this.calcularMCD(b, a.mod(b));
    }
  }

  obtenerCoprimo(z) {
    const e = new BigNumber(this.KEY_SIZE);
    const rand = BigNumber.random(this.KEY_SIZE);
    do {
      while (e.isLessThanOrEqualTo(z)) {
        e = new BigNumber(this.KEY_SIZE);
      }
    } while (!this.calcularMCD(e, z).isEqualTo(1));
    return e;
  }
}