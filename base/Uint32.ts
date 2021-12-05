import { fourBytesHolding } from "../utils/buffers";

export default class Uint32 {
  constructor(private value: number) {}

  increment(by: number) {
    this.value = this.value + by;
  }

  getValue() {
    return convertToUint32(this.value);
  }

  toBuffer() {
    return fourBytesHolding(this.getValue());
  }

  toString(prefix: string, radix?: number): string;
  toString(radix?: number): string;
  toString(arg?: string | number, radix?: number) {
    if (typeof arg === "string") return arg + this.value.toString(radix);
    return this.value.toString(arg);
  }
}

function convertToUint32(value: number) {
  return value >>> 0;
}
