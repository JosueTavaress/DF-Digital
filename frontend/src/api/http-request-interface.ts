export interface IResponseLogin {
  expiresAt: string,
  tempToken: string
}

export interface IResponseCreateUser {
  id: number,
  email: string,
  password: string,
  name: string
}

export interface IResponseUser {
  name: string,
  email: string,
  id: 1,
  tags: {
    id: number,
    name: string,
    description: string,
    color: string
  }[]
}