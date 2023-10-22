export interface IReadRepository<T> {
  find: (criteria: any) => Promise<T[] | null>
  findById: (id: string) => Promise<T | null>
}
