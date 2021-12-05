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

export const flagsSetterUsing =
  <Fields, Flags extends number>(map: Record<keyof Fields, Flags>) =>
  (fields: Fields) => {
    return (Object.keys(fields) as (keyof Fields)[])
      .map((key) => map[key])
      .reduce((acc, flag) => acc | flag, 0);
  };

export function numberOfPropertiesDefinedIn(o: object) {
  return Object.keys(o).length;
}
