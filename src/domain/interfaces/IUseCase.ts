export interface IUseCase {
  execute: () => Promise<any>
}
