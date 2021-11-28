import Box from "../base/Box";
import { EMPTY_BUFFER } from "../utils";

export default class TrackRunBox extends Box {
  constructor() {
    super("trun");
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected fieldsAsString(): string | null {
    return null;
  }
}
