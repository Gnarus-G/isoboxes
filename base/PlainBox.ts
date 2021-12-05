import { EMPTY_BUFFER } from "../utils/buffers";
import Box from "./Box";
import BoxHeader from "./BoxHeader";

/**
 * A box with no fields except those defined in a header.
 * To be used for testing the base implementation of boxes, or
 * for easily defining those boxes that have no fields (e.g. moof).
 */
export default class PlainBox extends Box {
  constructor(type: string) {
    super(new BoxHeader(type));
  }
  protected override fieldsAsBuffer(): Buffer {
    return EMPTY_BUFFER;
  }
  protected override fieldsAsStrings(){
    return [];
  }
}
