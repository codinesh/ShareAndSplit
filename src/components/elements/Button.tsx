import React from 'react'

const Button = ({
  text,
  disabled = false,
  onClick,
  primary = true,
}: {
  text: string
  disabled?: boolean
  onClick?: () => void
  primary?: boolean
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type='button'
      className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
      {text}
    </button>
  )
}

export default Button
