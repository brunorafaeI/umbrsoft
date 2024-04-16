import { Controller, Get, Post, Put } from '@/common/decorators/route'
import { ContactService } from './contact-service'
import { type FindManyOptions } from 'typeorm'
import { AppLogger } from '@/common/libs/log4js'
import { AppError } from '@/common/helpers/http'
import { type Contacts } from '@/persistences/typeorm/models/access/Contacts'

@Controller('/profiles/:profileId/contacts')
export class ContactController {
  @Get('/')
  @Post('/')
  async contactIndex (req, res): Promise<Contacts[]> {
    const { body } = req

    try {
      return res.status(200).send({
        profiles: await ContactService.find({
          ...(body as FindManyOptions<Contacts>)
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Get('/:contactId')
  @Post('/:contactId')
  async contactFindOne (req, res): Promise<Contacts[]> {
    const { body } = req
    const { contactId } = req.params

    try {
      body.where = { ...body?.where, id: contactId }

      return res.status(200).send({
        profiles: await ContactService.find({
          ...(body as FindManyOptions<Contacts>)
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }

  @Put('/')
  async contactCreate (req, res): Promise<Contacts> {
    const { body } = req
    const { profileId } = req.params

    try {
      return res.status(200).send({
        profile: await ContactService.save({
          ...body as Contacts, profile: profileId
        })
      })
    } catch (err) {
      AppLogger.error(err.message)
      throw new AppError('Internal Server Error', 500)
    }
  }
}
