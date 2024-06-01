export interface ErrorService extends Error {
  code: number,
  message: string
}