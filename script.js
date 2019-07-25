var lib = require('./src/awesomeLib-es5')




console.log(lib.take([1, 2, 3, 4], 2));
console.log(lib.skip([1, 2, 3, 4], 2));
console.log(lib.map([1,2,3], a => a * 2 ));
console.log(lib.foreach([1,2,3,4,5,6,7,8,11,23,34], a => a * 2 ));
console.log(lib.filter([1,2,3,4,5,6,7,8,11,23,34], a => a < 10 ));
console.log(lib.reduce([1,2,3,4,5,6,7], (a, b) => (a * b),10 ));

