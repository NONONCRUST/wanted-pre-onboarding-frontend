import axiosInstance from '../../lib/api'
import {
  CreateTodoBody,
  GetTodosResponse,
  UpdateTodoBody,
} from '../../types/api/todo'

export const createTodoAPI = async (body: CreateTodoBody) => {
  const response = await axiosInstance.post('/todos', body)
  return response.data
}

export const getTodosAPI = async () => {
  const response = await axiosInstance.get<GetTodosResponse>('/todos')
  return response.data
}

export const updateTodoAPI = async (id: number, body: UpdateTodoBody) => {
  const response = await axiosInstance.put(`/todos/${id}`, body)
  return response.data
}

export const deleteTodoAPI = async (id: number) => {
  const response = await axiosInstance.delete(`/todos/${id}`)
  return response.data
}
