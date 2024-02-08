const arr = [];
const display = document.querySelector('.calc-screen p');

/**
 * Prints an error message to the DOM and clears it after a specified timeout.
 * @param {string} message - The error message to be displayed.
 */
const printError = message => {
    setTimeout(() => document.querySelector('.errors').textContent = '', 2000);
    document.querySelector('.errors').textContent = message;
};

/**
 * Checks if a symbol is an arithmetic operator.
 * @param {string} symbol - The symbol to be checked.
 * @returns {boolean} - True if the symbol is an arithmetic operator, false otherwise.
 */
const isArithmeticOperator = symbol => /[+\-*\/%]/.test(symbol);

/**
 * Checks if a symbol is a dot.
 * @param {string} symbol - The symbol to check.
 * @returns {boolean} - True if the symbol is a dot, false otherwise.
 */
const isDot = symbol => /\./.test(symbol);

/**
 * Checks if the given array contains a dot.
 * @returns {boolean} True if the array contains a dot, false otherwise.
 */
const dotValidator = () => {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (isDot(arr[i])) {
            return true;
        }
        if (isArithmeticOperator(arr[i])) {
            return false;
        }
    }
    return false;
};

document.querySelector('.buttons').onclick = event => {
    /**
     * Checks if a symbol is zero.
     * @param {string} symbol - The symbol to check.
     * @returns {boolean} Returns true if the symbol is zero, otherwise returns false.
     */
    const isZero = symbol => symbol === '0';

    /**
     * Checks if a symbol is a digit in range from 1 to 9.
     * @param {string} symbol - The symbol to be checked.
     * @returns {boolean} - Returns true if the symbol is a digit, otherwise false.
     */
    const isDigit = symbol => /[1-9]/.test(symbol);

    /**
     * Checks if the first element of the array is '0' and the array has a length of 1.
     * @returns {boolean} True if the first element is '0' and the array has a length of 1, otherwise false.
     */
    const zeroValidator = () => arr[0] === '0' && arr.length === 1;

    /**
     * Concatenates the elements of an array into a single string using a specified separator.
     * @returns {string} The concatenated string or '0' if the array is empty.
     */
    const concatSymbols = () => arr.length ? arr.join('') : '0';
    const currentSymbol = event.target.textContent.charAt(0) === 'X' ? '*' : event.target.textContent.charAt(0);
    const lastSymbol = arr.at(-1);

    if (isZero(currentSymbol)) {//if the user pressed the zero button
        if (zeroValidator()) {
            printError('You can not use two zero in succession');
        } else {
            arr.push(currentSymbol);
            display.textContent = concatSymbols();
        }
    } else if (isDot(currentSymbol)) {//if the user pressed the dot button
        if (dotValidator()) {
            printError('You can not use dot here');
        } else {
            arr.push(currentSymbol);
            display.textContent = concatSymbols();
        }
    } else if (isArithmeticOperator(currentSymbol)) {//if the user pressed an arithmetic operator
        isArithmeticOperator(lastSymbol) ? arr[arr.length - 1] = currentSymbol : arr.push(currentSymbol);
        display.textContent = concatSymbols();
    } else if (isDigit(currentSymbol)) {//if the user pressed a digit from 1 to 9
        arr.push(currentSymbol);
        display.textContent = concatSymbols();
    } else if (currentSymbol === '←') {//if the user pressed the backspace button
        arr.pop();
        display.textContent = concatSymbols();
    } else if (currentSymbol === '=') {//if the user pressed the equal button
        if (lastSymbol !== '.' && (isDigit(lastSymbol) || isZero(lastSymbol))) {
            try {
                display.textContent += `=${eval(concatSymbols())}`;
                arr.length = 0;
            } catch (e) {
                printError('This expression can not be calculated. Change it and try again.');
            }
        } else {
            printError('The last symbol must be a number');
        }
    }
};

document.querySelector('.ac').onclick = () => {
    display.textContent = '0';
    arr.length = 0;
};