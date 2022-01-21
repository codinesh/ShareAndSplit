import { useEffect, useState, createContext, useContext } from 'react'
import { Session, User, Provider } from '@supabase/supabase-js'
import { UserDetails } from '../types/types'
import constants from '../constants'

type UserContextType = {
  session: Session
  user: User
  userDetails: UserDetails
  userLoaded: boolean
  signIn: (options: SignInOptions) => Promise<{
    session: Session | null
    user: User | null
    provider?: Provider
    url?: string | null
    error: Error | null
    data: Session | null
  }>
  signUp: (options: SignUpOptions) => Promise<{
    user: User | null
    session: Session | null
    error: Error | null
    data: Session | User | null
  }>
  signOut: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    const session = constants.supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = constants.supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const getUserDetails = () =>
    constants.supabase.from<UserDetails>('users').select('*').single()

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserDetails()]).then((results) => {
        const userDetailsPromise = results[0]

        if (userDetailsPromise.status === 'fulfilled')
          setUserDetails(userDetailsPromise.value.data)

        setUserLoaded(true)
      })
    }
  }, [user])

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    signIn: (options: SignInOptions) => constants.supabase.auth.signIn(options),
    signUp: (options: SignUpOptions) => constants.supabase.auth.signUp(options),
    signOut: () => {
      setUserDetails(null)
      return constants.supabase.auth.signOut()
    },
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

type SignInOptions = {
  email?: string
  password?: string
  provider?: Provider
}

type SignUpOptions = {
  email: string
  password: string
}
