import Box from "../base/Box";
import BoxHeader from "../base/BoxHeader";
import { EMPTY_BUFFER } from "../utils";

export default class TrackRunBox extends Box {
  constructor() {
    super(new BoxHeader("trun"));
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected fieldsAsString(): string | null {
    return null;
  }
}
