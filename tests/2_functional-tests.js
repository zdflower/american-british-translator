/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function ____()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test.skip("Translation appended to the `translated-sentence` `div`", done => {
      // done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      const textInputDiv = document.getElementById('text-input');
      textInputDiv.value = "Hello";
      Translator.translateHandler();
      const result = document.getElementById('translated-sentence').textContent;
      const expected = "Everything looks good to me!";
      assert.equal(result, expected);
      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      const textInputDiv = document.getElementById('text-input');
      textInputDiv.value = "";
      Translator.translateHandler();
      const result = document.getElementById('error-msg').textContent;
      const expected = "Error: No text to translate.";
      assert.equal(result, expected);
      done();
    });

  });

  suite('Function ____()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      const textInputDiv = document.getElementById('text-input');
      const translatedSentenceDiv = document.getElementById('translated-sentence');
      const errorDiv = document.getElementById('error-msg');
      Translator.clearHandler();
      const expected = "";
      assert.equal(textInputDiv.value, expected);     
      assert.equal(translatedSentenceDiv.textContent, expected);
      assert.equal(errorDiv.textContent, expected);     
      done();
    });

  });

});
