const awesomeLib = {
  take(arr, n) {
    let c = arr.concat();
    return c.splice(0, n);
  },
  skip(arr, n) {
    let c = arr.concat();
    return c.splice(n, arr.length);
  },
  foreach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  },
  map(arr, callback) {
    let x = [];
    awesomeLib.foreach(arr, function(item, i, arr) {
      x.push(callback(item, i, arr));
    });
    return x;
  },
  filter(arr, callback) {
    let x = [];
    awesomeLib.foreach(arr, function(item, i, arr) {
      if (callback(item, i, arr)) {
        x.push(item);
      }
    });
    return x;
  },
  reduce(arr, callback, initialValue) {
    let acc = 0;
    let i = 0;
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

class Chain {
  constructor(arr) {
    this._value = arr.concat();
  }
  take(n) {
    this._value = awesomeLib.take(this._value, n);
    return this;
  }
  skip(n) {
    this._value = awesomeLib.skip(this._value, n);
    return this;
  }
  foreach(callback) {
    awesomeLib.foreach(this._value, callback);
    return this;
  }
  map(callback) {
    this._value = awesomeLib.map(this._value, callback);
    return this;
  }
  filter(callback) {
    this._value = awesomeLib.filter(this._value, callback);
    return this;
  }
  reduce(callback, initialValue) {
    if (
      Array.isArray(awesomeLib.reduce(this._value, callback, initialValue)) ===
      true
    ) {
      this._value = awesomeLib.reduce(this._value, callback, initialValue);
      return this;
    } else {
      this._value = awesomeLib.reduce(this._value, callback, initialValue);
      return this._value;
    }
  }
  value() {
    return this._value;
  }
}

module.exports = awesomeLib;
