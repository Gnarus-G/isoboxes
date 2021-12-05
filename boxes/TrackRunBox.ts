import Box from "../base/Box";
import Flags from "../base/Flags";
import FullBoxHeader from "../base/FullBoxHeader";
import Uint32 from "../base/Uint32";
import {
  flagsSetterUsing,
  isDefined,
  numberOfPropertiesDefinedIn,
} from "../utils";
import { EMPTY_BUFFER, fourBytesHoldingSigned } from "../utils/buffers";

enum TrFlags {
  DATA_OFFSET_PRESENT = 0x000001,
  FIRST_SAMPLE_FLAGS_PRESENT = 0x000004,
  SAMPLE_DURATION_PRESENT = 0x000100,
  SAMPLE_SIZE_PRESENT = 0x000200,
  SAMPLE_FLAGS_PRESENT = 0x000400,
  SAMPLE_COMPOSITION_TIME_OFFSETS_PRESENT = 0x000800,
}

type TrFields = {
  sampleCount: Uint32;
  dataOffset?: number;
  firstSampleFlags?: Uint32;
};

export default class TrackRunBox extends Box {
  constructor(version: number, private fields: TrFields) {
    super(new FullBoxHeader("trun", version, new Flags(setFlagsFor(fields))));
    this.header.size.increment(numberOfPropertiesDefinedIn(this.fields) * 4);
  }

  protected fieldsAsBuffer(): Buffer {
    return Buffer.concat([
      this.fields.sampleCount.toBuffer(),
      this.fields.dataOffset
        ? fourBytesHoldingSigned(this.fields.dataOffset)
        : EMPTY_BUFFER,
      this.fields.firstSampleFlags?.toBuffer() ?? EMPTY_BUFFER,
    ]);
  }

  protected fieldsAsStrings() {
    return [
      this.fields.sampleCount.toString("sample count = "),
      this.fields.dataOffset ? "data offset = " + this.fields.dataOffset : null,
      this.fields.firstSampleFlags?.toString("first sample flags = "),
    ].filter(isDefined);
  }
}

const setFlagsFor = flagsSetterUsing<TrFields, TrFlags>({
  sampleCount: 0,
  dataOffset: TrFlags.DATA_OFFSET_PRESENT,
  firstSampleFlags: TrFlags.FIRST_SAMPLE_FLAGS_PRESENT,
});
