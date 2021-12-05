import Uint32 from "../base/Uint32";
import { b, bufferOf, fourBytesHolding } from "../utils/buffers";
import TrackRunBox from "./TrackRunBox";

describe("trun box", () => {
  const trun = new TrackRunBox(1, {
    sampleCount: new Uint32(24),
  });

  it("buffers a box", () =>
    expect(trun.toBuffer()).toEqual(
      bufferOf(
        fourBytesHolding(16),
        b`trun`,
        Buffer.of(1), // version
        Buffer.of(0, 0, 0), // flags
        fourBytesHolding(24)
      )
    ));

  it("serializes the box as string", () =>
    expect(trun.toString()).toBe("[trun] size=16, version=1\n  sample count = 24\n"));

  describe("adding optional fields", () => {
    const trun = new TrackRunBox(1, {
      sampleCount: new Uint32(24),
      dataOffset: 304,
      firstSampleFlags: new Uint32(2000000),
    });

    it("buffers a box", () =>
      expect(trun.toBuffer()).toEqual(
        bufferOf(
          //size
          fourBytesHolding(24),
          b`trun`,
          //version + flags
          Buffer.of(1),
          Buffer.of(0, 0, 0x1 | 0x4),
          //fields,
          fourBytesHolding(24),
          fourBytesHolding(304),
          fourBytesHolding(2000000)
        )
      ));

    it("serializes to string", () => {
      expect(trun.toString()).toBe(
        `
[trun] size=24, version=1, flags=5
  sample count = 24
  data offset = 304
  first sample flags = 2000000
`.trimStart()
      );
    });
  });
});
