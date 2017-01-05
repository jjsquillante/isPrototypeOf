/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {
	run: function(tests) {
		var failures = 0;
		index = 0;
		for (var testName in tests) {
			var testAction = tests[testName];
			index++;
			try {
				testAction.apply(this);
				console.log('%cTest ' + index + ': ' + testName, 'color: green;');
			} catch (e) {
				failures++;
				//console.error('Test:', testName, 'FAILED', e);
				console.groupCollapsed('%cTest ' + index + ': ' + testName, 'color: red;');
				console.error(e.stack);
				console.groupEnd();
			}
		}
		setTimeout(function() { // Give document a chance to complete
			if (window.document && document.body) {
				document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
			}
		}, 0);
		// add text to the DOM
		var totalTests = Object.keys(tests).length; // object.keys returns an array of a given object's own enumerable properties (excludes holes)
		var successfulTests = totalTests - failures;
		var textToDisplay = totalTests + ' tests run. ' + successfulTests + ' succeeded, ' + failures + ' failed.';
		var createElement = document.createElement('h1');
		createElement.textContent = textToDisplay;
		document.body.appendChild(createElement);
	},
	fail: function(msg) {
		throw new Error('fail(): ' + msg);
	},
	assert: function(value, msg) {
		if (!value) {
			throw new Error('assert(): ' + msg);
		}
	},
	assertEquals: function(expected, actual) {
		if (expected != actual) {
			throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
		}
	},
	assertStrictEquals: function(expected, actual) {
		if (expected !== actual) {
			throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
		}
	},
};
var fail = TinyTest.fail.bind(TinyTest),
	assert = TinyTest.assert.bind(TinyTest),
	assertEquals = TinyTest.assertEquals.bind(TinyTest),
	eq = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
	assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
	tests = TinyTest.run.bind(TinyTest);
