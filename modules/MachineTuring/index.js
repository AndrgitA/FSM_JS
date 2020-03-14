/**
 * Реализация объектов представления Machine Turing
 * В данном классе реализовано: 
 *  - Вывод состояний и информцаии MT
 */

class State {

}

class MachineTuring {
    constructor(alphabet = [], tapeSymbols = [], blankSymbol = ' ', states = {}, startState = '', successStates = []) {
        this._alphabet = alphabet;                  // Алфавит, из букв которых состоят входные слова
        this._tapeSymbols = tapeSymbols;            // Символы, которые могут быть записаны на ленту в процессе работы машины
        this._blankSymbol = blankSymbol;          // Пробельный cимвол

        this._states = states;                      // Состояния управляющего автомата
        this._startState = startState;              // Стартовое состояние автомата
        this._successStates = successStates;        // Допускающие состояния автомата
    }

    _printf(str) {
        let args = [].slice.call(arguments, 1),
            i = 0;
        
        console.log(str.replace(/%s/g, () => args[i++]));
    }

    print() {
        this._printf(
            "Информация о машине: \n" + 
            "\tАлфавит: \"%s\"\n" + 
            "\tСимволы записи: \"%s\"\n" +
            "\tПробельный символ: \"%s\"\n" + 
            "\tСостояния: %s\n" +
            "\tСтартовое состояние: \"%s\"\n" +
            "\tКонечные состояния: \"%s\"\n",
            this._alphabet.join(''),
            this._tapeSymbols.join(''),
            this._blankSymbol,
            JSON.stringify(this._states, null, '\t').split('\n').join('\n\t'),
            this._startState,
            this._successStates
        );
    }

    run(tapeString) {
        let tmp = tapeString.slice(0),
            i = 0;
        let state = this._startState;
        while (!this._successStates.includes(state)) {
            const char = tmp.charAt(i);
            if (this._states[state]) {
                const next = this._states[state].find((s) => s.symbol === char);
                if (next) {
                    tmp = tmp.slice(0, i) + next.write + tmp.slice(i + 1);
                    i += next.step;
                    state = next.to;
                } else {
                    return null;
                }

                if (i < 0 || i > tapeString.length - 1) {
                    return null;
                }
            } else {
                return null;
            }
            console.log("%o", state, tmp.slice(0, i) + '(' + tmp.charAt(i) + ')' + tmp.slice(i + 1));
        }
        return tmp;
    }
}

module.exports = MachineTuring;