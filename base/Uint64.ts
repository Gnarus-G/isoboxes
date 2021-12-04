import { eightBytesHolding } from "../utils";

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
}

function convertToUint64(value: bigint) {
  const view = new DataView(new ArrayBuffer(8));
  view.setBigUint64(0, value);
  return view.getBigUint64(0);
}
