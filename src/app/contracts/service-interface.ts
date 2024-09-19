import type { FindManyOptions, FindOneOptions } from "typeorm"

export interface IService<T> {
  find: (options?: Partial<FindManyOptions<T>>) => Promise<T[] | null>
  findOne: (options: Partial<FindOneOptions<T>>) => Promise<T | null>
  create: (data: Partial<T>) => Promise<T | null>
  save: (id: string, data: Partial<T>) => Promise<T | null>
  findOrSave: (data: Partial<T>) => Promise<T>
  remove: (id: string) => Promise<T | null>
}
