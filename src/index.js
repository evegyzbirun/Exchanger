import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/exchanger.js';

async function getCurrency(target_code, amount) {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/e70794b498b5310ad96c3edd/pair/USD/${target_code}/${amount}`);
    const jsonifiedResponse = await response.json();
    document.querySelector('#tradeRate').innerText = `${amount}$ of USD is ${target_code}: ${jsonifiedResponse.conversion_result}`;
    if (!response.ok) {
      const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
      throw new Error(errorMessage);
    }
    return jsonifiedResponse;
  } catch (error) {
    document.querySelector('#tradeRate').innerText = `${error}, wrong currency input`;
    return error;
  }
}

// function printError(error, target_code) {
//   document.querySelector('#tradeRate').innerText = `There was an error accessing the currency data for ${target_code}: 
//   ${error}.`;
// }

function handleFormSubmission(event) {
  event.preventDefault();
  const cyrrencyId = document.querySelector('#id').value.toUpperCase();
  const amountInput = document.querySelector('#fundAmount').value;
  let myExchanger = new Exchanger(amountInput);
  document.querySelector('#id').value = null;
  getCurrency(cyrrencyId, myExchanger.amount);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});