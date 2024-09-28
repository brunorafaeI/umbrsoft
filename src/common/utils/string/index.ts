export const StringUtil = {
  toBoolean: (value?: any): boolean => {
    if (typeof value === "string") {
      value = value.trim().toLowerCase()
    }

    switch (value) {
      case true:
      case false:
        return value

      case "true":
        return true

      case "false":
        return false

      default:
        return Boolean(value)
    }
  },

  toFloat: (value?: any): number | undefined => {
    const parsed =
      typeof value === "number" ? value : parseFloat(String(value).trim())
    return !isNaN(parsed) ? parsed : undefined
  },

  toString: (value?: any): string | undefined => {
    return typeof value === "string" ? value : undefined
  },

  toInteger: (value?: any): number | undefined => {
    const parsed = parseInt(String(value).trim())
    return !isNaN(parsed) ? parsed : undefined
  },
}
