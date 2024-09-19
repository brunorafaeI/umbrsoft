import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { Bookings } from "@/persistences/typeorm/models/widgets/Bookings"
import { AppError } from "@/common/helpers/http"
import { type IService } from "@/app/contracts"
import { Injectable } from "@/common/decorators/injectable"

@Injectable()
export class BookingService implements IService<Bookings> {
  constructor(
    private readonly _bookingRepository: Repository<Bookings> = entityManager.getRepository(
      Bookings
    )
  ) {}

  async find(options?: FindManyOptions<Bookings>): Promise<Bookings[]> {
    return await this._bookingRepository.find(options)
  }

  async findOne(options: FindOneOptions<Bookings>): Promise<Bookings> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    const bookingFound = await this._bookingRepository.findOne(options)

    if (!bookingFound) {
      throw new AppError("Booking not found", 404)
    }

    return bookingFound
  }

  async save(
    bookingId: string,
    data: Partial<Bookings>
  ): Promise<Bookings | null> {
    const bookingFound = await this.findOne({
      where: { id: bookingId },
    })

    return await this._bookingRepository.save({
      ...bookingFound,
      ...data,
    })
  }

  async create(data: Partial<Bookings>): Promise<Bookings | null> {
    const { profile, scheduledAt } = data

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    if (!scheduledAt) {
      throw new AppError("ScheduledAt is required", 400)
    }

    return await this._bookingRepository.save(data)
  }

  async findOrSave(data: Partial<Bookings>): Promise<Bookings> {
    const { profile, scheduledAt } = data

    if (!scheduledAt) {
      throw new AppError("ScheduledAt is required", 400)
    }

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    const booking = await this._bookingRepository.findOne({
      where: { scheduledAt, profile },
    })

    if (!booking) {
      return await this._bookingRepository.save(data)
    }

    return booking
  }

  async remove(bookingId: string): Promise<Bookings | null> {
    const bookingFound = await this.findOne({
      where: { id: bookingId },
    })

    return await this._bookingRepository.remove(bookingFound)
  }
}
