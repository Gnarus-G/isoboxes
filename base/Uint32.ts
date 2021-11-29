import { fourBytesHolding } from "../utils";

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
}

function convertToUint32(value: number) {
  return value >>> 0;
}
