import constants from './constants'

async function getItem<T>(url: string, headers?: string): Promise<T> {
  let promise = new Promise<T>(async (resolve, reject) => {
    try {
      let response = await fetch([constants.baseApiUrl, url].join(''))
      if (response.ok) {
        if (response.status == 204) {
          resolve({} as T)
        }

        let item: T = await response.json()
        if (item) resolve(item)
        else reject('data not available')
      } else {
        reject('data not available')
      }
    } catch (err) {
      reject(err)
    }
  })

  return promise
}

async function getItems<T>(url: string, headers?: string): Promise<T[]> {
  let promise = new Promise<T[]>(async (resolve, reject) => {
    try {
      let response = await fetch([constants.baseApiUrl, url].join(''))
      if (response.ok) {
        if (response.status == 204) {
          resolve([])
        }

        let item: T[] = await response.json()
        if (item) resolve(item)
        else reject('data not available')
      } else {
        reject('data not available')
      }
    } catch (err) {
      reject(err)
    }
  })

  return promise
}

async function postItem<T, R>(
  url: string,
  data: T,
  headers?: string
): Promise<R> {
  let promise = new Promise<R>(async (resolve, reject) => {
    try {
      let response = await fetch([constants.baseApiUrl, url].join(''), {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.status == 200) {
        let item = await response.json()
        if (item != null) resolve(item)
        else reject('data not available')
      } else reject('invalid response received.')
    } catch (err) {
      reject(err)
    }
  })

  return promise
}

const ApiHelper = { getItem, getItems, postItem }
export default ApiHelper
