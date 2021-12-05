import Box from "../base/Box";
import Flags from "../base/Flags";
import FullBoxHeader from "../base/FullBoxHeader";
import { fourBytesHolding } from "../utils/buffers";

export default class MovieFragmentHeaderBox extends Box {
  private static sequence_count = 1;
  private readonly sequence_number = MovieFragmentHeaderBox.sequence_count++;

  constructor() {
    super(new FullBoxHeader("mfhd", 256, new Flags(0)));
    this.header.size.increment(4);
  }

  protected override fieldsAsBuffer(): Buffer {
    return fourBytesHolding(this.sequence_number);
  }

  protected override fieldsAsStrings(): string[] {
    return [`sequence_number=${this.sequence_number}`];
  }
}
