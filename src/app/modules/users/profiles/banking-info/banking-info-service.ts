import { Repository } from "typeorm"
import type { FindManyOptions, FindOneOptions } from "typeorm"
import { entityManager } from "@/persistences/typeorm"
import { AppError } from "@/common/helpers/http"
import { type IService } from "@/app/contracts"
import { Injectable } from "@/common/decorators/injectable"
import { BankingInfo } from "@/persistences/typeorm/models/access/BankingInfo"

@Injectable()
export class BankingInfoService implements IService<BankingInfo> {
  constructor(
    private readonly _bankingInfoRepository: Repository<BankingInfo> = entityManager.getRepository(
      BankingInfo
    )
  ) {}

  async create(data: Partial<BankingInfo>): Promise<BankingInfo | null> {
    const { profile, accountNumber } = data

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    if (!accountNumber) {
      throw new AppError("AccountNumber is required", 400)
    }

    return await this._bankingInfoRepository.save(data)
  }

  async save(
    bankingId: string,
    data: Partial<BankingInfo>
  ): Promise<BankingInfo | null> {
    const bankingInfoFound = await this.findOne({
      where: { id: bankingId },
    })

    return await this._bankingInfoRepository.save({
      ...bankingInfoFound,
      ...data,
    })
  }

  async find(options?: FindManyOptions<BankingInfo>): Promise<BankingInfo[]> {
    return await this._bankingInfoRepository.find(options)
  }

  async findOne(
    options: FindOneOptions<BankingInfo>
  ): Promise<BankingInfo | null> {
    if (!options) {
      throw new AppError("Options are required", 400)
    }

    return await this._bankingInfoRepository.findOne(options)
  }

  async findOrSave(data: Partial<BankingInfo>): Promise<BankingInfo> {
    const { profile, accountNumber } = data

    if (!accountNumber) {
      throw new AppError("AccountNumber is required", 400)
    }

    if (!profile) {
      throw new AppError("Profile is required", 400)
    }

    const bankingInfo = await this._bankingInfoRepository.findOne({
      where: { accountNumber, profile },
    })

    if (!bankingInfo) {
      return await this._bankingInfoRepository.save(data)
    }

    return bankingInfo
  }

  async findAndCount(
    options?: FindManyOptions<BankingInfo>
  ): Promise<[BankingInfo[], number]> {
    return await this._bankingInfoRepository.findAndCount(options)
  }

  async remove(bankingId: string): Promise<BankingInfo | null> {
    const bankingInfoFound = await this.findOne({
      where: { id: bankingId },
    })

    if (!bankingInfoFound) {
      throw new AppError("Banking info not found", 404)
    }

    return await this._bankingInfoRepository.remove(bankingInfoFound)
  }
}
