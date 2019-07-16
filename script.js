const awesomeLib = {
  take(arr, n) {
    return arr.splice(0, n, arr.length);
  },
  skip(arr, n) {
    return arr.splice(n, arr.length);
  },
  map(arr, callback) {
    var x = [];
    for (var i = 0; i < arr.length; i++) {
        x.push(callback(arr[i]));
    }
    return x;
  },
  foreach(arr, callback) {
      var x = arr.length ;
      for (var i = 0; i < x; i++){
          arr.push(callback(arr[i]));
      }
      return arr.splice(i, x*2);
  },
  filter(arr, callback) {
      var x = [];
      for (var i = 0; i < arr.length; i++){
        if (callback(arr[i])){
            x.push(arr[i]);
        }
      }
      return x;
  },
  reduce(arr,callback, initialValue) {
      var acc = 0;
      var curr = 0;
      var x = 0;
    if (initialValue) {
        acc = initialValue;
        curr = arr[0];
        for (var i = 0; i < arr.length ; i++){
            acc =  callback(acc, arr[i]);
            console.log('arr ='+arr[i])
            console.log('acc -'+acc);
        }
        return acc;
    } else {
        acc = arr[0];
        curr = arr[1];
        for (var i = 0; i < arr.length-1 ; i++){
        acc =  callback(acc, arr[i+1]);
        console.log('arr ='+arr[i])
        console.log('acc -'+acc);
    }
    return acc;
    }
  },
};

console.log(awesomeLib.take([1, 2, 3, 4], 2));
console.log(awesomeLib.skip([1, 2, 3, 4], 2));
console.log(awesomeLib.map([1,2,3], a => a * 2 ));
console.log(awesomeLib.foreach([1,2,3,4,5,6,7,8,11,23,34], a => a * 2 ));
console.log(awesomeLib.filter([1,2,3,4,5,6,7,8,11,23,34], a => a < 5 ));
console.log(awesomeLib.reduce([1,2,3,4,5,6,7], (a, b) => (a * b),10 ));
