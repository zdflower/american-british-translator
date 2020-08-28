import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const NO_TEXT_ERROR = "Error: No text to translate."
const errorDiv = document.getElementById('error-msg');

/* String Idioma -> 
   Responde al evento de click en el botón "translate-btn"
   Utiliza una cadena de texto que es la frase a traducir, que proviene del contenido del div cuyo id es "text-input".
   Idioma es una String que puede tomar uno de dos valores: "american-to-british" o "british-to-american".
   Debe agregar (append, no reemplazar) la traducción de la frase en el div con id "translated-sentence".
   Si no hay texto en text-input entonces agrega al div con id "error-msg" el mensaje de error: "Error: No text to translate."
*/
function translateHandler(){
  // obtener la traducción
  // agregar la traducción en translated-sentence o un mensaje de error en error-msg
  showErrorMsg(NO_TEXT_ERROR); // stub
}

/* String -> 
   Agrega msg al div error-msg.
*/
function showErrorMsg(msg){
  errorDiv.textContent = msg;
}

// Event listeners


/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    translateHandler
  }
} catch (e) {}
