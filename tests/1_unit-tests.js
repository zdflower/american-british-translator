/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const { JSDOM } = require('jsdom');
let Translator;

suite('Unit Tests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Translator
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Translator = require('../public/translator.js');
      });
  });

  suite('Function ____()', () => {

    suite('American to British English', () => {

      test.skip('Mangoes are my favorite fruit. --> Mangoes are my favourite fruit.', done => {
        const input = 'Mangoes are my favorite fruit.';
        const output = 'Mangoes are my favourite fruit.';

        // done();
      });

      test.skip('I ate yogurt for breakfast. --> I ate yoghurt for breakfast.', done => {
        const input = 'I ate yogurt for breakfast.';
        const output = 'I ate yoghurt for breakfast.';

        // done();
      });

      test.skip("We had a party at my friend's condo. --> We had a party at my friend's flat.", done => {
        const input = "We had a party at my friend's condo.";
        const output = "We had a party at my friend's flat.";

        // done();
      });

      test.skip('Can you toss this in the trashcan for me? --> Can you toss this in the bin for me?', done => {
        const input = 'Can you toss this in the trashcan for me?';
        const output = 'Can you toss this in the bin for me?';

        // done();
      });

      test.skip('The parking lot was full. --> The car park was full.', done => {
        const input = 'The parking lot was full.';
        const output = 'The car park was full.';

        // done();
      });

      test.skip('Like a high tech Rube Goldberg machine. --> Like a high tech Heath Robinson device.', done => {
        const input = 'Like a high tech Rube Goldberg machine.';
        const output = 'Like a high tech Heath Robinson device.';

        // done();
      });
      
      test.skip('To play hooky means to skip class or work. --> To bunk off means to skip class or work.', done => {
        const input = 'To play hooky means to skip class or work.';
        const output = 'To bunk off means to skip class or work.';

        // done();
      });

      test.skip('No Mr. Bond, I expect you to die. --> No Mr Bond, I expect you to die. ', done => {
        const input = 'No Mr. Bond, I expect you to die.';
        const output = 'No Mr Bond, I expect you to die.';

        // done();
      });

      test.skip('Dr. Grosh will see you now. --> Dr Grosh will see you now. ', done => {
        const input = 'Dr. Grosh will see you now.';
        const output = 'Dr Grosh will see you now.';

        // done();
      });

      test('Lunch is at 12:15 today. --> Lunch is at 12.15 today.', done => {
        const input = 'Lunch is at 12:15 today.';
        // const output = 'Lunch is at 12.15 today.';
        const result = Translator.translate(input, "american-to-british");
        const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
        assert.equal(result, expected);
        done();
      });

    });

    suite.skip('British to American English', () => {

      test('We watched the footie match for a while. --> We watched the soccer match for a while.', done => {
        const input = 'We watched the footie match for a while.';
        const output = 'We watched the soccer match for a while.';

        // done();
      });

      test('Paracetamol takes up to an hour to work. --> Tylenol takes up to an hour to work.', done => {
        const input = 'Paracetamol takes up to an hour to work.';
        const output = 'Tylenol takes up to an hour to work.';

        // done();
      });

      test('First, caramelise the onions. --> First, caramelize the onions.', done => {
        const input = 'First, caramelise the onions.';
        const output = 'First, caramelize the onions.';

        // done();
      });

      test('I spent the bank holiday at the funfair. --> I spent the public holiday at the carnival.', done => {
        const input = 'I spent the bank holiday at the funfair.';
        const output = 'I spent the public holiday at the carnival.';

        // done();
      });

      test('I had a bicky then went to the chippy. --> I had a cookie then went to the fish-and-chip shop.', done => {
        const input = 'I had a bicky then went to the chippy.';
        const output = 'I had a cookie then went to the fish-and-chip shop.';

        // done();
      });

      test("I've just got bits and bobs in my bum bag. --> I've just got odds and ends in my fanny pack.", done => {
        const input = "I've just got bits and bobs in my bum bag.";
        const output = "I've just got odds and ends in my fanny pack.";

        // done();
      });
      
      test("The car boot sale at Boxted Airfield was called off. --> The swap meet at Boxted Airfield was called off.", done => {
        const input = "The car boot sale at Boxted Airfield was called off.";
        const output = "The swap meet at Boxted Airfield was called off.";

        // done();
      });

      test("Have you met Mrs Kalyani? --> Have you met Mrs. Kalyani?", done => {
        const input = "Have you met Mrs Kalyani?";
        const output = "Have you met Mrs. Kalyani?";

        // done();
      });

      test("Prof Joyner of King's College, London. --> Prof. Joyner of King's College, London.", done => {
        const input = "Prof Joyner of King's College, London.";
        const output = "Prof. Joyner of King's College, London.";

        // done();
      });

      test('Tea time is usually around 4 or 4.30. --> Tea time is usually around 4 or 4:30.', done => {
        const input = 'Lunch is at 12:15 today.';
        const output = 'Lunch is at 12.15 today.';

        // done();
      });

    });

    suite('Auxiliary functions', () => {
      suite('translateFromVoc()', () => {
        test('br to am: paracetamol -> tylenol', done => {
          const input = 'paracetamol';
          const result = Translator.translateFromVoc(input, Translator.britishOnly);
          const expected = '<span class="highlight">Tylenol</span>';
          assert.equal(result, expected);
          done();
        });
        test('Paracetamol takes up to an hour to work --> Tylenol takes up to an hour to work.', done => {
          const input = 'Paracetamol takes up to an hour to work.';
          const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
          const result = Translator.translateFromVoc(input, Translator.britishOnly);
          assert.equal(result, expected);
          done();
        });
      });
      suite('translateAmericanToBritish()', () => { 
        test('Mangoes are my favorite fruit. --> Mangoes are my favourite fruit.', done => {
          const input = 'Mangoes are my favorite fruit.';
          const result = Translator.translateAmericanToBritish(input);
          const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
          assert.equal(result, expected);
          done();
        });
        test('To play hooky means to skip class or work. --> To bunk off means to skip class or work.', done => {
          const input = 'To play hooky means to skip class or work.';
          const result = Translator.translateAmericanToBritish(input);
          const expected = 'To <span class="highlight">bunk off</span> means to skip class or work.';
          assert.equal(result, expected);
          done();
        });        
      });

      suite('translateBritishToAmerican()', () => {
        test('Paracetamol takes up to an hour to work --> Tylenol takes up to an hour to work.', done => {
          const input = 'Paracetamol takes up to an hour to work.';
          const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
          const result = Translator.translateBritishToAmerican(input);
          assert.equal(result, expected);
          done();
        });
      });
      
      suite('translateTimeAmericanToBritish()', () => {
        test('12:15 --> 12.15', done => {
          const input = 'Lunch is at 12:15 today.';
          // const output = 'Lunch is at 12.15 today.';
          const result = Translator.translate(input, "american-to-british");
          const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
          assert.equal(result, expected);
          done();
        });
      });

      suite.skip('getInvertedDictionary()', () => {});
      suite.skip('getBritishToAmericanSpelling()', () => {});
      suite.skip('getBritishToAmericanTitles', () => {});
      
    });
  });

});
