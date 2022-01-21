import { SearchIcon } from '@heroicons/react/outline'
import { ChangeEvent, useState } from 'react'
import IProduct from '../types/IProduct'
import { classNames } from '../utils/cssUtils'

interface ProductInput {
  url: string
  title: string
}

export default function AddProduct() {
  const [product, setProduct] = useState<IProduct>()
  const [productInput, setProductInput] = useState<ProductInput>()
  const [loading, setloading] = useState(false)
  const [productAdded, setProductAdded] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const addProduct = async (product: IProduct) => {
    setProductAdded(false)
    setError(undefined)
    try {
      setloading(true)
      let response = await fetch(
        'https://purchasetips.azurewebsites.net/api/addProduct',
        {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(product),
        }
      )
      if (response.ok) {
        var data = await response.json()
        setProduct(data)
        setProductAdded(true)
      } else {
        console.error(response.statusText)
        setError(response.statusText)
      }
    } catch (error: any) {
      console.error(error)
      setError(error)
    }
    setloading(false)
  }

  const getProductDetails = async (product: ProductInput) => {
    try {
      setloading(true)
      let response = await fetch(
        'https://purchasetips.azurewebsites.net/api/GetProductDetails',
        {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({ url: product.url }),
        }
      )
      if (response.ok) {
        var data = await response.json()
        console.log('success', data)
        setProduct(data)
      } else {
        console.error(response.statusText)
      }
    } catch (error) {
      console.error(error)
    }
    setloading(false)
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    var name = e.target.name
    var target = e.target.value
    if (product) setProduct({ ...product, [name]: target })
    else setProductInput({ url: '', title: '', [name]: target })
  }

  return (
    <>
      <div className='min-h-full flex items-stretch justify-between py-2 px-4 sm:px-6 '>
        <div className='max-w-md w-full space-y-8'>
          <form
            className='mt-8 space-y-4'
            method='POST'
            onSubmit={(e) => {
              e.preventDefault()
              product && addProduct(product)
            }}>
            <div>
              <label
                htmlFor='productUrl'
                className='block text-sm font-medium text-gray-700'>
                Website*
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <input
                  type='url'
                  required
                  name='url'
                  onChange={handleFormChange}
                  onBlur={() => productInput && getProductDetails(productInput)}
                  id='url'
                  className=' rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                  placeholder='www.amazon.in/someproduct'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'>
                Product Title
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  value={product?.Title}
                  onChange={(e) => {
                    product && setProduct({ ...product, Title: e.target.value })
                  }}
                  className='rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                  placeholder='product title'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700'>
                Current price
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <input
                  type='number'
                  name='price'
                  value={product?.Price}
                  id='price'
                  disabled={true}
                  className='rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                  placeholder='0'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700'>
                Category
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <input
                  type='text'
                  name='category'
                  id='category'
                  value={product?.Category}
                  disabled={true}
                  className={classNames(
                    'rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300',
                    true ? 'animate-pulse' : ''
                  )}
                  placeholder='Electronics'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={loading}
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <SearchIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                {loading ? (
                  <span className='animate-pulse'>fetching details ...</span>
                ) : (
                  <span>Add product</span>
                )}
              </button>
            </div>
          </form>
          <section>
            {productAdded && (
              <span className='text-green-500'>Product added successfully</span>
            )}
            {error && (
              <span className='text-red-600'>
                Error occurred while adding product.
              </span>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
