import type { FindManyOptions, FindOneOptions } from "typeorm"

export interface IService<T> {
  create: (data: Partial<T>) => Promise<T | null>
  save: (id: string, data: Partial<T>) => Promise<T | null>
  find: (options?: Partial<FindManyOptions<T>>) => Promise<T[]>
  findOne: (options: Partial<FindOneOptions<T>>) => Promise<T | null>
  findOrSave: (data: Partial<T>) => Promise<T>
  findAndCount: (
    options?: Partial<FindManyOptions<T>>
  ) => Promise<[T[], number]>
  remove: (id: string) => Promise<T | null>
}
