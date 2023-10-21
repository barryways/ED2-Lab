import BigNumber from "bignumber.js";
import PrivateKey from "./PrivateKey.js";
import PublicKey from "./PublicKey.js";

export default class GeneratorKey {
  constructor() {
    this.KEY_SIZE = 256; // Tamaño de clave más grande (en bits)
  }

  generatePrivateKey(k, z, n) {
    const j = this.extEuclid(k, z)[1];
    return new PrivateKey(n, j, z);
  }

  extEuclid(a, b) {
    if (b.isZero()) return [a, new BigNumber(1), new BigNumber(0)];

    const vals = this.extEuclid(b, a.mod(b));
    const d = vals[0];
    const p = vals[2];
    const q = vals[1].minus(a.dividedToIntegerBy(b).times(vals[2]));
    return [d, p, q];
  }

  generatePublicKey() {
    const p = this.generarPrimo(this.KEY_SIZE); // Usando la nueva función
    const q = this.generarPrimo(this.KEY_SIZE); // Usando la nueva función
    const n = p.times(q);
    const z = p.minus(1).times(q.minus(1));
    const k = this.obtenerCoprimo(z);
    return new PublicKey(n, k, z);
  }

  getKeys() {
    const publicKey = this.generatePublicKey();
    const privateKey = this.generatePrivateKey(
      publicKey.getK(),
      publicKey.getZ(),
      publicKey.getN()
    );
    return new Keys(privateKey, publicKey);
  }

  generarPrimo(bits) {
    const min = new BigNumber(2).pow(bits - 1);
    const max = new BigNumber(2).pow(bits).minus(1);

    let randomNumber;
    do {
      randomNumber = new BigNumber(BigNumber.random(bits)).integerValue(
        BigNumber.ROUND_FLOOR
      );
    } while (
      randomNumber.isLessThan(min) ||
      randomNumber.isGreaterThan(max) ||
      !esPrimo(randomNumber)
    );

    return randomNumber;
  }

  esPrimo(numero) {
    if (numero.isLessThan(2)) return false;
    if (numero.isLessThan(4)) return true;
    if (numero.mod(2).isEqualTo(0)) return false;

    const raiz = numero.sqrt();
    for (let i = new BigNumber(3); i.isLessThanOrEqualTo(raiz); i = i.plus(2)) {
      if (numero.mod(i).isEqualTo(0)) return false;
    }

    return true;
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
