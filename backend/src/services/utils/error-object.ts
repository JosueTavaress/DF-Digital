export interface IObjectResponse<T> {
  message?: string,
  statusCode: number,
  isValidRequest: boolean,
  data?: T
}