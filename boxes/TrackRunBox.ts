import Box from "../base/Box";
import Flags from "../base/Flags";
import FullBoxHeader from "../base/FullBoxHeader";
import { EMPTY_BUFFER } from "../utils";

export enum TrFlags {
  DATA_OFFSET_PRESENT = 0x000001,
  FIRST_SAMPLE_FLAGS_PRESENT = 0x000004,
  SAMPLE_DURATION_PRESENT = 0x000100,
  SAMPLE_SIZE_PRESENT = 0x000200,
  SAMPLE_FLAGS_PRESENT = 0x000400,
  SAMPLE_COMPOSITION_TIME_OFFSETS_PRESENT = 0x000800,
}

export default class TrackRunBox extends Box {
  constructor(version: number, flagValues: TrFlags) {
    super(new FullBoxHeader("trun", version, new Flags(flagValues)));
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected fieldsAsString(): string | null {
    return null;
  }
}
