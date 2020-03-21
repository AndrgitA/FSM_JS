/**
 * Базовый клас семантических объектов
 */ 

const environment = {};

class SObject {
    constructor(reducible) {
        // Определяет возможность сворачиваться
        this.reducible = reducible; 
    }

    _getEnvironment(name) {
        return environment[name];
    }

    _setEnvironment(name, value) {
        environment[name] = value;
    } 
}

module.exports = SObject;