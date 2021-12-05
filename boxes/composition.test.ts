import PlainBox from "../base/PlainBox";
import Uint32 from "../base/Uint32";
import { fourBytesHolding } from "../utils/buffers";
import TrackFragmentHeaderBox from "./TrackFragmentHeaderBox";

describe("composing boxes as children", () => {
  const moof = new PlainBox("moof").add(new PlainBox("traf"));

  it("increases the parent box size by the new child's size", () =>
    expect(moof.getSize()).toBe(16));

  it("adds it to the collection of children", () => {
    const traf = new PlainBox("traf")
      .add(new TrackFragmentHeaderBox({ trackID: new Uint32(1) }))
      .add(new PlainBox("trun"));
    moof.add(traf);

    expect(moof.toString()).toEqual(moofTestString);
    expect(moof.toBuffer()).toEqual(
      Buffer.concat([
        fourBytesHolding(48),
        Buffer.from("moof"),
        fourBytesHolding(8),
        Buffer.from("traf"),
        fourBytesHolding(32),
        Buffer.from("traf"),
        fourBytesHolding(16),
        Buffer.from("tfhd"),
        fourBytesHolding(0),
        fourBytesHolding(1),
        fourBytesHolding(8),
        Buffer.from("trun"),
      ])
    );
  });
});

const moofTestString = `
[moof] 48
  [traf] 8
  [traf] 32
    [tfhd] 16
      track ID = 1
    [trun] 8
`.trimStart();
