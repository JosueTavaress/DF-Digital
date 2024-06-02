export interface IUsers {
  id: number,
  name: string,
  email: string,
  password: string
}

export interface IUpdateUser {
  name: string,
  email: string,
  user_links_tag: number[]
}

export interface IUserWithTags extends IUsers {
  tags: { id: number, name: string, description: string, color: string }[];
}