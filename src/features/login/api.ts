import { Api } from '@/shared/api/Api'

export const login = (body: IloginResponseRequestBody) => Api.post<IloginResponse>('login', body)

interface IloginResponseRequestBody {
  username: string
  password: string
}

interface IloginResponse {
  token: string
  username: string
}
