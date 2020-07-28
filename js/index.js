"use strict";
window.onload = function () {
  const text = document.querySelector(".text");
  const clear = document.querySelector(".clear");
  const del = document.querySelector(".delete");
  const result = document.querySelector(".equal");
  const operators = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");
  const buttons = document.querySelectorAll(".btn");

  let values = [];
  let prevVal = 0;

  let currentVal;
  let lastVal;
  let lastChar;
  let newVal;
  let displayResult = false;

  /** clear numbers*/
  clear.addEventListener("click", () => {
    text.innerHTML = "";
  });

  /** delete a number */
  del.addEventListener("click", () => {
    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
  });

  /** handle numbers */
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
      if (displayResult === false) {
        text.innerHTML += numbers[i].value;
        currentVal = text.innerHTML;
        console.log(currentVal);
      }
    });
  }

  /** handle operators */
  for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function () {
      text.innerHTML += operators[i].value;
      currentVal = text.innerHTML;
      lastChar = currentVal[currentVal.length - 1];
      if (
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "×" ||
        lastChar === "÷"
      ) {
        newVal = currentVal.substring(0, currentVal.length - 1);
      }
    });
  }

  // for (let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener("click", () => {
  //     text.innerHTML += buttons[i].value;
  //     if (buttons[i].value != "=") {
  //       if (buttons[i].value == "+") {
  //         prevVal = Number(text.innerHTML.split("+")[0]);
  //         currentVal = prevVal + Number(text.innerHTML.split("+")[1]);
  //         prevVal = currentVal;

  //         console.log(result1);
  //       }
  //     }
  //   });
  // }
};
