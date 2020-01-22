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