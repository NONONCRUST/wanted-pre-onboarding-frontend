import { useState } from 'react'

interface params<TData, TVariables extends any[]> {
  mutationFn: (...args: TVariables) => Promise<TData>
  onSuccess?: (data: TData) => void
  onError?: (error: unknown) => void
}

const useMutation = <TData, TVariables extends any[] = any[]>({
  mutationFn,
  onSuccess,
  onError,
}: params<TData, TVariables>) => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const mutate = async (...args: TVariables) => {
    if (loading) return

    setLoading(true)
    try {
      const data = await mutationFn(...args)
      onSuccess && onSuccess(data)
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
