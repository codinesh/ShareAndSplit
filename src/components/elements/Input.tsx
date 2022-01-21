import React, { HTMLInputTypeAttribute } from 'react'

const Input = ({
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
}: {
  type: HTMLInputTypeAttribute
  name: string
  id?: string
  placeholder: string
  onChange: (name: string, value: string) => void
  value: string
}) => {
  return (
    <div>
      <label htmlFor='email' className='sr-only'>
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={id ?? name}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
      />
    </div>
  )
}

export default Input
