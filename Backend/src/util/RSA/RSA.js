export default class RSA {
    generatePrime(bits) {
        const min = 1n << (bits - 1n);
        const max = (1n << bits) - 1n;
        while (true) {
            const p = BigInt(Math.floor(Number(Math.random() * (Number(max) - Number(min) + 1) + Number(min))));
            if (this.isPrime(p)) {
                return p;
            }
        }
    }

    isPrime(n, k = 10) {
        if (n <= 1n || (n > 2n && n % 2n === 0n)) {
            return false;
        }
        const d = n - 1n;
        let s = 0n;
        while (d % (2n ** s) === 0n) {
            s++;
        }
        for (let i = 0; i < k; i++) {
            const a = BigInt(Math.floor(Math.random() * (Number(n) - 2) + 2));
            let x = this.modExp(a, d / (2n ** s), n);
            if (x === 1n || x === n - 1n) {
                continue;
            }
            for (let j = 1n; j < s; j++) {
                x = this.modExp(x, 2n, n);
                if (x === n - 1n) {
                    break;
                }
            }
            if (x !== n - 1n) {
                return false;
            }
        }
        return true;
    }

    modExp(a, b, n) {
        let result = 1n;
        while (b > 0n) {
            if (b % 2n === 1n) {
                result = (result * a) % n;
            }
            a = (a * a) % n;
            b = b / 2n | 0;
        }
        return result;
    }

    generateKeys(bitLength) {
        const p = this.generatePrime(bitLength / 2n);
        let q;
        do {
            q = this.generatePrime(bitLength / 2n);
        } while (q === p);
        const n = p * q;
        const phi = (p - 1n) * (q - 1n);
        let e = 65537n;
        while (this.gcd(e, phi) !== 1n) {
            e++;
        }
        const d = this.modInv(e, phi);
        return { publicKey: { n, e }, privateKey: { n, d } };
    }

    gcd(a, b) {
        while (b !== 0n) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    modInv(a, n) {
        let [oldR, r] = [a, n];
        let [oldS, s] = [1n, 0n];
        while (r !== 0n) {
            const quotient = oldR / r;
            [oldR, r] = [r, oldR - quotient * r];
            [oldS, s] = [s, oldS - quotient * s];
        }
        if (oldS < 0n) {
            oldS += n;
        }
        return oldS;
    }
}
