import { subtract } from "./app";

function init() {
    const form = document.querySelector("form");
    form?.addEventListener("submit", submitHandler);
  }

  function submitHandler() {
    const num1 = document.querySelector("input[name='firstnumber']");
    const num2 = document.querySelector("input[name='secondnumber']");
    const result = subtract(Number(1), Number(2));
    const resultElement = document.querySelector("p");
    if (resultElement) {
      resultElement.textContent = result.toString();
    }
  }

  init();
