import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { Contacts } from "@/persistences/typeorm/models/access/Contacts"
import { AppError } from "@/common/helpers/http"
import { type IService } from "@/app/contracts"
import { Injectable } from "@/common/decorators/injectable"

@Injectable()
export class ContactService implements IService<Contacts> {
  constructor(
    private readonly _contactRepository: Repository<Contacts> = entityManager.getRepository(
      Contacts
    )
  ) {}

  async find(options?: FindManyOptions<Contacts>): Promise<Contacts[]> {
    return await this._contactRepository.find(options)
  }

  async findOne(options: FindOneOptions<Contacts>): Promise<Contacts> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    const contactFound = await this._contactRepository.findOne(options)

    if (!contactFound) {
      throw new AppError("Contact not found", 404)
    }

    return contactFound
  }

  async save(
    contactId: string,
    data: Partial<Contacts>
  ): Promise<Contacts | null> {
    const contactFound = await this.findOne({
      where: { id: contactId },
    })
    
    return await this._contactRepository.save({
      ...contactFound,
      ...data,
    })
  }

  async create(data: Partial<Contacts>): Promise<Contacts | null> {
    const { name, relationship, profile } = data

    if (!name) {
      throw new AppError("Name is required", 400)
    }

    if (!relationship) {
      throw new AppError("Relationship is required", 400)
    }

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    return await this._contactRepository.save(data)
  }

  async findOrSave(data: Partial<Contacts>): Promise<Contacts> {
    const { name, profile } = data

    if (!name) {
      throw new AppError("Name is required", 400)
    }

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    const contact = await this._contactRepository.findOne({
      where: { name, profile },
    })

    if (!contact) {
      return await this._contactRepository.save(data)
    }

    return contact
  }

  async remove(contactId: string): Promise<Contacts | null> {
    const contactFound = await this.findOne({
      where: { id: contactId },
    })

    return await this._contactRepository.remove(contactFound)
  }
}
