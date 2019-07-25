const lib = require("./awesomeLib-es6");

describe("take function", () => {
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
  });
  test("should not modify root array", () => {
    lib.take(x, 2);
    expect(x).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  test("should return an empty array when zero transmitted", () => {
    expect(lib.take(x, 0)).toEqual([]);
  });
  test("should return an unchanged array if array length transmitted", () => {
    expect(lib.take(x, x.length)).toEqual(x);
  });
  test("should work well with common value", () => {
    expect(lib.take(x, 3)).toEqual([1, 2, 3]);
  });
});

describe("skip function should", () => {
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
  });
  test("not modify root array", () => {
    lib.skip(x, 2);
    expect(x).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  test("return an unchanged array when zero transmitted", () => {
    expect(lib.skip(x, 0)).toEqual(x);
  });
  test("return an empty array if array length transmitted", () => {
    expect(lib.skip(x, x.length)).toEqual([]);
  });
  test("work well with common value", () => {
    expect(lib.skip(x, 2)).toEqual([3, 4, 5, 6, 7]);
  });
});

describe("foreach function should", () => {
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
  });
  test("return undefined", () => {
    expect(lib.foreach(x, a => a * 2)).toBe(undefined);
  });
  test("call callback on each array item", () => {
    let mockedFunction = jest.fn();
    lib.foreach(x, mockedFunction);
    expect(mockedFunction).toHaveBeenCalledTimes(x.length);
    // console.table(mockedFunction.mock.calls);
    expect(mockedFunction.mock.calls[0][0]).toBe(x[0]);
    expect(mockedFunction.mock.calls[0][1]).toBe(x.indexOf(1));
    expect(mockedFunction.mock.calls[6][0]).toBe(x[6]);
    expect(mockedFunction.mock.calls[6][1]).toBe(x.indexOf(7));
  });
});

describe("map function should", () => {
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
  });
  test("return a new array", () => {
    expect(lib.map(x, a => a * 2)).not.toBe(x);
  });
  test("work correctly with a callback", () => {
    expect(lib.map(x, a => a * 2)).toEqual([2, 4, 6, 8, 10, 12, 14]);
  });
});

describe("filter function should", () => {
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
  });
  test("return a new array", () => {
    expect(lib.filter(x, a => a > 4)).not.toBe(x);
  });
  test("filter an array with a callback", () => {
    expect(lib.filter(x, a => a > 4)).toEqual([5, 6, 7]);
  });
  test("call callback on each array item", () => {
    let mockedFunction = jest.fn();
    lib.filter(x, mockedFunction);
    expect(mockedFunction).toHaveBeenCalledTimes(x.length);
  });
});

describe("reduce function should", () => {
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
  });
  test("reduce an array to one value without initial value", () => {
    expect(lib.reduce(x, (a, b) => a * b)).toBe(5040);
  });
  test("reduce an array to one value with initial value", () => {
    expect(lib.reduce(x, (a, b) => a * b, 10)).toBe(50400);
  });
  test("reduce an array to one negative value", () => {
    expect(lib.reduce(x, (a, b) => a - b)).toBe(-26);
  });
  test("reduce an array to one negative value with negative initial value", () => {
    expect(lib.reduce(x, (a, b) => a - b, -100)).toBe(-128);
  });
});

describe("chain function should", () => {
  let chain = null;
  beforeEach(() => {
    x = [1, 2, 3, 4, 5, 6, 7];
    chain = lib.chain(x);
  });
  test("return an object", () => {
    expect(typeof lib.chain(x)).toBe("object");
  });
  test("write transferable array in to _value", () => {
    expect(chain._value).toEqual(x);
  });
  test("return current object using chain.__proto__ methods", () => {
    expect(chain.take(x.length)).toBe(chain);
    expect(chain.skip(0)).toBe(chain);
    expect(chain.foreach(a => a)).toBe(chain);
    expect(chain.map(a => a)).toBe(chain);
    expect(chain.filter(a => a)).toBe(chain);
    expect(chain.reduce((acc, el) => [...acc, el], [])).toBe(chain);
    expect(chain.value()).toEqual(x);
  });
});
