const SObject = require('../Object.js');
const SNumber = require('./Number.js');

/**
 * Класс операции унарного минуса
 */
class SMinus extends SObject {
    constructor(value) {
        super(true);
        this.value = value;
    }

    toString() {
        return `(-${ this.value.toString() })`;
    }

    reduceSemantic(environment) {
        if (this.value.reducible) {
            return new SMinus(this.value.reduceSemantic(environment));
        }
        return new SNumber(-this.value);
    }
}

module.exports = SMinus;