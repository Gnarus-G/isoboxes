import { iterate } from "../utils";
import Uint64 from "./Uint64";

const MAX_UINT64 = BigInt(2 ** 64) - 1n;

describe("uint64", () => {
  it("buffers positive numbers intact", () => {
    expect(new Uint64(2).toBuffer().readBigUInt64BE()).toEqual(2n);
  });

  it("returns a positive number, with negative inputs", () => {
    expect(new Uint64(-1).toBuffer().readBigUInt64BE()).toBeGreaterThan(-1);
  });

  it("returns 2**64-1 when given -1", () =>
    expect(new Uint64(-1).toBuffer().readBigUInt64BE()).toBe(MAX_UINT64));

  it("returns the unsigned value of given negative values", () => {
    iterate(1, 30).forEach((num) =>
      expect(new Uint64(num * -1).toBuffer().readBigUInt64BE()).toBe(
        MAX_UINT64 - BigInt(num) + 1n
      )
    );
  });

  it("overflows the values above 2**64 -1", () => {
    iterate(1, 30).forEach((num) => {
      expect(new Uint64(MAX_UINT64 + BigInt(num)).toBuffer().readBigUInt64BE()).toBe(
        BigInt(num - 1)
      );
    });
  });
});