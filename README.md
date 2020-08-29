**freeCodeCamp** - Quality Assurance 5: American / British English Translator
------

[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-project-american-british-english-translator)](https://repl.it/github/freeCodeCamp/boilerplate-project-american-british-english-translator)

### User stories:

1. I can enter a simple sentence into the text area and select whether to translate to British or American English from the dropdown menu.
1. When the "Translate" button is pressed, append the translated sentence to the `translated-sentence` `div`. See the JavaScript files in `/public` for the different spelling and terms your application should translate.
1. Your application should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English.
1. Your application should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See `/public/american-to-british-titles.js` for the different titles your application should handle.
1. Wrap any translated spelling or terms with `<span class="highlight">...</span>` tags so they appear in green.
1. If the sentence in the text area has no spelling or terms that should be translated, append the message "Everything looks good to me!" to the `translated-sentence` `div`.
1. If there is no text in the text area, append the message "Error: No text to translate." to the `error-msg` `div` so the text appears in red.
1. I can press the "Clear Input" button to remove all text from the text area and the `translated-sentence` `div`.
1. All 20 unit tests are complete and passing. See `/tests/1_unit-tests.js` for the sentences you should write tests for.
1. All 4 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.

### Testing and additional notes

* All logic can go into `public/translator.js`.
* Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.
* To run the tests on Repl.it, set NODE_ENV to test without quotes in the .env file.
* To run the tests in the console, use the command npm run test. To open the Repl.it console, press Ctrl+Shift+P (Cmd if on a Mac) and type "open shell".

## Comentarios relacionados con el proceso de realización de este proyecto

En esencia, ¿qué hace?: Traduce una frase de inglés americano a inglés británico; o de inglés británico a americano.

¿Cuál es la información de entrada? La frase a traducir, y el sentido de la traducción (de qué variedad a cuál otra).

¿Cuál es la información de salida? La frase traducida.

Además existe una base de información o "vocabulario" a partir del cual se realizan las traducciones posibles con esta aplicación.

Responde a eventos de click sobre botones:

- Translate: al evento de click en este botón responde un manejador de eventos que va a 1) obtener la traducción, y 2) mostrar la traducción en la ubicación correspondiente.

Los datos de entrada van a ser de tipo string y en el caso del tipo de traducción, va a ser una de dos posibilidades, por lo que se puede modelar como un tipo de dato enumeración.

- Clear: a este evento responde un manejador que borra las áreas de entrada y salida de texto. 1) Borra el texto a traducir y 2) borra el texto traducido.

El tema principal es cómo hacer la traducción, cómo interpretar el input, cómo partirlo en unidades de significado más allá de palabras sueltas.

Una idea: recorrer el vocabulario y buscar en el input subcadenas que coincidan y reemplazar esas.


## Recursos

Get selected value in dropdown list using javascript: <https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript>

Replace:  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace>

Object.values() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values>

Regular expressions: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions>

How to Design Programs - Part 1 - Chapter 3 <https://htdp.org/2020-8-1/Book/part_one.html#%28part._ch~3ahtdp%29>


