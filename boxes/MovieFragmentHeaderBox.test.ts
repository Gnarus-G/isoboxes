import { b, bufferOf, fourBytesHolding, zeroBytes } from "../utils/buffers";
import MovieFragmentHeaderBox from "./MovieFragmentHeaderBox";

describe("mfhd box", () => {
  const mfhd1 = new MovieFragmentHeaderBox();

  const expectSequenceNumber = (mfhd: MovieFragmentHeaderBox, num: number) =>
    expect(mfhd.toBuffer()).toEqual(
      bufferOf(
        Buffer.alloc(4, fourBytesHolding(16)),
        b`mfhd`,
        zeroBytes(4),
        fourBytesHolding(num)
      )
    );

  it("buffers the first mfhd box with the sequence number 1", () =>
    expectSequenceNumber(mfhd1, 1));

  it("buffers the next mfhd with the next int index", () => {
    const mfhd2 = new MovieFragmentHeaderBox();
    expectSequenceNumber(mfhd2, 2);
  });

  it("maintains the first mfhd to have sequence value 1", () =>
    expectSequenceNumber(mfhd1, 1));

  it("buffers the third mfhd to have sequence  value 3", () => {
    const mfhd3 = new MovieFragmentHeaderBox();
    expectSequenceNumber(mfhd3, 3);
  });

  it("serializes the box as string", () => {
    expect(mfhd1.toString()).toBe("[mfhd] 16\n  sequence_number = 1\n");
    expect(new MovieFragmentHeaderBox().toString()).toBe(
      "[mfhd] 16\n  sequence_number = 4\n"
    );
  });
});
