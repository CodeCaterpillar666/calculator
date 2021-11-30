// Declare all variables used to do math.
let operand1 = 0;
let operand2 = undefined;
let operator = undefined;


/*  Why we need this weird boolean variable?
    Each time we press operator buttons including '+', '-', '×', '÷' and '=', we will put the first operand and current operator on the history screen,
    then we press the second operand, now is the time we need to clear the main screen followed by putting the second operand on the main screen.
    Like pressing '1', '+' and '2', then the main screen will be showing only the second operand '2' and history screen will be '1 +',
    and more importantly, not until we press another operator could we clear it, because we may want to change operator,
    so we need one more boolean variable to help us 
*/
let needClearScreen = false;


// Declare all buttons here.
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('.clear-button');
const deleteButotn = document.querySelector('.delete-button');
const decimalButton = document.querySelector('.decimal-button');
const equalButton = document.querySelector('.equal-button');


// mainScreen points to the main-screen element
const mainScreen = document.querySelector('.main-screen');
// historyScreen points to the history-screen element showing last step expression
const historyScreen = document.querySelector('.history-screen');



// Add all event listeners.
decimalButton.addEventListener('click', () => {
    if (mainScreen.textContent.includes('.')) {
        return;  // do nothing if there is already a decimal point
    }
    mainScreen.textContent += '.';
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (needClearScreen) clearScreen();
        let operand = button.textContent;
        mainScreen.textContent = mainScreen.textContent == '0' ? operand : mainScreen.textContent + operand;
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 
        if (operator != undefined && operand2 != undefined) calculate();
        operand1 = Number(mainScreen.textContent);
        // console.log(typeof(operand1) + ' ' + operand1);
        operator = button.textContent;
        // console.log(typeof(operator) + ' ' + operator);
        historyScreen.textContent = `${mainScreen.textContent} ${operator}`;
        needClearScreen = true;
    })
});

equalButton.addEventListener('click', () => calculate());
clearButton.addEventListener('click', () => clear());
deleteButotn.addEventListener('click', () => deleteLastDigit());


function deleteLastDigit() {
    mainScreen.textContent = mainScreen.textContent.slice(0, -1);
    if (mainScreen.textContent == '') mainScreen.textContent = '0';
}


function calculate() {
    // If currently no operator, do nothing
    if (operator == undefined) return;

    // Disallow divide by 0
    if (operator == "÷" && operand2 == '0') {
        alert('Sorry! Cannot divide by 0!');
        return;
    }

    operand2 = Number(mainScreen.textContent);
    let result = operate(operator, operand1, operand2);
    mainScreen.textContent = result;
    historyScreen.textContent = `${operand1} ${operator} ${operand2} =`;
    operand1 = result;
    operand2 = undefined;
    operator = undefined;
}


function clearScreen() {
    mainScreen.textContent = '0';
    needClearScreen = false;
}


function clear() {
    mainScreen.textContent = '0';
    historyScreen.textContent = '';
    operand1 = 0;
    operand1 = undefined;
    operator = undefined;
    needClearScreen = false;
}

function roundToFour(number) {
    return Math.round(number * 10000) / 10000;
}

function operate(operator, o1, o2) {
    let result = 0;
    // operator possible values:
    // add, subtract, multiply, divide
    if (operator === '+') result = add(o1, o2);
    if (operator === '-') result = subtract(o1, o2);
    if (operator === '×') result = multiply(o1, o2);
    if (operator === '÷') result = divide(o1, o2);
    return roundToFour(result);
}

// Basic functions for +, -, *, and /
// o1 = operand 1
// o2 = operand 2
function add(o1, o2) {
    return o1 + o2;
}

function subtract(o1, o2) {
    return o1 - o2;
}

function multiply(o1, o2) {
    return o1 * o2;
}

function divide(o1, o2) {
    return o1 / o2;
}