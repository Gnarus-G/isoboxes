import { iterate } from "../utils";
import Uint32 from "./Uint32";

const MAX_UINT32 = 2 ** 32 - 1;

describe("uint32", () => {
  it("buffers positive numbers intact", () => {
    expect(new Uint32(2).toBuffer().readUInt32BE()).toEqual(2);
  });

  it("returns a positive number, with negative inputs", () => {
    expect(new Uint32(-1).toBuffer().readUInt32BE()).toBeGreaterThan(-1);
  });

  it("returns 2**32-1 when given -1", () =>
    expect(new Uint32(-1).toBuffer().readUInt32BE()).toBe(MAX_UINT32));

  it("returns the unsigned value of given negative values", () => {
    iterate(1, 30).forEach((num) =>
      expect(new Uint32(num * -1).toBuffer().readUInt32BE()).toBe(MAX_UINT32 - num + 1)
    );
  });

  it("overflows the values above 2**32 -1", () => {
    iterate(1, 30).forEach((num) => {
      expect(new Uint32(MAX_UINT32 + num).toBuffer().readUInt32BE()).toBe(num - 1);
    });
  });
});
