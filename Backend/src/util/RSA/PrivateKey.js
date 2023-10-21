export default class PrivateKey {
    constructor(n, j, z) {
        this.n = n;
        this.j = j;
        this.z = z;
    }

    getN() {
        return this.n;
    }

    getJ() {
        return this.j;
    }
}