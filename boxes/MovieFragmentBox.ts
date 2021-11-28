import Box from "../base/Box";
import BoxHeader from "../base/BoxHeader";
import { EMPTY_BUFFER } from "../utils";

export default class MovieFragmentBox extends Box {
  constructor() {
    super(new BoxHeader("moof"));
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER; //moof has no fields of it own
  }

  protected fieldsAsString(): string | null {
    return null; //again, moof has no fields of it own
  }
}
