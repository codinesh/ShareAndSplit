import type { NextPage } from 'next'
import Head from 'next/head'
import Account from '../src/components/Account'
import LoadingIndicator from '../src/components/LoadingIndicator'
import { useUser } from '../src/hooks/useUser'

const Profile: NextPage = () => {
  const { userLoaded, user, session, userDetails } = useUser()
  return (
    <div className=''>
      <LoadingIndicator open={!userLoaded} />
      <Head>
        <title>{userDetails?.full_name ?? 'User'} - Profile</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section>
        <Account />
      </section>
    </div>
  )
}

export default Profile
