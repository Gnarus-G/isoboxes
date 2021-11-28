import Box from "../base/Box";
import { EMPTY_BUFFER } from "../utils";

export default class TrackFragmentHeaderBox extends Box {
  constructor() {
    super("tfhd");
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected fieldsAsString(): string | null {
    return null;
  }
}
