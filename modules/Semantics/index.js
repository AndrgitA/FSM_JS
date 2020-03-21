const SObject = require('./Object.js');             // Базовый класс для Семантических операций

/**
 * Область с арифметическими единицами
 */
const SNumber = require('./Arithmetic/Number.js');              // Число
const SPlus = require('./Arithmetic/Plus.js');                  // Унарный плюс
const SMinus = require('./Arithmetic/Minus.js');                // Унарный минус
const SAdd = require('./Arithmetic/Add.js');                    // Сложение
const SSubtract = require('./Arithmetic/Subtract.js');          // Вычитание
const SMultiply = require('./Arithmetic/Multiply.js');          // Умножение
const SDivision = require('./Arithmetic/Division.js');          // Деление

/**
 * Блок с логическими единицами
 */

const SBoolean = require('./Logic/Boolean.js');            // Логическая единица (true or false)
const SLess = require('./Logic/Less.js');                  // Логическая операция <
const SGreater = require('./Logic/Greater.js');            // Логическая операция >
const SEqual = require('./Logic/Equal.js');                // Логическая операция ==
const SNotEqual = require('./Logic/NotEqual.js');          // Логическая операция !=


/**
 * Блок с языковыми единицами
 */
const SVariable = require('./Language/Variable.js');

const SDoNothing = require('./Language/DoNothing.js');
const SAssign = require('./Language/Assign.js');

/**
 * Блок с операторами
 */
const SIf = require('./Language/Operators/If.js');

const SMachine = require('./Machine.js');            //  Виртуальная машины для произведение действий

module.exports = {
    SObject,

    SNumber, SBoolean,

    SMinus, SPlus,
    SAdd, SSubtract,
    SMultiply, SDivision,

    SLess, SGreater,
    SEqual, SNotEqual,

    SVariable,

    SDoNothing, SAssign,

    SIf,

    SMachine
};