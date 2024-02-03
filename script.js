const arr = [];
const display = document.querySelector('.calc-screen p');

document.querySelector('.ac').onclick = () => {
    display.textContent = '0';
    arr.length = 0;
    console.log(arr);
};

document.querySelector('.buttons').onclick = event => {
    const concatDigits = () => arr.length ? arr.join('') : '0';
    const symbol = event.target.textContent.charAt(0) === 'X' ? '*' : event.target.textContent.charAt(0);

    if (/[0-9.]/.test(symbol) || /[+\-*\/%]/.test(symbol)) {
        arr.push(symbol)
        display.textContent = concatDigits();
    } else if (symbol === '←') {
        arr.pop();
        display.textContent = concatDigits();
    } else if (symbol === '=') {
        display.textContent += `=${eval(concatDigits())}`;
        arr.length = 0;
    }
    console.log(arr);
}