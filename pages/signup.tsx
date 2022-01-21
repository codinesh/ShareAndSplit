import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, FormEvent } from 'react'

import { User } from '@supabase/gotrue-js'
import constants from '../src/constants'
import { UserDetails } from '../src/types/types'
import { useUser } from '../src/hooks/useUser'

export const updateUserName = async (user: User, name: string) => {
  await constants.supabase
    .from<UserDetails>('users')
    .update({
      full_name: name,
    })
    .eq('id', user.id)
}

const SignUp = () => {
  const [newUser, setNewUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: '',
  })
  const router = useRouter()
  const { signUp, user } = useUser()

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setMessage({})
    const { error, user: createdUser } = await signUp({
      email: userDetails.email ?? '',
      password: userDetails.password ?? '',
    })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    } else {
      if (createdUser) {
        await updateUserName(createdUser, userDetails.name ?? '')
        setNewUser(createdUser)
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link.',
        })
      }
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (newUser || user) {
      router.replace('/account')
    }
  }, [newUser, user])

  return (
    <div className='flex justify-center height-screen-helper'>
      <div className='flex flex-col justify-between max-w-lg p-3 m-auto w-80 '>
        <div className='flex justify-center pb-12 '>Logo</div>
        <form onSubmit={handleSignup} className='flex flex-col space-y-4'>
          {message.content && (
            <div
              className={`${
                message.type === 'error' ? 'text-pink-500' : 'text-green-500'
              } border ${
                message.type === 'error'
                  ? 'border-pink-500'
                  : 'border-green-500'
              } p-3`}>
              {message.content}
            </div>
          )}
          <input
            placeholder='Name'
            name='name'
            value={userDetails.name}
            onChange={handleInputChange}
          />
          <input
            type='email'
            value={userDetails.email}
            placeholder='Email'
            onChange={handleInputChange}
            required
          />
          <input
            type='password'
            value={userDetails.password}
            placeholder='Password'
            onChange={handleInputChange}
          />
          <div className='pt-2 w-full flex flex-col'>
            <button type='submit' disabled={loading}>
              Sign up
            </button>
          </div>

          <span className='pt-1 text-center text-sm'>
            <span className='text-gray-200'>Do you have an account?</span>
            {` `}
            <Link href='/signin'>
              <a className='text-accent-9 font-bold hover:underline cursor-pointer'>
                Sign in.
              </a>
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SignUp
