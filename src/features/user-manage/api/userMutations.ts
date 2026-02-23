import axios from 'axios'
import { User } from '@/entities/user/model/types'

const BASE_URL = 'https://699c3c6b110b5b738cc216db.mockapi.io/users/users'

export const createUser = async (
  user: Omit<User, 'id'>
): Promise<User> => {
  const { data } = await axios.post<User>(BASE_URL, user)
  return data
}

export const updateUser = async (
  user: User
): Promise<User> => {
  const { data } = await axios.put<User>(
    `${BASE_URL}/${user.id}`,
    user
  )
  return data
}

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}