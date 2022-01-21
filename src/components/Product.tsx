import React from 'react'
import Image from 'next/image'
import IProduct from '../types/IProduct'

const Product: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div key={product.Id} className='group relative border-blue border-2 p-2'>
      <div className='w-full min-h-60 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none'>
        <Image
          src={product.ImageUrl}
          layout='fill'
          alt={product.Title}
          className='w-full h-full object-center object-cover lg:w-full lg:h-full'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div className='w-2/3'>
          <h3 className='text-sm text-gray-700'>
            <a target='_blank' rel='noreferrer' href={product.Url}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.Title}
            </a>
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{product.Category}</p>
          <p className='mt-1 text-sm text-gray-500'>
            {product.History.length} executions
          </p>
        </div>
        <div className='bg-reds-500'>
          <p className='text-sm font-medium text-green-900'>
            CP: {product.Price}
          </p>

          {product.History && product.History.length > 0 && (
            <p className='text-sm font-medium text-gray-900'>
              PP: {product.History.slice(-1)[0].PreviousPrice}
            </p>
          )}

          {product.History && product.History.length > 0 && (
            <p className='text-sm font-medium text-gray-900'>
              BP: {Math.min(...product.History.map((x) => x.CurrentPrice))}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
