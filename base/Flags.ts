export default class Flags {
  readonly buffer;

  constructor(values: number) {
    this.buffer = Buffer.alloc(3);
    this.buffer.writeUIntBE(values, 0, 3);
  }
}
