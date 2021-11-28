import MovieFragmentBox from "../boxes/MovieFragmentBox";
import TrackFragmentBox from "../boxes/TrackFragmentBox";
import TrackFragmentHeaderBox from "../boxes/TrackFragmentHeaderBox";
import TrackRunBox from "../boxes/TrackRunBox";
import { b, bufferOf, fourBytesHolding } from "../utils";

describe("boxes", () => {
  const moof = new MovieFragmentBox();
  it("buffers the box types", () =>
    expect(moof.toBuffer()).toEqual(
      bufferOf(Buffer.alloc(4, fourBytesHolding(8)), b`moof`)
    ));

  it("should serialize the header as string", () =>
    expect(moof.toString()).toBe(`[moof] 8\n`));

  describe("adding a box as a child", () => {
    const moof = new MovieFragmentBox().add(new TrackFragmentBox());

    it("increases the parent box size by the new child's size", () =>
      expect(moof.getSize()).toBe(16));

    it("adds it to the collection of children", () => {
      const traf = new TrackFragmentBox()
        .add(new TrackFragmentHeaderBox())
        .add(new TrackRunBox());
      moof.add(traf);

      expect(moof.toString()).toEqual(moofTestString);
      expect(moof.toBuffer()).toEqual(
        Buffer.concat([
          fourBytesHolding(40),
          Buffer.from("moof"),
          fourBytesHolding(8),
          Buffer.from("traf"),
          fourBytesHolding(24),
          Buffer.from("traf"),
          fourBytesHolding(8),
          Buffer.from("tfhd"),
          fourBytesHolding(8),
          Buffer.from("trun"),
        ])
      );
    });
  });
});

const moofTestString = `
[moof] 40
  [traf] 8
  [traf] 24
    [tfhd] 8
    [trun] 8
`.trimStart();
