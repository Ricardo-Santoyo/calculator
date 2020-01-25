const display = document.querySelector('#display');
const operators = document.querySelector('#operators');
const numpad = document.querySelector('#numpad');
display.textContent = 0;
let n = "";
let numValue = [];
let storeValue = [];

function add(numValue) {
    return numValue.reduce((accumulatedSum, currentNum) => accumulatedSum + currentNum);
};

function subtract(numValue) {
    return numValue.reduce((accumulatedDifference, currentNum) => accumulatedDifference - currentNum);
};

function multiply(numValue) {
    return numValue.reduce((accumulatedProduct, currentNum) => accumulatedProduct * currentNum);
};

function divide(numValue) {
    return numValue.reduce((accumulatedQuotient, currentNum) => accumulatedQuotient / currentNum);
};

function operate(numValue, operator) {
    switch (operator) {
        case "+":
            return add(numValue);
        case "−":
            return subtract(numValue);
        case "×":
            return multiply(numValue);
        case "÷":
            return divide(numValue);
    }
};

operators.addEventListener('click', displayOperators);

function displayOperators(e) {
    let operatorSelected;
    operatorSelected = e.target.id;
    switch (operatorSelected) {
        case "+":
        case "−":
        case "×":
        case "÷":
            pushN();
            display.textContent += operatorSelected;
            storeValue.push(operatorSelected);
            break;
        case "=":
            if (n == "" && storeValue.length < 3) {
                return display.textContent = "= " + storeValue[storeValue.length - 2];
            }
            else if (n == "") {
                storeValue.splice(storeValue.length - 1,1);
                pemdas();
                return display.textContent = "= " + storeValue;
            };
            pushN();
            pemdas();
            display.textContent = "= " + storeValue;
            break;
        case "AC":
            clear();
            break;
    }

};

numpad.addEventListener('click', displayNum)

function displayNum(e) {
    removeZero();
    let num;
    num = e.target.id
    switch (num) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            display.textContent += num;
            n += num;
            break;
    }
};

function pemdas() {
    for (i = 0; i < storeValue.length; i++) {
        if (storeValue[i] == "×" || storeValue[i] == "÷") {
            numValue.push(storeValue[i - 1]);
            numValue.push(storeValue[i + 1]);
            result = operate(numValue, storeValue[i]);
            storeValue.splice(i - 1, 3, result);
            i = 0;
            numValue = [];
        }
    }

    for (i = 0; i < storeValue.length; i++) {
        if (storeValue[i] == "+" || storeValue[i] == "−") {
            numValue.push(storeValue[i - 1]);
            numValue.push(storeValue[i + 1]);
            result = operate(numValue, storeValue[i]);
            storeValue.splice(i - 1, 3, result);
            i = 0;
            numValue = [];
        }
    }
};

function pushN() {
    storeValue.push(Number(n));
    n = "";
};

function clear() {
    display.innerHTML = 0;
    numValue = [];
    storeValue = [];
    n = "";
};

function removeZero() {
    if (display.textContent == 0) {
        display.textContent = "";
    }
};