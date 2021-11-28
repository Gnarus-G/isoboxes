import { b, bufferOf, fourBytesHolding } from "../utils";
import MovieFragmentBox from "./MovieFragmentBox";

describe("moof box", () => {
  const moof = new MovieFragmentBox();

  it("buffers a box", () =>
    expect(moof.toBuffer()).toEqual(
      bufferOf(Buffer.alloc(4, fourBytesHolding(8)), b`moof`)
    ));

  it("serializes the box as string", () =>
    expect(moof.toString()).toBe("[moof] 8\n"));
});
