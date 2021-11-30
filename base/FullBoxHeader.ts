import BoxHeader from "./BoxHeader";
import Flags from "./Flags";

export default class FullBoxHeader extends BoxHeader {
  private versionBuffer: Buffer;
  constructor(type: string, version: number, private flags: Flags) {
    super(type);
    this.versionBuffer = Buffer.of(version);
    this.size.increment(4);
  }

  override toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.versionBuffer,
      this.flags.buffer,
    ]);
  }
}
