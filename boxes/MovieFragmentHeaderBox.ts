import Box from "../base/Box";
import BoxHeader from "../base/BoxHeader";
import { fourBytesHolding } from "../utils";

export default class MovieFragmentHeaderBox extends Box {
  private static sequence_count = 1;
  private readonly sequence_number = MovieFragmentHeaderBox.sequence_count++;

  constructor() {
    super(new BoxHeader("mfhd"));
  }

  protected override fieldsAsBuffer(): Buffer {
    return fourBytesHolding(this.sequence_number);
  }

  protected override fieldsAsString(): string {
    return `sequence_number=${this.sequence_number}`;
  }
}
