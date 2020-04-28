// To run (as long as you have the node runtime installed) just type: 'node tandemQuestions.js'
// Code written by Alex Smith.

/**
 * Question 1: If you have two strings, how would you write a program to determine
 * if one is a permutation of another? And what's the computational complexity of
 * your algorithm?
 *
 * If you simply have two strings the best way to check would be to first sort and
 * then compare:
 * We sort because this simplifies the process from O(n^2) (comparing each element of an array
 * with each element of another) to O(n). (comparing them while sorted, time growing linearly).
 */

// Test variables
const stringOne = "abcdefgh",
  stringTwo = "abcdefgh",
  stringThree = "abc",
  stringFour = "hgfedcba";

if (checkForPermutations(stringOne, stringFour)) {
  console.log("The two strings are the same");
} else {
  console.log("The two strings are NOT the same");
}

function checkForPermutations(stringOne, stringTwo) {
  // A length check is a fast way of checking for obviously different strings. O(n).
  if (stringOne.length != stringTwo.length) {
    return false;
  }
  // Now to sort and check same length strings. First convert the strings to an array of characters
  // to use array methods. All strings that are the same length are of O(n*log n) due to Array.sort.
  const a = Array.from(stringOne).sort();
  const b = Array.from(stringTwo).sort();

  // Back into strings as JS doesn't do array comparisons very well.
  const sortedStringOne = a.toString();
  const sortedStringTwo = b.toString();

  /* "The comparison returns true if the two arrays contain the same number of elements, and
   * and all corresponding pairs of elements in the two arrays are equal."
   */
  return sortedStringOne === sortedStringTwo;
}

/**
 * Question 2: If you have a list of numbers between 1 and 1000000 and some are missing,
 * how would you write a program to determine which ones? And what's the computational
 * complexity of your algorithm?
 *
 * I think the best way is a linear search. Otherwise we may miss numbers. This would be O(n) as we
 * don't need to have any operations other than saving missing numbers to another array. This is
 * because there is an unknown amount of numbers missing and we do not know their positions.
 *
 * Additionally: We do not know if the first or last numbers are missing, so must include hard
 * coded limits of 1 & 1000000.
 */

// Test variable
const testArr = [3, 4, 5, 7, 8, 9, 11, 12, 14, 15, 17, 20];

console.log(findMissingNumbers(testArr));

function findMissingNumbers(testArr) {
  // Can't be too careful :)
  if (testArr == null || testArr.length <= 1) {
    // No list to test!
    return new int[0]();
  }

  /* We treat the start and end of the array as unknowns as we do not know for sure that they
   * are 1 & 1000000.
   */
  var specifiedStart = 1,
    specifiedEnd = 1000000;
  var first = testArr[0];
  var last = testArr[testArr.length - 1];
  var missingCursor = 0;
  var expect = first;
  var missingMiddle = [];

  // Between 1 and the first element, add all missing numbers to an array.
  if (first != specifiedStart) {
    var missingStart = [];
    for (i = specifiedStart; i < first; i++) {
      missingStart.push(i);
    }
  }

  // Between the first element and the last
  // Foreach element in the array, while the expected number is smaller than the number in the array.
  // We know how much is missing - the difference between the first and last data values, minus the
  // number of values we actually have. Then, we can just 'expect' values, and note these values until
  // we reach the next value in the array that we expect to be there.
  testArr.forEach(function (value) {
    while (expect < value) {
      missingMiddle[missingCursor] = expect;
      missingCursor++;
      expect++;
    }
    expect++;
  });

  // Between the last element and 1000000, add all missing numbers to an array.
  if (last != specifiedEnd) {
    var missingEnd = [];
    for (i = specifiedEnd; i > last; i--) {
      missingEnd.push(i);
    }
  }

  // Add arrays together for return value
  // Using both concat and spread operators as combining keeps time complexity to O(n).
  let testArrs = [missingStart, missingMiddle, missingEnd];
  var finalArr = [].concat(...testArrs);
  finalArr.sort(function (a, b) {
    return a - b;
  });
  return finalArr;
}
