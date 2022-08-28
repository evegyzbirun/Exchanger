import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/exchanger.js';

async function getCurrency(target_code, amount) {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${target_code}/${amount}`);
    const jsonifiedResponse = await response.json();
    document.querySelector('#tradeRate').innerText = `${amount}$ of USD is ${target_code}: ${jsonifiedResponse.conversion_result}`;
    if (!response.ok) {
      const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
      throw new Error(errorMessage);
    }
    return jsonifiedResponse;
  } catch (error) {
    document.querySelector('#tradeRate').innerText = `${error["error-type"]} wrong currency entered`;
    console.log(error);
    return error;
  }
}


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