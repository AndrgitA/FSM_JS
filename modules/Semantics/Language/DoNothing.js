const SObject = require('../Object.js');

/**
 * Класс предложения
 */
class SDoNothing extends SObject {
    constructor() {
        super(false);
    }

    toString() {
        return 'do-nothing';
    }
}

module.exports = SDoNothing;