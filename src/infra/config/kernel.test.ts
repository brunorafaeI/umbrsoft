import { KERNEL } from '@/infra/config/kernel'

describe('KERNEL', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have a project_dir property', () => {
    expect(KERNEL).toHaveProperty('project_dir')
  })
})
