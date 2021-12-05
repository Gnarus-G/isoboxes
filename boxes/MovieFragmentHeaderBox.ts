import Box from "../base/Box";
import Flags from "../base/Flags";
import FullBoxHeader from "../base/FullBoxHeader";
import { fourBytesHolding } from "../utils/buffers";

export default class MovieFragmentHeaderBox extends Box {
  constructor(private readonly sequenceNumber: number) {
    super(new FullBoxHeader("mfhd", 256, new Flags(0)));
    this.header.size.increment(4);
  }

  protected override fieldsAsBuffer(): Buffer {
    return fourBytesHolding(this.sequenceNumber);
  }

  protected override fieldsAsStrings(): string[] {
    return [`sequence number = ${this.sequenceNumber}`];
  }
}
