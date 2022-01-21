import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import constants from '../constants'
import { useUser } from '../hooks/useUser'
import LoadingIndicator from './LoadingIndicator'

export default function Account() {
  const { user, userDetails, userLoaded } = useUser()
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  async function updateProfile(
    username: string,
    website: string,
    avatar_url: string
  ) {
    try {
      setLoading(true)
      if (!user) return
      const updates = {
        id: user.id,
        full_name: username,
      }

      let { error } = await constants.supabase.from('users').insert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form-widget'>
      <LoadingIndicator open={!userLoaded} />
      {userLoaded && (
        <>
          <div>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' value={user.email} disabled />
          </div>
          <div>
            <label htmlFor='username'>Name</label>
            <input
              id='username'
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <button
              className='button block primary'
              onClick={() => updateProfile(userName, '', '')}
              disabled={loading}>
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>

          <div>
            {/* <button
              className='button block'
              onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button> */}
          </div>
        </>
      )}
    </div>
  )
}
