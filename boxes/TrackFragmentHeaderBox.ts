import Box from "../base/Box";
import Flags from "../base/Flags";
import FullBoxHeader from "../base/FullBoxHeader";
import Uint32 from "../base/Uint32";
import { eightBytesHolding, EMPTY_BUFFER } from "../utils";

export enum TfFlags {
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
  base_data_offset?: bigint;
  sampleDescriptionIndex?: Uint32;
  defaultSampleDuration?: Uint32;
  defaultSampleSize?: Uint32;
  defaultSampleFlags?: Uint32;
};

export default class TrackFragmentHeaderBox extends Box {
  constructor(private fields: TfFields) {
    super(new FullBoxHeader("tfhd", 0, new Flags(setFlagsFor(fields))));

    const numberOfDefinedFields = Object.keys(this.fields).length;
    this.header.size.increment(numberOfDefinedFields * 4);

    if (this.fields.base_data_offset != null) this.header.size.increment(4);
  }

  protected fieldsAsBuffer(): Buffer {
    return Buffer.concat([
      this.fields.trackID.toBuffer(),
      this.fields.base_data_offset != null
        ? eightBytesHolding(this.fields.base_data_offset)
        : EMPTY_BUFFER,
      this.fields.sampleDescriptionIndex?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.defaultSampleDuration?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.defaultSampleSize?.toBuffer() ?? EMPTY_BUFFER,
      this.fields.defaultSampleFlags?.toBuffer() ?? EMPTY_BUFFER,
    ]);
  }

  protected fieldsAsString(): string {
    return `track ID=${this.fields.trackID.getValue()}`;
  }
}

const fieldToFlagMap: Record<keyof TfFields, TfFlags> = {
  trackID: 0,
  base_data_offset: TfFlags.BASE_DATA_OFFSET_PRESENT,
  sampleDescriptionIndex: TfFlags.SAMPLE_DESCRIPTION_INDEX_PRESENT,
  defaultSampleDuration: TfFlags.DEFAULT_SAMPLE_DURATION_PRESENT,
  defaultSampleFlags: TfFlags.DEFAULT_SAMPLE_FLAGS_PRESENT,
  defaultSampleSize: TfFlags.DEFAULT_SAMPLE_SIZE_PRESENT,
};

const setFlagsFor = (fields: TfFields) => {
  return (Object.keys(fields) as (keyof TfFields)[])
    .map((key) => fieldToFlagMap[key])
    .reduce((acc, flag) => acc | flag);
};
