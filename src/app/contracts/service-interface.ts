import type { Users } from "@/persistences/typeorm/models/access/Users"
import type { FindManyOptions } from "typeorm"

export interface IService {
  find: (options?: FindManyOptions<Users>) => Promise<Users[]>
  save: (id: string, data: Partial<Users>) => Promise<Users | null>
  findOrSave: (data: Partial<Users>) => Promise<Users>
}
