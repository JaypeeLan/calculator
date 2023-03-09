const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(currentValue);
  }
  //  save operator and await next value after inputting first value
  awaitingNextValue = true;
  operatorValue = operator;
  console.log(firstValue, operatorValue);
}

function sendNumberValue(number) {
  // replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // replace number if current display value is zero
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator is added already after initial value
  if (awaitingNextValue) return;

  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// ======================== //
inputBtns.forEach((inputButton) => {
  if (inputButton.classList.length === 0) {
    inputButton.addEventListener("click", () =>
      sendNumberValue(inputButton.value)
    );
  } else if (inputButton.classList.contains("operator")) {
    inputButton.addEventListener("click", () => useOperator(inputButton.value));
  } else if (inputButton.classList.contains("decimal")) {
    inputButton.addEventListener("click", () => addDecimal());
  }
});

// reset display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// ===============/
clearBtn.addEventListener("click", resetAll);
