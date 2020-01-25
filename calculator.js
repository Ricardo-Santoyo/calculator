const display = document.querySelector('#display');
const operators = document.querySelector('#operators');
const numpad = document.querySelector('#numpad');
display.textContent = 0;
let n = "";
let finalAns = "";
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
    if (numValue[1] == 0) {
        return "Divide by 0 error";
    }
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
            addZero();
            display.textContent += operatorSelected;
            storeValue.push(operatorSelected);
            break;
        case "=":
            if (display.textContent == 0) {
                return display.textContent = "= 0";
            }
            else if (n == "" && storeValue.length < 3) {
                return display.textContent = "= " + storeValue[storeValue.length - 2];
            }
            else if (n == "") {
                storeValue.splice(storeValue.length - 1,1);
                pemdas();
                return display.textContent = "= " + storeValue;
            };
            pushN();
            pemdas();
            if (storeValue[0] == "Divide by 0 error") {
                return display.textContent = "= " + storeValue;
            };
            roundAns();
            display.textContent = "= " + finalAns;
            break;
        case "AC":
            clear();
            break;
        case "backspace":
            backspace();
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
        case "decimal":
            if (n.includes(".")) {
                return;
            }
            display.textContent += ".";
            n += ".";
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
    if (n != "") {
        storeValue.push(Number(n));
        n = "";
    }
};

function clear() {
    display.innerHTML = 0;
    numValue = [];
    storeValue = [];
    n = "";
    finalAns = "";
};

function removeZero() {
    if (display.textContent == 0 && n == "" || display.textContent == "= 0" && n == "") {
        display.textContent = "";
    }
};

function roundAns() {
    return finalAns = Math.round(storeValue * 1e9) / 1e9
};

function backspace() {
    if (storeValue.length < 2) {
        return;
    }
    pushN();
    storeValue.pop();
    display.textContent = "";
    storeValue.forEach(value => {
        display.textContent += value;
    });
};

function addZero() {
    if(display.textContent == "0" && n == "" || display.textContent == "= 0" && n == "") {
        storeValue.splice(0,2);
        storeValue.push(0);
    }
};