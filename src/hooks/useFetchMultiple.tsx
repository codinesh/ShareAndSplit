import { useEffect, useState } from 'react'
import constants from '../constants'

function useFetchMultiple<T>(
  url: string,
  method: 'GET' | 'POST',
  headers?: string
): {
  data: T[]
  error: string
  setBegin: React.Dispatch<React.SetStateAction<boolean>>
  inProgress: boolean
} {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState('')
  const [begin, setBegin] = useState(false)
  const [inProgress, setInProgress] = useState(false)

  const fetchData = async () => {
    try {
      setInProgress(true)
      let response = await fetch([constants.baseApiUrl, url].join(''), {
        method: method,
        mode: 'cors',
      })

      if (response.ok) {
        if (response.status == 204) {
          setData([])
        }

        let item: T[] = await response.json()
        if (item) {
          setData(item)
        } else {
          setError('data not available')
        }
      } else {
        setError('data not available')
      }
    } catch (err) {
      setError('data not available')
    }
    setInProgress(false)
  }

  useEffect(() => {
    begin && fetchData()
  }, [begin])

  return { data, error, inProgress, setBegin }
}

export default useFetchMultiple
