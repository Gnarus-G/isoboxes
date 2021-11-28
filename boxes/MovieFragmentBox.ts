import Box from "../base/Box";
import { EMPTY_BUFFER } from "../utils";

export default class MovieFragmentBox extends Box {
  constructor() {
    super("moof");
  }

  protected fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER; //moof has no fields of it own
  }

  protected fieldsAsString(): string | null {
    return null; //again, moof has no fields of it own
  }
}
