const SObject = require('../../Object.js');
const SBoolean = require('../../Logic/Boolean.js');
/**
 * Класс оператора (if ... else ...)
 */
class SIf extends SObject {
    constructor(condition, consequence, alternative) {
        super(true);
        this.condition = condition;
        this.consequence = consequence;
        this.alternative = alternative;
    }

    toString() {
        return `if (${ this.condition.toString() }) { \n  ${ this.consequence.toString() } \n} else { \n  ${ this.alternative.toString() } \n}\n`;
    }

    reduceSemantic(environment) {
        if (this.condition.reducible) {
            return [new SIf(this.condition.reduceSemantic(environment), this.consequence, this.alternative), environment];
        } else {
            // Значение равно SBoolean :/TODO Надо начуить объекты сравнивать
            if (this.condition.value === true) {
                return [this.consequence, environment];
            }
            return [this.alternative, environment];
        }
    }
}

module.exports = SIf;