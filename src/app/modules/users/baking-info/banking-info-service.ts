import type { FindManyOptions, Repository } from 'typeorm'
import { entityManager } from '@/persistences/typeorm'
import { BankingInfo } from '@/persistences/typeorm/models/access/BankingInfo'
import { AppError } from '@/common/helpers/http'

export abstract class BankingInfoService {
  static _userRepository: Repository<BankingInfo> = entityManager.getRepository(BankingInfo)

  static async find (options?: FindManyOptions<BankingInfo>): Promise<BankingInfo[] | null> {
    return await BankingInfoService._userRepository.find(options)
  }

  static async save (data: Partial<BankingInfo>): Promise<BankingInfo | null> {
    if (!data.accountHolder) {
      throw new AppError('Account holder is required', 400)
    }

    if (!data.accountNumber) {
      throw new AppError('Account number is required', 400)
    }

    return await BankingInfoService._userRepository.save(data)
  }

  public toString (): string {
    return 'BankingInfoService'
  }
}
