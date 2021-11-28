import {
  b,
  bufferOf,
  EMPTY_BUFFER,
  fourBytesHolding,
  zeroBytes,
} from ".";

describe("b function", () => {
  it("should return a buffer", () => expect(b`sd`).toBeInstanceOf(Buffer));
  it("should buffer the string", () => expect(b`sd`.toString()).toBe(`sd`));
});

describe("zeroBytes function", () => {
  it("should return a buffer filled with x zeros", () => {
    for (let i of [0, 1, 2, 3, 4, 5])
      expect(zeroBytes(i)).toEqual(Buffer.alloc(i, 0));
  });
});

describe("buffersOf function", () => {
  it("concatenates the buffers given into one", () => {
    const nums = [0, 1, 2, 3, 4, 5, 6];

    const concatenatedBuffer = nums.reduce(
      (acc, value) => bufferOf(acc, Buffer.of(value)),
      EMPTY_BUFFER
    );
    expect(concatenatedBuffer).toEqual(Buffer.of(...nums));
  });
});

describe("fourBytesHolding function", () => {
  it("allocates 4 bytes", () => expect(fourBytesHolding(0).byteLength).toBe(4));
  it("writes the given value", () =>
    expect(fourBytesHolding(89754).readInt32BE()).toBe(89754));
});
