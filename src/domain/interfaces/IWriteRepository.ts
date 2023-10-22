export interface IWriteRepository<T> {
  save: (data: any) => Promise<T | null>
}
