import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/exchanger.js';
import App from './js/app.js';

async function getCurrency(target_code) {
  const response = await Exchanger.getCurrency(target_code);
  if (response) {
    printElements(response, target_code);
  } else {
    printError(response);
  }
}
//
function printElements(response, target_code) {
  document.querySelector("tradeRate").innerText = `USD to ${target_code} is ${response.result}`
}

function printError(error, target_code) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${target_code}: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const cyrrencyId = document.querySelector('#id').value.toUpperCase();
  document.querySelector('#id').value = null;
  getCurrency(cyrrencyId);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);

});