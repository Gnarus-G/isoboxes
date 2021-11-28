import { b, bufferOf, fourBytesHolding } from "../utils";
import Box from "./Box";

describe("plain boxes", () => {
  it("buffers the box types", () => {
    const moof = new Box("moof");
    expect(moof.toBuffer()).toEqual(
      bufferOf(Buffer.alloc(4, Buffer.of(0, 0, 0, 8)), b`moof`)
    );
    expect(moof.toString()).toBe(`[moof] 8\n`);
  });

  describe("adding a box as a child", () => {
    const moof = new Box("moof").add(new Box("traf"));

    it("increases the parent box size by the new child's size", () =>
      expect(moof.getSize()).toBe(16));

    it("adds it to the collection of children", () => {
      const traf = new Box("traf").add(new Box("tfhd")).add(new Box("trun"));
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
