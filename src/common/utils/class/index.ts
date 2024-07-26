export function isConstructor(
  target: any
): target is new (...args: any[]) => any {
  return typeof target === "function" && target.prototype !== undefined
}
