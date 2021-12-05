export function iterate(from: number, to: number) {
  return Array(to)
    .fill(null)
    .map((_, i) => i + 1)
    .filter((i) => i >= from);
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value != undefined;
}

export function indent(text: string, level: number, delimiter = "  ") {
  return delimiter.repeat(level) + text;
}
