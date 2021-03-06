const SObject = require('../Object.js');
const SBoolean = require('./Boolean.js');

/**
 * Класс опреации больше чем " > " 
 */
class SGreater extends SObject {
    constructor(left, right) {
        super(true);
        this.left = left;
        this.right = right;
    }

    toString() {
        return `(${ this.left.toString() } > ${ this.right.toString() })`;
    }

    reduceSemantic(environment) {
        if (this.left.reducible) {
            return new SGreater(this.left.reduceSemantic(environment), this.right);
        } else if (this.right.reducible) {
            return new SGreater(this.left, this.right.reduceSemantic(environment));
        } else {
            return new SBoolean(this.left.value > this.right.value);
        }
    }
}

module.exports = SGreater;