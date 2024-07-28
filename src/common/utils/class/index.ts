export function isClass(target: any): target is new (...args: any[]) => any {
  return (
    typeof target === "function" &&
    target.prototype !== undefined &&
    target.prototype.constructor === target
  )
}
