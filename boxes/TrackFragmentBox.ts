import Box from "../base/Box";
import { EMPTY_BUFFER } from "../utils";

export default class TrackFragmentBox extends Box {
  constructor() {
    super("traf");
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected fieldsAsString(): string | null {
    return null
  }
}
