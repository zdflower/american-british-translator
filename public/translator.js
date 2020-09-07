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
  // A translateFromVoc le pasa siempre la frase original y devuelve un objeto con las posiciones de las expresiones a reemplazar, el pattern y el reemplazo
  // Otra idea sería construir un único diccionario a partir de americanToBritishSpelling, americanToBritishTitles y americanOnly.
  const wordsToTranslate = [
    ...translateFromVoc(sentence, americanToBritishSpelling),
    ...translateFromVoc(sentence, americanToBritishTitles),
    ...translateFromVoc(sentence, americanOnly)]
    /* {
...translateFromVoc(sentence, americanToBritishSpelling),
    ...translateFromVoc(sentence, americanToBritishTitles),
    ...translateFromVoc(sentence, americanOnly),
    };*/
  let translated = generateTranslatedSentence(sentence, wordsToTranslate);
  translated = translateTimeAmericanToBritish(translated); // ver después si también tengo que cambiar esto.
  return translated;
}

/* String [[ Number, String, String ]] -> String
 * wordsToTranslate contiene las posiciones de las expresiones a traducir (los índices donde realizar los cambios en la frase original), el pattern y el replacement.
 * Produce una frase traducida a partir de los datos que contienen los input.
 * */
function generateTranslatedSentence(sentence, wordsToTranslate){
  let trad = '';
  let inicio = 0;
  let final = 0;
  wordsToTranslate.forEach(item => {
    final = item[0];
    trad += sentence.substring(inicio, final) + item[2];
    inicio = final + item[1].length;
  });
  // acá todavía faltaría el final de sentence desde inicio
  trad += sentence.substring(inicio);
  return trad;
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

/* String { String : String } -> [[Number, String, String]]
 * Produce un array con tríos con la posición de la expresión a traducir, pattern y replacement.
 * */
function translateFromVoc(sentence, vocabulario){
  // para cada pattern buscar las ocurrencias en sentence y construir el objeto de wordsToTranslate
    const wordsToTranslate = []; 
    let clavesVoc = Object.keys(vocabulario);
    let pattern = "";
    for (let i = 0; i < clavesVoc.length; i++){
      const key = clavesVoc[i];
      pattern = new RegExp('\\b' + key + '\\b', 'i'); 
      // acá tenés que obtener el índice de pattern en sentence. Si no está devuelve -1, ojo.
      const donde = sentence.search(pattern);
      // console.error(`índice de la ocurrencia: ${donde}`);
      if (!(donde === -1)) wordsToTranslate.push([donde, key, vocabulario[key]]); // supongo (!) que como clave de wordsToTranslate se castea a string, ¿o no?
      //  else { if (key === "bicky") console.error(`key ${key}, pattern ${pattern}, donde ${donde}`) }
    }
    return wordsToTranslate;
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
    replacePattern,
    generateTranslatedSentence
  }
} catch (e) {}
