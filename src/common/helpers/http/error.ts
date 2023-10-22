export class AppError extends Error {
  constructor (
    readonly message: string = 'Bad Request',
    readonly statusCode: number = 400
  ) {
    super()
  }
}
