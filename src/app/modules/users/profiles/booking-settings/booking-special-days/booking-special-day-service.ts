import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { BookingSpecialDays } from "@/persistences/typeorm/models/widgets"
import { AppError } from "@/common/helpers/http"
import { type IService } from "@/app/contracts"
import { Injectable } from "@/common/decorators/injectable"

@Injectable()
export class BookingSpecialDayService implements IService<BookingSpecialDays> {
  constructor(
    private readonly _bookingSpecialDayRepository: Repository<BookingSpecialDays> = entityManager.getRepository(
      BookingSpecialDays
    )
  ) {}

  async create(
    data: Partial<BookingSpecialDays>
  ): Promise<BookingSpecialDays | null> {
    const { bookingSetting, scheduledAt } = data

    if (!bookingSetting) {
      throw new AppError("BookingSetting is required", 400)
    }

    if (!scheduledAt) {
      throw new AppError("ScheduledAt is required", 400)
    }

    return await this._bookingSpecialDayRepository.save(data)
  }

  async save(
    bookingSpecialDayId: string,
    data: Partial<BookingSpecialDays>
  ): Promise<BookingSpecialDays | null> {
    const specialDayFound = await this.findOne({
      where: { id: bookingSpecialDayId },
    })

    return await this._bookingSpecialDayRepository.save({
      ...specialDayFound,
      ...data,
    })
  }

  async find(
    options?: FindManyOptions<BookingSpecialDays>
  ): Promise<BookingSpecialDays[]> {
    return await this._bookingSpecialDayRepository.find(options)
  }

  async findOne(
    options: FindOneOptions<BookingSpecialDays>
  ): Promise<BookingSpecialDays> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    const specialDayFound = await this._bookingSpecialDayRepository.findOne(
      options
    )

    if (!specialDayFound) {
      throw new AppError("Booking not found", 404)
    }

    return specialDayFound
  }

  async findOrSave(
    data: Partial<BookingSpecialDays>
  ): Promise<BookingSpecialDays> {
    const { bookingSetting, scheduledAt } = data

    if (!bookingSetting) {
      throw new AppError("BookingSetting is required", 400)
    }

    if (!scheduledAt) {
      throw new AppError("ScheduledAt is required", 400)
    }

    const specialDay = await this._bookingSpecialDayRepository.findOne({
      where: { scheduledAt, bookingSetting },
    })

    if (!specialDay) {
      return await this._bookingSpecialDayRepository.save(data)
    }

    return specialDay
  }

  async findAndCount(
    options?: FindManyOptions<BookingSpecialDays>
  ): Promise<[BookingSpecialDays[], number]> {
    return await this._bookingSpecialDayRepository.findAndCount(options)
  }

  async remove(
    bookingSpecialDayId: string
  ): Promise<BookingSpecialDays | null> {
    const specialDayFound = await this.findOne({
      where: { id: bookingSpecialDayId },
    })

    return await this._bookingSpecialDayRepository.remove(specialDayFound)
  }
}
