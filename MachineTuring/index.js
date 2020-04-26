/**
 * Тема "Машина Тьюринга".
 * 1. Создать объекты программы реализующие машину Тьюринга.
 * 2. Реализовать процедуры добавления/удаления переходов и состояний, добавления и
 * удаления начальных и заключительных состояний.
 * 3. Реализовать процедуру перевода машины Тьюринга из заданного состояния в другое
 * посредством одного из допустимых переходов.
 * 4. Реализовать процедуру/метод работы детерминированной машины Тьюринга.
 * (20 баллов)
 * 5. Реализовать с помощью машины Тьюринга распознавание строк вида «aaabbbccc» –
 * сначала символ a, потом столько же b и столько же c. (см. книгу Тома Стюарта)
 * (дополнительно 15 баллов)
 * 
 * 
 * Итого(35) баллов
 */

const MachineTuring = require('../modules/MachineTuring/index.js');

function main() {
    const mt = new MachineTuring(
        ['a', 'b', 'c', 'X', '_'],
        ['X'],
        '_',
        {
            'qo': [
                { 
                    'symbol': '_',
                    'write': '_',
                    'step': 1,
                    'to': 'qo'
                },
                {
                    'symbol': 'a',
                    'write': 'a',
                    'step': 0,
                    'to': 'q1'
                }
            ],
            'q1': [
                { 
                    'symbol': 'X',
                    'write': 'X',
                    'step': 1,
                    'to': 'q1'
                },
                { 
                    'symbol': 'a',
                    'write': 'X',
                    'step': 1,
                    'to': 'q2'
                },
                { 
                    'symbol': '_',
                    'write': '_',
                    'step': -1,
                    'to': 'q6'
                },
            ],
            'q2': [
                { 
                    'symbol': 'a',
                    'write': 'a',
                    'step': 1,
                    'to': 'q2'
                },
                { 
                    'symbol': 'X',
                    'write': 'X',
                    'step': 1,
                    'to': 'q2'
                },
                { 
                    'symbol': 'b',
                    'write': 'X',
                    'step': 1,
                    'to': 'q3'
                },
            ],
            'q3': [
                { 
                    'symbol': 'b',
                    'write': 'b',
                    'step': 1,
                    'to': 'q3'
                },
                { 
                    'symbol': 'X',
                    'write': 'X',
                    'step': 1,
                    'to': 'q3'
                },
                { 
                    'symbol': 'c',
                    'write': 'X',
                    'step': 1,
                    'to': 'q4'
                },
            ],
            'q4': [
                { 
                    'symbol': 'c',
                    'write': 'c',
                    'step': 1,
                    'to': 'q4'
                },
                { 
                    'symbol': '_',
                    'write': '_',
                    'step': -1,
                    'to': 'q5'
                }
            ],
            'q5': [
                { 
                    'symbol': 'a',
                    'write': 'a',
                    'step': -1,
                    'to': 'q5'
                },
                { 
                    'symbol': 'b',
                    'write': 'b',
                    'step': -1,
                    'to': 'q5'
                },
                { 
                    'symbol': 'c',
                    'write': 'c',
                    'step': -1,
                    'to': 'q5'
                },
                { 
                    'symbol': 'X',
                    'write': 'X',
                    'step': -1,
                    'to': 'q5'
                },
                { 
                    'symbol': '_',
                    'write': '_',
                    'step': 1,
                    'to': 'q1'
                }
            ],
        },
        'qo',
        ['q6']
    );

    const startString = '__aaabbbccc__';

    let z = mt.run(startString);
    if (z !== null) {
        console.log("SUCCESS: (", startString, ') : (', z, ')');
    } else {
        console.log("FAILED");
    }
}

main();


