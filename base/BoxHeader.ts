import Uint32 from "./Uint32";

export default class BoxHeader {
  readonly #size: Uint32 = new Uint32(8);

  constructor(private type: string) {
    if (type.length !== 4)
      throw new Error("Invalid box type: must be 4 characters long");
  }

  get size() {
    return this.#size;
  }

  toBuffer() {
    return Buffer.concat([this.size.toBuffer(), Buffer.from(this.type)]);
  }

  toString() {
    return `[${this.type}] size=${this.size.getValue()}`;
  }
}
