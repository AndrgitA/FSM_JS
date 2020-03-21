const SObject = require('../Object.js');
const SBoolean = require('./Boolean.js');

/**
 * Класс опреации меньше чем " < " 
 */
class SLess extends SObject {
    constructor(left, right) {
        super(true);
        this.left = left;
        this.right = right;
    }

    toString() {
        return `(${ this.left.toString() } < ${ this.right.toString() })`;
    }

    reduceSemantic(environment) {
        if (this.left.reducible) {
            return new SLess(this.left.reduceSemantic(environment), this.right);
        } else if (this.right.reducible) {
            return new SLess(this.left, this.right.reduceSemantic(environment));
        } else {
            return new SBoolean(this.left.value < this.right.value);
        }
    }
}

module.exports = SLess;