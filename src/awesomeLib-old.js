const awesomeLib = {
  take(arr, n) {
    var c = arr.concat();
    return c.splice(0, n);
  },
  skip(arr, n) {
    var c = arr.concat();
    return c.splice(n, arr.length);
  },
  foreach(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  },
  map(arr, callback) {
    var x = [];
    awesomeLib.foreach(arr, function(item, i, arr) {
      x.push(callback(item, i, arr));
    });
    return x;
  },
  filter(arr, callback) {
    var x = [];
    awesomeLib.foreach(arr, function(item, i, arr) {
      if (callback(item, i, arr)) {
        x.push(item);
      }
    });
    return x;
  },
  reduce(arr, callback, initialValue) {
    var acc = 0;
    if (initialValue) {
      acc = initialValue;
      for (var i = 0; i < arr.length; i++) {
        acc = callback(acc, arr[i]);
      }
      return acc;
    } else {
      acc = arr[0];
      for (var i = 0; i < arr.length - 1; i++) {
        acc = callback(acc, arr[i + 1]);
      }
      return acc;
    }
  },
  chain(arr){
    return new Chain(arr)
  },
};

function Chain(arr){
  this._value = arr.concat();
};
Chain.prototype.take = function(n){ 
  this._value =  awesomeLib.take(this._value, n);
  return this;
};
Chain.prototype.skip = function(n) {
  this._value = awesomeLib.skip(this._value, n);
  return this;
};
Chain.prototype.foreach = function(callback){
  this._value = awesomeLib.foreach(this._value, callback)
  return this;
};
Chain.prototype.map = function(callback){
  this._value = awesomeLib.map(this._value, callback)
  return this;
};
Chain.prototype.filter = function(callback){
  this._value = awesomeLib.filter(this._value, callback)
  return this;
};
Chain.prototype.reduce = function(callback, initialValue){
  this._value = awesomeLib.reduce(this._value, callback, initialValue)
  return this;
};
Chain.prototype.value = function(){
  return this._value;
}

module.exports = awesomeLib;
