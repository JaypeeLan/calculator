"use strict";
var calculatorDisplay = document.querySelector("h1");
var inputBtns = document.querySelectorAll("button");
var clearBtn = document.getElementById("clear-btn");
var firstValue = 0;
var operatorValue = "";
var awaitingNextValue = false;
// Calculate first and second values depending on operator
var calculate = {
    "/": function (firstNumber, secondNumber) {
        return firstNumber / secondNumber;
    },
    "*": function (firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    },
    "+": function (firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    },
    "-": function (firstNumber, secondNumber) {
        return firstNumber - secondNumber;
    },
    "=": function (firstNumber, secondNumber) { return secondNumber; },
};
function useOperator(operator) {
    var currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        // chain calculations
        operatorValue = operator;
        return;
    }
    // if no value
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {
        var calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //  save operator and await next value after inputting first value
    awaitingNextValue = true;
    operatorValue = operator;
}
function sendNumberValue(number) {
    // replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else {
        // replace number if current display value is zero
        var displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =
            displayValue === "0" ? number : displayValue + number;
    }
}
function addDecimal() {
    // if operator is added already after initial value
    if (awaitingNextValue)
        return;
    if ((!calculatorDisplay.textContent).includes(".")) {
        calculatorDisplay.textContent = "".concat(calculatorDisplay.textContent, ".");
    }
}
// reset display
function resetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
}
// ======================== //
inputBtns.forEach(function (inputButton) {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener("click", function () {
            return sendNumberValue(inputButton.value);
        });
    }
    else if (inputButton.classList.contains("operator")) {
        inputButton.addEventListener("click", function () { return useOperator(inputButton.value); });
    }
    else if (inputButton.classList.contains("decimal")) {
        inputButton.addEventListener("click", function () { return addDecimal(); });
    }
});
clearBtn.addEventListener("click", resetAll);
