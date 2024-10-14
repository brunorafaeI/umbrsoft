import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { BookingSettings } from "@/persistences/typeorm/models/widgets/BookingSettings"
import { AppError } from "@/common/helpers/http"
import { type IService } from "@/app/contracts"
import { Injectable } from "@/common/decorators/injectable"

@Injectable()
export class BookingSettingService implements IService<BookingSettings> {
  constructor(
    private readonly _bookingSettingRepository: Repository<BookingSettings> = entityManager.getRepository(
      BookingSettings
    )
  ) {}

  async create(
    data: Partial<BookingSettings>
  ): Promise<BookingSettings | null> {
    const { profile, content } = data

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    if (!content) {
      throw new AppError("Content is required", 400)
    }

    return await this._bookingSettingRepository.save(data)
  }

  async save(
    bookingSettingId: string,
    data: Partial<BookingSettings>
  ): Promise<BookingSettings | null> {
    const bookingFound = await this.findOne({
      where: { id: bookingSettingId },
    })

    return await this._bookingSettingRepository.save({
      ...bookingFound,
      ...data,
    })
  }

  async find(
    options?: FindManyOptions<BookingSettings>
  ): Promise<BookingSettings[]> {
    return await this._bookingSettingRepository.find(options)
  }

  async findOne(
    options: FindOneOptions<BookingSettings>
  ): Promise<BookingSettings | null> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    return await this._bookingSettingRepository.findOne(options)
  }

  async findOrSave(data: Partial<BookingSettings>): Promise<BookingSettings> {
    const { profile, content } = data

    if (!content) {
      throw new AppError("Content is required", 400)
    }

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    const booking = await this._bookingSettingRepository.findOne({
      where: { content, profile },
    })

    if (!booking) {
      return await this._bookingSettingRepository.save(data)
    }

    return booking
  }

  async findAndCount(
    options?: FindManyOptions<BookingSettings>
  ): Promise<[BookingSettings[], number]> {
    return await this._bookingSettingRepository.findAndCount(options)
  }

  async remove(bookingSettingId: string): Promise<BookingSettings | null> {
    const bookingFound = await this.findOne({
      where: { id: bookingSettingId },
    })

    if (!bookingFound) {
      throw new AppError("Booking setting not found", 404)
    }

    return await this._bookingSettingRepository.remove(bookingFound)
  }
}
