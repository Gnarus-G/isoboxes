import Box from "../base/Box";
import BoxHeader from "../base/BoxHeader";
import { EMPTY_BUFFER } from "../utils/buffers";

export default class TrackFragmentBox extends Box {
  constructor() {
    super(new BoxHeader("traf"));
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected fieldsAsStrings(): string[] {
    return [];
  }
}
