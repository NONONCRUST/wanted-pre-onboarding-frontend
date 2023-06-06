import { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

const useQuery = <TData>(queryFn: () => Promise<TData>) => {
  const [data, setData] = useState<TData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await queryFn()
      setData(data)
    } catch (error) {
      if (isAxiosError(error)) setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [queryFn])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export default useQuery
