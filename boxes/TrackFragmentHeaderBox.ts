import Box from "../base/Box";
import Flags from "../base/Flags";
import FullBoxHeader from "../base/FullBoxHeader";
import Uint32 from "../base/Uint32";
import Uint64 from "../base/Uint64";
import {
  flagsSetterUsing,
  isDefined,
  numberOfPropertiesDefinedIn,
} from "../utils";
import { EMPTY_BUFFER } from "../utils/buffers";

enum TfFlags {
  BASE_DATA_OFFSET_PRESENT = 0x000001,
  SAMPLE_DESCRIPTION_INDEX_PRESENT = 0x000002,
  DEFAULT_SAMPLE_DURATION_PRESENT = 0x000008,
  DEFAULT_SAMPLE_SIZE_PRESENT = 0x000010,
  DEFAULT_SAMPLE_FLAGS_PRESENT = 0x000020,
  DURATION_IS_EMPTY = 0x010000,
  DEFAULT_BASE_IS_MOOF = 0x020000,
}

type TfFields = {
  trackID: Uint32;
  baseDataOffset?: Uint64;
  sampleDescriptionIndex?: Uint32;
  defaultSampleDuration?: Uint32;
  defaultSampleSize?: Uint32;
  defaultSampleFlags?: Uint32;
};

export default class TrackFragmentHeaderBox extends Box {
  constructor(private fields: TfFields) {
    super(new FullBoxHeader("tfhd", 0, new Flags(setFlagsFor(fields))));

    this.header.size.increment(numberOfPropertiesDefinedIn(this.fields) * 4);
    //"baseDataOffset" is 8 bytes long, 4 of which are counted above
    //so count the last 4 below
    if ("baseDataOffset" in this.fields) this.header.size.increment(4);
  }

  protected fieldsAsBuffer(): Buffer {
    return Buffer.concat([
      this.fields.trackID.toBuffer(),
      this.fields.baseDataOffset?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.sampleDescriptionIndex?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.defaultSampleDuration?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.defaultSampleSize?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.defaultSampleFlags?.toBuffer() ?? EMPTY_BUFFER,
    ]);
  }

  protected fieldsAsStrings(): string[] {
    return [
      this.fields.trackID.toString("track ID = "),
      this.fields.baseDataOffset?.toString("base data offset = "),
      this.fields.sampleDescriptionIndex?.toString(
        "sample description index = "
      ),
      this.fields.defaultSampleDuration?.toString("default sample duration = "),
      this.fields.defaultSampleSize?.toString("default sample size = "),
      this.fields.defaultSampleFlags?.toString("default sample flags = "),
    ].filter(isDefined);
  }
}

const setFlagsFor = flagsSetterUsing<TfFields, TfFlags>({
  trackID: 0,
  baseDataOffset: TfFlags.BASE_DATA_OFFSET_PRESENT,
  sampleDescriptionIndex: TfFlags.SAMPLE_DESCRIPTION_INDEX_PRESENT,
  defaultSampleDuration: TfFlags.DEFAULT_SAMPLE_DURATION_PRESENT,
  defaultSampleFlags: TfFlags.DEFAULT_SAMPLE_FLAGS_PRESENT,
  defaultSampleSize: TfFlags.DEFAULT_SAMPLE_SIZE_PRESENT,
});
