export interface IRequest<T> {
  body: T
  params: T
  query: T
}
