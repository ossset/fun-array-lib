const awesomeLib = { 
  take(arr, n) {
    var c = arr.concat();
    return c.splice(0, n); //новые массивы
  },
  skip(arr, n) {
    var c = arr.concat();
    return c.splice(n, arr.length); //новые массивы
  },
  map(arr, callback) {
    var x = [];
    for (var i = 0; i < arr.length; i++) {
        x.push(callback(arr[i]));
    }
    return x;
  },
  foreach(arr, callback) {
      for (var i = 0; i < arr.length; i++){
          callback(arr[i]);
      }
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
    if (initialValue) {
        acc = initialValue;
        for (var i = 0; i < arr.length ; i++){
            acc =  callback(acc, arr[i]);
        }
        return acc;
    } else {
        acc = arr[0];
        for (var i = 0; i < arr.length-1 ; i++){
        acc =  callback(acc, arr[i+1]);
        }
    return acc;
    }
  },
};

module.exports = awesomeLib;