export default class Flags {
  readonly buffer;

  constructor(flags: number) {
    this.buffer = Buffer.alloc(3);
    this.buffer.writeUIntBE(flags, 0, 3);
  }
}
