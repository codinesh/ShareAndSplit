import { useEffect, useState } from 'react'
import constants from '../constants'

function useFetch<T>(
  url: string,
  method: 'GET' | 'POST',
  headers?: string
): {
  data: T
  error: string
  setBegin: React.Dispatch<React.SetStateAction<boolean>>
  setBeginWithBody: React.Dispatch<React.SetStateAction<T | undefined>>
  inProgress: boolean
} {
  const [data, setData] = useState<T>({} as T)
  const [error, setError] = useState('')
  const [begin, setBegin] = useState(false)
  const [beginWithBody, setBeginWithBody] = useState<T>()
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
          setData({} as T)
        }

        let item: T = await response.json()
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

  const fetchDataWithBody = async (data: T) => {
    try {
      setInProgress(true)
      let response = await fetch([constants.baseApiUrl, url].join(''), {
        method: method,
        mode: 'cors',
        body: JSON.stringify(data),
      })

      if (response.ok) {
        if (response.status == 204) {
          setData({} as T)
        }

        let item: T = await response.json()
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
    beginWithBody && fetchDataWithBody(beginWithBody)
  }, [begin, beginWithBody])

  return { data, error, inProgress, setBegin, setBeginWithBody }
}

export default useFetch
