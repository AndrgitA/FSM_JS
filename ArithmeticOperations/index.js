/**
 * Лабораторная работа №5
 * Тема "Построение транслятора" (продолжение лабораторной работы №4)
 * Для конкретной задачи обработки текстовой строки записать КС грамматику.
 * Для этой КС грамматики необходимо реализовать транслятор.
 * (40 баллов)
 * Список задач обработки текста.
 * 
 * 3. Вычисление арифметических выражений.
 * 
 * Итого(40) баллов
 */


 /**
  * Описание контекстно-свобоной грамматики для
  * вычисления математического выражения с числами
  * 
  * 
  * Терминалы                     { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, +, -, ^, *, /, %, (, ) }
  * Нетерминалы                   { E, T, X, Y, C }
  * 
  * Начальный нетерминал всегда E
  * 
  * Продукция                     Символ, с которого в поисковой строке начинается разложение из "Нетерминала"  
  * 
  * X -> T
  * X -> T + T
  * X -> T - T
  * 
  * T -> F
  * T -> F * F
  * T -> F / F
  * T -> F % F
  * 
  * F -> P
  * F -> P ^ Z
  * 
  * P -> Z
  * P -> +Z
  * P -> -Z
  * 
  * Z -> (X)
  * Z -> [0-9]
  */
const AccemblerArithmetic = require('../modules/ArithmeticOperations/index.js');
function main() {
  const strs = [
    "1 /3+ 2 ",
    "1 / (3+2)",
    "1 + (33 * 20 / 5)",
    "-1 + (33 * 20 / 5)",
    "5 % 3",
    "2^(-2)",
    "2^2",
    "-(2^(2^3))",
    "2 * 2 ^ 3",
    "-2^3",
    "(2^2)^3 / (4 * 8) - (6 % 4 + 2)",
    "2+c"
  ];

  const accembler = new AccemblerArithmetic();

  strs.forEach((str) => {
    const result = accembler.run(str);

    console.log("ACCEMBLER WORK RESULT: \"" + result + "\"");
  });
}

main();