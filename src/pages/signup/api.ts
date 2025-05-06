import { Api } from '@/app/api/Api'

export const createNewUser = (body: ICreateUserRequestBody) =>
  Api.post<ICreateNewUserResponse>('signup', body)

interface ICreateUserRequestBody {
  username: string
  password: string
}

interface ICreateNewUserResponse {
  token: string
  username: string
}
