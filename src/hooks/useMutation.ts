import { AxiosResponse } from 'axios'
import { useState } from 'react'

interface params<T, Args extends any[]> {
  mutationFn: (...args: Args) => Promise<AxiosResponse<T>>
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
}

const useMutation = <T, Args extends any[] = any[]>({
  mutationFn,
  onSuccess,
  onError,
}: params<T, Args>) => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const mutate = async (...args: Args) => {
    if (loading) return

    setLoading(true)
    try {
      const response = await mutationFn(...args)
      onSuccess && onSuccess(response.data)
    } catch (error) {
      onError && onError(error)
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, isError }
}

export default useMutation
