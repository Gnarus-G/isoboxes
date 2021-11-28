import Uint from "./Uint";

export default class Box {
  protected size: Uint = new Uint(8);
  private type: string;
  protected children: Array<Box> = [];

  constructor(type: string) {
    if (type.length !== 4)
      throw new Error("Invalid box type: must be 4 characters long");
    this.type = type;
  }

  getSize() {
    return this.size.getValue();
  }

  add(box: Box) {
    this.size.increment(box.getSize());
    this.children.push(box);
    return this;
  }

  toBuffer(): Buffer {
    const buffer = Buffer.concat([
      this.size.toBuffer(),
      Buffer.from(this.type),
      ...this.children.map((b) => b.toBuffer()),
    ]);

    return buffer;
  }

  toString(): string {
    return this.toStringAux();
  }

  private toStringAux(i = 1): string {
    const childrenString = this.children
      .map((box) => "  ".repeat(i) + box.toStringAux(i + 1))
      .join("");

    return `[${this.type}] ${this.size.getValue()}\n${childrenString}`;
  }
}
