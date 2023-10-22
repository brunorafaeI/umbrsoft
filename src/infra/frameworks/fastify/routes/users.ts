import { PrismaClient } from '@prisma/client'
import { type FastifyInstance } from 'fastify/'
import { z } from 'zod'

const prisma = new PrismaClient()

export const userRouter = async (
  fastify: FastifyInstance,
  options: Record<string, any>
): Promise<void> => {
  fastify.get('/users', async (_, reply) => {
    const users = await prisma.user.findMany()
    await reply.status(200).send({ users })
  })

  fastify.post('/users', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string().nonempty(),
      email: z.string().email().nonempty()
    })

    const { name, email } = createUserSchema.parse(request.body)

    await prisma.user.create({
      data: {
        name,
        email,
        token: 'testTOken12345789'
      }
    })

    await reply.status(201).send()
  })
}
