const SObject = require('../Object.js');
const SNumber = require('./Number.js');

/**
 * Класс операции сложения
 */
class SAdd extends SObject {
    constructor(left, right) {
        super(true);
        this.left = left;
        this.right = right;
    }

    toString() {
        return `(${ this.left.toString() } + ${ this.right.toString() })`;
    }

    reduceSemantic(environment) {
        if (this.left.reducible) {
            return new SAdd(this.left.reduceSemantic(environment), this.right);
        } else if (this.right.reducible) {
            return new SAdd(this.left, this.right.reduceSemantic(environment));
        } else {
            return new SNumber(this.left.value + this.right.value);
        }
    }
}

module.exports = SAdd;