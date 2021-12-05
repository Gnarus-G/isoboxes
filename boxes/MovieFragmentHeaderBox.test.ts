import { b, bufferOf, fourBytesHolding, zeroBytes } from "../utils/buffers";
import MovieFragmentHeaderBox from "./MovieFragmentHeaderBox";

describe("mfhd box", () => {
  const mfhd = new MovieFragmentHeaderBox(1);

  it("buffers the mfhd box with the sequence number 1", () =>
    expect(mfhd.toBuffer()).toEqual(
      bufferOf(
        Buffer.alloc(4, fourBytesHolding(16)),
        b`mfhd`,
        zeroBytes(4),
        fourBytesHolding(1)
      )
    ));

  it("serializes the box as string", () => {
    expect(mfhd.toString()).toBe("[mfhd] size=16\n  sequence number = 1\n");
    expect(new MovieFragmentHeaderBox(4).toString()).toBe(
      "[mfhd] size=16\n  sequence number = 4\n"
    );
  });
});
