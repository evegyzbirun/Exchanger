import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/exchanger.js';

async function getCurrency(target_code, amount) {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/e70794b498b5310ad96c3edd/pair/USD/${target_code}/${amount}`);
    const jsonifiedResponse = await response.json();
    console.log("Hi", jsonifiedResponse.conversion_result);
    if (!response.ok) {
      const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
      throw new Error(errorMessage);
    }
    return jsonifiedResponse;
  } catch (error) {
    return error;

  }
}
function handleFormSubmission(event) {
  event.preventDefault();
  const cyrrencyId = document.querySelector('#id').value.toUpperCase();
  const amountInput = document.querySelector('#fundAmount').value;
  let myExchanger = new Exchanger(amountInput);
  console.log(myExchanger)
  console.log(amountInput);
  document.querySelector('#id').value = null;
  console.log(getCurrency(cyrrencyId, myExchanger.amount));
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);

});