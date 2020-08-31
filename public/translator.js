import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const NO_TEXT_ERROR = 'Error: No text to translate.';
const EVERYTHING_GOOD = 'Everything looks good to me!';
const errorDiv = document.getElementById('error-msg');
const translatedSentenceDiv = document.getElementById('translated-sentence');
const textInputDiv = document.getElementById('text-input');
const clearBtn = document.getElementById('clear-btn');
const translateBtn = document.getElementById('translate-btn');
const localeSelect = document.getElementById('locale-select');

/* String Idioma -> 
   Responde al evento de click en el botón "translate-btn"
   Utiliza una cadena de texto que es la frase a traducir, que proviene del contenido del div cuyo id es "text-input".
   Idioma es una String que puede tomar uno de dos valores: "american-to-british" o "british-to-american".
   Debe agregar (append, no reemplazar) la traducción de la frase en el div con id "translated-sentence".
   Si no hay texto en text-input entonces agrega al div con id "error-msg" el mensaje de error: "Error: No text to translate." */
function translateHandler(){
  if (!isThereSomethingToTranslate()) showErrorMsg(NO_TEXT_ERROR);
  else {
  // obtener la traducción
    const translation = translate(textInputDiv.value, localeSelect.value);
  // agregar la traducción en translated-sentence
    showTranslatedSentence(translation);     
  }
}

/* String -> Boolean
A partir del value de textInputDiv, devuelve true si no es una cadena vacía. False en otro caso. */
function isThereSomethingToTranslate(){
  return textInputDiv.value !== "";
}

/* String Idioma -> String
Traduce sentence en el sentido indicado por idioma. Devuelve la frase traducida.
Contempla variaciones en la escritura de palabras, palabras completamente diferentes, el modo de escribir la hora y los títulos y denominaciones honoríficas.
Cada palabra traducida debe estar formateada con <span class="highlight">...</span>*/
function translate(sentence, idioma){
  let translated = sentence;
  if (idioma === "american-to-british") translated = translateAmericanToBritish(translated);
  else { translated = translateBritishToAmerican(translated);}
  return translated; 
}

/* String -> String
 * Translates sentence from american to british.
 * Returns the translated sentence. */
function translateAmericanToBritish(sentence){
  let translated = translateFromVoc(sentence, americanToBritishSpelling);
  translated = translateFromVoc(translated, americanToBritishTitles);
  translated = translateFromVoc(translated, americanOnly);
  translated = translateTimeAmericanToBritish(translated);
  return translated;
// ¿Para separar la traducción de agregado del código html tendría en otra función aparte comparar la original con la traducción y las que no coinciden en la traducción agregarle el código?
}

/* String -> String
 * Devuelve sentence reemplazando ':' (Am) por '.' (Br) en donde corresponda a la hora.
 * */
function translateTimeAmericanToBritish(sentence){
// quizá tendría que generalizar un poco más esto, porque voy a tener código repetido. ¿cómo lo hago?
  const time = /\s*(\d{0,1}\d)\:(\d\d)\s*/; //ir refinando la expresión hasta que se ajuste a lo requerido
  //return sentence.replace(time, ' $1'+ '.' + '$2 '); // capturing groups
  return sentence.replace(time, ' ' + asignarClaseHighlight('$1.$2') + ' '); // capturing groups
}

/* String -> String
Devuelve '<span class="highlight">{expression}</span>'.
Envuelve expression entre span tags y le da la classe highlight.
*/
function asignarClaseHighlight(expression){
  return '<span class="highlight">'+ expression + '</span>';
}

/* String -> String
 * Devuelve sentence reemplazando '.' (Br) por ':' (Am) en donde corresponda a la hora.
 * */
function translateTimeBritishToAmerican(sentence){
  return sentence; // stub
}


/* String { String : String } -> String
 * Traduce sentence a partir de vocabulario.
 * */
function translateFromVoc(sentence, vocabulario){
  let clavesVoc = Object.keys(vocabulario);
  let translated = sentence; 
  let pattern = "";
  let replacement = "";
  for (let i = 0; i < clavesVoc.length; i++){
    pattern = clavesVoc[i];
    replacement = vocabulario[pattern];
    translated = translated.replace(pattern, asignarClaseHighlight(replacement));
  }
  return translated;
}

/* String -> String
 * Translates sentence from british to american 
 * Returns the translated sentence. */
function translateBritishToAmerican(sentence){
  return sentence; // stub
}

/* Responde al click del clear-btn
 * Borra el contenido del div translated-sentence.
 * Borra el contenido del div error-msg.
 * Borra el contenido del textarea text-input
 * */
function clearHandler(){
  showErrorMsg("");
  showTranslatedSentence("");
  clearTextInput();  
}

function showTranslatedSentence(sentence){
  translatedSentenceDiv.textContent = sentence;
}

function clearTextInput(){
  textInputDiv.value = "";
}

/* String -> 
   Agrega msg al div error-msg. */
function showErrorMsg(msg){
  errorDiv.textContent = msg;
}

// Event listeners

clearBtn.addEventListener('click', clearHandler);
translateBtn.addEventListener('click', translateHandler);

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    translateHandler,
    clearHandler,
    translateAmericanToBritish,
    translateBritishToAmerican,
    translateTimeAmericanToBritish,
    translateTimeBritishToAmerican,
    translate 
  }
} catch (e) {}
