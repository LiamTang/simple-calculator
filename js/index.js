"use strict";
window.onload = function () {
  const text = document.querySelector(".text");
  const clear = document.querySelector(".clear");
  const del = document.querySelector(".delete");
  const result = document.querySelector(".equal");
  const operators = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");
  const buttons = document.querySelectorAll(".btn");
  let flag = true;

  /** clear numbers*/
  clear.addEventListener("click", () => {
    text.innerHTML = "";
  });

  /** delete a number */
  del.addEventListener("click", () => {
    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
  });

  /** handle numbers and operators */
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
      text.innerHTML += e.target.value;
    });
  }

  /** handle equal  */
  result.addEventListener("click", function () {
    let inputString = text.innerHTML;
    let numbers = inputString.split(/\+|\-|\×|\÷/g);
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    let firstChar = text.innerHTML.substring(0, 1);
    if (
      firstChar === "÷" ||
      firstChar === "×" ||
      firstChar === "-" ||
      firstChar === "+"
    ) {
      flag = false;
      text.innerHTML = "ERROR";
      console.log("first letter should be a number");
    } else {
      let buttons = inputString.substring(0, inputString.length);
      for (let i = 0; i < buttons.length; i++) {
        if (
          (buttons[i] === "÷" ||
            buttons[i] === "×" ||
            buttons[i] === "-" ||
            buttons[i] === "+") &&
          buttons[i] === buttons[i + 1]
        ) {
          flag = false;
          text.innerHTML = "ERROR";
          console.log("invalid input");
        } else {
          flag = true;
          /** sequence is divide, multiplication, minus, plus */
          /** check until there is no divide operator in the array */
          let indexDivide = operators.indexOf("÷");
          while (indexDivide != -1) {
            numbers.splice(
              indexDivide,
              2,
              numbers[indexDivide] / numbers[indexDivide + 1]
            );
            operators.splice(indexDivide, 1);
            indexDivide = operators.indexOf("÷");
          }

          /** check until there is no Multiplication in the array  */
          let indexMulti = operators.indexOf("×");
          while (indexMulti != -1) {
            numbers.splice(
              indexMulti,
              2,
              numbers[indexMulti] * numbers[indexMulti + 1]
            );
            operators.splice(indexMulti, 1);
            indexMulti = operators.indexOf("×");
          }

          /** check until there is no minus operator in the operators array */
          /** example: numbers [3,3,3]
           * numbers.splice(0,2,3-3) => return numbers[0,3]
           *
           */
          let indexMinus = operators.indexOf("-");
          while (indexMinus != -1) {
            numbers.splice(
              indexMinus,
              2,
              parseFloat(numbers[indexMinus]) -
                parseFloat(numbers[indexMinus + 1])
            );
            operators.splice(indexMinus, 1);
            indexMinus = operators.indexOf("-");
          }

          /** check until there is no add operator in the operators array */
          /** example: numbers[6,6,6]
           * numbers.splice(index, number of elements you want to replace with, new number value) => return a new numbers array
           * numbers.splice(0,2,6+6) => return as numbers[12,6]
           */
          let indexAdd = operators.indexOf("+");
          while (indexAdd != -1) {
            numbers.splice(
              indexAdd,
              2,
              parseFloat(numbers[indexAdd]) + parseFloat(numbers[indexAdd + 1])
            );
            operators.splice(indexAdd, 1);
            indexAdd = operators.indexOf("+");
          }

          text.innerHTML = numbers[0];
        }
      }
    }
  });
};
