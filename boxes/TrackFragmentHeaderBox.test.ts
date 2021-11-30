import Uint32 from "../base/Uint32";
import { b, bufferOf, eightBytesHolding, fourBytesHolding } from "../utils";
import TrackFragmentHeaderBox from "./TrackFragmentHeaderBox";

describe("tfhd box", () => {
  const tfhd = new TrackFragmentHeaderBox({
    trackID: new Uint32(1),
  });

  it("buffers a box", () =>
    expect(tfhd.toBuffer()).toEqual(
      bufferOf(
        fourBytesHolding(16),
        b`tfhd`,
        fourBytesHolding(0),
        fourBytesHolding(1)
      )
    ));

  it("serializes the box as string", () =>
    expect(tfhd.toString()).toBe("[tfhd] 16\n  track ID=1\n"));

  describe("adding optional fields", () => {
    const tfhd = new TrackFragmentHeaderBox({
      trackID: new Uint32(1),
      base_data_offset: BigInt(0),
      sampleDescriptionIndex: new Uint32(1),
      defaultSampleDuration: new Uint32(512),
      defaultSampleSize: new Uint32(523),
      defaultSampleFlags: new Uint32(1010000),
    });

    it("buffers a box", () =>
      expect(tfhd.toBuffer()).toEqual(
        bufferOf(
          //size
          fourBytesHolding(40),
          b`tfhd`,
          //version + flags
          fourBytesHolding(0x1 | 0x2 | 0x8 | 0x10 | 0x20), //all fields are present
          //fields,
          fourBytesHolding(1),
          eightBytesHolding(BigInt(0)),
          fourBytesHolding(1),
          fourBytesHolding(512),
          fourBytesHolding(523),
          fourBytesHolding(1010000)
        )
      ));
  });
});
