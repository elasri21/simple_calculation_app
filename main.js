// Select all number
const numberButtons = document.querySelectorAll("[data-number]");
// Select all operations
const operationButtons = document.querySelectorAll("[data-operation]");
// get equal button
const equalsButton = document.querySelector("[data-equals]");
// get delete button
const deleteButton = document.querySelector("[data-delete]");
// get clear button
const allClearButton = document.querySelector("[data-all-clear]");
// this two elements are screen of the calculator
//First one holds previous operand and the second holds current operand
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  // constaructor function
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  /**
   * clear method - Resets the calculator to its default state
   */
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  /**
   * delete - Removes the last character from the current operan
   * str.slice(0, -1) works like str.slice(0, str.length - 1)
   */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  /**
   * appendNumber - add a number or a decimal point to the current operand
   * first condition prevents multiple decimal points from being adding
   */
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  /**
   * chooseOperation - Sets the operation for the calculator.
   * If there's already a previous operand, it computes the result before setting the new operation.
   * Moves the current operand to the previous operand and clears the current operand.
   */
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  /**
   * compute - Performs the selected mathematical operation
   * if statement checks if operands are valid numbers
   * Updates current operand with result and clears previous operand and operation.
   */
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        if (current !== 0) {
          computation = prev / current;
          break;
        }
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  /**
   * getDisplayNumber - Formats a number for display
   * Separates the integer and decimal parts of the number
   * the usage of toLocaleString Adds commas to the integer part for better readability
   * Return: formatted number as a string.
   */
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /**
   * updateDisplay - Updates HTML elements to show current and previous operands.
   * Displays operation along with previous operand if an operation is selected.
   */
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// declare a new calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// choose operand by clicking on a number
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// choose operation by clicking on one
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// click equal to compute and update displayed result
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// click AC to clear all and update display
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// click DEL to delete and update display
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
