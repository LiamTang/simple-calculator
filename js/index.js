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
  let preValue;
  let nextValue = [];

  /** clear numbers*/
  clear.addEventListener("click", () => {
    text.innerHTML = "";
  });

  /** delete a number */
  del.addEventListener("click", () => {
    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
  });

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      text.innerHTML += buttons[i].value;
      if (buttons[i].value == "+") {
        preValue = text.innerHTML.split("+")[0];
        nextValue = text.innerHTML.split("+")[1];
        preValue = Number(preValue) + Number(nextValue);
      }
      if (buttons[i].value == "-") {
      }
      if (buttons[i].value == "=") {
      }
    });
  }
};
