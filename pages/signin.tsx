import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, FormEvent } from 'react'

import { useUser } from '../src/hooks/useUser'
import { Provider } from '@supabase/supabase-js'
import LoadingIndicator from '../src/components/LoadingIndicator'
import Input from '../src/components/elements/Input'
import Button from '../src/components/elements/Button'

const SignIn = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    showPasswordInput: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: '',
  })

  const router = useRouter()
  const { user, signIn } = useUser()

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setMessage({})

    const { error } = await signIn({
      email: userDetails.email,
      password: userDetails.password,
    })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }
    if (!userDetails.password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.',
      })
    }
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await signIn({ provider })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }
    setLoading(false)
  }

  const handleInputChange = (name: string, value: string) => {
    setUserDetails({ ...userDetails, [name]: value })
  }

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])

  if (!user)
    return (
      <div className='flex flex-col justify-between max-w-lg p-3 m-auto w-80 bg-gray-700 hover:shadow-lg rounded-md shadow-xl'>
        <div className='flex justify-center pb-12 '>logo here</div>
        <div className='flex flex-col space-y-4'>
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

          {!userDetails.showPasswordInput && (
            <form onSubmit={handleSignin} className='flex flex-col space-y-4'>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={userDetails.email}
                onChange={handleInputChange}
              />
              <button
                type='submit'
                className='border-gray-400 border-2 rounded-md text-gray-400'
                disabled={!userDetails.email.length}>
                Send magic link
              </button>
            </form>
          )}

          {userDetails.showPasswordInput && (
            <form onSubmit={handleSignin} className='flex flex-col space-y-4'>
              <Input
                type='email'
                placeholder='Email'
                value={userDetails.email}
                onChange={handleInputChange}
                name={'email'}
              />
              <Input
                type='password'
                name={'password'}
                placeholder='Password'
                value={userDetails.password}
                onChange={handleInputChange}
              />
              <Button
                text='Login'
                onClick={() => {}}
                disabled={
                  !userDetails.password.length || !userDetails.email.length
                }
              />
            </form>
          )}

          <span className='pt-1 text-center text-sm'>
            <a
              href='#'
              className='text-gray-200 text-accent-9 hover:underline cursor-pointer'
              onClick={() => {
                setUserDetails({
                  ...userDetails,
                  showPasswordInput: !userDetails.showPasswordInput,
                })
                setMessage({})
              }}>
              {`Or sign in with ${
                userDetails.showPasswordInput ? 'magic link' : 'password'
              }.`}
            </a>
          </span>

          <span className='pt-1 text-center text-sm'>
            <span className='text-gray-200'>Dont have an account?</span>

            <Link href='/signup'>
              <a className='text-accent-9 font-bold hover:underline cursor-pointer'>
                Sign up.
              </a>
            </Link>
          </span>
        </div>

        <div className='flex items-center my-6'>
          <div
            className='border-t border-gray-600 flex-grow mr-3'
            aria-hidden='true'></div>
          <div className='text-gray-400'>Or</div>
          <div
            className='border-t border-gray-600 flex-grow ml-3'
            aria-hidden='true'></div>
        </div>

        <button
          type='submit'
          disabled={loading}
          onClick={() => handleOAuthSignIn('github')}>
          <span className='ml-2'>Continue with GitHub</span>
        </button>
      </div>
    )

  return (
    <div className='m-6'>
      <LoadingIndicator open={loading} />
    </div>
  )
}

export default SignIn
