const SObject = require('../Object.js');

/**
 * Класс Числа
 */
class SNumber extends SObject {
    constructor(value) {
        super(false);
        this.value = value;
    }

    toString() {
        return `${ this.value }`;
    }
}

module.exports = SNumber;