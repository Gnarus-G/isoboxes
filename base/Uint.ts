export default class Uint {
  constructor(private value: number, private readonly size = 4) {
    this.value = value;
    this.size = size;
  }

  increment(by: number) {
    this.value = this.value + by;
  }

  getValue() {
    return this.value;
  }

  toBuffer() {
    const buff = Buffer.alloc(this.size, 0);
    buff.writeUIntBE(this.value, 0, this.size);
    return buff;
  }
}