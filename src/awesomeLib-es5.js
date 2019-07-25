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
    var i = 0;
    if (initialValue !== undefined) {
      acc = initialValue;
    } else {
      acc = arr[0];
      i = 1;
    }
    for (i; i < arr.length; i++) {
      acc = callback(acc, arr[i], i, arr);
    }
    return acc;
  },
  chain(arr) {
    return new Chain(arr);
  }
};

function Chain(arr) {
  this._value = arr.concat();
}
Chain.prototype.take = function(n) {
  this._value = awesomeLib.take(this._value, n);
  return this;
};
Chain.prototype.skip = function(n) {
  this._value = awesomeLib.skip(this._value, n);
  return this;
};
Chain.prototype.foreach = function(callback) {
  awesomeLib.foreach(this._value, callback);
  return this;
};
Chain.prototype.map = function(callback) {
  this._value = awesomeLib.map(this._value, callback);
  return this;
};
Chain.prototype.filter = function(callback) {
  this._value = awesomeLib.filter(this._value, callback);
  return this;
};
Chain.prototype.reduce = function(callback, initialValue) {
  if (
    Array.isArray(awesomeLib.reduce(this._value, callback, initialValue)) === true
  ) {
    this._value = awesomeLib.reduce(this._value, callback, initialValue);
    return this;
  } else {
    this._value = awesomeLib.reduce(this._value, callback, initialValue);
    return this._value;
  }
};
Chain.prototype.value = function() {
  return this._value;
};

console.log(awesomeLib.reduce([1, 2, 3, 4], (acc, el) => [...acc, el], []));

module.exports = awesomeLib;
