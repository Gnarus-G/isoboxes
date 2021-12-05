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

  override toString(): string {
    const version = this.versionBuffer.readUInt8(0);
    const flagValue = this.flags.value;

    const versionString = version > 0 ? ", version=" + version : "";
    const flagsString =
      flagValue > 0 ? `, flags=${flagValue.toString(16)}` : "";

    return super.toString() + versionString + flagsString;
  }
}
