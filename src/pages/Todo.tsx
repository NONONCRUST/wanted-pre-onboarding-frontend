import TodoListItem from '../components/TodoListItem'
import Button from '../components/common/Button'
import TextField from '../components/common/TextField'
import useInput from '../hooks/useInput'
import useMutation from '../hooks/useMutation'
import useQuery from '../hooks/useQuery'
import {
  createTodoAPI,
  deleteTodoAPI,
  getTodosAPI,
  updateTodoAPI,
} from '../lib/api/todo'

const Todo = () => {
  const todo = useInput('')

  const { data, refetch } = useQuery(getTodosAPI)

  const { mutate: createTodo } = useMutation({
    mutationFn: createTodoAPI,
    onSuccess: () => {
      todo.reset()
      refetch()
    },
  })

  const { mutate: updateTodo } = useMutation({
    mutationFn: updateTodoAPI,
  })

  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoAPI,
  })

  const handleAddButtonClick = () => {
    createTodo({
      todo: todo.value,
    })
  }

  const handleTodoDelete = async (todoId: number) => {
    await deleteTodo(todoId)
    refetch()
  }

  const handleTodoUpdate = (
    todoId: number,
    contents: string,
    isCompleted: boolean
  ) => {
    updateTodo(todoId, {
      todo: contents,
      isCompleted,
    })
  }

  return (
    <section className="flex flex-col w-96 h-screen">
      <div className="mt-8 flex gap-4">
        <TextField
          value={todo.value}
          onChange={todo.onChange}
          data-testid="new-todo-input"
          fullWidth
        />
        <Button
          label="추가하기"
          disabled={!todo.value}
          data-testid="new-todo-add-button"
          onClick={handleAddButtonClick}
        />
      </div>
      <ul className="flex flex-col mt-8 gap-2">
        {data?.map((item) => (
          <TodoListItem
            key={item.id}
            id={item.id}
            contents={item.todo}
            isCompleted={item.isCompleted}
            onUpdate={handleTodoUpdate}
            onDelete={handleTodoDelete}
          />
        ))}
      </ul>
    </section>
  )
}

export default Todo
