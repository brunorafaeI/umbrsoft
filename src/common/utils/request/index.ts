import { MAX_LIMIT } from "../constants"

export const RequestUtil = {
  parseQueryPagination: (query: { page?: string, limit?: string }) => {
    const page = query?.page ? parseInt(query?.page, 10) : 1
    const limit = query?.limit ? parseInt(query?.limit, 10) : MAX_LIMIT

    const take = limit > MAX_LIMIT ? MAX_LIMIT : limit
    const skip = (page - 1) * take

    return {
      skip,
      take,
      page,
    }
  },
}
