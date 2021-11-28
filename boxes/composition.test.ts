import PlainBox from "../base/PlainBox";
import { fourBytesHolding } from "../utils";

describe("composing boxes as children", () => {
  const moof = new PlainBox("moof").add(new PlainBox("traf"));

  it("increases the parent box size by the new child's size", () =>
    expect(moof.getSize()).toBe(16));

  it("adds it to the collection of children", () => {
    const traf = new PlainBox("traf")
      .add(new PlainBox("tfhd"))
      .add(new PlainBox("trun"));
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

const moofTestString = `
[moof] 40
  [traf] 8
  [traf] 24
    [tfhd] 8
    [trun] 8
`.trimStart();
