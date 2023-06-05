import React, { useState } from 'react'
import useInput from '../hooks/useInput'
import Button from './common/Button'
import Checkbox from './common/Checkbox'
import TextField from './common/TextField'

interface Props {
  id: number
  isCompleted: boolean
  contents: string
  onDelete: (todoId: number) => void
  onUpdate: (todoId: number, contents: string, isCompleted: boolean) => void
}

const TodoListItem: React.FC<Props> = ({
  id,
  isCompleted: initialIsCompleted,
  contents: initialContents,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted)
  const [contents, setContents] = useState(initialContents)

  const todo = useInput(contents)

  const toggleEditing = () => {
    setIsEditing((prev) => !prev)
  }

  const handleUpdate = () => {
    onUpdate(id, todo.value, isCompleted)
    toggleEditing()
    setContents(todo.value)
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(id, contents, !isCompleted)
    setIsCompleted((prev) => !prev)
  }

  const handleCancelButtonClick = () => {
    toggleEditing()
    todo.setValue(contents)
  }

  const isDirty = contents !== todo.value

  return (
    <li className="flex justify-between items-center h-8 my-2">
      <label className="flex items-center">
        <Checkbox
          value={id}
          className="mr-2"
          checked={isCompleted}
          onChange={handleToggle}
        />
        {isEditing && (
          <TextField
            value={todo.value}
            onChange={todo.onChange}
            data-testid="modify-input"
            fullWidth
          />
        )}
        {!isEditing && <span className="ml-2">{contents}</span>}
      </label>
      {!isEditing && (
        <div className="flex gap-2">
          <Button
            label="수정"
            variant="secondary"
            size="small"
            data-testid="modify-button"
            onClick={toggleEditing}
          />
          <Button
            label="삭제"
            variant="error"
            size="small"
            data-testid="delete-button"
            onClick={() => onDelete(id)}
          />
        </div>
      )}
      {isEditing && (
        <div>
          <Button
            className="mr-2"
            label="제출"
            variant="primary"
            size="small"
            disabled={!isDirty}
            data-testid="submit-button"
            onClick={handleUpdate}
          />
          <Button
            label="취소"
            variant="secondary"
            size="small"
            data-testid="cancel-button"
            onClick={handleCancelButtonClick}
          />
        </div>
      )}
    </li>
  )
}

export default TodoListItem
