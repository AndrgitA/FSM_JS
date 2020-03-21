/**
 * Лабораторная работа №2
 * Тема "Семантика мелких шагов"
 * 1. Создать классы представляющие синтаксические структурные единицы, такие как, числа,
 * булевы значения, переменные, операции и т.п..
 * 2. Реализовать алгоритм мелких шагов сворачивания для синтаксического дерева,
 * представленного одним объектом на примере простых арифметических выражений. (см.
 * книгу Тома Стюарта)
 * (15 баллов)
 */
const {
    SNumber, SBoolean,
    
    SMinus, SPlus,
    SAdd, SSubtract,
    SMultiply, SDivision,

    SLess, SGreater,
    SEqual, SNotEqual,
    
    SVariable,

    SDoNothing,
    SAssign,

    SIf,

    SMachine

} = require('../modules/Semantics/index.js');

function main() {
    let expression = null;
    let environment = null;
    
    /**
     * Предложение x = x + 1, где x = 2
     */
    console.log("\n\n1 Expression: \n...");
    expression = new SAssign(
        'x',
        new SAdd(
            new SVariable('x'),
            new SNumber(1)
        )
    );
    
    environment = {
        x: new SNumber(2)
    };

    machine = new SMachine(expression, environment);
    machine.run();
    

    /**
     * Предложение
     * if (x) { y = 1 } else { y = 2 } где x = true
     */
    console.log("\n\n2 Expression: \n...");
    expression = new SIf(
        new SVariable('x'),
        new SAssign('y', new SNumber(1)),
        new SAssign('y', new SNumber(2))
    );
    
    environment = {
        x: new SBoolean(true)
    };

    machine = new SMachine(expression, environment);
    machine.run();
    


    /**
     * Предложение
     * if (x) { y = 1 }, где x = true
     */
    console.log("\n\n3 Expression: \n...");
    expression = new SIf(
        new SVariable('x'),
        new SAssign('y', new SMinus(1)),
        new SDoNothing()
    );
    
    environment = {
        x: new SBoolean(true)
    };

    machine = new SMachine(expression, environment);
    machine.run();
    

}

main();