const SObject = require('../Object.js');
const SDoNothing = require('./DoNothing.js');

/**
 * Класс Объединения
 */
class SAssign extends SObject {
    constructor(name, expression) {
        super(true);
        this.name = name;
        this.expression = expression;
    }

    toString() {
        return `(${ this.name.toString() } = ${ this.expression.toString() })`;
    }
    
    reduceSemantic(environment) {
        if (this.expression.reducible) {
            return [new SAssign(this.name, this.expression.reduceSemantic(environment)), environment];
        } else {
            return [new SDoNothing, { ...environment, [this.name]: this.expression }];
        }
    }
}

module.exports = SAssign;