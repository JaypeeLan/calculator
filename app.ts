const calculatorDisplay = document.querySelector("h1") as HTMLElement;
const inputBtns = document.querySelectorAll("button")!;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;

let firstValue: number = 0;
let operatorValue: string = "";
let awaitingNextValue: boolean = false;

interface Calculate {
  [key: string]: Function;
}
// Calculate first and second values depending on operator
const calculate: Calculate = {
  "/": (firstNumber: number, secondNumber: number) =>
    firstNumber / secondNumber,

  "*": (firstNumber: number, secondNumber: number) =>
    firstNumber * secondNumber,

  "+": (firstNumber: number, secondNumber: number) =>
    firstNumber + secondNumber,

  "-": (firstNumber: number, secondNumber: number) =>
    firstNumber - secondNumber,

  "=": (firstNumber: number, secondNumber: number) => secondNumber,
};

function useOperator(operator: string) {
  const currentValue = Number(calculatorDisplay.textContent);

  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    // chain calculations
    operatorValue = operator;
    return;
  }
  // if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //  save operator and await next value after inputting first value
  awaitingNextValue = true;
  operatorValue = operator;
}

function sendNumberValue(number: string) {
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

  if ((!calculatorDisplay.textContent as any).includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
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

clearBtn.addEventListener("click", resetAll);
