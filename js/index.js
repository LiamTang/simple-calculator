"use strict";
window.onload = function () {
  const text = document.querySelector(".text");
  const buttons = document.querySelectorAll(".btn");
  const OperatorBtn = document.querySelectorAll(".btn1");

  let values = [];
  let preValue;
  let nextValue = [];

  /** resolve clear and delete button */
  for (let i = 0; i < OperatorBtn.length; i++) {
    OperatorBtn[i].addEventListener("click", () => {
      if (OperatorBtn[i].value === "AC") {
        text.innerHTML = 0;
      } else {
        text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
      }
    });
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      if (text.innerHTML == 0 && buttons[i].value == ".") {
        text.innerHTML = "0.";
      }
      if (text.innerHTML == 0 && buttons[i].value != ".") {
        text.innerHTML = "";
      }

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
