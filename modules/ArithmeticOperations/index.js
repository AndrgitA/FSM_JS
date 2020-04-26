/**
 * Состояния работы транслятора
 */
const STATE = {
  WORKED: 0,
  FINISHED: 1,
};

/**
 * Типы найденых токенов в строке
 */
const TOKEN_TYPES = {
  UNDEFINED: 0,
  DELIMITER: 1,
  NUMBER: 2,
};

/**
 * @description Класс транслятора
 */
class AccemblerArithmetic {
  /**
   * При инициализации очищаем все переменные
   * и устанавливаем начальные состояния в трансляторе
   */
  constructor() {
    this.clear();
  }

  /**
   * @description - Переменным класса устанавливаем стандартные значения
   */
  clear() {
    this.stringAccebler = '';
    this.result = 0;
    this.token = undefined;
    this.tok = STATE.WORKED;
    this.token_type = TOKEN_TYPES.UNDEFINED;
    this.pos = 0;
  }

  /**
   * @description - Запуск транслятора
   * @param {String} str - строка, по которой будет проходить работа транслятора
   * @returns {Number} - Возвращаем численное значение
   */
  run(str = '') {
    console.log("\nSTART RUN: ", str);
    this.clear();
    this.stringAccebler = str;
    if (str.length) {
      this.result = this.level1();
    }

    return this.result;;
  }

  /**
   * @description - Возвращаем символ в входной строке по указанной позиции работы транслятора
   * @param {Number} index - индекс позиции 
   */
  _getCurrentSymbol(index = null) {
    let i = index !== null ? index : this.pos;
    return this.stringAccebler.charAt(i);
  }

  /**
   * @description - Проверка на конец строки в работе транслятора
   */
  _notEnd() {
    return this.pos < this.stringAccebler.length;
  }

  /**
   * @description - Является ли текущий символ разделителем
   */
  _isDelimiter() {
    return /[\+\-\*\/\^\%\(\)]/.test(this._getCurrentSymbol());
  }

  /**
   * @description - Является ли текущий символ цифрой
   */
  _isDigit() {
    return /\d/.test(this._getCurrentSymbol());
  }

  /**
   * @description - поиск следующего токена в входной строке
   */
  getToken() {
    this.token = undefined;
    this.tok = STATE.WORKED;
    this.token_type = TOKEN_TYPES.UNDEFINED;

    while(this.isWhite(this._getCurrentSymbol())) {     // пропускаем все пробельные символы
      this.pos++;
    }

    if (!this._notEnd()) {                              // Если это конец строки
      this.token = '';
      this.token_type = TOKEN_TYPES.DELIMITER;
      this.tok = STATE.FINISHED;
    } else if (this._isDelimiter()) {                   // Если это разделитель
      this.token = this._getCurrentSymbol();
      this.pos++;
      this.token_type = TOKEN_TYPES.DELIMITER;
    } else if (this._isDigit()) {                       // Если это число
      this.token = '';
      while(this._isDigit()) {
        this.token += this._getCurrentSymbol();
        this.pos++;
      }
      this.token_type = TOKEN_TYPES.NUMBER;
    }

    if (this.token_type === TOKEN_TYPES.UNDEFINED) {    // Если в ходе считывания появились проблемы, то это ошибка входной строки
      throw new Error("Неизвестный синтаксис");
    }
  }

  /**
   * @description - Проверка символа на значимость к пробельным
   * @param {String} c - проверочный символ
   * @returns {Boolean} - Флаг возвращает проверку на равенство к пробелу и знаку табуляции
   */
  isWhite(c) {
    return c === ' ' || c === '\t';
  }

  /**
   * @description - Точка входа в анализатор
   */
  level1() {
    this.getToken();
    if (!this.token_type) {
      throw new Error("UNDEFINDE TYPE FOR TOKEN");
    }
    return this.level2();
  }

  /**
   * @description - Происходит сложение и вычитание двух термов
   */
  level2() {
    let result = this.level3();
    while (/[\-\+]/.test(this.token)) {
      const op = this.token;
      this.getToken();
      const hold = this.level3();
      result = this.arith(op, result, hold);
    }
    return result;
  }

  /**
   * @description - Вычисление произведения, частного или остатка от деления у двух факторов
   */
  level3() {
    let result = this.level4();
    while (/[\*\/\%]/.test(this.token)) {
      const op = this.token;
      this.getToken();
      const hold = this.level4();
      result = this.arith(op, result, hold);
    }
    return result;
  }

  /**
   * @description - Обработка степени числа
   */
  level4() {
    let result = this.level5();
    if (this.token === '^') {
      this.getToken();
      const hold = this.level4();
      result = this.arith('^', result, hold);
    }
    return result;
  }

  /**
   * @description - Обработка унарного - или +
   */
  level5() {
    let op;
    if (this.token_type === TOKEN_TYPES.DELIMITER && /[\+\-]/.test(this.token)) {
      op = this.token;
      this.getToken();
    }
    let result = this.level6();
    if (op !== undefined) {
      result = this.unary(op, result);
    }
    return result;
  }

  /**
   * @description - Обработка выражения в круглых скобках
   * или возвращение значения примитивного значения
   */
  level6() {
    let result = 0;
    if (this.token === '(' && this.token_type === TOKEN_TYPES.DELIMITER) {
      this.getToken();
      result = this.level2();
      if (this.token !== ')') {
        throw new Error("Нет закрывающейся скобки для выражения");
      }
      this.getToken();
    } else {
      result = this.primitive();
    }
    return result;
  }

  /**
   * @description - Определение значения найденного численного токена
   * @returns {Number} - число
   */
  primitive() {
    let result = 0;
    if (this.token_type === TOKEN_TYPES.NUMBER) {
      result = Number.parseInt(this.token);
      this.getToken();  
    }
    return result;
  }

  /**
   * @description - Вычисление арифмитических операций 
   * @param {String} op - Символ операции
   * @param {Number} r - Левый операнд
   * @param {Number} h - Правый операнд
   */
  arith(op, r, h) {
    let result = 0;
    switch(op) {
      case '-': 
        result = r - h;
        break;
      case '+':
        result = r + h;
        break;
      case '*':
        result = r * h;
        break;
      case '/':
        result = r / h;
        break;
      case '%':
        const t = Math.floor(r / h); 
        result = r - t * h;
        break;
      case '^':
        if (h === 0) {
          result = 1;
          break;
        }
        let t2 = r;
        for (let i = Math.abs(h) - 1; i > 0; --i) {
          t2 = t2 * r;
        }
        result = t2;
        
        // Если правый операнд был отрицательным, нужно 1 / поделить на получившийся результат
        if (h < 0) {
          result = 1 / result; 
        }
        break;
      default: 
        return 0;
    }
    return result;
  }

  /**
   * @description - Вычисление унарной операции
   * @param {String} o - Символ унарной операции -|+
   * @param {Number} r - Число над которым производится операция
   */
  unary(o, r) {
    return o === '-' ? -r : r;
  }
}

module.exports = AccemblerArithmetic;