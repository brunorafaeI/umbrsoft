import { getEnv, getEnvFloat, getEnvInteger, getEnvString } from "./getenv"

describe("getEnv", () => {
  // Returns the value of the environment variable as a string when no fallback is provided.
  it("should return the value of the environment variable as a string when no fallback is provided", () => {
    process.env.TEST_ENV = "test_value"
    expect(getEnv("TEST_ENV")).toBe("test_value")
  })

  // Returns the value of the environment variable as a boolean when the fallback is a boolean.
  it("should return the value of the environment variable as a boolean when the fallback is a boolean", () => {
    process.env.TEST_VAR = "true"
    const result = getEnv<boolean>("TEST_VAR", false)
    expect(result).toBe(true)
  })

  // Returns the value of the environment variable as a float when the fallback is a float.
  it("should return the value of the environment variable as a float when the fallback is a float", () => {
    process.env.TEST_ENV = "3.14"
    const result = getEnv("TEST_ENV", 2.71)
    expect(result).toBe(3.14)
  })

  // Throws a TypeError when the environment variable is not of type integer and the fallback is an integer.
  it("should throw a TypeError when the environment variable is not of type integer and the fallback is an integer", () => {
    process.env.TEST_VAR = "not_an_integer"
    expect(() => {
      getEnv("TEST_VAR", 123)
    }).toThrow(TypeError)
  })

  // Returns the value of the environment variable as a string when the fallback is an empty string.
  it("should return the value of the environment variable as a string when the fallback is an empty string", () => {
    process.env.TEST_ENV = "test_value"
    expect(getEnv("TEST_ENV", "")).toBe("test_value")
  })

  // Throws a TypeError when the environment variable is not of type integer and the fallback is 0.
  it("should throw a TypeError when the environment variable is not of type integer and the fallback is 0", () => {
    process.env.TEST_VAR = "test_value"
    expect(() => {
      getEnv("TEST_VAR", 0)
    }).toThrow(TypeError)
  })

  // Throws a TypeError when the environment variable is not of type integer and the fallback is 0.
  it("should throw a TypeError when the environment variable is not of type integer and the fallback is null", () => {
    process.env.TEST_VAR = "test_value"
    expect(() => {
      // @ts-expect-error need it to test fallback value
      getEnv("TEST_VAR", null)
    }).toThrow(TypeError)
  })
})

describe("getEnvString", () => {
  // Should return the fallback value as a string when the environment variable is not defined and a fallback is provided
  it("should return the fallback value as a string when the environment variable is not defined and a fallback is provided", () => {
    const env = "ENV_VAR"
    const fallback = "fallback value"
    const result = getEnvString(env, fallback)
    expect(result).toBe(fallback)
  })

  // Should throw a TypeError when the value of the environment variable is not of type string or undefined
  it("should throw a ReferenceError when the value of the environment variable is undefined or null", () => {
    expect(() => {
      getEnvString("ENV_VAR", undefined)
    }).toThrow(ReferenceError)

    expect(() => {
      // @ts-expect-error need it to test fallback value
      getEnvString("ENV_VAR", null)
    }).toThrow(TypeError)
  })
})

describe("getEnvFloat", () => {
  // Should return the value of the environment variable as a string when it is defined and a fallback is provided, but not used
  it("should return the value of the environment variable as a string when it is defined and a fallback is provided, but not used", () => {
    const env = "ENV_VAR"
    const value = "test value"
    process.env[env] = value
    const result = getEnvString(env, "fallback value")
    expect(result).toBe(value)
  })

  it("should throw a TypeError when the environment variable is defined but not a valid float", () => {
    process.env.ENV_VAR = "not a float"
    expect(() => {
      getEnvFloat("ENV_VAR")
    }).toThrow(TypeError)
  })

  // Should handle float values with leading/trailing spaces correctly
  it("should handle float values with leading/trailing spaces correctly", () => {
    // Set up
    process.env.ENV_VAR = " 3.14 "

    // Execution
    const result = getEnvFloat("ENV_VAR")

    // Assertion
    expect(result).toBe(3.14)
  })
})

// Should return the fallback value when the environment variable is not defined and fallback is provided
it("should return the fallback value when the environment variable is not defined and fallback is provided", () => {
  // Set up
  const env = "TEST_ENV_FALLBACK"
  const fallback = 10

  // Execution
  const result = getEnvFloat(env, fallback)

  // Assertion
  expect(result).toBe(fallback)
})

// Should handle float values with leading/trailing spaces correctly
it("should handle float values with leading/trailing spaces correctly", () => {
  // Set up
  process.env.ENV_VAR = " 3.14 "

  // Execution
  const result = getEnvFloat("ENV_VAR")

  // Assertion
  expect(result).toBe(3.14)
})

describe("getEnvInteger", () => {
  // should throw TypeError when fallback value is provided but not of type integer
  it("should throw TypeError when fallback value is provided but not of type integer", () => {
    // @ts-expect-error need it to test fallback value
    expect(getEnvInteger("ENV_VAR", "fallback")).toThrow(TypeError)
  })

  // should throw TypeError when fallback value is provided as float but cannot be parsed as integer
  it("should throw TypeError when fallback value is provided as float but cannot be parsed as integer", () => {
    expect(getEnvInteger("ENV_VAR", 1.5)).toThrow(TypeError)
  })

  // should return integer value when environment variable is defined and of type float
  it("should return integer value when environment variable is defined and of type float", () => {
    process.env.ENV_VAR = "10.5"
    const result = getEnvInteger("ENV_VAR")
    expect(result).toBe(10)
  })
})
