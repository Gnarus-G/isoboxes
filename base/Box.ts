import BoxHeader from "./BoxHeader";

export default abstract class Box {
  protected children: Array<Box> = [];

  constructor(protected header: BoxHeader) {}

  getSize() {
    return this.header.size.getValue();
  }

  add(box: Box) {
    this.header.size.increment(box.getSize());
    this.children.push(box);
    return this;
  }

  protected abstract fieldsAsBuffer(): Buffer;

  toBuffer(): Buffer {
    const buffer = Buffer.concat([
      this.header.toBuffer(),
      this.fieldsAsBuffer(),
      ...this.children.map((b) => b.toBuffer()),
    ]);

    return buffer;
  }

  toString(): string {
    return this.toStringAux();
  }

  protected abstract fieldsAsString(): string | null;

  private toStringAux(i = 1): string {
    const fieldsString = this.fieldsAsString()
      ? "\n" + "  ".repeat(i) + this.fieldsAsString()
      : "";

    const childrenString = this.children
      .map((box) => "  ".repeat(i) + box.toStringAux(i + 1))
      .join("");

    return `${this.header.toString()}${fieldsString}\n${childrenString}`;
  }
}
