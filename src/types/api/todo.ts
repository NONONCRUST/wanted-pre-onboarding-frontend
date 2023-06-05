export type CreateTodoBody = {
  todo: string
}

export type GetTodosResponse = {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}[]

export type UpdateTodoBody = {
  todo: string
  isCompleted: boolean
}
