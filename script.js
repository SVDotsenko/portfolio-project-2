const arr = [];
const display = document.querySelector('.calc-screen p');

document.querySelector('.ac').onclick = () => {
    display.textContent = '0';
    arr.length = 0;
};

const isArithmeticOperator = symbol => /[+\-*\/%]/.test(symbol);
const isDot = symbol => /\./.test(symbol);

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
    const isZero = symbol => symbol == 0;
    const isDigit = symbol => /[1-9]/.test(symbol);
    const zeroValidator = () => arr[0] == 0 && arr.length === 1;
    const concatSymbols = () => arr.length ? arr.join('') : '0';
    const currentSymbol = event.target.textContent.charAt(0) === 'X' ? '*' : event.target.textContent.charAt(0);
    const lastSymbol = arr.at(-1);

    if (isZero(currentSymbol)) {
        if (zeroValidator()) {
            alert('You can not use two zero in succession');
        } else {
            arr.push(currentSymbol);
            display.textContent = concatSymbols();
        }
    } else if (isDot(currentSymbol)) {
        if (dotValidator()) {
            alert('You can not use dot here');
        } else {
            arr.push(currentSymbol);
            display.textContent = concatSymbols();
        }
    } else if (isArithmeticOperator(currentSymbol)) {
        isArithmeticOperator(lastSymbol) ? arr[arr.length - 1] = currentSymbol : arr.push(currentSymbol);
        display.textContent = concatSymbols();
    } else if (isDigit(currentSymbol)) {
        arr.push(currentSymbol);
        display.textContent = concatSymbols();
    } else if (currentSymbol === '←') {
        arr.pop();
        display.textContent = concatSymbols();
    } else if (currentSymbol === '=') {
        if (lastSymbol !== '.' && (isDigit(lastSymbol) || isZero(lastSymbol))) {
            try {
                display.textContent += `=${eval(concatSymbols())}`;
                arr.length = 0;
            } catch (e) {
                alert('This expression can not be calculated. Change it and try again.');
            }
        } else {
            alert('The last symbol must be a number');
        }
    }
    console.log(arr);
}