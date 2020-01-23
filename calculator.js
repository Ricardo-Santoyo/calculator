const display = document.querySelector('#display');
const operators = document.querySelector('#operators');
const numpad = document.querySelector('#numpad');
let defaultText = 0;
    display.textContent = defaultText;
let a = "";
let b = "";
let operator = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case 'add':
            const sum = add(a, b);
            return sum;
        case 'subtract':
            const difference = subtract(a, b);
            return difference;
        case 'multiply':
            const product = multiply(a, b);
            return product;
        case 'divide':
            const quotient = divide(a, b);
            return quotient;
    }
}

operators.addEventListener('click', displayOperators);

function displayOperators(e) {
    let operatorSelected;
    operatorSelected = e.target.id;
    switch (operatorSelected) {
        case "+":
        case "−":
        case "×":
        case "÷":
            display.textContent += operatorSelected;
            operator += operatorSelected;
            break;
    }

}

numpad.addEventListener('click', displayNum)

function displayNum(e) {
    if (display.textContent == 0) {
        display.textContent = "";
    }
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
            if (operator != "") {
                b += num;
            }
            else if (operator == "") {
                a += num;
            }
            break;
    }
}