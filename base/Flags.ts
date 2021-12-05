export default class Flags {
  readonly buffer: Buffer;

  constructor(readonly value: number) {
    this.buffer = Buffer.alloc(3);
    this.buffer.writeUIntBE(value, 0, 3);
  }
}
