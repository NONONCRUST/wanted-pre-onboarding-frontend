import { AxiosResponse, isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

const useQuery = <T>(queryFn: () => Promise<AxiosResponse<T>>) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await queryFn()
      setData(response.data)
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
