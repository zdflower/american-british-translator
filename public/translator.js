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
  return translateTime(sentence, ':', '.');
}

/* String String String -> String
Reemplaza en sentence, en la expresión de la hora, char_1 por char_2.
*/
function translateTime(sentence, char_1, char_2){
  //const time = /\s*(\d{0,1}\d)\:(\d\d)\s*/; 
  const time = new RegExp('\\s*(\\d{0,1}\\d)' + char_1 + '(\\d\\d)\\s*');
  return sentence.replace(time, ' ' + asignarClaseHighlight('$1' + char_2 + '$2') + ' '); // capturing groups
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
  return translateTime(sentence, '.', ':');
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
      const key = clavesVoc[i];
      pattern = new RegExp('\\b' + key + '\\b', 'i'); 
      replacement = vocabulario[key]; 
      translated = replacePattern(translated, pattern, asignarClaseHighlight(replacement), vocabulario); // me parece que esto no arregla el problema que pretendía, de no retraducir lo traducido... Me parece que lo que sí podría funcionar es una recursión acá donde lo que se vaya reduciendo es el diccionario, que con cada llamada sean menos las claves y se termine cuando ... pero cómo? debería quizá hacer un primer reemplazo y después pasar un vocabulario sin el pattern hallado, pero entonces si tuviera que traducir en varios lugares de la frase original no lo va a hacer por cómo es el reemplazo. ¿Entonces sería mejor que en reemplazar se hiciera la partición por todos los lugares donde aparece? Pero no sería predecible la cantidad de llamados recursivos a translateFromVoc, sería un despelote, habría que hacer un loop.... ¿No hay otra forma menos rebuscada?
      // translated.replace(pattern, asignarClaseHighlight(replacement));
    }
    return translated;
}

/* String String/RegExp String { String: String } -> String
 * Reemplaza pattern por replacement en sentence y devuelve una nueva */
function replacePattern(sentence, pattern, replacement, vocabulario){
  //console.error(`sentence: ${sentence}`);
  const particion = sentence.split(pattern, 2);
  //console.error(`partición: ${particion}`);
  //console.error(`partición length: ${particion.length}`);
  // Caso base: el pattern no está en sentence, partición tiene un solo elemento.
  if (particion.length < 2) return sentence;
  else {
    //console.error("RAMA ELSE");
    const delante = translateFromVoc(particion[0], vocabulario);
    //console.error(`delante: ${delante}`);
    const detras = translateFromVoc(particion[1], vocabulario);
    //console.error(`delante: ${delante} - detrás: ${detras}`);
    return [ delante, replacement, detras].join("");
  }
}

/* String -> String
 * Translates sentence from british to american 
 * Returns the translated sentence. */
function translateBritishToAmerican(sentence){
  let translate = translateFromVoc(sentence, britishOnly);
  translate = translateFromVoc(translate, getBritishToAmericanSpelling());
  translate = translateFromVoc(translate, getBritishToAmericanTitles());
  translate = translateTimeBritishToAmerican(translate);
  return translate;
}

/* -> { String: String }
Produce el diccionario de spelling de British a American.
Utiliza el diccionario de spelling de American a British.
*/
function getBritishToAmericanSpelling(){ 
 return getInvertedDictionary(americanToBritishSpelling);
}

/* -> { String: String }
Produce el diccionario de titles de British a American.
Utiliza el diccionario de titles de American a British.
*/
function getBritishToAmericanTitles(){
  return getInvertedDictionary(americanToBritishTitles);
}

/* { String: String } -> { String: String }
Toma vocabulario e invierte claves y valores.
Se asume que vocabulario no tiene "sinónimos", que no hay dos valores iguales para claves distintas.
*/
function getInvertedDictionary(dictionary){
  const newDict = {};
  Object.keys(dictionary).forEach(key => {
    newDict[dictionary[key]] = key;
   });
  return newDict;
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
//  translatedSentenceDiv.textContent = sentence;
  translatedSentenceDiv.innerHTML = sentence;
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
    translate,
    translateFromVoc,
    americanToBritishSpelling,
    americanToBritishTitles,
    britishOnly,
    getBritishToAmericanSpelling,
    getBritishToAmericanTitles,
    replacePattern
  }
} catch (e) {}
