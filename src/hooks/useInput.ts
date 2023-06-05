import { useState } from 'react'

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { value, onChange: handleChange, setValue, reset }
}

export default useInput
