import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { data } from '../data'
import {
  GlobalStateAction,
  useGlobalDispatch,
  useGlobalState,
} from '../store/GlobalStore'

const Page: React.FC = (props) => {
  const globalState = useGlobalState()
  const router = useRouter()
  const globalDispatch = useGlobalDispatch()

  useEffect(() => {
    let title =
      data.navigation.filter((x) => x.path == router.pathname)[0]?.name ?? ''
    globalDispatch({ type: GlobalStateAction.SetPageTitle, title })
  }, [router.pathname])

  return (
    <div>
      <div className='print:hidden px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>
          {globalState.pageTitle}
        </h1>
      </div>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
        <div className='py-4'>{props.children}</div>
      </div>
    </div>
  )
}

export default Page
