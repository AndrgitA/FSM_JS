const SObject = require('../Object.js');

/**
 * Класс логического значения
 */
class SBoolean extends SObject {
    constructor(value) {
        super(false);
        this.value = value;
    }

    toString() {
        return `${ this.value }`;
    }
}

module.exports = SBoolean;