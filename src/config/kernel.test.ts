import { KERNEL } from "@/config/kernel"

describe("KERNEL", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should have a project_dir property", () => {
    expect(KERNEL).toHaveProperty("project_dir")
  })
})
