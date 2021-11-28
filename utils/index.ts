export const EMPTY_BUFFER = Buffer.allocUnsafe(0);

export const fourBytesHolding = (value: number) => {
  const bytes = Buffer.alloc(4);
  return bytes.writeUInt32BE(value), bytes;
};

export const b = ([string]: TemplateStringsArray) => {
  return Buffer.from(string);
};

export const zeroBytes = (size: number) => {
  return Buffer.alloc(size, 0);
};

export const bufferOf = (...buffers: Array<Buffer>) =>
  Buffer.concat([...buffers]);
