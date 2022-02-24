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

/*
	- roman="MMMCMXCI";integer=0;i=8

	- i-- -> i=7
	- cumulative = 1
	- 1 < undefined -> false
	- integer = 1
	
	- i-- -> i=6
	- cumulative = 100
	- 100 < 1 -> false
	- integer = 101
	
	- i-- -> i=5
	- cumulative = 10
	- 10 < 100 -> true
	- integer = 91
	
	- i-- -> i=4
	- cumulative = 1000
	- 1000 < 10 -> false
	- integer = 1091
	
	- i-- -> i=3
	- cumulative = 100
	- 100 < 1000 -> true
	- integer = 991
	
	- i-- -> i=2
	- cumulative = 1000
	- 1000 < 100 -> false
	- integer = 1991
	
	- i-- -> i=1
	- cumulative = 1000
	- 1000 < 1000 -> false
	- integer = 2991
	
	- i-- -> i=0
	- cumulative = 1000
	- 1000 < 1000 -> false
	- integer = 3991
*/
const fromRoman = function(romanNumeral) {
	// Check that the romanNumeral argument is valid before continuing
	if (typeof romanNumeral !== "string" || !romanPattern.test(romanNumeral)) {
		throw new Error("Requires valid roman numeral string")
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

/*
	- i = M
	-  integer >= roman_map[i] = true
	- roman = M
	- integer = 2991
	-  integer >= roman_map[i] = true
	- roman = MM
	- integer = 1991
	-  integer >= roman_map[i] = true
	- roman = MMM
	- integer = 991
	
	- i = CM
	-  integer >= roman_map[i] = true
	- roman = MMMCM
	- integer = 91
	
	- i = D
	
	- i = CD
	
	- i = C
	
	- i = XC
	-  integer >= roman_map[i] = true
	- roman = MMMCMXC
	- integer = 1
	
	- i = L
	
	- i = XL
	
	- i = X
	
	- i = IX
	
	- i = V
	
	- i = IV
	
	- i = I
	-  integer >= roman_map[i] = true
	- roman = MMMCMXCI
	- integer = 0
*/
const toRoman = function(integer) {
	// Check that the integer argument is valid before continuing
	if (integer <= 0 || integer >= 4000 || parseInt(integer, 10) !== integer) {
		throw new Error("Requires an unsigned integer with a max value less than 4000")
	}

	let roman = ""
	for (let i in roman_map ) {
		while ( integer >= roman_map[i] ) {
			roman += i
			integer -= roman_map[i]
		}
	}

	return roman
}

module.exports = {
	fromRoman,
	toRoman
}