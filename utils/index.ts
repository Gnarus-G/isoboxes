export const EMPTY_BUFFER = Buffer.allocUnsafe(0);

/**
 * 
 * @param value 
 * @returns a {@link Buffer} with the value written in it as a uint32
 */
export const fourBytesHolding = (value: number) => {
  const bytes = Buffer.alloc(4);
  return bytes.writeUInt32BE(value), bytes;
};

export const eightBytesHolding = (value: bigint) => {
  const bytes = Buffer.alloc(8);
  return bytes.writeBigUInt64BE(value), bytes;
};

export const b = ([string]: TemplateStringsArray) => {
  return Buffer.from(string);
};

export const zeroBytes = (size: number) => {
  return Buffer.alloc(size, 0);
};

export const bufferOf = (...buffers: Array<Buffer>) =>
  Buffer.concat([...buffers]);
