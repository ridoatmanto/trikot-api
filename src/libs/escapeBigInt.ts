export function escapeBigInt(jsonDataWithBigInt: object): string {
  return JSON.stringify(
    jsonDataWithBigInt,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
}
