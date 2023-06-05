import axiosInstance from '../../lib/api'
import {
  CreateTodoBody,
  GetTodosResponse,
  UpdateTodoBody,
} from '../../types/api/todo'

export const createTodoAPI = (body: CreateTodoBody) => {
  return axiosInstance.post('/todos', body)
}

export const getTodosAPI = () => {
  return axiosInstance.get<GetTodosResponse>('/todos')
}

export const updateTodoAPI = (id: number, body: UpdateTodoBody) => {
  return axiosInstance.put(`/todos/${id}`, body)
}

export const deleteTodoAPI = (id: number) => {
  return axiosInstance.delete(`/todos/${id}`)
}
