export default class PublicKey {
    constructor(n, k, z) {
        this.n = n;
        this.k = k;
        this.z = z;
    }

    getN() {
        return this.n;
    }

    getK() {
        return this.k;
    }

    getZ() {
        return this.z;
    }
}

