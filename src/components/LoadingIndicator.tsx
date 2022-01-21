import { Transition, Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'

const LoadingIndicator: React.FC<{ open: boolean }> = (props) => {
  if (!props.open) return null

  return (
    <div className='absolute w-screen h-screen bg-gray-200 bg-opacity-60 z-50'>
      <svg
        fill='none'
        className='relative w-20 h-20 animate-spin top-1/2 left-1/2'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          clip-rule='evenodd'
          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
          fill='currentColor'
          fill-rule='evenodd'
        />
      </svg>
    </div>
  )
}

export default LoadingIndicator
