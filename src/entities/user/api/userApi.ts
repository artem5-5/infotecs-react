import axios from 'axios'
import { User } from '../model/types'

const BASE_URL = 'https://699c3c6b110b5b738cc216db.mockapi.io/users/users'

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(BASE_URL)
  return data
}