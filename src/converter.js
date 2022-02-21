const roman_map = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

// REGEX Used to avoid bad formatting behavior
const romanPattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/

const fromRoman = function(romanNumeral) {
  // Check that the romanNumeral argument is valid before continuing
  if (typeof romanNumeral !== 'string' || !romanPattern.test(romanNumeral)) {
    throw new Error('Requires valid roman numeral string')
  }

  let roman = romanNumeral.toUpperCase()
  let integer = 0
  let i = roman.length
  while (i--) {
    let cumulative = roman_map[roman[i]]
    if (cumulative < roman_map[roman[i + 1]]) {
      integer -= cumulative
    } else {
      integer += cumulative
    }
  }
  return integer
}

const toRoman = function(integer) {
  // Check that the integer argument is valid before continuing
  if (integer <= 0 || integer >= 4000 || parseInt(integer, 10) !== integer) {
    throw new Error('Requires an unsigned integer with a max value less than 4000')
  }

  let roman = ''
  for (let i in roman_map ) {
    while ( integer >= roman_map[i] ) {
      roman += i;
      integer -= roman_map[i];
    }
  }

  return roman;
}

module.exports = {
  fromRoman,
  toRoman
}