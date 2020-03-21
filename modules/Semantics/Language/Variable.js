const SObject = require('../Object.js');

/**
 * Класс Переменной
 */
class SVariable extends SObject {
    constructor(name) {
        super(true);
        this.name = name;
    }

    toString() {
        return `${ this.name }`;
    }

    reduceSemantic(environment) {
        return environment[this.name];
    }
}

module.exports = SVariable;