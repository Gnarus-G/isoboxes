import { eightBytesHolding } from "../utils/buffers";

export default class Uint64 {
  private value: bigint;

  constructor(value: number);
  constructor(value: bigint);
  constructor(value: bigint | number) {
    if (typeof value === "number") this.value = BigInt(value);
    else this.value = value;
  }

  increment(by: number) {
    this.value = this.value + BigInt(by);
  }

  getValue() {
    return convertToUint64(this.value);
  }

  toBuffer() {
    return eightBytesHolding(this.getValue());
  }

  toString(prefix: string, radix?: number): string;
  toString(radix?: number): string;
  toString(arg?: string | number, radix?: number) {
    if (typeof arg === "string") return arg + this.value.toString(radix);
    return this.value.toString(arg);
  }
}

function convertToUint64(value: bigint) {
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, value);
  return view.getBigUint64(0);
}
