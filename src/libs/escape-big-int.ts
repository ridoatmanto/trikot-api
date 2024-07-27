export function escapeBigInt(jsonDataWithBigInt: object): string {
  const result = JSON.stringify(
    jsonDataWithBigInt,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
  return JSON.parse(result);
}
